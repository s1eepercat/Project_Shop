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
addItem('Naruto Kun',150,'https://teezeli.com/wp-content/uploads/2019/04/2018-Aikooki-Winter-3D-Naruto-Hoodies-Men-women-Fashion-Hot-High-Quality-Streetwear-3D-Print-Naruto.jpg');
//Imitated db

function adminAdd(data) {
    addItem(data.name, Number(data.price), data.image, Number(data.discount));
    console.log(`Added >>> ${data.name} ,${data.price}, ${data.image}, ${data.discount}`);
}

module.exports = {
    items: itemArr,
    add: adminAdd
}
