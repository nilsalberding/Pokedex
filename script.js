/**
 * Represents a Pokemon with various attributes and methods to initialize its properties.
 *
 * @class
 * @property {string} name - The capitalized name of the Pokemon.
 * @property {string} nameLowerCase - The lowercase name of the Pokemon.
 * @property {string} spriteSrc - The URL of the primary sprite image.
 * @property {string} spriteSrcScnd - The URL of the secondary sprite image.
 * @property {number} id - The unique identifier for the Pokemon.
 * @property {string[]} types - The types of the Pokemon (e.g., 'fire', 'water').
 * @property {Object} stats - The stats of the Pokemon.
 * @property {number} stats.hp - Hit points.
 * @property {number} stats.attack - Attack stat.
 * @property {number} stats.defense - Defense stat.
 * @property {number} stats.special_attack - Special attack stat.
 * @property {number} stats.special_defense - Special defense stat.
 * @property {number} stats.speed - Speed stat.
 * @property {string[]} abilities - The abilities of the Pokemon.
 * @property {number} weight - The weight of the Pokemon.
 * @property {string} height - The height of the Pokemon in centimeters.
 * @property {number} arrayIndex - The zero-based index of the Pokemon in an array.
 *
 * @constructor
 * @param {Object} params - The parameters for initializing a Pokemon.
 * @param {string} params.pName - The name of the Pokemon.
 * @param {string} params.pSpriteSrc - The primary sprite source URL.
 * @param {string} params.pSpriteSrcScnd - The secondary sprite source URL.
 * @param {number} params.pIndex - The unique identifier for the Pokemon.
 * @param {Array} params.pTypes - The types of the Pokemon.
 * @param {Array} params.pStats - The stats array for the Pokemon.
 * @param {Array} params.pAbilities - The abilities array for the Pokemon.
 * @param {number} params.pWeight - The weight of the Pokemon.
 * @param {number} params.pHeight - The height of the Pokemon.
 */
class Pokemon {
    // #region attributes

    name;
    nameLowerCase;
    spriteSrc;
    spriteSrcScnd;
    id;
    types = [];
    stats = {
        "hp": 0,
        "attack": 0,
        "defense": 0,
        "special_attack": 0,
        "special_defense": 0,
        "speed": 0
    };
    abilities = [];
    weight;
    height;
    arrayIndex;
    text;
    
    // #endregion

    constructor({ pName, pSpriteSrc, pSpriteSrcScnd, pIndex, pTypes, pStats, pAbilities, pWeight, pHeight, pText}) {
        this.spriteSrc = pSpriteSrc;
        this.spriteSrcScnd = pSpriteSrcScnd;
        this.id = pIndex;
        this.weight = pWeight;
        this.nameLowerCase = pName;
        

        this.getAbilities(pAbilities);
        this.getStats(pStats);
        this.getTypes(pTypes);
        this.getUpperName(pName);
        this.getArrayIndex(pIndex);
        this.getHeight(pHeight);
        this.getText(pText);
    }

    // #region methods

    getStats(pokeStats) {
        this.stats.hp = pokeStats[0].base_stat;
        this.stats.attack = pokeStats[1].base_stat;
        this.stats.defense = pokeStats[2].base_stat;
        this.stats.special_attack = pokeStats[3].base_stat;
        this.stats.special_defense = pokeStats[4].base_stat;
        this.stats.speed = pokeStats[5].base_stat;
    }

    getAbilities(pokeAbilities) {
        for (let i = 0; i < pokeAbilities.length; i++) {
            this.abilities.push(pokeAbilities[i].ability.name);
        }
    }

    getTypes(pokeTypes) {
        for (let i = 0; i < pokeTypes.length; i++) {
            this.types.push(pokeTypes[i].type.name);
        }
    }

    getUpperName(pName) {
        const word = pName;
        this.name = word.charAt(0).toUpperCase() + word.slice(1);
    }

    getArrayIndex(pIndex) {
        this.arrayIndex = pIndex - 1;
    }

    getHeight(pHeight) {
        this.height = pHeight * 10 + ' cm'
    }

    getText(pText) {
        const newText = pText.replace(/\n/g, ' ');
        this.text = newText.replace(/\f/g,'')
    }
    // #endregion
}



const pokeArray = [];
let baseStatsActive = false;

/**
 * Fetches a batch of Pokémon data from the PokéAPI and adds them to the global `pokeArray`.
 * The function loads 25 Pokémon starting from the current length of `pokeArray` + 1, up to a maximum of 151 Pokémon.
 * Displays a loading spinner during the fetch process and renders the updated card section after loading.
 *
 * @async
 * @function
 * @returns {Promise<void>} Resolves when all Pokémon data has been fetched and rendered.
 */
async function getPokemonFromApi() {
    const arrayLength = pokeArray.length + 1;// angelegt für den loadmore button

    showLoadingSpinner();

    for (let i = arrayLength; i <= arrayLength + 24; i++) {        // 
        if (i <= 151) {
            const pokeResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
            const pokeJson = await pokeResponse.json();
            const pokeTextResponse = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + i);
            const pokeText = await pokeTextResponse.json();

            pokeArray.push(new Pokemon({ 
                pAbilities: pokeJson.abilities, 
                pName: pokeJson.name, 
                pHeight: pokeJson.height, 
                pIndex: i, 
                pSpriteSrc: pokeJson['sprites']['front_default'], 
                pSpriteSrcScnd: pokeJson['sprites']['other']['official-artwork']['front_default'], 
                pStats: pokeJson.stats, 
                pTypes: pokeJson.types, 
                pWeight: pokeJson.weight,
                pText: pokeText.flavor_text_entries[0].flavor_text
            }));
        }
    }
    endLoadingSpinner();
    renderCardSection(pokeArray);
}

/**
 * Renders a section of cards based on the provided array of Pokémon data.
 * Clears the existing card section and appends new cards for each item in the array.
 * Also renders the types for each Pokémon.
 *
 * @param {Array<Object>} array - An array of Pokémon objects, each containing:
 *   @property {string} spriteSrc - The source URL for the Pokémon's sprite image.
 *   @property {number|string} id - The unique identifier for the Pokémon.
 *   @property {string} name - The name of the Pokémon.
 *   @property {Array<string>} types - An array of type names for the Pokémon.
 */
function renderCardSection(array) {
    const cardSectionRef = document.getElementById('cards');
    cardSectionRef.innerHTML = "";

    for (let i = 0; i < array.length; i++) {

        cardSectionRef.innerHTML += getCard({
            spriteSrc: array[i].spriteSrc,
            id: array[i].id,
            name: array[i].name,
            index: i,
            type: array[i].types[0]
        });

        renderTypes(i, array);
    }
}

/**
 * Renders the types of a Pokémon at the specified index from the given array.
 * Appends the HTML representation of each type to the element with id 'types{index}'.
 *
 * @param {number} index - The index of the Pokémon in the array.
 * @param {Array} array - The array containing Pokémon objects, each with a 'types' property.
 */
function renderTypes(index, array) {
    for (let j = 0; j < array[index].types.length; j++) {

        const typeRef = document.getElementById('types' + index);

        typeRef.innerHTML += getTypes(array[index].types[j]);
    }
}

// #region overlay-ansicht erstellen

/**
 * Displays the card view overlay for a specific item by index.
 * Toggles the visibility of the overlay, disables body scrolling,
 * and renders the card view and its types.
 *
 * @param {number} index - The index of the item to display in the card view.
 */
function showCardView(index) {
    const CardViewRef = document.getElementById('overlay');
    CardViewRef.classList.toggle('d-flex');
    document.body.classList.add('no-scroll');

    renderCardView(index);
    renderTypesCardView(index);
}

/**
 * Renders the detailed card view of a Pokémon at the specified index.
 * Updates the inner HTML of the element with id 'overlay' using the card view template.
 *
 * @param {number} index - The index of the Pokémon in the pokeArray to render.
 */
function renderCardView(index) {
    const CardViewRef = document.getElementById('overlay');

    CardViewRef.innerHTML = getCardView({
        typeOne: pokeArray[index].types[0],
        name: pokeArray[index].name,
        id: pokeArray[index].id,
        spriteSrc: pokeArray[index].spriteSrcScnd,
        abilitieOne: pokeArray[index].abilities[0],
        abilitieTwo: pokeArray[index].abilities[1],
        height: pokeArray[index].height,
        index: index,
        weight: pokeArray[index].weight
    });

}

/**
 * Renders the types of a Pokémon in card view by updating the inner HTML of the type container.
 * Iterates through all types of the Pokémon at the specified index in the `pokeArray`
 * and appends the corresponding type HTML using `getTypes`.
 *
 * @param {number} index - The index of the Pokémon in the `pokeArray` whose types should be rendered.
 */
function renderTypesCardView(index) {
    for (let j = 0; j < pokeArray[index].types.length; j++) {

        const typeRef = document.getElementById('cardview-type' + index);

        typeRef.innerHTML += getTypes(pokeArray[index].types[j]);
    }
}

function closeCardView() {
    const CardViewRef = document.getElementById('overlay');
    CardViewRef.classList.toggle('d-flex');
    document.body.classList.remove('no-scroll');

    baseStatsActive = false;
}

function stopBubbling(event) {
    event.stopPropagation();
}

// #endregion

// #region reiter für verschiedene descriptions

/**
 * Renders the base stats section for a Pokémon at the specified index.
 * Highlights the "Base Stats" navigation tab, removes highlight from "About" tab,
 * sets the baseStatsActive flag, injects a canvas for chart rendering,
 * and initializes the stats chart.
 *
 * @param {number} index - The index of the Pokémon to render base stats for.
 */
function renderBaseStats(index) {
    const descRef = document.getElementById('desc' + index);
    const navBaseStatsRef = document.getElementById('nav-base-stats' + index);
    const navAboutRef = document.getElementById('nav-about' + index);

    navBaseStatsRef.classList.add("highlight");
    navAboutRef.classList.remove("highlight");

    baseStatsActive = true; 

    descRef.innerHTML = `<canvas id=myChart></canvas>`;

    getStatsChart(index);
}

/**
 * Renders the "About" section for a Pokémon at the specified index.
 * Highlights the "About" navigation tab, removes highlight from "Base Stats",
 * and updates the description with Pokémon details.
 *
 * @param {number} index - The index of the Pokémon in the pokeArray.
 */
function renderAbout(index) {
    const descRef = document.getElementById('desc' + index);
    const navBaseStatsRef = document.getElementById('nav-base-stats' + index);
    const navAboutRef = document.getElementById('nav-about' + index);

    navBaseStatsRef.classList.remove("highlight");
    navAboutRef.classList.add("highlight");

    baseStatsActive = false;

    descRef.innerHTML = getAbout({
        abilitieOne: pokeArray[index].abilities[0],
        abilitieTwo: pokeArray[index].abilities[1],
        height: pokeArray[index].height,
        index: index,
        weight: pokeArray[index].weight
    })
}

// #endregion

// #region pfeile um zum nächsten pokemon zu kommen

/**
 * Advances to the next Pokémon in the list, fetching more from the API if needed.
 * Renders the card view, types, and optionally base stats for the given index.
 *
 * @async
 * @param {number} index - The index of the Pokémon to display.
 * @returns {Promise<void>} Resolves when rendering and fetching are complete.
 */
async function forward(index) {
    if (index == pokeArray.length) {
        await getPokemonFromApi();
    }

    renderCardView(index);
    renderTypesCardView(index);

    if (baseStatsActive == true){
        renderBaseStats(index);
    }
}

/**
 * Navigates backward in the Pokémon array and renders the corresponding card view and types.
 * If the index is at the beginning, wraps around to the last Pokémon.
 * Optionally renders base stats if `baseStatsActive` is true.
 *
 * @param {number} index - The current index in the Pokémon array.
 */
function backward(index) {
    if (index + 1 == 0) {

        const newIndex = pokeArray.length - 1;
        renderCardView(newIndex);
        renderTypesCardView(newIndex);

    } else {

        renderCardView(index);
        renderTypesCardView(index);
    }

        if (baseStatsActive == true){
        renderBaseStats(index);
    }
}

// #endregion

// searchbar programmieren

/**
 * Filters the list of Pokémon based on the user's search input and renders the results.
 * - If the input has 3 or more characters, filters `pokeArray` by Pokémon names containing the input.
 * - If the input is empty, renders all Pokémon.
 */
function search() {
    const inputRef = document.getElementById('search-bar');
    const inputValue = inputRef.value.toLowerCase();

    if (inputValue.length >= 3) {
        const result = pokeArray.filter(pokemon => pokemon.nameLowerCase.includes(inputValue))

        renderCardSection(result);
    } if (inputValue == "") {
        renderCardSection(pokeArray);
    }
}

// load-overlay erstellen

function showLoadingSpinner() {
    const loadingRef = document.getElementById('loading-spinner');
    loadingRef.classList.add('d-flex');
}

function endLoadingSpinner() {
    const loadingRef = document.getElementById('loading-spinner');
    loadingRef.classList.remove('d-flex');
}



console.log(pokeArray);