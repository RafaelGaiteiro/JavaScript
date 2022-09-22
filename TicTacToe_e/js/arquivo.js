const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let curretPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", ""];
const winningMensage = () => `Jogador ${curretPlayer} Venceu!`;
const curretPlayerReturn = () => `Vez de ${curretPlayer}`;

statusDisplay.innerHTML = curretPlayerReturn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return
    }
    handlePlayerChange();

}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);



/*

= Operador de Atribuição
    É usado para atribuir valores a uma variável.
    Exemplo:

    x = 10
    y = 20
    z = x + y
 

== Igual a ou Equal to
    É usado para comparação entre duas variáveis, independentemente do tipo de dados da variável.
    Exemplo:

    x = 10;

    x == 8       ->  retorna false
    x == 10      ->  retorna true

    No caso abaixo o valor "10" é uma String.
    x == "10"    ->  retorna true

 

=== Valor e Tipo igual
    É usado para comparação entre duas variáveis, mas isso irá verificar o tipo estrito, o que significa que ele irá verificar o tipo de dados e comparar dois valores.
    
    Para x= 10 temos que :
    x === 8    ->   retorna false
    x === 10   ->   retorna true
    x === "10" ->   retorna false

Assim o operador == compara por 'resultado'; Ele converte o que você quer comparar e verifica.

Ja o operador ===  compara o valor e o tipo, (quando você usa o operador === você força a comparar o tipo também) então só vai ser true se for exatamente igual (valor e tipo).

Assim temos:

if (true == 'true')  	// Retorna true
if (true == '1')       	// Retorna  true
if (true == true)    	// Retorna  true
if (true === 'true') 	// Retorna  false
if (true === '1')    	// Retorna  false
if (true === true)   	// Retorna  true (igualdade estrita, mesmo tipo e mesmo valor)

*/