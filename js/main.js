(function(){
"use strict"

    //change this so it goes out in divs instead of table. ID's do not need to be displayed.
function renderCoffee(coffee) {
    let html = '<div class="coffee">'
    html += '<h2 class="coffeeName">' + coffee.name + '</h2>' + ' ' + '<p class="roastLevel">' + coffee.roast + '</p>' ;
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    // switch this to go from id 1-end rather than end-1 as it is now
    for(let i = 0 ; i <= coffees.length - 1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}


// "e" stands for event here. Change event is preferred for the drop down select. Also for the search, probably keyup event
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    //selected roast is what they're looking for and entering in the search or the filter field.
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let tbody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

})();