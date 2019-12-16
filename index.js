'use strict';

function retrieveCity() {
    const cityValue = $('#city-entry').val().toLowerCase();
    const url = `https://api.openbrewerydb.org/breweries?by_city=${cityValue}`;
    fetch (url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then (responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function retrieveState() {
    const stateValue = $('#state-entry').val().toLowerCase();
    const url = `https://api.openbrewerydb.org/breweries?by_state=${stateValue}`;
    fetch (url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
         .then (responseJson => displayResults(responseJson))
         .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function retrieveName() {
    const nameValue = $('#name-entry').val().toLowerCase();
    const url = `https://api.openbrewerydb.org/breweries?by_name=${nameValue}`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then (responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++) {
        $('#display-results').append(
            `<h3>${responseJson[i].name}</h3>
            <p>${responseJson[i].street}</p>
            <p>${responseJson[i].city}, ${responseJson[i].state}</p>
            <p>${responseJson[i].brewery_type}</p>
            <p>Phone number: ${responseJson[i].phone}</p>
            <p>Website: ${responseJson[i].website_url}</p>
            <p>${responseJson[i].tag_list}</p>`
        )
    };
}

function beginSearch() {
    $('form').submit(event => {
        event.preventDefault();
        console.clear();
        $('#display-results').html('');
        $('#js-error-message').html('');
        const nameSearch = $('#name-entry').val();
        const stateSeacrh = $('#state-entry').val();
        const citySearch = $('#city-entry').val();
        retrieveName(nameSearch);
        retrieveCity(citySearch);
        retrieveCity(stateSeacrh);
    });
}

$(beginSearch);

