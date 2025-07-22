function getCard({spriteSrc, id, name, index}) {

    return /*html*/`                
                <div class="card"  onclick="showCardView(${index})">
                    <img src="${spriteSrc}" alt="">
                    <div class="card-details">
                        <span># ${id}</span>
                        <span>${name}</span>
                        <div id='types${index}'>
                        </div>
                    </div>
                </div>
        `;
}

function getTypes(type){

    return `<span class="type ${type}">${type}</span>`
}

function getCardView({typeOne, name, id, spriteSrc, index, height, weight, abilitieOne, abilitieTwo}){

    return /*html*/`
        <div class="cardview" onclick="stopBubbling(event)">
            <div class="cardview-main">
                <div class="cardview-main-header ${typeOne}">
                    <span>${name}</span>
                    <span>#${id}</span>
                </div>
                <img src="${spriteSrc}"
                    alt="${name}">
                <div class="cardview-types" id="cardview-type${index}">
                </div>
            </div>
            <div class="cardview-desc">
                <nav>
                    <span id="nav-about${index}" class="highlight" onclick="renderAbout(${index})">About</span>
                    <span id="nav-base-stats${index}" onclick="renderBaseStats(${index})">Base Stats</span>
                </nav>
                <div class="desc-content" id="desc${index}">
                    <table>
                        <tbody>
                            <tr>
                                <td>Height:</td>
                                <td>${height}</td>
                            </tr>
                            <tr>
                                <td>Weight:</td>
                                <td>${weight} kg</td>
                            </tr>
                            <tr>
                                <td>Abilities:</td>
                                <td>${abilitieOne} <br>${abilitieTwo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="cardview-buttons">
                <button onclick="backward(${index} - 1)">previous</button>
                <button onclick="forward(${index} + 1)">next</button>
            </div>
        </div>
    `
}

function getAbout({height, weight, abilitieOne, abilitieTwo}){

    return /*html*/`
                    <table>
                        <tbody>
                            <tr>
                                <td>Height:</td>
                                <td>${height}</td>
                            </tr>
                            <tr>
                                <td>Weight:</td>
                                <td>${weight} kg</td>
                            </tr>
                            <tr>
                                <td>Abilities:</td>
                                <td>${abilitieOne} <br>${abilitieTwo}</td>
                            </tr>
                        </tbody>
                    </table>
    `
}

function getBaseStats({hp,attack, defense, specialAttack, specialDefense, speed}){
    
    return /*html*/`
        <table>
            <tr>
                <td>hp:</td>
                <td>${hp}</td>
            </tr>
            <tr>
                <td>attack:</td>
                <td>${attack}</td>
            </tr>
            <tr>
                <td>defense:</td>
                <td>${defense}</td>
            </tr>
            <tr>
                <td>sp. attack:</td>
                <td>${specialAttack}</td>
            </tr>
            <tr>
                <td>sp. defense:</td>
                <td>${specialDefense}</td>
            </tr>
            <tr>
                <td>speed:</td>
                <td>${speed}</td>
            </tr>
        </table>
    `
}

