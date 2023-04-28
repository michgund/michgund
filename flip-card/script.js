let h2 = document.querySelector('h2');
h2.textContent = 'Good luck!';

let input = document.querySelector('input');

let cont = document.querySelector('#container');

let btn = document.querySelector('button');
btn.addEventListener('click', dealCards);

let counter = 0;
let winner;
function dealCards() {
    winner = false;
    h2.textContent = `Good luck!`
    counter = 0;
    let cont = document.querySelector('#container');
    while (cont.hasChildNodes()) {
        cont.removeChild(cont.firstChild);
    }
    let joker = Math.floor(Math.random() * input.value);
    console.log(joker);
    let xORx = '';
    for (let i = 0; i < input.value; i++) {
        if (i == joker) {
            xORx = 'O';
        } else {
            xORx = 'X';
        }
        let div = document.createElement('div');
        div.classList.add('flip-card');
        div.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front"></div>
                <div class="flip-card-back">${xORx}</div>
            </div>
        `
        cont.appendChild(div);
        div.addEventListener('click', handleClick);
    }
};

// start with cards on the page
dealCards();

function handleClick(e) {
    if (winner) {
        let cont = document.querySelector('#container');
        let newCont = cont.cloneNode(true);
        cont.remove();
        document.body.appendChild(newCont);
        return;
    }
    if (e.target.parentNode.classList.contains('flipped')) {
        return;
    }
    e.target.parentNode.className = 'flip-card-inner flipped';
    counter++;
    h2.textContent = `You've used ${counter} tries!`;
    if (e.target.nextElementSibling.textContent == 'O') {
        h2.textContent = `You won in ${counter} tries!`;
        winner = true;
    }
}