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

function addItem(name,price,image,discount=0) {
    /* NEED TO MAKE ID READ HIGHEST LATEST ID INSTEAD OF THE NUMBER*/
    const item = new Item(itemArr.length+1,name,price,image,discount); 
    itemArr.push(item);
}

//Imitated db
addItem('Flying Ninja',15,'images/1.jpg',20);
addItem('Happy Ninja',18,'images/2.jpg',30);
addItem('Happy Ninja',35,'images/3.jpg');
addItem('Ninja Silhouette',20,'images/4.jpg');
addItem('Ninja Silhouette',35,'images/5.jpg');
addItem('Patient Ninja',35,'images/6.jpg');
addItem('Premium Quality',20,'images/7.jpg');
addItem('Premium Quality',15,'images/8.jpg',25);
addItem('Qualified Ninja',100,'images/9.jpg');
addItem('Kawaii Ninja',100,'images/10.jpg',40);
addItem('Naruto Kun',150,'images/8.jpg');
//Imitated db

function adminAdd(data) {
    addItem(data.name, Number(data.price), data.image, Number(data.discount));
    console.log(`Added >>> ${data.name} ,${data.price}, ${data.image}, ${data.discount}`);
}







const adminUpdate = (data) => { 
        const obj = itemArr.find(Object => Object.id === parseInt(data[0],10));
        obj.name = data[1].name;
        obj.price = data[1].price;
        obj.image = data[1].image;
        obj.discount = data[1].discount;
}

const adminSearch = (data) => itemArr.find(Object => Object.id === parseInt(data,10));


module.exports = {
    items: itemArr,
    add: adminAdd,
    update: adminUpdate,
    find: adminSearch
}
