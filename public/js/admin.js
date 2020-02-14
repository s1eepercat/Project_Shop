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

if (isEditMode) {
    sendRequest('POST', backUrl + '/items', [itemId] ,prepareEdit);
}

function prepareEdit(res) {
    name.value = res.name;
    price.value = res.price;
    image.value = res.image;

    if (res.discount) {
        checkbox.checked = true;
        discount.value = res.discount;
    } 

    deleteButtonCreate();
}

function deleteButtonCreate() {
    const button = document.createElement('button');
    button.classList.add('form__delete');
    button.setAttribute('type','button');
    form.appendChild(button);
    button.onclick = function() {

        sendRequest('DELETE', backUrl + '/items/delete', [itemId] ,successCallback);
    }
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
        discount: (checkbox.checked ? (discount.value ? discount.value : 0) : 0) 
    };

    isEditMode && sendRequest('PUT', backUrl + '/items/update',[itemId,data],successCallback); 
    !isEditMode && sendRequest('POST', backUrl + '/items/add',data,successCallback);
    
    return false;
}
