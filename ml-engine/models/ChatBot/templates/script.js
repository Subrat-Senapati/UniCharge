document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Function to add a message to the chat display
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to send message to the backend
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage(message, 'user');
        userInput.value = ''; // Clear input

        try {
            const response = await fetch('http://127.0.0.1:5000/chat', { // Make sure this matches your Flask port
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.response) {
                addMessage(data.response, 'bot');
            } else if (data.error) {
                addMessage(`Error: ${data.error}`, 'bot');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            addMessage('Oops! Something went wrong. Please try again later.', 'bot');
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});