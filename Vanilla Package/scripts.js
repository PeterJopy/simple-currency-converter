// This is to "fetch" and populate the areas for the currency dropdowns
async function fetchCurrencies() {
    try { // This makes an API call to fetch the list of currencies
        const response = await fetch('https://api.coinbase.com/v2/currencies');
        const data = await response.json();  // This converts the response to JSON format
        const currencies = data.data;   // This extracts the array of currency data from the response, rather than populating data variables here manually.
  
        const currencySelect1 = document.getElementById('currency1');  // These are references to the dropdown elements for currency selection
        const currencySelect2 = document.getElementById('currency2');
  
        // This populates both dropdowns with currency options
        currencies.forEach(currency => {
            const option1 = document.createElement('option');    // This ensures it shows an "option element" for the first dropdown as the currency ID
            option1.value = currency.id;
            option1.text = `${currency.id} - ${currency.name}`; // This sets value and text of the option to the currency ID and name in the document according to the API
            
            const option2 = document.createElement('option');  // This creates an option element for the second dropdown
            option2.value = currency.id; // This sets the value and text of the option to the currency ID and name
            option2.text = `${currency.id} - ${currency.name}`; 
  
            currencySelect1.appendChild(option1); // This sets or "appends" the option elements to their respective dropdowns, later for the HTML
            currencySelect2.appendChild(option2);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error); // This will help us with any errors that occur during the fetch process
    }
}

// This will "fetch" the exchange rate from the Coinbase API for the conversion part
async function fetchExchangeRate(baseCurrency, targetCurrency) {
    try {
        const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${baseCurrency}`); // This API call fetches the current exchange rate for the base currency
        const data = await response.json(); // Like before, this convert the response to JSON format
        const rate = data.data.rates[targetCurrency]; // This gets the exchange rate for the target currency from the response
        return rate; // "Return" to us the fetched exchange rate from the response
    } catch (error) { // This will help us with any errors that occur during the fetch process with a "null"
        console.error('Error fetching exchange rate:', error);
        return null;
    }
}

// This section is the conversion portion
async function convertCurrency() { // "Get" the amount entered by the user from the input field, refresh in a way
    const amount = document.getElementById('amount1').value; 
    const baseCurrency = document.getElementById('currency1').value; // "Get" the base currency ID from the first dropdown
    const targetCurrency = document.getElementById('currency2').value; // "Get" the base currency ID from the second dropdown

    if (!amount || !baseCurrency || !targetCurrency) {   // Check if the amount or currencies are not empty
        alert('Please enter a valid amount and select currencies');  // Alert to enter a valid amount and select currencies
        return;
    }

    const rate = await fetchExchangeRate(baseCurrency, targetCurrency); // Fetch the current exchange rate for the selected currencies, both the first and second dropdowns

    if (rate) { // Calculations for the end rate or result
        const convertedAmount = amount * rate;
        document.getElementById('amount2').value = convertedAmount.toFixed(2);
    } else {
        document.getElementById('amount2').value = "Error";
    }
}

// This is for the initial load
fetchCurrencies();

// Various event listeners
document.getElementById('currency1').addEventListener('change', convertCurrency);
document.getElementById('currency2').addEventListener('change', convertCurrency);
document.getElementById('amount1').addEventListener('input', convertCurrency);


// Lightmode and darkmode
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Function to toggle dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    // This updates the icon based on the current mode
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '🌙'; // Moon icon for dark mode
    } else {
        themeIcon.textContent = '🌞'; // Sun icon for light mode
    }
}

// Event listener only for the toggle button
themeToggle.addEventListener('click', toggleTheme);
