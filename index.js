/* Global Variables */
const numQuestions = 8;

const answerArr = [0, 3, 2, 2, 2, 3, 3, 3, 1];

const modal = document.querySelector(".modal");
const modalMessage = document.getElementById("modalMessage");
const imageEl = document.getElementById("andrewimg");

/* Add event listeners */
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", doResults);

const playAgainButton = document.getElementById("playAgainButton");
playAgainButton.addEventListener("click", clearFields);

const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", toggleModal);

window.addEventListener("click", windowOnClick);

/* Clears text area*/
function clearFields() {
  let textArea = document.getElementById("resultsContainer");
  textArea.innerHTML = "";

  const radios = document.getElementsByTagName("input");
  for (i = 0; i < radios.length; i++) {
    if (radios[i].type == "radio" && radios[i].checked) {
      radios[i].checked = false;
    }
  }
}

function doResults() {
  document.getElementById("resultsContainer").innerHTML = "";
  /* First check if all the questions were answered */
  let valid = true;
  for (let i = 0; i < numQuestions; i++) {
    let radioButtonGroup = document.getElementsByName(`q${i + 1}`);
    if (
      !(
        radioButtonGroup[0].checked ||
        radioButtonGroup[1].checked ||
        radioButtonGroup[2].checked
      )
    ) {
      valid = false;
    }
  }
  if (!valid) {
    document.getElementById("resultsContainer").innerHTML =
      "Please answer all questions before submitting.";
  } else {
    calcTotal();
  }
}

function calcTotal() {
  let radioButtonGroup;
  let totalCorrect = 0;
  let answer = 0;
  for (let i = 1; i <= numQuestions; i++) {
    radioButtonGroup = document.getElementsByName(`q${i}`);
    answer = answerArr[i];

    if (radioButtonGroup[answer - 1].checked) {
      totalCorrect++;
    }
  }
  let resultsMessage = "";
  if (totalCorrect === numQuestions) {
    resultsMessage = "Are you Andrew's twin? Wow - congratulations!";
    imageEl.src = "andrew.jpeg";
  } else if (totalCorrect > numQuestions - 4) {
    resultsMessage =
      "So close ... you're quite like Andrew but you've a bit of improving to do!";
    imageEl.src = "andrewdisguise.jpeg";
  } else {
    resultsMessage =
      "Sadly, I'm afraid to say, you are nothing at all like Andrew";
    imageEl.src = "andrewdisguise.jpeg";
  }
  modalMessage.innerHTML = resultsMessage;
  toggleModal();
}

/* Modal code below */
function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
