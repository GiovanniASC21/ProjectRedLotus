let usernameElement = document.querySelector("#username");
let messageElement = document.querySelector("#message");
let button = document.querySelector("#submitButton");
let allMessages = document.querySelector(".allMessages");
// Set database object REFERENCE here:
let database = firebase.database().ref();
​
​
/**
 * Updates the database with the username and message.
 */
button.onclick = function updateDB(event){
    event.preventDefault(); //stop refreshing
    let username        = usernameElement.value;
    let message         = messageElement.value;
    usernameElement.value = "";
    messageElement.value  = "";
    console.log(username + " : " + message);
​
    let userMessage = document.createElement("p");
    userMessage.innerHTML = username + ": " + message;
    // Update database here
    let value = {
        NAME: username,
        MESSAGE: message,
    }
​
    database.push(value);
​
    // apend msg to page
    allMessages.append(userMessage);
​
}
​
database.on("child_added", function (data) {
    let messageData = childData.val();
    console.log(messageData);
​
    let displayMessage = document.createElement("p");
    displayMessage.innerHTML = messageData.NAME + ": " + messageData.MESSAGE;
})