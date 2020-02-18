const form = document.querySelector('#form');
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const image = document.querySelector('#image');
const discount = document.querySelector('#discount');
const checkbox = document.querySelector('#checkbox');
const status_el = document.querySelector('#status');
let deleteButton, isEditMode;

itemId = window.location.search.slice(4);
isEditMode = !!itemId;
isEditMode && sendRequest('GET', '/items?id=' + itemId, null, prepareEdit);

function prepareEdit(res) {
    name.value = res.name;
    price.value = res.price;
    image.value = res.image;
    if (res.discount) {
        checkbox.checked = res.discount;
        discount.value = res.discount;
    } 
    createDeleteButton();
}

function createDeleteButton() {
    const button = document.createElement('button');
    button.classList.add('form__delete');
    button.setAttribute('type','button');
    button.textContent = 'Delete';
    button.onclick = function() {
        sendRequest('DELETE', '/items?id=' + itemId, null, successCallback);
    }
    form.appendChild(button);
}

function successCallback() {
    if (isEditMode) {
        window.location = 'index.html';
    } else {
        status_el.innerText = 'Item successfully added!';
        name.value = '';
        price.value = '';
        discount.value = '';
    }
}

function formHandle(e) {
    e.preventDefault();
    const data = {
        name: name.value,
        price: price.value,
        image: image.value,
        discount: (checkbox.checked ? discount.value : 0) 
    };
    isEditMode && sendRequest('PUT', '/items?id=' + itemId, data, successCallback); 
    !isEditMode && sendRequest('POST', '/items', data, successCallback);
    return false;
}
