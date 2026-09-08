(() => {
  "use strict";

  const config = window.GUDEL_CONFIG || {};

  function initMetaPixel() {
    const id = String(config.META_PIXEL_ID || "").trim();
    if (!/^\d{8,20}$/.test(id)) return;
    if (window.fbq) return;

    const fbq = window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    fbq("init", id);
    fbq("track", "PageView");
  }

  function track(name, parameters = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...parameters });
  }

  function captureUtm() {
    const params = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content"].forEach((key) => {
      const element = document.getElementById(key);
      if (element) element.value = params.get(key) || sessionStorage.getItem(key) || "";
      if (params.get(key)) sessionStorage.setItem(key, params.get(key));
    });
  }

  function setError(input, message) {
    const key = input.name === "privacy" ? "privacy" : input.id;
    const error = document.querySelector(`[data-error-for="${key}"]`);
    if (message) {
      input.setAttribute("aria-invalid", "true");
      if (error) error.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      if (error) error.textContent = "";
    }
  }

  function validate(form) {
    let valid = true;
    const messages = {
      firstName: "Bitte geben Sie Ihren Vornamen ein.",
      lastName: "Bitte geben Sie Ihren Nachnamen ein.",
      company: "Bitte geben Sie Ihre Firma ein.",
      phone: "Bitte geben Sie eine Telefonnummer ein."
    };

    [...form.elements].forEach((field) => {
      if (!field.required) return;
      const missing = field.type === "checkbox" ? !field.checked : !field.value.trim();
      const phoneInvalid = field.name === "phone" && !missing && field.value.replace(/\D/g, "").length < 6;
      const message = missing ? messages[field.name] : phoneInvalid ? "Bitte prüfen Sie die Telefonnummer." : "";
      setError(field, message);
      if (message) valid = false;
    });
    return valid;
  }

  async function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById("form-status");
    const button = form.querySelector("button[type=submit]");

    status.textContent = "";
    status.className = "form-status form-wide";

    if (!validate(form)) {
      const firstInvalid = form.querySelector("[aria-invalid=true]");
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    if (form.website.value) return;

    button.disabled = true;
    button.querySelector("span").textContent = "Wird gesendet …";

    const endpoint = String(config.FORM_ENDPOINT || "").trim();
    const preview = config.PREVIEW_MODE === true || !endpoint;

    if (preview) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      status.textContent = "Vorschau erfolgreich: Das Formular ist vollständig und bereit. Für den E-Mail-Versand fehlt nur noch der Formular-Endpunkt.";
      status.classList.add("success");
      button.disabled = false;
      button.querySelector("span").textContent = "Rückruf anfordern";
      track("preview_form_complete");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      status.textContent = "Vielen Dank. Wir haben Ihre Anfrage erhalten und melden uns persönlich bei Ihnen.";
      status.classList.add("success");
      form.reset();
      captureUtm();
      track("lead_submit", { form: "callback" });
      if (window.fbq) window.fbq("track", "Lead");
    } catch (error) {
      status.textContent = "Die Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns unter 02369 20990-0 an.";
      status.classList.add("error");
      button.disabled = false;
      button.querySelector("span").textContent = "Erneut versuchen";
      track("lead_submit_error", { message: String(error) });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMetaPixel();
    captureUtm();

    document.querySelectorAll("[data-track]").forEach((element) => {
      element.addEventListener("click", () => track(element.dataset.track));
    });

    const form = document.getElementById("callback-form");
    const notice = document.getElementById("preview-notice");
    if (form) form.addEventListener("submit", submitForm);
    if (notice && (config.PREVIEW_MODE === true || !config.FORM_ENDPOINT)) notice.hidden = false;

    const video = document.querySelector("video");
    const playButton = document.querySelector("[data-play-video]");
    if (video && playButton) {
      playButton.addEventListener("click", async () => {
        video.scrollIntoView({ behavior: "smooth", block: "center" });
        try { await video.play(); track("video_play"); } catch (_) { /* native controls remain available */ }
      });
    }
  });
})();
