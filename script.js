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

    // #endregion

    constructor({ pName, pSpriteSrc, pSpriteSrcScnd, pIndex, pTypes, pStats, pAbilities, pWeight, pHeight }) {
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
    // #endregion
}

const pokeArray = [];

async function getPokemonFromApi() {
    const arrayLength = pokeArray.length + 1;// angelegt für den loadmore button

    showLoadingSpinner();

    for (let i = arrayLength; i <= arrayLength + 24; i++) {        // 
        if (i <= 151) {
            const pokeResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
            const pokeJson = await pokeResponse.json();

            pokeArray.push(new Pokemon({ pAbilities: pokeJson.abilities, pName: pokeJson.name, pHeight: pokeJson.height, pIndex: i, pSpriteSrc: pokeJson['sprites']['front_default'], pSpriteSrcScnd: pokeJson['sprites']['other']['official-artwork']['front_default'], pStats: pokeJson.stats, pTypes: pokeJson.types, pWeight: pokeJson.weight }));
        }
    }
    endLoadingSpinner();
    renderCardSection(pokeArray);
}

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

function renderTypes(index, array) {
    for (let j = 0; j < array[index].types.length; j++) {

        const typeRef = document.getElementById('types' + index);

        typeRef.innerHTML += getTypes(array[index].types[j]);
    }
}

getPokemonFromApi();

// #region overlay-ansicht erstellen

function showCardView(index) {
    const CardViewRef = document.getElementById('overlay');
    CardViewRef.classList.toggle('d-flex');
    document.body.classList.add('no-scroll');

    renderCardView(index);
    renderTypesCardView(index);
}

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
}

function stopBubbling(event) {
    event.stopPropagation();
}

// #endregion

// #region reiter für verschiedene descriptions

function renderBaseStats(index) {
    const descRef = document.getElementById('desc' + index);
    const navBaseStatsRef = document.getElementById('nav-base-stats' + index);
    const navAboutRef = document.getElementById('nav-about' + index);

    navBaseStatsRef.classList.add("highlight");
    navAboutRef.classList.remove("highlight");

    descRef.innerHTML = getBaseStats({
        hp: pokeArray[index].stats.hp,
        attack: pokeArray[index].stats.attack,
        defense: pokeArray[index].stats.defense,
        specialAttack: pokeArray[index].stats.special_attack,
        specialDefense: pokeArray[index].stats.special_defense,
        speed: pokeArray[index].stats.speed
    })
}

function renderAbout(index) {
    const descRef = document.getElementById('desc' + index);
    const navBaseStatsRef = document.getElementById('nav-base-stats' + index);
    const navAboutRef = document.getElementById('nav-about' + index);

    navBaseStatsRef.classList.remove("highlight");
    navAboutRef.classList.add("highlight");

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

async function forward(index) {
    if (index == pokeArray.length) {
        await getPokemonFromApi();
    }

    renderCardView(index);
    renderTypesCardView(index);
}

function backward(index) {
    if (index + 1 == 0) {

        const newIndex = pokeArray.length - 1;
        renderCardView(newIndex);
        renderTypesCardView(newIndex);

    } else {

        renderCardView(index);
        renderTypesCardView(index);
    }
}

// #endregion

// searchbar programmieren

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



