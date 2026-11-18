const form = document.getElementById("fx-form");

function computeFx() {
  const fields = new FormData(form);
  const total = Number(fields.get("amount")) * Number(fields.get("rate"));
  const out = document.getElementById("fx-result");
  if (!Number.isFinite(total) || total <= 0) { out.value = ""; return; }
  const price = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(total);
  out.value = `≈ ${price} 엔`;
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
    liveRates = { TWD: d.rates.TWD, HKD: d.rates.HKD, CNY: d.rates.CNY };
    document.getElementById("fx-twd").textContent = (1 / d.rates.TWD).toFixed(2);
    document.getElementById("fx-hkd").textContent = (1 / d.rates.HKD).toFixed(2);
    document.getElementById("fx-usd").textContent = (1 / d.rates.USD).toFixed(2);
    document.getElementById("fx-cny").textContent = (1 / d.rates.CNY).toFixed(2);
    const fu = document.getElementById("fx-updated"); if (fu) fu.textContent = `更新：${d.time_last_update_utc}｜출처: ExchangeRate-API`;
    fillRate();
  })
  .catch(() => {
    const el = document.getElementById("fx-updated");
    if (el) el.textContent = "실시간 환율을 일시적으로 불러오지 못했어요";
  });
}
loadRates();
setInterval(loadRates, 3600000);

// --- Japan major cities weather (Open-Meteo, refreshes hourly) ---
const WXDESC = {0:"晴",1:"대체로 맑음",2:"구름 많음",3:"흐림",45:"霧",48:"霧",51:"이슬비",53:"이슬비",55:"이슬비",61:"小雨",63:"비",65:"大雨",66:"얼어붙는 비",67:"얼어붙는 비",71:"小雪",73:"눈",75:"大雪",77:"雪",80:"소나기",81:"소나기",82:"폭우",85:"소낙눈",86:"소낙눈",95:"雷雨",96:"雷雨",99:"雷雨"};
const WXCITIES = ["札幌","東京","名古屋","京都","大阪","福岡","那霸"];
function loadWeather(){
  fetch("https://api.open-meteo.com/v1/forecast?latitude=43.0618,35.6762,35.1815,35.0116,34.6937,33.5904,26.2124&longitude=141.3545,139.6503,136.9066,135.7681,135.5023,130.4017,127.6809&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7")
    .then((r) => r.json())
    .then((list) => {
      const grid = document.getElementById("wx-grid");
      if (!grid) return;
      const WXICON = {0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",51:"🌦️",53:"🌦️",55:"🌦️",61:"🌧️",63:"🌧️",65:"🌧️",66:"🌧️",67:"🌧️",71:"🌨️",73:"🌨️",75:"🌨️",77:"❄️",80:"🌦️",81:"🌦️",82:"🌧️",85:"🌨️",86:"🌨️",95:"⛈️",96:"⛈️",99:"⛈️"};
      const feel = (t) => t <= 5 ? ["wx-t1","매우 추움"] : t <= 12 ? ["wx-t2","쌀쌀함"] : t <= 20 ? ["wx-t3","쾌적함"] : t <= 26 ? ["wx-t4","조금 더움"] : ["wx-t5","매우 더움"];
      const WD = ["일","월","화","수","목","금","토"];
      let wxSel = -1;
      const showWeek = (idx) => {
        wxSel = idx;
        const box = document.getElementById("wx-detail");
        if (!box) return;
        const d = list[idx];
        grid.querySelectorAll(".wx-card").forEach((c, j) => { c.setAttribute("aria-expanded", j === idx ? "true" : "false"); const m = c.querySelector(".wx-more"); if (m) m.textContent = j === idx ? "접기 ▴" : "看주간 예보 ▾"; });
        const rows = d.daily.time.map((day, j) => {
          const dt = new Date(day + "T00:00:00+09:00");
          const code = d.daily.weather_code[j];
          const hi = Math.round(d.daily.temperature_2m_max[j]), lo = Math.round(d.daily.temperature_2m_min[j]);
          const [hcls] = feel(hi);
          const rain = d.daily.precipitation_probability_max[j];
          return `<div class="wx-day"><span class="d-date">${j === 0 ? "오늘" : WD[dt.getDay()] + "요일"} ${dt.getMonth() + 1}/${dt.getDate()}</span><span class="d-icon" aria-hidden="true">${WXICON[code] || "🌡️"}</span><span class="d-desc">${WXDESC[code] || ""}</span><span class="d-temp"><b class="${hcls}">${hi}°</b> / ${lo}°</span>${rain != null ? `<span class="d-rain">雨 ${rain}%</span>` : ""}</div>`;
        }).join("");
        box.innerHTML = `<h3>${WXCITIES[idx]}・주간 예보</h3><div class="wx-days">${rows}</div>`;
      };
      grid.innerHTML = list.map((d, i) => {
        const t = Math.round(d.current.temperature_2m);
        const desc = WXDESC[d.current.weather_code] || "";
        const icon = WXICON[d.current.weather_code] || "🌡️";
        const [cls, feelText] = feel(t);
        const hi0 = Math.round(d.daily.temperature_2m_max[0]), lo0 = Math.round(d.daily.temperature_2m_min[0]);
        const rain = d.daily.precipitation_probability_max[0];
        return `<button type="button" class="wx-card" data-wx="${i}" aria-expanded="false"><span class="wx-top"><span class="wx-icon" aria-hidden="true">${icon}</span><span class="wx-city">${WXCITIES[i]}</span></span><b class="${cls}">${t}°C <span class="wx-desc">${desc}・${feelText}</span></b><small>今日 ${lo0}–${hi0}°C${rain != null ? "・雨 " + rain + "%" : ""}</small><span class="wx-more">看주간 예보 ▾</span></button>`;
      }).join("");
      grid.querySelectorAll(".wx-card").forEach((c) => c.addEventListener("click", () => {
        const idx = Number(c.dataset.wx);
        if (wxSel === idx) {
          wxSel = -1;
          const box = document.getElementById("wx-detail");
          if (box) box.innerHTML = "";
          grid.querySelectorAll(".wx-card").forEach((x) => { x.setAttribute("aria-expanded", "false"); const m = x.querySelector(".wx-more"); if (m) m.textContent = "看주간 예보 ▾"; });
        } else showWeek(idx);
      }));
      const el = document.getElementById("wx-updated");
      if (el) el.textContent = "更新：" + new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()) + "（日本時間）";
    })
    .catch(() => { const el = document.getElementById("wx-updated"); if (el) el.textContent = "날씨를 일시적으로 불러오지 못했어요"; });
}
loadWeather();
setInterval(loadWeather, 3600000);
function tickClock(){
  const el = document.getElementById("jst-clock");
  if (el) el.textContent = new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}
tickClock();
setInterval(tickClock, 30000);
