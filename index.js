'use strict';

const searchURL = 'https://api.openbrewerydb.org/breweries';

const mapURL = 'https://www.google.com/maps/search/?api=1&query=';

function retrieveResults() {
    const cityValue = $('#city-entry').val().toLowerCase();
    const stateValue = $('#state-entry').val().toLowerCase();
    const url = searchURL + '?by_city=' + `${cityValue}` + '&by_state=' + `${stateValue}` + '&per_page=50';
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
    })
}

function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.length === 0) {
        $('#display-results').append(`<h3>No Breweries were found in this city</h3>`)
        return
    }
    for (let i = 0; i < responseJson.length; i++) {
        $('#display-results').append(
            `<h3>${responseJson[i].name}</h3>
            <ul>
            <li><a href="${mapURL}${responseJson[i].name}" target="_blank">${responseJson[i].street}, ${responseJson[i].city}, ${responseJson[i].state}</a></li>
            <li>Brewery type: ${responseJson[i].brewery_type}</li>
            <li>Phone number: ${responseJson[i].phone}</li>
            <li>Website: <a href="${responseJson[i].website_url}" target="_blank">${responseJson[i].website_url}</a></li>
            </ul>`
        )
    };
}

function beginSearch() {
    $('form').submit(event => {
        event.preventDefault();
        console.clear();
        $('#display-results').html('');
        $('#js-error-message').html('');
        const citySearch = $('#city-entry').val();
        const stateSearch = $('#state-entry').val();
        retrieveResults(citySearch, stateSearch);
    });
}

$(beginSearch);
