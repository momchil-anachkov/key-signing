const signMessage = async () => {
    const messageInput = document.querySelector('#message');
    const message = messageInput.value;
    if (!message) {
        return;
    }

    const json = await makeJsonPostRequest('/sign', { message });

    const signatureRow = document.createElement('tr');
    signatureRow.innerHTML = `
        <td contenteditable="true">${message}</td>
        <td contenteditable="true">${json.signature}</td>
        <td><button onclick="verifySignature(event)">Verify</button></td>
    `;
    document.querySelector('#signatures').appendChild(signatureRow);
    messageInput.value = '';
}

const verifySignature = async (event) => {
    const row = event.target.parentElement.parentElement;
    const message = row.children[0].innerText;
    const signature = row.children[1].innerText;

    const json = await makeJsonPostRequest('/verify', { message, signature });

    if (json.verified) {
        row.style.color = 'green';
    } else {
        row.style.color = 'red';
    }
}

const makeJsonPostRequest = async (url, payload) => {
    const req = new Request(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const response = await fetch(req);
    return await response.json();
}

window.addEventListener('load', () => {
    const button = document.querySelector('button#submit-message');
    button.addEventListener('click', signMessage);
});
