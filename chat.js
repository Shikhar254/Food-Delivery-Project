// OPEN CHAT 
document.getElementById("openChatBtn").addEventListener("click", () => {
    document.getElementById("chatBox").style.display = "flex";
});

// CLOSE CHAT 
document.getElementById("closeChat").addEventListener("click", () => {
    document.getElementById("chatBox").style.display = "none";
});

// SEND MESSAGE 
document.getElementById("sendMsg").addEventListener("click", sendMessage);
document.getElementById("chatInput").addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendMessage();
});

function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();

    if(text === "") return;

    // ADD USER MESSAGE 
    const userMsg = `<p class="user">${text}</p>`;
    document.getElementById("chatBody").innerHTML += userMsg;

    input.value = "";

    // AUTO BOT REPLY 
    setTimeout(() => {
        const botMsg = `<p class="bot">Thanks for Your Message!</p>`;
        document.getElementById("chatBody").innerHTML += botMsg;
        scrollChat();
    }, 600);

    scrollChat();
}

function scrollChat() {
    const body = document.getElementById("chatBody");
    body.scrollTop = body.scrollHeight;
}

// CLOSE CHAT BOX WHEN CLICKING OUTSIDE
document.addEventListener("click", function (event) {
    const chatBox = document.getElementById("chatBox");
    const openBtn = document.getElementById("openChatBtn");

    if(
        chatBox.style.display === "flex" && 
        !chatBox.contains(event.target) && 
        !openBtn.contains(event.target)
    ){
        chatBox.style.display = "none";
    }
});