function getCard({spriteSrc, id, name, index}) {

    return /*html*/`                
                <div class="card">
                    <img src="${spriteSrc}" alt="">
                    <div class="card-details">
                        <span>#${id}</span>
                        <span>${name}</span>
                        <div id='types${index}'>
                        </div>
                    </div>
                </div>
        `;
}