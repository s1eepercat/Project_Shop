const itemsContent = document.querySelector('.items__content');

function getDataAsync(method,url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method,url);
    xhr.send();
    
    xhr.onerror = function() {
        console.log("Request failed");
    };
    
    xhr.onload = function() {
        if (xhr.status === 200) { 
            let data = JSON.parse(xhr.response);

            for(i = 0; i < data.length; i ++) {
                const curItem = data[i];
                const item = new ShopItem(curItem.id,curItem.name,curItem.price,curItem.discount,curItem.image);
                item.generateItem();
            }
        }
    };
}

getDataAsync("GET","http://localhost:3000/items");

function ShopItem(id,name,price,discount,image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.image = image;

    this.createSingleElement = function(tag, parent, cls) {
        let el = document.createElement(tag);
        el.className += cls;
        parent.appendChild(el);
        return el;
    }

    this.generateItem = function() {
        const itemsItem = this.createSingleElement('div',itemsContent, (this.discount === 0) ? 'items__item' : 'items__item items__item--sale');
        const div = this.createSingleElement('div',itemsItem,'');
        const itemsFigure = this.createSingleElement('figure',div,'items__figure');
        const itemsImage = this.createSingleElement('img',itemsFigure,'items__image');
        const itemsDetails = this.createSingleElement('div',div,'items__details');
        const itemsName = this.createSingleElement('h3',itemsDetails,'items__name');
        const itemsPriceContainer = this.createSingleElement('div',itemsDetails,'items__price-container');
        const itemsPriceStandard = this.createSingleElement('h3',itemsPriceContainer,'items__price items__price--standard');
        const itemsPriceSale = this.createSingleElement('h3',itemsPriceContainer,'items__price items__price--sale');
        const itemsButton = this.createSingleElement('button',itemsDetails,'items__button');

        itemsItem.setAttribute('item',this.id);
        itemsImage.setAttribute('src',this.image);
        itemsImage.setAttribute('alt',this.name);
        itemsName.textContent = this.name;
        itemsName.setAttribute('title',this.name);
        itemsPriceStandard.textContent = this.price+'.00';
        itemsPriceSale.textContent = Math.floor((1 - this.discount/100) * this.price) +'.00';
        itemsButton.textContent = 'ADD TO CART';
    }
}