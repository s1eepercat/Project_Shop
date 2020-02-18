class Item {
    constructor(id, name, price, image, discount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.discount = discount;
    }
}

const itemArr = [];
let incrementingID = 1;

const createItem = (name, price, image, discount=0) => {
    const item = new Item(incrementingID, name, price, image, discount); 
    incrementingID ++;
    itemArr.push(item);
}

createItem('Flying Ninja', 15, 'images/1.jpg', 20);
createItem('Happy Ninja', 18, 'images/2.jpg', 30);
createItem('Happy Ninja', 35, 'images/3.jpg');
createItem('Ninja Silhouette', 20, 'images/4.jpg');
createItem('Ninja Silhouette', 35, 'images/5.jpg');
createItem('Patient Ninja', 35, 'images/6.jpg');
createItem('Premium Quality', 20, 'images/7.jpg');
createItem('Premium Quality', 15, 'images/8.jpg', 25);
createItem('Qualified Ninja', 100, 'images/9.jpg');
createItem('Kawaii Ninja', 100, 'images/10.jpg', 40);
createItem('Naruto Kun', 150, 'images/8.jpg');

const adminSearch = (data) => itemArr.find(object => object.id === Number(data.id));

const adminAdd = (data) => {
    createItem(data.name, Number(data.price), data.image, Number(data.discount)); 
    return true
}

const adminUpdate = (req) => { 
    const id = Number(req.query.id);
    const data = req.body;
    const obj = itemArr.find(object => object.id === id);
    if (obj) {
        obj.name = data.name;
        obj.price = data.price;
        obj.image = data.image;
        obj.discount = data.discount;
    }
    return obj
}

const adminDelete = (req) => {
    const id = Number(req.query.id);
    let result = false;
    itemArr.forEach((obj, i) => {
        obj.id === id && itemArr.splice(i, 1) && (result = true)
    })
    return result
}

module.exports = {
    itemArr: itemArr,
    adminAdd: adminAdd,
    adminUpdate: adminUpdate,
    adminSearch: adminSearch,
    adminDelete: adminDelete
}
