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
    } else if(isWinner() == "Player Two Wins") {
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
    return (turn_nr % 2 == 0) ? "two" : "one";
};

function reset() {
    status.innerHTML = "";

    for(r = 0; r < squares.length; r++) {
        squares[r].innerHTML = "";
    };

    for(var key in board_state) {
        board_state[key] = 0;
    };

    turn_nr =1;
};


function updateBoard(location) {
    let value = 0;
    turn() == "one" ? value = 5 : value = 1;

    board_state[location] = value;
};


function isWinner() {
    // convert object to array to analyze
    
    let temp = Object.values(board_state);

    // empty array for 3x3
    let board_state_arr = [];

    // slice object array into 3x3
    for(x = 0; x + 3 <= temp.length; x+=3) {
        board_state_arr.push(temp.slice(x, x+3));
    };

    // Checking for diagonal winner
    dArray_lr = [];
    dArray_rl = [];

    for(x = 0, y = board_state_arr.length - 1; x < board_state_arr.length; x++, y--) {
        dArray_lr.push(board_state_arr[x][x]);
        dArray_rl.push(board_state_arr[x][y]);
    };

    if(dArray_lr.reduce((acc, val) => acc + val) == 15 || dArray_rl.reduce((acc, val) => acc + val) == 15) {
        return "Player One Wins";
    } else if(dArray_lr.reduce((acc, val) => acc + val) == 3 || dArray_rl.reduce((acc, val) => acc + val) == 3) {
        return "Player Two Wins";
    };


    // Check for a horizontal winner
    for(x = 0; x < board_state_arr.length; x++) {
        if(board_state_arr[x].reduce((acc, val) => acc + val) == 15) {
            return "Player One Wins";            
        } else if (board_state_arr[x].reduce((acc, val) => acc + val) == 3) {
            return "Player Two Wins";
        }
    };

    // Check for vertical winner
    for(x = 0; x < board_state_arr.length; x++) {
        let verticalArray = [];
        for(y = 0; y < board_state_arr.length; y++) {
            verticalArray.push(board_state_arr[y][x]);
        }
    

    if(verticalArray.reduce((acc, val) => acc + val) == 15) {
        return "Player One Wins";        
    } else if(verticalArray.reduce((acc, val) => acc + val) == 3) {
        return "Player Two Wins";
    }
    };
    
    // Check tie
    if(document.getElementsByClassName("play").length == 9) {
        return "Tie Game";
    };

    return;
};