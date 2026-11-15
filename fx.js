const form = document.getElementById("fx-form");

function computeFx() {
  const fields = new FormData(form);
  const total = Number(fields.get("amount")) * Number(fields.get("rate"));
  const out = document.getElementById("fx-result");
  if (!Number.isFinite(total) || total <= 0) { out.value = ""; return; }
  const price = new Intl.NumberFormat("zh-Hant", { maximumFractionDigits: 0 }).format(total);
  out.value = `≈ ${price} 日圓`;
}

form.addEventListener("input", computeFx);
form.addEventListener("submit", (event) => { event.preventDefault(); computeFx(); });

// --- Live rate board (bank-bulletin style, top of homepage) ---
const rateInput = form.querySelector('input[name="rate"]');
const ccySelect = form.querySelector('select[name="ccy"]');
let liveRates = null;

function fillRate() {
  if (!liveRates || rateInput.dataset.auto === "0") return;
  const per = liveRates[ccySelect.value];
  if (!per) return;
  rateInput.value = String(Number((1 / per).toPrecision(4)));
  rateInput.dataset.auto = "1";
  computeFx();
}

rateInput.addEventListener("input", () => { rateInput.dataset.auto = "0"; });
ccySelect.addEventListener("change", () => { rateInput.dataset.auto = "1"; fillRate(); });

function loadRates(){
fetch("https://open.er-api.com/v6/latest/JPY")
  .then((r) => r.json())
  .then((d) => {
    if (d.result !== "success" || !d.rates) throw new Error("rates unavailable");
    liveRates = { TWD: d.rates.TWD, HKD: d.rates.HKD };
    document.getElementById("fx-twd").textContent = (1 / d.rates.TWD).toFixed(2);
    document.getElementById("fx-hkd").textContent = (1 / d.rates.HKD).toFixed(2);
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

// --- Japan major cities weather (Open-Meteo, refreshes hourly) ---
const WXDESC = {0:"晴",1:"晴時多雲",2:"多雲",3:"陰天",45:"霧",48:"霧",51:"毛毛雨",53:"毛毛雨",55:"毛毛雨",61:"小雨",63:"下雨",65:"大雨",66:"凍雨",67:"凍雨",71:"小雪",73:"下雪",75:"大雪",77:"雪",80:"陣雨",81:"陣雨",82:"暴雨",85:"陣雪",86:"陣雪",95:"雷雨",96:"雷雨",99:"雷雨"};
const WXCITIES = ["札幌","東京","名古屋","京都","大阪","福岡","那霸"];
function loadWeather(){
  fetch("https://api.open-meteo.com/v1/forecast?latitude=43.0618,35.6762,35.1815,35.0116,34.6937,33.5904,26.2124&longitude=141.3545,139.6503,136.9066,135.7681,135.5023,130.4017,127.6809&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=2")
    .then((r) => r.json())
    .then((list) => {
      const grid = document.getElementById("wx-grid");
      if (!grid) return;
      grid.innerHTML = list.map((d, i) => {
        const t = Math.round(d.current.temperature_2m);
        const desc = WXDESC[d.current.weather_code] || "";
        const hi0 = Math.round(d.daily.temperature_2m_max[0]), lo0 = Math.round(d.daily.temperature_2m_min[0]);
        const hi1 = Math.round(d.daily.temperature_2m_max[1]), lo1 = Math.round(d.daily.temperature_2m_min[1]);
        const rain = d.daily.precipitation_probability_max[0];
        return `<div class="wx-card"><span class="wx-city">${WXCITIES[i]}</span><b>${t}°C ${desc}</b><small>今日 ${lo0}–${hi0}°C${rain != null ? "・雨 " + rain + "%" : ""}</small><small>明日 ${lo1}–${hi1}°C</small></div>`;
      }).join("");
      const el = document.getElementById("wx-updated");
      if (el) el.textContent = "更新：" + new Intl.DateTimeFormat("zh-Hant", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()) + "（日本時間）";
    })
    .catch(() => { const el = document.getElementById("wx-updated"); if (el) el.textContent = "天氣暫時載入失敗"; });
}
loadWeather();
setInterval(loadWeather, 3600000);
function tickClock(){
  const el = document.getElementById("jst-clock");
  if (el) el.textContent = new Intl.DateTimeFormat("zh-Hant", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}
tickClock();
setInterval(tickClock, 30000);
