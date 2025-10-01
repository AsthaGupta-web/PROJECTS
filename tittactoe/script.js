let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelectorAll("#reset-btn"); 
let newGameBtn = document.querySelector("#new-game-btn"); 
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // Player O's turn

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Assuming you use a CSS class 'hide' to hide the message
    disableBoxes();
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

if (resetBtn.length > 0) {
    resetBtn[0].addEventListener("click", resetGame);
}

if (newGameBtn) {
    newGameBtn.addEventListener("click", resetGame);
}


const checkWinner = () => {
    let isDraw = true; 

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log(`WINNER! ${pos1Val}`);
                showWinner(pos1Val);
                return; 
            }
        }
    }


    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false; // 
            break;
        }
    }

    if (isDraw) {
        msg.innerText = `Game was a Draw.`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};