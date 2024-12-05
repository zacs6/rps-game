let options = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let random = Math.floor(Math.random() * options.length);
  return options[random];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    updateResult("tie", computerChoice);
  }
  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper") ||
    (humanChoice === "paper" && computerChoice === "rock")
  ) {
    humanScore++;
    updateResult("win", computerChoice);
    updateRecord(humanScore, computerScore);
  }
  if (
    (computerChoice === "rock" && humanChoice === "scissors") ||
    (computerChoice === "scissors" && humanChoice === "paper") ||
    (computerChoice === "paper" && humanChoice === "rock")
  ) {
    computerScore++;
    updateResult("loss", computerChoice);
    updateRecord(humanScore, computerScore);
  }
}

// * UI * //
const gameRecord = document.querySelector(".game-record");
const resultBox = document.querySelector(".game-result");
const chContainer = document.querySelector(".choices-container");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  if (button.parentElement === chContainer) {
    button.addEventListener("click", () => {
      const userChoice = button.className;

      if (userChoice === "rock") {
        playRound("rock", getComputerChoice());
      } else if (userChoice === "paper") {
        playRound("paper", getComputerChoice());
      } else if (userChoice === "scissors") {
        playRound("scissors", getComputerChoice());
      }
    });
  }
});

function updateResult(result, cpuChoice) {
  switch (result) {
    case "tie":
      resultBox.innerHTML = `You tied! CPU chose ${cpuChoice}`;
      break;
    case "win":
      resultBox.innerHTML = `You won! CPU chose ${cpuChoice}`;
      break;
    case "loss":
      resultBox.innerHTML = `You lost! CPU chose ${cpuChoice}`;
      break;
  }
}

function resetResultText() {
  resultBox.innerHTML = "What do you choose?";
}

function resetScore() {
  humanScore = 0;
  computerScore = 0;
}

function updateRecord(humanScore, computerScore) {
  if (humanScore === 5 || computerScore === 5) {
    handleGameEnd(humanScore, computerScore);
  } else {
    gameRecord.innerHTML = `${humanScore} - ${computerScore}`;
  }
}

function handleGameEnd(humanScore, computerScore) {
  if (humanScore === 5) {
    displayWinMessage(humanScore, computerScore);
  } else if (computerScore === 5) {
    displayLossMessage(humanScore, computerScore);
  }
}

function displayWinMessage(humanScore, computerScore) {
  gameRecord.innerHTML = `${humanScore} - ${computerScore}`;
  resultBox.innerHTML = "🎉 YOU WON THE GAME! 🎉";
  resetScore();
  updateRecord(humanScore, computerScore);
}

function displayLossMessage(humanScore, computerScore) {
  gameRecord.innerHTML = `${humanScore} - ${computerScore}`;
  resultBox.innerHTML = "🤖 CPU WON THE GAME! 🤖";
  resetScore();
  updateRecord(humanScore, computerScore);
}
