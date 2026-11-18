// Homepage tools i18n (2026-11-18): runtime strings follow the page language.
const PAGELANG = (document.documentElement.lang || "zh-Hant").toLowerCase();
const LKEY = PAGELANG.startsWith("zh-hans") || PAGELANG.startsWith("zh-cn") ? "hans"
  : PAGELANG.startsWith("ja") ? "ja"
  : PAGELANG.startsWith("en") ? "en"
  : PAGELANG.startsWith("vi") ? "vi"
  : PAGELANG.startsWith("th") ? "th"
  : PAGELANG.startsWith("ko") ? "ko"
  : PAGELANG.startsWith("pt") ? "pt" : "hant";
const NUMLOCALE = { hant: "zh-Hant", hans: "zh-Hans", ja: "ja", en: "en", vi: "vi", th: "th", ko: "ko", pt: "pt-BR" }[LKEY];
const T = {
  hant: { yen: "日圓", wx: {0:"晴",1:"晴時多雲",2:"多雲",3:"陰天",45:"霧",48:"霧",51:"毛毛雨",53:"毛毛雨",55:"毛毛雨",61:"小雨",63:"下雨",65:"大雨",66:"凍雨",67:"凍雨",71:"小雪",73:"下雪",75:"大雪",77:"雪",80:"陣雨",81:"陣雨",82:"暴雨",85:"陣雪",86:"陣雪",95:"雷雨",96:"雷雨",99:"雷雨"}, feel: ["很冷","偏冷","舒適","偏熱","炎熱"], cities: ["札幌","東京","名古屋","京都","大阪","福岡","那霸"], more: "看一週預報 ▾", less: "收起 ▴", today: "今天", rain: "雨", weekly: "・一週預報", sep: "・", fxUpd: (u) => `更新：${u}｜來源：ExchangeRate-API`, fxFail: "即時匯率暫時載入失敗", wxFail: "天氣暫時載入失敗", wxUpd: (t) => `更新：${t}（日本時間）` },
  hans: { yen: "日圆", wx: {0:"晴",1:"晴时多云",2:"多云",3:"阴天",45:"雾",48:"雾",51:"毛毛雨",53:"毛毛雨",55:"毛毛雨",61:"小雨",63:"下雨",65:"大雨",66:"冻雨",67:"冻雨",71:"小雪",73:"下雪",75:"大雪",77:"雪",80:"阵雨",81:"阵雨",82:"暴雨",85:"阵雪",86:"阵雪",95:"雷雨",96:"雷雨",99:"雷雨"}, feel: ["很冷","偏冷","舒适","偏热","炎热"], cities: ["札幌","东京","名古屋","京都","大阪","福冈","那霸"], more: "看一周预报 ▾", less: "收起 ▴", today: "今天", rain: "雨", weekly: "・一周预报", sep: "・", fxUpd: (u) => `更新：${u}｜来源：ExchangeRate-API`, fxFail: "即时汇率暂时加载失败", wxFail: "天气暂时加载失败", wxUpd: (t) => `更新：${t}（日本时间）` },
  ja: { yen: "円", wx: {0:"晴れ",1:"晴れ時々曇り",2:"曇り",3:"曇り",45:"霧",48:"霧",51:"霧雨",53:"霧雨",55:"霧雨",61:"小雨",63:"雨",65:"大雨",66:"凍雨",67:"凍雨",71:"小雪",73:"雪",75:"大雪",77:"雪",80:"にわか雨",81:"にわか雨",82:"豪雨",85:"にわか雪",86:"にわか雪",95:"雷雨",96:"雷雨",99:"雷雨"}, feel: ["とても寒い","寒い","快適","暑い","とても暑い"], cities: ["札幌","東京","名古屋","京都","大阪","福岡","那覇"], more: "週間予報を見る ▾", less: "閉じる ▴", today: "今日", rain: "雨", weekly: "・週間予報", sep: "・", fxUpd: (u) => `更新：${u}｜出典：ExchangeRate-API`, fxFail: "為替レートを読み込めませんでした", wxFail: "天気を読み込めませんでした", wxUpd: (t) => `更新：${t}（日本時間）` },
  en: { yen: "yen", wx: {0:"Clear",1:"Mostly sunny",2:"Cloudy",3:"Overcast",45:"Fog",48:"Fog",51:"Drizzle",53:"Drizzle",55:"Drizzle",61:"Light rain",63:"Rain",65:"Heavy rain",66:"Freezing rain",67:"Freezing rain",71:"Light snow",73:"Snow",75:"Heavy snow",77:"Snow",80:"Showers",81:"Showers",82:"Downpour",85:"Snow showers",86:"Snow showers",95:"Thunderstorm",96:"Thunderstorm",99:"Thunderstorm"}, feel: ["Very cold","Chilly","Comfortable","Warm","Hot"], cities: ["Sapporo","Tokyo","Nagoya","Kyoto","Osaka","Fukuoka","Naha"], more: "Weekly forecast ▾", less: "Hide ▴", today: "Today", rain: "Rain", weekly: " — weekly forecast", sep: " · ", fxUpd: (u) => `Updated: ${u} | Source: ExchangeRate-API`, fxFail: "Live rates failed to load", wxFail: "Weather failed to load", wxUpd: (t) => `Updated: ${t} (Japan time)` },
  vi: { yen: "Yên", wx: {0:"Nắng",1:"Nắng có mây",2:"Nhiều mây",3:"U ám",45:"Sương mù",48:"Sương mù",51:"Mưa phùn",53:"Mưa phùn",55:"Mưa phùn",61:"Mưa nhỏ",63:"Mưa",65:"Mưa to",66:"Mưa băng",67:"Mưa băng",71:"Tuyết nhẹ",73:"Tuyết",75:"Tuyết to",77:"Tuyết",80:"Mưa rào",81:"Mưa rào",82:"Mưa xối xả",85:"Mưa tuyết",86:"Mưa tuyết",95:"Dông",96:"Dông",99:"Dông"}, feel: ["Rất lạnh","Se lạnh","Dễ chịu","Ấm","Nóng"], cities: ["Sapporo","Tokyo","Nagoya","Kyoto","Osaka","Fukuoka","Naha"], more: "Xem dự báo tuần ▾", less: "Thu gọn ▴", today: "Hôm nay", rain: "Mưa", weekly: "・Dự báo tuần", sep: " · ", fxUpd: (u) => `Cập nhật: ${u}｜Nguồn: ExchangeRate-API`, fxFail: "Không tải được tỷ giá trực tiếp", wxFail: "Không tải được thời tiết", wxUpd: (t) => `Cập nhật: ${t} (giờ Nhật Bản)` },
  th: { yen: "เยน", wx: {0:"แดดจัด",1:"แดดมีเมฆ",2:"เมฆมาก",3:"ครึ้ม",45:"หมอก",48:"หมอก",51:"ฝนปรอย",53:"ฝนปรอย",55:"ฝนปรอย",61:"ฝนเล็กน้อย",63:"ฝนตก",65:"ฝนตกหนัก",66:"ฝนเยือกแข็ง",67:"ฝนเยือกแข็ง",71:"หิมะเบา",73:"หิมะ",75:"หิมะหนัก",77:"หิมะ",80:"ฝนซู่",81:"ฝนซู่",82:"ฝนห่าใหญ่",85:"หิมะซู่",86:"หิมะซู่",95:"พายุฝนฟ้าคะนอง",96:"พายุฝนฟ้าคะนอง",99:"พายุฝนฟ้าคะนอง"}, feel: ["หนาวมาก","เย็น","สบาย","อุ่น","ร้อนมาก"], cities: ["ซัปโปโระ","โตเกียว","นาโกย่า","เกียวโต","โอซาก้า","ฟูกูโอกะ","นาฮะ"], more: "ดูพยากรณ์รายสัปดาห์ ▾", less: "ย่อ ▴", today: "วันนี้", rain: "ฝน", weekly: "・พยากรณ์รายสัปดาห์", sep: "・", fxUpd: (u) => `อัปเดต: ${u}｜ที่มา: ExchangeRate-API`, fxFail: "โหลดอัตราแลกเปลี่ยนไม่สำเร็จ", wxFail: "โหลดสภาพอากาศไม่สำเร็จ", wxUpd: (t) => `อัปเดต: ${t} (เวลาญี่ปุ่น)` },
  ko: { yen: "엔", wx: {0:"맑음",1:"맑고 가끔 구름",2:"구름 많음",3:"흐림",45:"안개",48:"안개",51:"이슬비",53:"이슬비",55:"이슬비",61:"약한 비",63:"비",65:"강한 비",66:"어는 비",67:"어는 비",71:"약한 눈",73:"눈",75:"폭설",77:"눈",80:"소나기",81:"소나기",82:"폭우",85:"소낙눈",86:"소낙눈",95:"천둥번개",96:"천둥번개",99:"천둥번개"}, feel: ["매우 추움","쌀쌀함","쾌적함","따뜻함","매우 더움"], cities: ["삿포로","도쿄","나고야","교토","오사카","후쿠오카","나하"], more: "주간 예보 보기 ▾", less: "접기 ▴", today: "오늘", rain: "비", weekly: "・주간 예보", sep: "・", fxUpd: (u) => `업데이트: ${u}｜출처: ExchangeRate-API`, fxFail: "실시간 환율을 불러오지 못했어요", wxFail: "날씨를 불러오지 못했어요", wxUpd: (t) => `업데이트: ${t}(일본 시간)` },
  pt: { yen: "ienes", wx: {0:"Ensolarado",1:"Sol com nuvens",2:"Nublado",3:"Encoberto",45:"Nevoeiro",48:"Nevoeiro",51:"Garoa",53:"Garoa",55:"Garoa",61:"Chuva leve",63:"Chuva",65:"Chuva forte",66:"Chuva congelante",67:"Chuva congelante",71:"Neve leve",73:"Neve",75:"Neve forte",77:"Neve",80:"Pancadas",81:"Pancadas",82:"Temporal",85:"Pancadas de neve",86:"Pancadas de neve",95:"Trovoada",96:"Trovoada",99:"Trovoada"}, feel: ["Muito frio","Frio","Agradável","Quente","Muito quente"], cities: ["Sapporo","Tóquio","Nagoya","Quioto","Osaka","Fukuoka","Naha"], more: "Ver previsão da semana ▾", less: "Recolher ▴", today: "Hoje", rain: "Chuva", weekly: " — previsão da semana", sep: " · ", fxUpd: (u) => `Atualizado: ${u} | Fonte: ExchangeRate-API`, fxFail: "Não foi possível carregar as taxas ao vivo", wxFail: "Não foi possível carregar o clima", wxUpd: (t) => `Atualizado: ${t} (horário do Japão)` }
}[LKEY];

const form = document.getElementById("fx-form");

function computeFx() {
  const fields = new FormData(form);
  const total = Number(fields.get("amount")) * Number(fields.get("rate"));
  const out = document.getElementById("fx-result");
  if (!Number.isFinite(total) || total <= 0) { out.value = ""; return; }
  const price = new Intl.NumberFormat(NUMLOCALE, { maximumFractionDigits: 0 }).format(total);
  out.value = `≈ ${price} ${T.yen}`;
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
    const fu = document.getElementById("fx-updated"); if (fu) fu.textContent = T.fxUpd(d.time_last_update_utc);
    fillRate();
  })
  .catch(() => {
    const el = document.getElementById("fx-updated");
    if (el) el.textContent = T.fxFail;
  });
}
loadRates();
setInterval(loadRates, 3600000);

// --- Japan major cities weather (Open-Meteo, refreshes hourly) ---
const WXDESC = T.wx;
const WXCITIES = T.cities;
function loadWeather(){
  fetch("https://api.open-meteo.com/v1/forecast?latitude=43.0618,35.6762,35.1815,35.0116,34.6937,33.5904,26.2124&longitude=141.3545,139.6503,136.9066,135.7681,135.5023,130.4017,127.6809&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7")
    .then((r) => r.json())
    .then((list) => {
      const grid = document.getElementById("wx-grid");
      if (!grid) return;
      const WXICON = {0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",51:"🌦️",53:"🌦️",55:"🌦️",61:"🌧️",63:"🌧️",65:"🌧️",66:"🌧️",67:"🌧️",71:"🌨️",73:"🌨️",75:"🌨️",77:"❄️",80:"🌦️",81:"🌦️",82:"🌧️",85:"🌨️",86:"🌨️",95:"⛈️",96:"⛈️",99:"⛈️"};
      const feel = (t) => t <= 5 ? ["wx-t1",T.feel[0]] : t <= 12 ? ["wx-t2",T.feel[1]] : t <= 20 ? ["wx-t3",T.feel[2]] : t <= 26 ? ["wx-t4",T.feel[3]] : ["wx-t5",T.feel[4]];
      let wxSel = -1;
      const showWeek = (idx) => {
        wxSel = idx;
        const box = document.getElementById("wx-detail");
        if (!box) return;
        const d = list[idx];
        grid.querySelectorAll(".wx-card").forEach((c, j) => { c.setAttribute("aria-expanded", j === idx ? "true" : "false"); const m = c.querySelector(".wx-more"); if (m) m.textContent = j === idx ? T.less : T.more; });
        const rows = d.daily.time.map((day, j) => {
          const dt = new Date(day + "T00:00:00+09:00");
          const code = d.daily.weather_code[j];
          const hi = Math.round(d.daily.temperature_2m_max[j]), lo = Math.round(d.daily.temperature_2m_min[j]);
          const [hcls] = feel(hi);
          const rain = d.daily.precipitation_probability_max[j];
          const wd = new Intl.DateTimeFormat(NUMLOCALE, { weekday: "short", timeZone: "Asia/Tokyo" }).format(dt);
          return `<div class="wx-day"><span class="d-date">${j === 0 ? T.today : wd} ${dt.getMonth() + 1}/${dt.getDate()}</span><span class="d-icon" aria-hidden="true">${WXICON[code] || "🌡️"}</span><span class="d-desc">${WXDESC[code] || ""}</span><span class="d-temp"><b class="${hcls}">${hi}°</b> / ${lo}°</span>${rain != null ? `<span class="d-rain">${T.rain} ${rain}%</span>` : ""}</div>`;
        }).join("");
        box.innerHTML = `<h3>${WXCITIES[idx]}${T.weekly}</h3><div class="wx-days">${rows}</div>`;
      };
      grid.innerHTML = list.map((d, i) => {
        const t = Math.round(d.current.temperature_2m);
        const desc = WXDESC[d.current.weather_code] || "";
        const icon = WXICON[d.current.weather_code] || "🌡️";
        const [cls, feelText] = feel(t);
        const hi0 = Math.round(d.daily.temperature_2m_max[0]), lo0 = Math.round(d.daily.temperature_2m_min[0]);
        const rain = d.daily.precipitation_probability_max[0];
        return `<button type="button" class="wx-card" data-wx="${i}" aria-expanded="false"><span class="wx-top"><span class="wx-icon" aria-hidden="true">${icon}</span><span class="wx-city">${WXCITIES[i]}</span></span><b class="${cls}">${t}°C <span class="wx-desc">${desc}${T.sep}${feelText}</span></b><small>${T.today} ${lo0}–${hi0}°C${rain != null ? `${T.sep}${T.rain} ${rain}%` : ""}</small><span class="wx-more">${T.more}</span></button>`;
      }).join("");
      grid.querySelectorAll(".wx-card").forEach((c) => c.addEventListener("click", () => {
        const idx = Number(c.dataset.wx);
        if (wxSel === idx) {
          wxSel = -1;
          const box = document.getElementById("wx-detail");
          if (box) box.innerHTML = "";
          grid.querySelectorAll(".wx-card").forEach((x) => { x.setAttribute("aria-expanded", "false"); const m = x.querySelector(".wx-more"); if (m) m.textContent = T.more; });
        } else showWeek(idx);
      }));
      const el = document.getElementById("wx-updated");
      if (el) el.textContent = T.wxUpd(new Intl.DateTimeFormat(NUMLOCALE, { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    })
    .catch(() => { const el = document.getElementById("wx-updated"); if (el) el.textContent = T.wxFail; });
}
loadWeather();
setInterval(loadWeather, 3600000);
function tickClock(){
  const el = document.getElementById("jst-clock");
  if (el) el.textContent = new Intl.DateTimeFormat(NUMLOCALE, { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}
tickClock();
setInterval(tickClock, 30000);
