import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import styles from "../css/chatbotbutton.module.css";

const ChatbotButton = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const chatRef = useRef(null);

    // Auto-scroll when new messages are added
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    // Add a message
    const addMessage = (text, sender) => {
        setMessages((prev) => [...prev, { text, sender }]);
    };

    // Send message to backend
    const sendMessage = async () => {
        const message = userInput.trim();
        if (!message) return;

        addMessage(message, "user");
        setUserInput("");

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            if (data.response) {
                addMessage(data.response, "bot");
            } else if (data.error) {
                addMessage(`Error: ${data.error}`, "bot");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            addMessage("Oops! Something went wrong. Please try again later.", "bot");
        }
    };

    // Handle Enter key
    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    // When the popup opens, show a welcome message once
    const handleToggle = () => {
        setOpen((prev) => {
            const newState = !prev;
            if (newState && messages.length === 0) {
                // Only add the welcome message first time
                setMessages([{ text: "👋 Hi there! How can I help you today?", sender: "bot" }]);
            }
            return newState;
        });
    };

    return (
        <>
            {/* Floating Button */}
            <button className={styles.chatbotButton} onClick={handleToggle}>
                {open ? <X size={22} /> : <MessageCircle size={24} />}
            </button>

            {/* Popup Window */}
            {open && (
                <div className={styles.chatbotPopup}>
                    <div className={styles.chatHeader}>
                        <h4 className="text-white">Smart Assistant</h4>
                        <button className={styles.closeBtn} onClick={handleToggle}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className={styles.chatBody} id="chat-messages" ref={chatRef}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.botMessage
                                    }`}
                            >
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.chatFooter}>
                        <input
                            id="user-input"
                            type="text"
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className={styles.inputBox}
                        />
                        <button
                            id="send-button"
                            onClick={sendMessage}
                            className={styles.sendBtn}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatbotButton;