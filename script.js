const CHACHE_KEY = 'CURRENCY_LIST'

const clearCurrencyInput = () => {
    const currencyInputElement = document.getElementById('currency-input');
    currencyInputElement.value = '';
}

const clearList = () => {
    const currencyList = document.getElementById('currency-list');
    currencyList.innerHTML = '';
}

const renderBaseCurrencyTitle = (base) => {
    const baseTilte = document.getElementById('title-base');
    baseTilte.innerHTML = `Valores referentes a: 1 ${base}`;
}

const renderRateItemList = (currency, value) => {
    const currencyList = document.getElementById('currency-list');
    const fixedValue = value.toFixed(2);
    const li = document.createElement('li');
    li.innerHTML = `<strong>${currency}:</strong> ${fixedValue}`
    currencyList.appendChild(li)
}

const renderRates = (rates) => {
    const rateEntries = Object.entries(rates);
    rateEntries.forEach((entry) => {
        const [currency, value] = entry;
        renderRateItemList(currency, value);
    })
}

const handleSearchEvent = async () => {
    const currencyElement = document.getElementById('currency-input');
    const currencyValue = currencyElement.value;
    
    if (currencyValue === '') {
        alert('Preencha o campo de pesquisa!');
        return;
    }

    const object = await fetchExchangeRates(currencyValue);
    localStorage.setItem(CHACHE_KEY, JSON.stringify(object))

    clearList();
    renderRates(object.rates)
    renderBaseCurrencyTitle(object.base)
    clearCurrencyInput();
}

const setupHtmlElements = () => {
   const searchButton = document.getElementById('search-button');
   searchButton.addEventListener('click', handleSearchEvent);
};

window.onload = () => {
    setupHtmlElements();

    const object = JSON.parse(localStorage.getItem(CHACHE_KEY));
    if (object) {
        const { base, rates } = object
        renderRates(rates);
        renderBaseCurrencyTitle(base);
    }
};