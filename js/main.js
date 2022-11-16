(function () {
    "use strict"


    function searchCoffees(searchInput) {
        searchInput.preventDefault();
        let coffeeSearch = coffeeSelection.value;
        let filteredCoffees = [];
        coffees.forEach(function (coffee) {
            let coffeeNameLower = coffee.name.toLowerCase();
            coffeeSearch = coffeeSearch.toLowerCase();
            if (coffeeNameLower.includes(coffeeSearch)) {
                filteredCoffees.push(coffee);
            }

        });
        tbody.innerHTML = renderCoffees(filteredCoffees);
    }


    function renderCoffee(coffee) {
        let html = '<div class="coffee">'
        html += '<h2 class="coffeeName fs-5">' + coffee.name + '</h2>' + ' ' + '<p class="roastLevel text-muted fs-6 fw-bolder">' + coffee.roast + '</p>';
        html += '</div>';

        return html;
    }

    function renderCoffees(coffees) {
        let html = '';
        for (let i = 0; i <= coffees.length - 1; i++) {
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
        if (selectedRoast === "all roast types") {
            tbody.innerHTML = renderCoffees(coffees);
        } else coffees.forEach(function (coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
            tbody.innerHTML = renderCoffees(filteredCoffees);
        });

    }

    let roastIdNumber = 4;
    let coffeesAddedLight = 0;
    let coffeesAddedMed = 0;
    let coffeesAddedDark = 0;

    function roastId() {
        let lights = 3;
        let mediums = 6;
        let darks = 14;
        if (addCoffeeRoast.value === "light") {
            lights++;
            roastIdNumber = lights + coffeesAddedLight;
        } else if (addCoffeeRoast.value === "medium") {
            mediums++;
            roastIdNumber = mediums + coffeesAddedMed;
        } else if (addCoffeeRoast.value === "dark") {
            darks++;
            roastIdNumber = darks + coffeesAddedDark;
        }
        return roastIdNumber;
    }

    function addCoffee(e) {
        e.preventDefault();
        let newCoffee = {
            id: roastIdNumber,
            name: addCoffeeName.value,
            roast: addCoffeeRoast.value,
        }
        coffees.splice((roastIdNumber) - 1, 0, newCoffee);
        for (let i = roastIdNumber; i <= coffees.length - 1; i++) {
            coffees[i].id++;
        }
        if (addCoffeeRoast.value === "light") {
            coffeesAddedLight++;
            coffeesAddedMed++;
            coffeesAddedDark++;
        } else if (addCoffeeRoast.value === "medium") {
            coffeesAddedMed++;
            coffeesAddedDark++;
        } else if (addCoffeeRoast.value === "dark") {
            coffeesAddedDark++;
        }
        tbody.innerHTML = renderCoffees(coffees);
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
    let roastSelectDropdown = document.querySelector('#roast-selection');
    let roastSelection = document.querySelector('#roast-selection');
    let coffeeSelection = document.querySelector('#coffee-selection');
    let addCoffeeButton = document.querySelector('#submitAdd');
    let addCoffeeName = document.querySelector('#coffee-add-name');
    let addCoffeeRoast = document.querySelector('#roast-add-selection');
    let flyFalconButton = document.querySelector('#flyFalcon')
    let rtbButton = document.querySelector('#rtbButton')

    tbody.innerHTML = renderCoffees(coffees);

    roastSelectDropdown.addEventListener('change', updateCoffees);
    coffeeSelection.addEventListener('keyup', searchCoffees);
    addCoffeeButton.addEventListener('click', roastId);
    addCoffeeButton.addEventListener('click', addCoffee);
    flyFalconButton.addEventListener('click', myMove);
    rtbButton.addEventListener('click', reset);

    //this part is for the animation of the falcon
    let id = null;

    //animation function
    function myMove() {
        let elem = document.getElementById("mFalcon");
        let rotated = document.getElementById('mFalcon');
        let pos = 0;
        rotated.style.transform = 'rotate(90deg)';
        clearInterval(id);
        id = setInterval(frame, 1);

        function frame() {
            if (pos == 1600) {
                clearInterval(id);
            } else {
                pos++;
                elem.style.left = pos + 'px';
            }
        }
    }

    //resetting the function back to starting position
    function reset() {
        let elem = document.getElementById("mFalcon");
        let rotated = document.getElementById('mFalcon');
        rotated.style.transform = 'rotate(0deg)';
        elem.style.left = 0 + 'px';
    }

    //kick off the reset function on page load
    window.onload = function () {
        reset();
    };

})();

