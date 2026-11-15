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
