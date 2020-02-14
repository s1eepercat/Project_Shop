const itemsContent = document.querySelector('#items_content');

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

    this.createLayout = function() {
        const itemsItem = this.createSingleElement('div',itemsContent, (this.discount === 0) ? 'items__item' : 'items__item items__item--sale');
        const a = this.createSingleElement('a',itemsItem,'items__edit');
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
        a.textContent = 'Edit'
        a.setAttribute('href','admin.html?id=' + this.id);
        itemsImage.setAttribute('src',this.image);
        itemsImage.setAttribute('alt',this.name);
        itemsName.textContent = this.name;
        itemsName.setAttribute('title',this.name);
        itemsPriceStandard.textContent = this.price+'.00';
        itemsPriceSale.textContent = Math.floor((1 - this.discount/100) * this.price) +'.00';
        itemsButton.textContent = 'ADD TO CART';
    }
}

function addAdminPanel() {
    const aContainer = document.createElement('div');
    aContainer.classList.add('admin__container');
    itemsContent.appendChild(aContainer);

    const aButton = document.createElement('a');
    aButton.classList.add('admin__new-item');
    aButton.textContent = 'NEW ITEM';
    aButton.setAttribute('href','admin.html');
    aContainer.appendChild(aButton);
}


sendRequest('GET', backUrl + '/items','',generateItems);


function generateItems(data) {
    for(i = 0; i < data.length; i ++) {
        const item = new ShopItem(data[i].id, data[i].name, data[i].price, data[i].discount, data[i].image);
        item.createLayout();
    }

    addAdminPanel();
}



