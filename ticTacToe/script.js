let h2 = document.querySelector("h2");

var go = "X";
h2.textContent = `It is ${go}'s turn!`;
let winnerExists = false;

const squares = document.querySelectorAll(".row>div");

for (let square of squares) {
  square.addEventListener("click", function (e) {
    if (!square.textContent && !winnerExists) {
      square.textContent = go;
      if (checkWinner(go)) {
        winnerExists = true;
        h2.textContent = `${go} wins!`;
        alert(`${go} wins!`);
        stopPlay();
      } else {
        go = go == "X" ? "O" : "X";
        h2.textContent = `It is ${go}'s turn!`;
      }
    }
  });
}

function checkWinner(xORo) {
  const win = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  for (let i = 0; i < win.length; i++) {
    if (squares[win[i][0]].textContent == xORo && squares[win[i][1]].textContent == xORo && squares[win[i][2]].textContent == xORo) {
      squares[win[i][0]].style.backgroundColor = "green";
      squares[win[i][1]].style.backgroundColor = "green";
      squares[win[i][2]].style.backgroundColor = "green";
      return true;
    }
  }
  return false;
}
