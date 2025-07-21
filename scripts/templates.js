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
                    <span>About</span>
                    <span>Base Stats</span>
                </nav>
                <div class="desc-content">
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
        </div>
    `

}

