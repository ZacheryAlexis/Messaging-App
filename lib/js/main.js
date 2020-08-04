const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
let db = firebase.database().ref(); // getting the reference point for my database 

/**
 * Updates the database with the username and message.
 */
function updateDB(event){ //callback function 
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    //data schema (structure) they way you want to organize your data
    let value = {
        // 2 colums within each row 
        NAME: username,
        MESSAGE: message
    };
    db.push(value);
}

// Set database "child_added" event listener here
db.on("child_added",addMessageToBoard);
let messageContainer = document.querySelector(".allMessages");

function addMessageToBoard(rowData){
    //extract the rowData
    let row = rowData.val(); //return an object just liek the objectwe pushed for value 
    console.log(row);
    //how to use information from data base
    let name = row.NAME;
    let sentence = row.MESSAGE;
    
    //add a new p tage to the page
    let newP  = document.createElement("p");
    newP.innerText = name + ": " + sentence;
    messageContainer.appendChild(newP);
}