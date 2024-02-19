//1. Deposit money from user
//2. Determine num of lines user is betting
//3.Collect bet amount from user
//4.Spin the slot machine
//5.Check if the user won
//6. Update users money
//7.Play again


const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {

    A:2,
    B:4,
    C:6,
    D:8
}


const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}








const deposit = ()=>{

    while(true){
    const depositAmount = parseFloat(prompt("Enter a deposit amount: "));
    if (isNaN(depositAmount) || depositAmount <= 0){
        console.log("Invalid Deposit amount, please try again");
    }

    else{

        return depositAmount;
    }
}
};


const getNumberOfLines = () =>{

    while(true){
        const numberOfLines = parseFloat(prompt("Enter the number of lines to bet on : "));
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3 ){
            console.log("Invalid number of lines, please try again");
        }
    
        else{
    
            return numberOfLines;
        }
    }

};
    

const getBet = (balance, lines) => {

    while(true){
        const bet = parseFloat(prompt("Enter the bet amount per line : "));
        if (isNaN(bet) || bet <= 0 || bet > balance/ lines ){
            console.log("Invalid bet, please try again");
        }
    
        else{
    
            return bet;
        }
    }

};



const spin = () => {
    const symbols = [];

    for( const [symbol, count] of Object.entries(SYMBOLS_COUNT) ){
        for(let i=0; i<count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i=0; i<COLS; i++){
        reels.push([]);
        // const reelSymbols = [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()* symbols.length);
            const selectedSymbol = symbols[randomIndex];
            reels[i][j] = selectedSymbol;
            symbols.splice(randomIndex,1)
        }
    }

    return reels;

};

const transpose = (reels) => {
    const rows = [];

    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i][j] = (reels[j][i]);
        }
    }

    return rows;
    
}

const printRows = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for( const [i, el] of row.entries()){
            rowString += el;
            if(i!= row.length - 1){
                rowString+=' | ';
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row=0; row<lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame = false;
                break;
            }
        }


        if(allSame){

            winnings+=bet*SYMBOL_VALUES[symbols[0]];

        }

    }

    // if(allSame){
    //     return winnings;
    // }

    // winnings-=bet*lines;
    return winnings;

    
}


const game = () => {

    let balance = deposit();
    while(true){
        
        
        console.log("Your balance amount is $ ", balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);

        balance -=  bet*numberOfLines;
        const reels = spin();
        const rows = transpose(reels);

        console.log(reels);
        console.log(rows);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance+= winnings;
        console.log("You won, $", winnings.toString());

        if(balance<=0){
            console.log("Ypu ran out of money!");
            break;
        }

        const playAgain = prompt("Do you wnat to play again (y/n)");

        if (playAgain!="y")
        {
            break;
        }


}
}

game();


