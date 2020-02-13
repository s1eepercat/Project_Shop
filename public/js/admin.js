const form = document.querySelector("#form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const discount = document.querySelector("#discount");
const status_el =document.querySelector("#status");

function formHandle(e) {
    e.preventDefault();
    sendData('POST','http://localhost:3000/items');
    return false;
}

function sendData(method,url) {
    const data = {
            name: name.value,
            price: price.value,
            image: image.value,
            discount: discount.value
        };

    let xhr = new XMLHttpRequest();
    xhr.open(method,url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));
    
    xhr.onerror = function() {
        status_el.innerText = 'ERROR!';
    };
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            status_el.innerText = 'SUCCESS!';
            name.value = '';
            price.value = '';
            discount.value = '';
        }
    }
}
