const langSwitch = document.getElementById("langSwitch");
let currentLang = "zh";

async function loadLang(lang) {
  const res = await fetch(`lang/${lang}.json`);
  const dict = await res.json();
  applyTranslations(dict);
}

function applyTranslations(dict, parent = document) {
  parent.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const keys = key.split(".");
    let text = dict;
    for (let k of keys) {
      text = text[k];
      if (!text) break;
    }
    if (text) el.innerText = text;
  });
}

langSwitch.addEventListener("click", (e) => {
  e.preventDefault();
  currentLang = currentLang === "zh" ? "en" : "zh";
  langSwitch.innerText = currentLang === "zh" ? "English" : "中文";
  loadLang(currentLang);
});

window.addEventListener("DOMContentLoaded", () => {
  loadLang(currentLang);
});