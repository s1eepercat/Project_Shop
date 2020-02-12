const form = document.querySelector("#form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const discount = document.querySelector("#discount");
const status_el =document.querySelector("#status");


async function formHandle(e) {
    e.preventDefault();
    try{
        sendData('http://localhost:3000/form')
        .then(data => {
            return status_el.innerText = (data.status === 200) ? 'SUCCESS!' : 'ERROR..';
        })
        .then(condition => {
            if (condition === 'SUCCESS!') {
                name.value = '';
                price.value = '';
                discount.value = '';
            }
        })
    } catch (error) {
        status_el.innerText = 'ERROR..';
        console.log(error)
    }
    return false;
}

async function sendData(url) {
    const data = {
            name: name.value,
            price: price.value,
            image: image.value,
            discount: discount.value
        };

    let response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
    })

    return response;
}