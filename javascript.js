let humanScore = 0;
let computerScore = 0;

function numericChoice(choice) {
  if (choice == "paper") return 1;
  else if (choice == "rock") return 0;
  else return 2;
}

function fight(humanChoice, computerChoice) {
  if (humanChoice == computerChoice) return 0; //draw
  else if (humanChoice == (computerChoice + 1) % 3) return 1; //computer wins
  else return -1; //human wins
}

function getComputerChoice() {
  let value = Math.random();
  let result = "null";

  if (value < 0.3) result = "rock";
  else if (value < 0.6) result = "paper";
  else result = "scissors";

  outputDiv.textContent = `Computador escolheu: ${result}`;
  return result;
}

function getHumanChoice() {
  let button = document.querySelectorAll(".options button");

  button.forEach((button) => {
    button.addEventListener("click", () => {
      let choice = button.id;
      let event = new CustomEvent("escolhaFeita", { detail: choice });
      document.dispatchEvent(event);

      outputDiv.textContent = `Voce escolheu: ${button.id}`;
    });
  });
}

function hearEvent(callback) {
  document.addEventListener("escolhaFeita", (event) => {
    callback(event.detail);
  });
}

function translator(humanChoice) {
  const computerChoice = getComputerChoice();

  const result = fight(
    numericChoice(humanChoice),
    numericChoice(computerChoice)
  );

  let state = "";
  let wChoice = "";
  let lChoice = "";

  if (result == 0) {
    console.log(`Its a draw! Both of you played ${humanChoice}!`);
    return;
  } else if (result == -1) {
    state = "lose";
    wChoice = computerChoice;
    lChoice = humanChoice;
    computerScore++;
  } else {
    state = "win";
    wChoice = humanChoice;
    lChoice = computerChoice;
    humanScore++;
  }

  outputDiv.textContent = `You ${state}!${wChoice} beats ${lChoice}!`;
}

function playRound() {
  getHumanChoice();
  hearEvent(translator);
}

function playGame() {
  outputDiv.textContent = "Escolha uma opção para começar!";

  function nextRound() {
    if (humanScore < 5 && computerScore < 5) {
      playRound();
      console.log("Current score: " + humanScore + " X " + computerScore);

      if (humanScore == 5) {
        outputDiv.textContent = `CONGRATULATIONS, YOU WIN! Final score: ${humanScore} X ${computerScore}`;
        document.removeEventListener("escolhaFeita", nextRound); //termina o jogo
        return;
      } else if (computerScore == 5) {
        outputDiv.textContent = `Sorry, you lose :( .Final score: ${humanScore} X ${computerScore}`;
        document.removeEventListener("escolhaFeita", nextRound);
        return;
      }
      nextStep();
    }
  }
  document.addEventListener("rodadaFeita", nextRound);

  playRound();
}

function nextStep() {
  document.dispatchEvent(
    new CustomEvent("rodadaFeita", {
      detail: { humanScore, computerScore },
    })
  );
}
let outputDiv;

document.addEventListener("DOMContentLoaded", () => {
  outputDiv = document.querySelector(".output");
  playGame();
});
