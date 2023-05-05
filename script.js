initialise();

var calculationList = new Array();

// reset button
var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  resetGame();
});

// undo button
var undo = document.getElementById("undo");
undo.addEventListener("click", () => {
  undoLastCalculation();
});

// new game button
var newGame = document.getElementById("newgame");
newGame.addEventListener("click", () => {
  initialise();
});

// number is clicked
var firstNumber = document.getElementById("first");
firstNumber.addEventListener("click", () => {
  handleNumberClick(1, firstNumber);
});
var secondNumber = document.getElementById("second");
secondNumber.addEventListener("click", () => {
  handleNumberClick(2, secondNumber);
});
var thirdNumber = document.getElementById("third");
thirdNumber.addEventListener("click", () => {
  handleNumberClick(3, thirdNumber);
});
var fourthNumber = document.getElementById("fourth");
fourthNumber.addEventListener("click", () => {
  handleNumberClick(4, fourthNumber);
});
var fifthNumber = document.getElementById("fifth");
fifthNumber.addEventListener("click", () => {
  handleNumberClick(5, fifthNumber);
});
var sixthNumber = document.getElementById("sixth");
sixthNumber.addEventListener("click", () => {
  handleNumberClick(6, sixthNumber);
});

// operation is clicked
var multiply = document.getElementById("multiply");
multiply.addEventListener("click", () => {
  handleOperationClick("M", multiply);
});
var divide = document.getElementById("divide");
divide.addEventListener("click", () => {
  handleOperationClick("D", divide);
});
var subtract = document.getElementById("subtract");
subtract.addEventListener("click", () => {
  handleOperationClick("S", subtract);
});
var add = document.getElementById("add");
add.addEventListener("click", () => {
  handleOperationClick("A", add);
});

function handleNumberClick(numberClicked, htmlElement) {
  var undo = document.getElementById("undo");
  undo.disabled = true;
  // get all active elements
  const allActive = document.querySelectorAll(".active");
  var newNumber;
  switch (allActive.length) {
    case 0:
      htmlElement.classList.add("active");
      break;
    case 1:
      htmlElement.classList.remove("active");
      break;
    case 2:
      if (!htmlElement.classList.contains("active")) {
        const activeNumbers = document.querySelectorAll(".active.number");
        var singleActiveNumber;
        activeNumbers.forEach((element) => {
          singleActiveNumber = element;
        });
        const activeOperators = document.querySelectorAll(".active.operator");
        var singleActiveOperator;
        activeOperators.forEach((element) => {
          singleActiveOperator = element;
        });
        var hasChanged = false;
        switch (singleActiveOperator.innerHTML) {
          case "x":
            newNumber = singleActiveNumber.innerHTML * htmlElement.innerHTML;
            hasChanged = true;
            const multiplyCalculation = {
              firstNumber: singleActiveNumber.id,
              firstValue: singleActiveNumber.innerHTML,
              secondNumber: htmlElement.id,
              secondValue: htmlElement.innerHTML,
            };
            calculationList.push(multiplyCalculation);
            break;
          case "/":
            if (
              htmlElement.innerHTML != 0 &&
              singleActiveNumber.innerHTML % htmlElement.innerHTML == 0
            ) {
              newNumber = singleActiveNumber.innerHTML / htmlElement.innerHTML;
              hasChanged = true;
              const divideCalculation = {
                firstNumber: singleActiveNumber.id,
                firstValue: singleActiveNumber.innerHTML,
                secondNumber: htmlElement.id,
                secondValue: htmlElement.innerHTML,
              };
              calculationList.push(divideCalculation);
            }
            break;
          case "-":
            if (
              Number(singleActiveNumber.innerHTML) >=
              Number(htmlElement.innerHTML)
            ) {
              newNumber =
                Number(singleActiveNumber.innerHTML) -
                Number(htmlElement.innerHTML);
              hasChanged = true;
              const subtractCalculation = {
                firstNumber: singleActiveNumber.id,
                firstValue: singleActiveNumber.innerHTML,
                secondNumber: htmlElement.id,
                secondValue: htmlElement.innerHTML,
              };
              calculationList.push(subtractCalculation);
            }
            break;
          case "+":
            newNumber =
              Number(singleActiveNumber.innerHTML) +
              Number(htmlElement.innerHTML);
            hasChanged = true;
            const addCalculation = {
              firstNumber: singleActiveNumber.id,
              firstValue: singleActiveNumber.innerHTML,
              secondNumber: htmlElement.id,
              secondValue: htmlElement.innerHTML,
            };
            calculationList.push(addCalculation);
            break;
        }
        if (hasChanged) {
          singleActiveNumber.classList.add("hidden");
          singleActiveNumber.classList.remove("active");
          singleActiveOperator.classList.remove("active");
          htmlElement.innerHTML = newNumber;
          if (newNumber == document.getElementById("target").innerHTML) {
            htmlElement.classList.add("winner");
          } else {
            var undo = document.getElementById("undo");
            undo.disabled = false;
          }
        }
      }
      break;
  }
}

function handleOperationClick(operationClicked, htmlElement) {
  var undo = document.getElementById("undo");
  undo.disabled = true;
  const allActive = document.querySelectorAll(".active");
  switch (allActive.length) {
    case 1:
      htmlElement.classList.add("active");
      break;

    case 2:
      if (!htmlElement.classList.contains("active")) {
        const currentActiveOperator =
          document.querySelectorAll(".active.operator");
        currentActiveOperator.forEach((element) => {
          element.classList.remove("active");
        });
        htmlElement.classList.add("active");
      } else {
        htmlElement.classList.remove("active");
      }
      break;
  }
}

function initialise() {
  var undo = document.getElementById("undo");
  undo.disabled = true;
  // initialise large number
  var largeNumberRandom = Math.floor(Math.random() * 4);
  var initialValueOfOne;
  switch (largeNumberRandom) {
    case 0:
      initialValueOfOne = 25;
      break;
    case 1:
      initialValueOfOne = 50;
      break;
    case 2:
      initialValueOfOne = 75;
      break;
    case 3:
      initialValueOfOne = 100;
      break;
  }
  document.getElementById("first").innerHTML = initialValueOfOne;

  // initialise other numbers
  var initialValueOfTwo = Math.floor(Math.random() * 10) + 1;
  document.getElementById("second").innerHTML = initialValueOfTwo;
  var initialValueOfThree = Math.floor(Math.random() * 10) + 1;
  document.getElementById("third").innerHTML = initialValueOfThree;
  var initialValueOfFour = Math.floor(Math.random() * 10) + 1;
  document.getElementById("fourth").innerHTML = initialValueOfFour;
  var initialValueOfFive = Math.floor(Math.random() * 10) + 1;
  document.getElementById("fifth").innerHTML = initialValueOfFive;
  var initialValueOfSix = Math.floor(Math.random() * 10) + 1;
  document.getElementById("sixth").innerHTML = initialValueOfSix;
  // set target number
  var targetSet = true;
  do {
    var targetNumber = Math.floor(Math.random() * 1000);
    if (
      targetNumber != initialValueOfOne &&
      targetNumber != initialValueOfTwo &&
      targetNumber != initialValueOfThree &&
      targetNumber != initialValueOfFour &&
      targetNumber != initialValueOfFive &&
      targetNumber != initialValueOfSix
    ) {
      document.getElementById("target").innerHTML = targetNumber;
      targetSet = true;
    }
  } while (targetSet == false);

  // reset active and hidden elements
  const allActive = document.querySelectorAll(".active");
  allActive.forEach((element) => {
    element.classList.remove("active");
  });
  const allHidden = document.querySelectorAll(".hidden");
  allHidden.forEach((element) => {
    element.classList.remove("hidden");
  });
  const allWinners = document.querySelectorAll(".winner");
  allWinners.forEach((element) => {
    element.classList.remove("winner");
  });
}

function undoLastCalculation() {
  var lastCalculation = calculationList[calculationList.length - 1];
  var firstCalculationNumber = document.getElementById(
    lastCalculation.firstNumber
  );
  firstCalculationNumber.innerHTML = lastCalculation.firstValue;
  firstCalculationNumber.classList.remove("hidden");
  var secondCalculationNumber = document.getElementById(
    lastCalculation.secondNumber
  );
  secondCalculationNumber.innerHTML = lastCalculation.secondValue;
  calculationList.splice(calculationList.length - 1, 1);
  if (calculationList.length == 0) {
    undo = document.getElementById("undo");
    undo.disabled = true;
  }
}

function resetGame() {
  const numberOfMoves = calculationList.length;
  for (let i = 0; i < numberOfMoves; i++) {
    undoLastCalculation();
  }
}
