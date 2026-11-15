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

function loadRates(){
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
    if (el) el.textContent = "即時匯率暫時載入失敗";
  });
}
loadRates();
setInterval(loadRates, 3600000);

// --- Tokyo weather (Open-Meteo, refreshes hourly) + JST clock ---
const WXDESC = {0:"晴",1:"晴時多雲",2:"多雲",3:"陰天",45:"霧",48:"霧",51:"毛毛雨",53:"毛毛雨",55:"毛毛雨",61:"小雨",63:"下雨",65:"大雨",66:"凍雨",67:"凍雨",71:"小雪",73:"下雪",75:"大雪",77:"雪",80:"陣雨",81:"陣雨",82:"暴雨",85:"陣雪",86:"陣雪",95:"雷雨",96:"雷雨",99:"雷雨"};
function loadWeather(){
  fetch("https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo")
    .then((r) => r.json())
    .then((d) => {
      document.getElementById("wx-tokyo").textContent = Math.round(d.current.temperature_2m) + "°C " + (WXDESC[d.current.weather_code] || "");
      document.getElementById("wx-tokyo-sub").textContent = "今日 " + Math.round(d.daily.temperature_2m_min[0]) + "–" + Math.round(d.daily.temperature_2m_max[0]) + "°C";
    })
    .catch(() => { const el = document.getElementById("wx-tokyo-sub"); if (el) el.textContent = "暫時載入失敗"; });
}
loadWeather();
setInterval(loadWeather, 3600000);
function tickClock(){
  const el = document.getElementById("jst-clock");
  if (el) el.textContent = new Intl.DateTimeFormat("zh-Hant", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}
tickClock();
setInterval(tickClock, 30000);
