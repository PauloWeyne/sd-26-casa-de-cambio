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
    
    const object = await fetchExchangeRates(currencyValue);

    clearList();
    renderRates(object.rates)
    renderBaseCurrencyTitle(object.base)
}

const setupHtmlElements = () => {
   const searchButton = document.getElementById('search-button');
   searchButton.addEventListener('click', handleSearchEvent);
};

window.onload = () => {
    setupHtmlElements();
};