var readlineSync = require('readline-sync');

const emptyString = '  ';
let boardData = Array(9).fill(emptyString);
const players = {
  1: 'x',
  2: 'o',
};

let victory = {
    1: 0,
    2: 0
}

let currentPlayer = selectSymbol(players);
showTutorial();
startGame();


function startGame(){
    if(hasWinner(boardData) === true){
        console.log(`O vencedor foi: ${lastPlayer()} =)`);
        clearBoard();
        reGame();
    } else {
        if(isGameOver()){
            console.log(`Ninguém ganhou a partida =( `)
            clearBoard();
            reGame();
        }
        else{
            setPlayerMovement();
            startGame();
        }
    }
}

function drawBoard(positions) {
    console.log(`
      ${positions[0]} | ${positions[1]} | ${positions[2]}
      -----------
      ${positions[3]} | ${positions[4]} | ${positions[5]}
      -----------
      ${positions[6]} | ${positions[7]} | ${positions[8]}
    `);
}

function selectSymbol(players){
    const re = /[12]/
    console.log(`Escolha o jogador que vai começar partida: `)
    console.log(`Digite 1 ou 2: `)
    let choicePlayer = parseInt(readlineSync.question(`-->`));
    if(re.test(choicePlayer)){
        return players[choicePlayer];
    } else {
        console.log(`Escolha um jogador válido!`)
        selectSymbol(players);
    }
}

function choicePosition(boardData){
    const re = /[012345678]/
    console.log(`Escolha a posição da jogada: `)
    const choicePlay = readlineSync.question(`--->`);

    if(re.test(choicePlay)){
        return choicePlay;
    } else{
        console.log(`Escolha uma posição válida entre 0-8: `);
        choicePosition();
    }
}

function isEmpty(position) {
    return boardData[position] === emptyString;
}

function changePlayer() {
    if (currentPlayer === players[1]) {
      currentPlayer = players[2];
    } else {
      currentPlayer = players[1];
    }
}

function setPlayerMovement(){
    console.log(`Vez do jogador ${currentPlayer}`)
    position = choicePosition();
    
    if (isEmpty(position)) {
        boardData[position] = currentPlayer;
        changePlayer();
      } else {
        console.log(`A posição ${position} já foi usada`);
        setPlayerMovement();
    }
    drawBoard(boardData);
}

function hasWinner(boardData){

    const dictionary = {
        zero : boardData[0] !== emptyString,
        zeroUm : boardData[0] === boardData[1],
        zeroDois : boardData[0] === boardData[2],
        zeroTres : boardData[0] === boardData[3],
        zeroQuatro : boardData[0] === boardData[4],
        zeroSeis : boardData[0] === boardData[6],
        zeroOito : boardData[0] === boardData[8],
        tres : boardData[3] !== emptyString,
        tresQuatro : boardData[3] === boardData[4],
        tresCinco : boardData[3] === boardData[5],
        um : boardData[1] !== emptyString,
        umQuatro : boardData[1] === boardData[4],
        umSete : boardData[1] === boardData[7],
        dois : boardData[2] !== emptyString,
        doisQuatro: boardData[2] === boardData[4],
        doisCinco : boardData[2] === boardData[5],
        doisSeis : boardData[2] === boardData[6],
        doisOito : boardData[2] === boardData[8],
        seis : boardData[6] !== emptyString,
        seisSete : boardData[6] === boardData[7],
        seisOito : boardData[6] === boardData[8]
    }
     

    if(dictionary.zero && dictionary.zeroUm && dictionary.zeroDois){
        return true;
    }

    if(dictionary.zero && dictionary.zeroTres && dictionary.zeroSeis){
        return true;
    }

    if(dictionary.zero && dictionary.zeroQuatro && dictionary.zeroOito){
        return true;
    }

    if(dictionary.tres && dictionary.tresQuatro && dictionary.tresCinco){
        return true;
    }

    if(dictionary.um && dictionary.umQuatro && dictionary.umSete){
        return true;
    }

    if(dictionary.seis && dictionary.seisSete && dictionary.seisOito){
        return true;
    }

    if(dictionary.dois && dictionary.doisQuatro && dictionary.doisSeis){
        return true;
    }
    
    if(dictionary.dois && dictionary.doisCinco && dictionary.doisOito){
        return true;
    }

    return false;
    
}

function clearBoard(){
    boardData = Array(9).fill(emptyString);
}

function winner(){
    if(victory[1] > victory[2]){
        return console.log(`O vencedor foi "${players[1]}"`);
    } else if (victory[1] < victory[2]){
        return console.log(`O vencedor foi "${players[2]}"`);
    } else {
        return console.log(`O jogo acabou!`)
    }
}

function isGameOver(){
    let aux = [0];
    boardData.map((position)=>{
        if(position !== emptyString){
           aux.push(1); 
        }
    })

    const sum = aux.reduce((acc, curr)=>{
        acc += curr;
        return acc;
    })

    if(sum === 9){
        return true;
    }
    
    return false;
}

function reGame(){
    console.log(`Deseja reiniciar a partida? 'S' - sim ou 'N' - nao `);
    const awnser =  readlineSync.question(`--> `);

    if(awnser === 'S' || awnser === 's'){
        startGame();
    } else {
        isGameOver();
    }
}

function showTutorial() {
    console.log(`
    ### Escolha a posiçao que deseja jogar baseado no tabuleiro abaixo ###
       0 | 1 | 2
      -----------
       3 | 4 | 5
      -----------
       6 | 7 | 8
    ######################################################################
    `);
}

function lastPlayer(){
    if(currentPlayer === players[1]){
        lastPlayer = players[2];
    } else {
        lastPlayer = players[1];
    }

    return lastPlayer;
};
