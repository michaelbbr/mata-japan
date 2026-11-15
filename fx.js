const form = document.getElementById("fx-form");

form.addEventListener("input", () => {
  document.getElementById("fx-result").value = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  const [currency, unit] = fields.get("unit").split(":");
  const total = Number(fields.get("amount")) * Number(fields.get("rate")) / Number(unit);
  if (!Number.isFinite(total)) return;
  const price = new Intl.NumberFormat("zh-Hant", { maximumFractionDigits: 2 }).format(total);
  document.getElementById("fx-result").value = `${currency} ${price}`;
});

// --- Live rate board (bank-bulletin style, top of homepage) ---
const rateInput = form.querySelector('input[name="rate"]');
const unitSelect = form.querySelector('select[name="unit"]');
let liveRates = null;

function fillRate() {
  if (!liveRates || rateInput.dataset.auto === "0") return;
  const [currency, unit] = unitSelect.value.split(":");
  const per = liveRates[currency];
  if (!per) return;
  rateInput.value = String(Number((per * Number(unit)).toPrecision(6)));
  rateInput.dataset.auto = "1";
}

rateInput.addEventListener("input", () => { rateInput.dataset.auto = "0"; });
unitSelect.addEventListener("change", fillRate);

fetch("https://open.er-api.com/v6/latest/JPY")
  .then((r) => r.json())
  .then((d) => {
    if (d.result !== "success" || !d.rates) throw new Error("rates unavailable");
    liveRates = { TWD: d.rates.TWD, HKD: d.rates.HKD };
    document.getElementById("fx-twd").textContent = (d.rates.TWD * 100).toFixed(2);
    document.getElementById("fx-hkd").textContent = (d.rates.HKD * 100).toFixed(3);
    document.getElementById("fx-usd").textContent = (1 / d.rates.USD).toFixed(2);
    document.getElementById("fx-updated").textContent =
      `更新：${d.time_last_update_utc}｜來源：ExchangeRate-API`;
    fillRate();
  })
  .catch(() => {
    const el = document.getElementById("fx-updated");
    if (el) el.textContent = "即時匯率暫時載入失敗，請用下方銀行連結查牌告匯率後手動輸入。";
  });
