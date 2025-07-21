class Pokemon {

    // #region attributes

    name;
    spriteSrc;
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

    // #endregion

    // constructor erstellen, in dem die methoden aufgerufen werden und die einfachen attributes erzeugt werden
    // benötigte parameter des constructors? 
    constructor({ pName, pSpriteSrc, pIndex, pTypes, pStats, pAbilities, pWeight, pHeight }) {

        this.spriteSrc = pSpriteSrc;
        this.id = pIndex;
        this.weight = pWeight;
        this.height = pHeight;

        this.getAbilities(pAbilities);
        this.getStats(pStats);
        this.getTypes(pTypes);
        this.getUpperName(pName)
    }

    // methoden erstellen, um an werte für stats sowie types zu kommen
    // Welche Parameter brauchen die methoden?

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
    // #endregion
}

const pokeArray = [];


async function getPokemonFromApi() {

    const arrayLength = pokeArray.length + 1

    for (let i = arrayLength; i <= arrayLength + 15; i++) {        

        const pokeResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + i);
        const pokeJson = await pokeResponse.json();

        pokeArray.push(new Pokemon({ pAbilities: pokeJson.abilities, pName: pokeJson.name, pHeight: pokeJson.height, pIndex: i, pSpriteSrc: pokeJson.sprites.front_default, pStats: pokeJson.stats, pTypes: pokeJson.types, pWeight: pokeJson.weight }));
    }
    renderCards();
}

function renderCards() {

    const cardSectionRef = document.getElementById('cards');
    cardSectionRef.innerHTML = "";

    for (let i = 0; i < pokeArray.length; i++) {

        cardSectionRef.innerHTML += getCard({spriteSrc: pokeArray[i].spriteSrc, id: pokeArray[i].id, name: pokeArray[i].name, index: i});

        renderTypes(i);
        typeBackground();
    }
}

function renderTypes(index) {

    for (let j = 0; j < pokeArray[index].types.length; j++) {

        const typeRef = document.getElementById('types' + index);

        typeRef.innerHTML +=  /*html*/`
                <span class="type">${pokeArray[index].types[j]}</span>
            `
    }
}

// funktion, um den hintergrund der type-container einzustellen
function typeBackground() {

    const typeDesc = document.getElementsByClassName('type');

    for (let i = 0; i < typeDesc.length; i++) {

        switch (typeDesc[i].innerHTML) {
            case "fire":
                typeDesc[i].classList.add("fire")
                break
            case "water":
                typeDesc[i].classList.add("water")
                break
            case "grass":
                typeDesc[i].classList.add("grass")
                break
            case "bug":
                typeDesc[i].classList.add("bug")
                break
            case "dragon":
                typeDesc[i].classList.add("dragon")
                break
            case "electric":
                typeDesc[i].classList.add("electric")
                break
            case "fighting":
                typeDesc[i].classList.add("fighting")
                break
            case "flying":
                typeDesc[i].classList.add("flying")
                break
            case "ghost":
                typeDesc[i].classList.add("ghost")
                break
            case "ground":
                typeDesc[i].classList.add("ground")
                break
            case "ice":
                typeDesc[i].classList.add("ice")
                break
            case "normal":
                typeDesc[i].classList.add("normal")
                break
            case "poison":
                typeDesc[i].classList.add("poison")
                break
            case "psychic":
                typeDesc[i].classList.add("psychic")
            case "rock":
                typeDesc[i].classList.add("rock")
                break
            case "fairy":
                typeDesc[i].classList.add("fairy")
        }
    }
}

getPokemonFromApi();


console.log(pokeArray);



// overlay-ansicht erstellen



// reiter für verschiedene descriptions 

// pfeile um zum nächsten pokemon zu kommen



