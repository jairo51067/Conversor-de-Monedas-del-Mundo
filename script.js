// Claves de API
const apiKeyExchangeRate = "f390895452a9366a9eeff7c3"; // Reemplaza con tu propia clave de API

// Mapa de monedas con sus nombres y banderas
const currencyData = {
  USD: { name: "Dólar estadounidense", flag: "https://flagcdn.com/us.svg" },
  EUR: { name: "Euro", flag: "https://flagcdn.com/eu.svg" },
  GBP: { name: "Libra esterlina", flag: "https://flagcdn.com/gb.svg" },
  JPY: { name: "Yen japonés", flag: "https://flagcdn.com/jp.svg" },
  AUD: { name: "Dólar australiano", flag: "https://flagcdn.com/au.svg" },
  CAD: { name: "Dólar canadiense", flag: "https://flagcdn.com/ca.svg" },
  CHF: { name: "Franco suizo", flag: "https://flagcdn.com/ch.svg" },
  CNY: { name: "Yuan chino", flag: "https://flagcdn.com/cn.svg" },
  HKD: { name: "Dólar de Hong Kong", flag: "https://flagcdn.com/hk.svg" },
  NZD: { name: "Dólar neozelandés", flag: "https://flagcdn.com/nz.svg" },
  SEK: { name: "Corona sueca", flag: "https://flagcdn.com/se.svg" },
  KRW: { name: "Won surcoreano", flag: "https://flagcdn.com/kr.svg" },
  SGD: { name: "Dólar singapurense", flag: "https://flagcdn.com/sg.svg" },
  NOK: { name: "Corona noruega", flag: "https://flagcdn.com/no.svg" },
  MXN: { name: "Peso mexicano", flag: "https://flagcdn.com/mx.svg" },
  INR: { name: "Rupia india", flag: "https://flagcdn.com/in.svg" },
  RUB: { name: "Rublo ruso", flag: "https://flagcdn.com/ru.svg" },
  ZAR: { name: "Rand sudafricano", flag: "https://flagcdn.com/za.svg" },
  BRL: { name: "Real brasileño", flag: "https://flagcdn.com/br.svg" },
  TRY: { name: "Lira turca", flag: "https://flagcdn.com/tr.svg" },
  VES: { name: "Bolívar venezolano", flag: "https://flagcdn.com/ve.svg" },
  ARS: { name: "Peso argentino", flag: "https://flagcdn.com/ar.svg" },
  CLP: { name: "Peso chileno", flag: "https://flagcdn.com/cl.svg" },
  COP: { name: "Peso colombiano", flag: "https://flagcdn.com/co.svg" },
  PEN: { name: "Sol peruano", flag: "https://flagcdn.com/pe.svg" },
  UYU: { name: "Peso uruguayo", flag: "https://flagcdn.com/uy.svg" },
  DKK: { name: "Corona danesa", flag: "https://flagcdn.com/dk.svg" },
  PLN: { name: "Złoty polaco", flag: "https://flagcdn.com/pl.svg" },
  THB: { name: "Baht tailandés", flag: "https://flagcdn.com/th.svg" },
  IDR: { name: "Rupia indonesia", flag: "https://flagcdn.com/id.svg" },
  MYR: { name: "Ringgit malasio", flag: "https://flagcdn.com/my.svg" },
  PHP: { name: "Peso filipino", flag: "https://flagcdn.com/ph.svg" },
  AED: {
    name: "Dirham de los Emiratos Árabes Unidos",
    flag: "https://flagcdn.com/ae.svg",
  },
  SAR: { name: "Riyal saudí", flag: "https://flagcdn.com/sa.svg" },
  EGP: { name: "Libra egipcia", flag: "https://flagcdn.com/eg.svg" },
  PKR: { name: "Rupia pakistaní", flag: "https://flagcdn.com/pk.svg" },
  NGN: { name: "Naira nigeriano", flag: "https://flagcdn.com/ng.svg" },
  KES: { name: "Chelín keniano", flag: "https://flagcdn.com/ke.svg" },
  GHS: { name: "Cedi ghanés", flag: "https://flagcdn.com/gh.svg" },
  IQD: { name: "Dinar iraquí", flag: "https://flagcdn.com/iq.svg" },
  LKR: { name: "Rupia de Sri Lanka", flag: "https://flagcdn.com/lk.svg" },
  BDT: { name: "Taka bangladesí", flag: "https://flagcdn.com/bd.svg" },
  IRR: { name: "Rial iraní", flag: "https://flagcdn.com/ir.svg" },
  KWD: { name: "Dinar kuwaití", flag: "https://flagcdn.com/kw.svg" },
  VND: { name: "Dong vietnamita", flag: "https://flagcdn.com/vn.svg" },
  MAD: { name: "Dírham marroquí", flag: "https://flagcdn.com/ma.svg" },
  XAF: {
    name: "Franco CFA de África Central",
    flag: "https://flagcdn.com/cm.svg",
  },
  XOF: {
    name: "Franco CFA de África Occidental",
    flag: "https://flagcdn.com/sn.svg",
  },
  CZK: { name: "Corona checa", flag: "https://flagcdn.com/cz.svg" },
  HUF: { name: "Forinto húngaro", flag: "https://flagcdn.com/hu.svg" },
  ISK: { name: "Corona islandesa", flag: "https://flagcdn.com/is.svg" },
  BGN: { name: "Lev búlgaro", flag: "https://flagcdn.com/bg.svg" },
  RON: { name: "Leu rumano", flag: "https://flagcdn.com/ro.svg" },
  HRK: { name: "Kuna croata", flag: "https://flagcdn.com/hr.svg" },
};

// Elementos del DOM
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const resultParagraph = document.getElementById("result");
const refreshButton = document.getElementById("refresh");
const historyList = document.getElementById("history-list");
const themeToggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Verificar si hay un tema guardado en localStorage
document.addEventListener("DOMContentLoaded", async () => {
  applyStoredTheme();
  await loadCurrencies(); // Cargar las monedas al cargar la página
});

// Cambiar tema (oscuro/claro)
themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Aplicar tema guardado
function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
}

// Conversión de moneda
document
  .getElementById("currency-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = amountInput.value;
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    if (amount && fromCurrency && toCurrency) {
      const conversionRate = await getConversionRate(fromCurrency, toCurrency);
      if (conversionRate) {
        const convertedAmount = (amount * conversionRate).toFixed(2);
        resultParagraph.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        addToHistory(
          `${amount} ${fromCurrency} → ${convertedAmount} ${toCurrency}`
        );
      } else {
        resultParagraph.textContent =
          "La moneda de origen o destino no está soportada.";
      }
    } else {
      resultParagraph.textContent = "Por favor, completa todos los campos.";
    }
  });

// Añadir historial de conversiones
function addToHistory(conversion) {
  const historyItem = document.createElement("li");
  historyItem.textContent = conversion;
  historyList.appendChild(historyItem);
}

// Actualizar tasas de conversión
refreshButton.addEventListener("click", async () => {
  await loadCurrencies();
  resultParagraph.textContent = "Tasas de conversión actualizadas.";
});

// Cargar monedas desde la API
// Función para cargar las monedas en los select con banderas y nombres completos
async function loadCurrencies() {
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    currencies.forEach((currency) => {
      if (currencyData[currency]) {
        const { name, flag } = currencyData[currency];

        const fromOption = document.createElement("option");
        fromOption.value = currency;
        fromOption.innerHTML = `<img src="${flag}" alt="${currency}" style="width: 20px; height: 14px;"/> ${name} (${currency})`;
        fromSelect.appendChild(fromOption);

        const toOption = document.createElement("option");
        toOption.value = currency;
        toOption.innerHTML = `<img src="${flag}" alt="${currency}" style="width: 20px; height: 14px;"/> ${name} (${currency})`;
        toSelect.appendChild(toOption);
      }
    });
    fromSelect.value = "USD"; // Valor por defecto
    toSelect.value = "EUR";
  } catch (error) {
    console.error("Error al cargar las monedas:", error);
    resultParagraph.textContent =
      "Error al cargar las monedas. Intenta de nuevo más tarde.";
  }
}

// Llamar a loadCurrencies cuando la página esté lista
document.addEventListener("DOMContentLoaded", loadCurrencies);

// Obtener tasa de conversión entre dos monedas
async function getConversionRate(from, to) {
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    return data.rates[to] || null;
  } catch (error) {
    console.error("Error al obtener la tasa de conversión:", error);
    resultParagraph.textContent =
      "Error al obtener la tasa de conversión. Intenta de nuevo más tarde.";
    return null;
  }
}

// Llamar a las funciones para obtener datos al cargar la página
window.onload = function () {
  loadCurrencies();
};
