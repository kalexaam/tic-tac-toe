let board_state = {
    "A1":0,
    "A2":0,
    "A3":0,
    "B1":0,
    "B2":0,
    "B3":0,
    "C1":0,
    "C2":0,
    "C3":0
};

// Global variables

let turn_nr = 1;
let status = document.getElementById("status");

// Give squares onclick func

let squares = document.getElementsByClassName("square");

for(s=0; s < squares.length; s++) {
    squares[s].setAttribute("onclick", "place(this)");
};

function place(me) {
    //prevent placing X or O on same board square

    if(me.children.length != 0) {
        return;
    }

    let player = turn();

    // X or O based on player
    let value = {
        "one" : "X",
        "two" : "O"
    };

    // Create div containing X or O inside square
    let xo = document.createElement("div");
    xo.innerHTML = value[player];

    value[player] == "X" ? xo.setAttribute("class", "play x") : xo.setAttribute("class", "play o");

    me.appendChild(xo);

    // Check if player won the game
    updateBoard(me.id);

    if(isWinner() == "Player One Wins") {
        status.innerHTML = "Player One Wins";
        status.setAttribute("class", "statusred");
        setTimeout(reset, 1000);
    } else if(isWinnder() == "Player Two Wins") {
        status.innerHTML = "Player Two Wins";
        status.setAttribute("class", "statusblue");
        setTimeout(reset, 1000);
    } else if(isWinner() == "Tie Game") {
        status.innerHTML = "Tie Game";
        setTimeout(reset, 1000);
    }

    // pass turn
    turn_nr++;
};



function turn() {

}