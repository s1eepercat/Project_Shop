function sendRequest(method, data, callback) {
    let xhr = new XMLHttpRequest();
    if (data.id) {
        xhr.open(method, '/items?id=' + data.id, true);
    } else {
        xhr.open(method, '/items', true);
    }
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onerror = function() {
        console.log('Request failed');
    };
    xhr.onload = function() {
            if (xhr.status === 200) { 
                let response = JSON.parse(xhr.response);
                callback(response);   
            } else {
                console.log('Error status: ' + xhr.status + '. ' + xhr.response);                
            }
    }

    xhr.send((method === 'POST' || 'PUT') ? JSON.stringify(data) : null);
}