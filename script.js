const renderRateItemList = (currency, value) => {
    const currencyList = document.getElementById('currency-list');
    const li = document.createElement('li');
    li.innerText = `${currency}: ${value}`
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
    renderRates(object.rates)
}

const setupHtmlElements = () => {
   const searchButton = document.getElementById('search-button');
   searchButton.addEventListener('click', handleSearchEvent);
};

window.onload = () => {
    setupHtmlElements();
};