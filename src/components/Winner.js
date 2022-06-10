const Winner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

function isDraw(square) {
    for (let i = 0; i < 9; i++) {
        if (square[i] === null) {
            return false;
        }
    }
    return true;
}

function checkWinner(board) {
    const winnner= Winner(board);
    const draw = isDraw(board);
    if (winnner!==null)
        return winnner
    else
    if(draw)
        return "Draw"
    else
        return null
}

function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let scores = {
	X: 10,
	O: -10,
	draw: 0
};

function MMax(board, depth, isMaximizing, ai, human)
{
	let result = Winner(board);
	if(result !== null) {
		return scores[result];
	}
    if(isMaximizing)
    {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i]==null) {
                board[i] = ai;
                let score = MMax(board, depth + 1, false , ai, human) + Random(-5,5);
                board[i] = null;
                bestScore = Math.max(score,bestScore);
            }
        }
        return bestScore;
    }
    else
    {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] == null) {
                board[i] = human;
                let score = MMax(board, depth + 1, true, ai, human) + Random(-5, 5);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}



const AiMove = (square, Turn, ai) => {
	let board = square.slice()
	let bestScore = -Infinity
	let bestMove;
	
	for (let i = 0; i < 9; i++) {
		if(board[i] === null) {
			board[i] = Turn
			let score = MMax(board, 0, false, Turn, ai)
			board[i] = null
			if (score > bestScore) {
				bestScore = score;
				bestMove = i;
			}
		} console.log(bestMove)
	} return bestMove
} 
const HumanAiMove = (square, Turn, human) => {
	let board = square.slice()
	let bestScore = Infinity
	let move;
	
	for (let i = 0; i < 9; i++) {
		if(board[i] === null) {
			board[i] = Turn
			let score = MMax(board, 0, true, Turn, human)
			board[i] = null
			if (score < bestScore) {
				bestScore = score;
				move = i;
			}
		} console.log(move)
	} return move
} 

export { checkWinner, AiMove, HumanAiMove, Winner }