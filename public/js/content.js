const itemsContent = document.querySelector('#items_content');

function ShopItem(id, name, price, discount, image) {
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
        const itemsItem = this.createSingleElement('div', itemsContent, (this.discount == 0) ? 'items__item' : 'items__item items__item--sale');
        const a = this.createSingleElement('a', itemsItem, 'items__edit');
        const div = this.createSingleElement('div', itemsItem, '');
        const itemsFigure = this.createSingleElement('figure', div, 'items__figure');
        const itemsImage = this.createSingleElement('img', itemsFigure, 'items__image');
        const itemsDetails = this.createSingleElement('div', div, 'items__details');
        const itemsName = this.createSingleElement('h3', itemsDetails, 'items__name');
        const itemsPriceContainer = this.createSingleElement('div', itemsDetails, 'items__price-container');
        const itemsPriceStandard = this.createSingleElement('h3', itemsPriceContainer, 'items__price items__price--standard');
        const itemsPriceSale = this.createSingleElement('h3', itemsPriceContainer, 'items__price items__price--sale');
        const itemsButton = this.createSingleElement('button', itemsDetails, 'items__button');
        
        a.textContent = 'Edit'
        a.setAttribute('href', 'admin.html?id=' + this.id);
        itemsImage.setAttribute('src', 'images' + this.image);
        itemsImage.setAttribute('alt', this.name);
        itemsName.textContent = this.name;
        itemsName.setAttribute('title', this.name);
        itemsPriceStandard.textContent = formatPrice(this.price);
        itemsPriceSale.textContent = formatPrice((1 - this.discount/100) * this.price);
        itemsButton.textContent = 'ADD TO CART';
    }
}

function formatPrice(num) {
    let testString = num.toString();
    if (testString.indexOf('.') !== -1) {
        let str = (Math.round(num * 100)).toString();
        if (str.length >= 4) {
            return str.slice(0, str.length-2) + '.' + str.slice(str.length-2);
        } else {
            return '0.' + str.slice(str.length-2);
        }
    } else {
        return num + '.00'
    }
}

function addAdminPanel() {
    const aContainer = document.createElement('div');
    aContainer.classList.add('admin__container');
    itemsContent.appendChild(aContainer);

    const aButton = document.createElement('a');
    aButton.classList.add('admin__new-item');
    aButton.textContent = 'NEW ITEM';
    aButton.setAttribute('href', 'admin.html');
    aContainer.appendChild(aButton);
}

sendRequest('GET', '', generateItems);

function generateItems(data) {
    data.forEach(function(obj){
        const item = new ShopItem(obj.id, obj.name, obj.price, obj.discount, obj.image);
        item.createLayout();
    })
    addAdminPanel();
}