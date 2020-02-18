class Item {
    constructor(id,name,price,image,discount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.discount = discount;
    }
}

const itemArr = [];
let itemCount = 1;

const createItem = (name,price,image,discount=0) => {
    const item = new Item(itemCount,name,price,image,discount); 
    itemCount ++;
    itemArr.push(item);
}

createItem('Flying Ninja',15,'images/1.jpg',20);
createItem('Happy Ninja',18,'images/2.jpg',30);
createItem('Happy Ninja',35,'images/3.jpg');
createItem('Ninja Silhouette',20,'images/4.jpg');
createItem('Ninja Silhouette',35,'images/5.jpg');
createItem('Patient Ninja',35,'images/6.jpg');
createItem('Premium Quality',20,'images/7.jpg');
createItem('Premium Quality',15,'images/8.jpg',25);
createItem('Qualified Ninja',100,'images/9.jpg');
createItem('Kawaii Ninja',100,'images/10.jpg',40);
createItem('Naruto Kun',150,'images/8.jpg');


const adminAdd = (data) => {
    createItem(data.name, Number(data.price), data.image, Number(data.discount)); 
    return true
}

const adminDelete = (data) => {
    for (let i = 0; i < itemArr.length; i ++) {
        if (itemArr[i].id === parseInt(data,10)) {
            itemArr.splice(i, 1);
            return true
        }
    }
    return false
}

const adminUpdate = (data) => { 
        const obj = itemArr.find(Object => Object.id === parseInt(data[0],10));
        if (obj) {
            obj.name = data[1].name;
            obj.price = data[1].price;
            obj.image = data[1].image;
            obj.discount = data[1].discount;
        }
        return obj
}

const adminSearch = (data) => itemArr.find(Object => Object.id === parseInt(data,10));

module.exports = {
    itemArr: itemArr,
    add: adminAdd,
    update: adminUpdate,
    search: adminSearch,
    del: adminDelete
}
