window.addEventListener('load', () => {
    const button = document.querySelector('button#submit-message');
    button.addEventListener('click', async () => {
        const messageInput = document.querySelector('#message');
        const message = messageInput.value;
        if (!message) {
            return;
        }


        const req = new Request('/sign', {
            method: 'POST',
            body: JSON.stringify({message}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const response = await fetch(req);
        const json = JSON.parse((await response.json()));


        const signatureRow = document.createElement('tr');
        signatureRow.innerHTML = `<td>${message}</td><td>${json.signature}</td><td>No</td>`;
        document.querySelector('#signatures').appendChild(signatureRow);
        messageInput.value = '';
    });
});
