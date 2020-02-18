function sendRequest(method, url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
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
    xhr.send(data !== null ? JSON.stringify(data) : null);
}

