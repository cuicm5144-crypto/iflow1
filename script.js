// 中国象棋游戏逻辑
class ChineseChess {
    constructor() {
        // 初始化棋盘 - 10行9列
        this.board = Array(10).fill().map(() => Array(9).fill(null));
        this.currentPlayer = 'red'; // 红方先走
        this.selectedPiece = null;
        this.gameHistory = [];
        this.initBoard();
    }

    // 初始化棋盘布局
    initBoard() {
        // 初始化黑方棋子 (上方)
        // 将/帅
        this.board[0][4] = { type: 'king', color: 'black', chinese: '将' };
        // 士
        this.board[0][3] = { type: 'advisor', color: 'black', chinese: '士' };
        this.board[0][5] = { type: 'advisor', color: 'black', chinese: '士' };
        // 象
        this.board[0][2] = { type: 'bishop', color: 'black', chinese: '象' };
        this.board[0][6] = { type: 'bishop', color: 'black', chinese: '象' };
        // 马
        this.board[0][1] = { type: 'knight', color: 'black', chinese: '马' };
        this.board[0][7] = { type: 'knight', color: 'black', chinese: '马' };
        // 车
        this.board[0][0] = { type: 'rook', color: 'black', chinese: '车' };
        this.board[0][8] = { type: 'rook', color: 'black', chinese: '车' };
        // 炮
        this.board[2][1] = { type: 'cannon', color: 'black', chinese: '炮' };
        this.board[2][7] = { type: 'cannon', color: 'black', chinese: '炮' };
        // 卒
        this.board[3][0] = { type: 'pawn', color: 'black', chinese: '卒' };
        this.board[3][2] = { type: 'pawn', color: 'black', chinese: '卒' };
        this.board[3][4] = { type: 'pawn', color: 'black', chinese: '卒' };
        this.board[3][6] = { type: 'pawn', color: 'black', chinese: '卒' };
        this.board[3][8] = { type: 'pawn', color: 'black', chinese: '卒' };

        // 初始化红方棋子 (下方)
        // 帅/将
        this.board[9][4] = { type: 'king', color: 'red', chinese: '帅' };
        // 仕
        this.board[9][3] = { type: 'advisor', color: 'red', chinese: '仕' };
        this.board[9][5] = { type: 'advisor', color: 'red', chinese: '仕' };
        // 相
        this.board[9][2] = { type: 'bishop', color: 'red', chinese: '相' };
        this.board[9][6] = { type: 'bishop', color: 'red', chinese: '相' };
        // 马
        this.board[9][1] = { type: 'knight', color: 'red', chinese: '马' };
        this.board[9][7] = { type: 'knight', color: 'red', chinese: '马' };
        // 车
        this.board[9][0] = { type: 'rook', color: 'red', chinese: '车' };
        this.board[9][8] = { type: 'rook', color: 'red', chinese: '车' };
        // 炮
        this.board[7][1] = { type: 'cannon', color: 'red', chinese: '炮' };
        this.board[7][7] = { type: 'cannon', color: 'red', chinese: '炮' };
        // 兵
        this.board[6][0] = { type: 'pawn', color: 'red', chinese: '兵' };
        this.board[6][2] = { type: 'pawn', color: 'red', chinese: '兵' };
        this.board[6][4] = { type: 'pawn', color: 'red', chinese: '兵' };
        this.board[6][6] = { type: 'pawn', color: 'red', chinese: '兵' };
        this.board[6][8] = { type: 'pawn', color: 'red', chinese: '兵' };
    }

    // 检查位置是否在棋盘内
    isValidPosition(row, col) {
        return row >= 0 && row < 10 && col >= 0 && col < 9;
    }

    // 获取可能的移动位置
    getPossibleMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece || piece.color !== this.currentPlayer) {
            return [];
        }

        const moves = [];
        switch (piece.type) {
            case 'king': // 将/帅
                moves.push(...this.getKingMoves(row, col));
                break;
            case 'advisor': // 仕/士
                moves.push(...this.getAdvisorMoves(row, col));
                break;
            case 'bishop': // 相/象
                moves.push(...this.getBishopMoves(row, col));
                break;
            case 'knight': // 马
                moves.push(...this.getKnightMoves(row, col));
                break;
            case 'rook': // 车
                moves.push(...this.getRookMoves(row, col));
                break;
            case 'cannon': // 炮
                moves.push(...this.getCannonMoves(row, col));
                break;
            case 'pawn': // 兵/卒
                moves.push(...this.getPawnMoves(row, col));
                break;
        }

        // 过滤掉会导致被将军的移动
        return moves.filter(move => !this.wouldBeInCheckAfterMove(row, col, move[0], move[1]));
    }

    // 将/帅移动规则
    getKingMoves(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        // 将/帅只能在九宫格内移动
        const maxRow = isRed ? 9 : 2;
        const minRow = isRed ? 7 : 0;
        
        // 上下左右移动一格
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= minRow && newRow <= maxRow && newCol >= 3 && newCol <= 5) {
                const target = this.board[newRow][newCol];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        // 特殊规则：将帅不能照面（在同一列且中间无子）
        for (let r = 0; r < 10; r++) {
            if (this.board[r][col] && this.board[r][col].type === 'king' && 
                this.board[r][col].color !== this.board[row][col].color) {
                let blocked = false;
                let start = Math.min(row, r) + 1;
                let end = Math.max(row, r);
                
                for (let i = start; i < end; i++) {
                    if (this.board[i][col] && i !== row) {
                        blocked = true;
                        break;
                    }
                }
                
                if (!blocked) {
                    // 这个位置会导致将帅照面，不能移动
                    return []; // 返回空数组表示不能移动
                }
            }
        }
        
        return moves;
    }

    // 仕/士移动规则
    getAdvisorMoves(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        // 仕/士只能在九宫格内斜向移动一格
        const maxRow = isRed ? 9 : 2;
        const minRow = isRed ? 7 : 0;
        
        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= minRow && newRow <= maxRow && newCol >= 3 && newCol <= 5) {
                const target = this.board[newRow][newCol];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }

    // 相/象移动规则
    getBishopMoves(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        // 相/象斜向移动两格，且不能过河
        const directions = [[-2, -2], [-2, 2], [2, -2], [2, 2]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            // 红方相不能过河（row > 4），黑方相不能过河（row < 5）
            if (isRed && newRow <= 4) continue;
            if (!isRed && newRow >= 5) continue;
            
            if (this.isValidPosition(newRow, newCol)) {
                const target = this.board[newRow][newCol];
                const blockedRow = row + dr/2;
                const blockedCol = col + dc/2;
                
                // 检查象眼是否被堵
                if (!this.board[blockedRow][blockedCol] && 
                    (!target || target.color !== this.board[row][col].color)) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }

    // 马移动规则
    getKnightMoves(row, col) {
        const moves = [];
        // 马走日字，8个方向
        const movesAndBlocks = [
            // 上
            [[-2, -1], [-1, -1]], [[-2, 1], [-1, 1]],
            // 下
            [[2, -1], [1, -1]], [[2, 1], [1, 1]],
            // 左
            [[-1, -2], [-1, -1]], [[1, -2], [1, -1]],
            // 右
            [[-1, 2], [-1, 1]], [[1, 2], [1, 1]]
        ];
        
        for (const [[dr, dc], [br, bc]] of movesAndBlocks) {
            const newRow = row + dr;
            const newCol = col + dc;
            const blockRow = row + br;
            const blockCol = col + bc;
            
            if (this.isValidPosition(newRow, newCol) && 
                !this.board[blockRow][blockCol]) { // 马腿没有被蹩
                const target = this.board[newRow][newCol];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }

    // 车移动规则
    getRookMoves(row, col) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右
        
        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            
            while (this.isValidPosition(r, c)) {
                if (!this.board[r][c]) {
                    // 空位可以移动
                    moves.push([r, c]);
                } else {
                    // 遇到棋子，如果是对方棋子则可以吃掉
                    if (this.board[r][c].color !== this.board[row][col].color) {
                        moves.push([r, c]);
                    }
                    break; // 无论是否能吃，都停止
                }
                r += dr;
                c += dc;
            }
        }
        
        return moves;
    }

    // 炮移动规则
    getCannonMoves(row, col) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 上下左右
        
        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            let hasJumped = false; // 是否已经翻过山
            
            while (this.isValidPosition(r, c)) {
                if (!this.board[r][c]) {
                    // 没有翻山前可以移动
                    if (!hasJumped) {
                        moves.push([r, c]);
                    }
                } else {
                    // 遇到棋子
                    if (!hasJumped) {
                        // 还没翻山，记录翻山
                        hasJumped = true;
                    } else {
                        // 已经翻过山，如果是对方棋子则可以吃掉
                        if (this.board[r][c].color !== this.board[row][col].color) {
                            moves.push([r, c]);
                        }
                        break; // 无论是否能吃，都停止
                    }
                }
                r += dr;
                c += dc;
            }
        }
        
        return moves;
    }

    // 兵/卒移动规则
    getPawnMoves(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        // 红兵向下，黑卒向上
        const forward = isRed ? -1 : 1;
        
        // 未过河的兵只能向前
        if ((isRed && row > 4) || (!isRed && row < 5)) {
            const newRow = row + forward;
            if (this.isValidPosition(newRow, col)) {
                const target = this.board[newRow][col];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, col]);
                }
            }
        } else {
            // 过河后的兵可以向前、左、右移动
            const directions = [[forward, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (this.isValidPosition(newRow, newCol)) {
                    const target = this.board[newRow][newCol];
                    if (!target || target.color !== this.board[row][col].color) {
                        moves.push([newRow, newCol]);
                    }
                }
            }
        }
        
        return moves;
    }

    // 检查移动后是否会导致被将军
    wouldBeInCheckAfterMove(fromRow, fromCol, toRow, toCol) {
        // 临时移动棋子
        const originalPiece = this.board[toRow][toCol];
        const movingPiece = this.board[fromRow][fromCol];
        
        this.board[toRow][toCol] = movingPiece;
        this.board[fromRow][fromCol] = null;
        
        const inCheck = this.isInCheck(this.currentPlayer);
        
        // 恢复棋子
        this.board[fromRow][fromCol] = movingPiece;
        this.board[toRow][toCol] = originalPiece;
        
        return inCheck;
    }

    // 检查某一方是否被将军
    isInCheck(color) {
        // 找到该方的将/帅位置
        let kingRow = -1, kingCol = -1;
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 9; c++) {
                const piece = this.board[r][c];
                if (piece && piece.type === 'king' && piece.color === color) {
                    kingRow = r;
                    kingCol = c;
                    break;
                }
            }
            if (kingRow !== -1) break;
        }
        
        // 检查对方是否有棋子能吃到将/帅
        const opponentColor = color === 'red' ? 'black' : 'red';
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 9; c++) {
                const piece = this.board[r][c];
                if (piece && piece.color === opponentColor) {
                    const moves = this.getActualPieceMoves(r, c);
                    if (moves.some(([mr, mc]) => mr === kingRow && mc === kingCol)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }

    // 获取棋子实际可走的路径（不考虑将军问题）
    getActualPieceMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        switch (piece.type) {
            case 'king':
                return this.getKingMovesNoCheck(row, col);
            case 'advisor':
                return this.getAdvisorMovesNoCheck(row, col);
            case 'bishop':
                return this.getBishopMovesNoCheck(row, col);
            case 'knight':
                return this.getKnightMovesNoCheck(row, col);
            case 'rook':
                return this.getRookMovesNoCheck(row, col);
            case 'cannon':
                return this.getCannonMovesNoCheck(row, col);
            case 'pawn':
                return this.getPawnMovesNoCheck(row, col);
        }
        
        return [];
    }

    // 不考虑将军问题的移动规则（用于检查是否被将军）
    getKingMovesNoCheck(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        const maxRow = isRed ? 9 : 2;
        const minRow = isRed ? 7 : 0;
        
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= minRow && newRow <= maxRow && newCol >= 3 && newCol <= 5) {
                const target = this.board[newRow][newCol];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }

    getAdvisorMovesNoCheck(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        const maxRow = isRed ? 9 : 2;
        const minRow = isRed ? 7 : 0;
        
        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (newRow >= minRow && newRow <= maxRow && newCol >= 3 && newCol <= 5) {
                const target = this.board[newRow][newCol];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }

    getBishopMovesNoCheck(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        const directions = [[-2, -2], [-2, 2], [2, -2], [2, 2]];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (isRed && newRow <= 4) continue;
            if (!isRed && newRow >= 5) continue;
            
            if (this.isValidPosition(newRow, newCol)) {
                const target = this.board[newRow][newCol];
                const blockedRow = row + dr/2;
                const blockedCol = col + dc/2;
                
                if (!this.board[blockedRow][blockedCol] && 
                    (!target || target.color !== this.board[row][col].color)) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }

    getKnightMovesNoCheck(row, col) {
        const moves = [];
        const movesAndBlocks = [
            [[-2, -1], [-1, -1]], [[-2, 1], [-1, 1]],
            [[2, -1], [1, -1]], [[2, 1], [1, 1]],
            [[-1, -2], [-1, -1]], [[1, -2], [1, -1]],
            [[-1, 2], [-1, 1]], [[1, 2], [1, 1]]
        ];
        
        for (const [[dr, dc], [br, bc]] of movesAndBlocks) {
            const newRow = row + dr;
            const newCol = col + dc;
            const blockRow = row + br;
            const blockCol = col + bc;
            
            if (this.isValidPosition(newRow, newCol) && 
                !this.board[blockRow][blockCol]) {
                const target = this.board[newRow][newCol];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, newCol]);
                }
            }
        }
        
        return moves;
    }

    getRookMovesNoCheck(row, col) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            
            while (this.isValidPosition(r, c)) {
                if (!this.board[r][c]) {
                    moves.push([r, c]);
                } else {
                    if (this.board[r][c].color !== this.board[row][col].color) {
                        moves.push([r, c]);
                    }
                    break;
                }
                r += dr;
                c += dc;
            }
        }
        
        return moves;
    }

    getCannonMovesNoCheck(row, col) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            let hasJumped = false;
            
            while (this.isValidPosition(r, c)) {
                if (!this.board[r][c]) {
                    if (!hasJumped) {
                        moves.push([r, c]);
                    }
                } else {
                    if (!hasJumped) {
                        hasJumped = true;
                    } else {
                        if (this.board[r][c].color !== this.board[row][col].color) {
                            moves.push([r, c]);
                        }
                        break;
                    }
                }
                r += dr;
                c += dc;
            }
        }
        
        return moves;
    }

    getPawnMovesNoCheck(row, col) {
        const moves = [];
        const isRed = this.board[row][col].color === 'red';
        
        const forward = isRed ? -1 : 1;
        
        if ((isRed && row > 4) || (!isRed && row < 5)) {
            const newRow = row + forward;
            if (this.isValidPosition(newRow, col)) {
                const target = this.board[newRow][col];
                if (!target || target.color !== this.board[row][col].color) {
                    moves.push([newRow, col]);
                }
            }
        } else {
            const directions = [[forward, 0], [0, -1], [0, 1]];
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (this.isValidPosition(newRow, newCol)) {
                    const target = this.board[newRow][newCol];
                    if (!target || target.color !== this.board[row][col].color) {
                        moves.push([newRow, newCol]);
                    }
                }
            }
        }
        
        return moves;
    }

    // 移动棋子
    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        if (!piece) return false;
        
        const possibleMoves = this.getPossibleMoves(fromRow, fromCol);
        const isValidMove = possibleMoves.some(([r, c]) => r === toRow && c === toCol);
        
        if (!isValidMove) return false;
        
        // 保存游戏历史
        this.gameHistory.push({
            from: [fromRow, fromCol],
            to: [toRow, toCol],
            piece: {...piece},
            captured: this.board[toRow][toCol] ? {...this.board[toRow][toCol]} : null,
            player: this.currentPlayer
        });
        
        // 移动棋子
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // 切换玩家
        this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        
        return true;
    }

    // 悔棋
    undoMove() {
        if (this.gameHistory.length === 0) return false;
        
        const lastMove = this.gameHistory.pop();
        const { from, to, piece, captured, player } = lastMove;
        
        // 恢复棋子位置
        this.board[from[0]][from[1]] = piece;
        this.board[to[0]][to[1]] = captured;
        
        // 切换回之前的玩家
        this.currentPlayer = player;
        
        return true;
    }

    // 检查游戏是否结束
    isGameOver() {
        // 检查是否有一方的将/帅被吃掉
        let redKingExists = false;
        let blackKingExists = false;
        
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 9; c++) {
                const piece = this.board[r][c];
                if (piece && piece.type === 'king') {
                    if (piece.color === 'red') {
                        redKingExists = true;
                    } else {
                        blackKingExists = true;
                    }
                }
            }
        }
        
        return !redKingExists || !blackKingExists;
    }

    // 获取游戏状态
    getGameState() {
        return {
            board: this.board,
            currentPlayer: this.currentPlayer,
            gameOver: this.isGameOver()
        };
    }
}

// 象棋大师AI
class ChessMasterAI {
    constructor(game) {
        this.game = game;
    }

    // 评估棋局
    evaluateBoard() {
        let score = 0;
        
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 9; c++) {
                const piece = this.game.board[r][c];
                if (piece) {
                    const pieceValue = this.getPieceValue(piece, r, c);
                    score += piece.color === 'red' ? pieceValue : -pieceValue;
                }
            }
        }
        
        return score;
    }

    // 获取棋子价值（在棋盘上的特定位置）
    getPieceValue(piece, row, col) {
        // 棋子基本价值
        const values = {
            'king': 1000,    // 将/帅
            'rook': 100,     // 车
            'cannon': 80,    // 炮
            'knight': 60,    // 马
            'bishop': 30,    // 相/象
            'advisor': 30,   // 仕/士
            'pawn': 15       // 兵/卒
        };
        
        // 奖励因素：位置、控制力等
        let value = values[piece.type] || 0;
        
        // 兵/卒过河后价值提高
        if (piece.type === 'pawn') {
            if ((piece.color === 'red' && row < 5) || (piece.color === 'black' && row > 4)) {
                value += 20; // 过河后价值提升
            }
        }
        
        return value;
    }

    // 使用极大极小算法计算最佳移动
    getBestMove(depth = 2) {
        const currentPlayer = this.game.currentPlayer;
        let bestMove = null;
        let bestValue = currentPlayer === 'red' ? -Infinity : Infinity;
        
        // 遍历所有可能的移动
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 9; c++) {
                const piece = this.game.board[r][c];
                if (piece && piece.color === currentPlayer) {
                    const possibleMoves = this.game.getPossibleMoves(r, c);
                    
                    for (const [toRow, toCol] of possibleMoves) {
                        // 临时移动棋子
                        const originalPiece = this.game.board[toRow][toCol];
                        const movingPiece = this.game.board[r][c];
                        
                        this.game.board[toRow][toCol] = movingPiece;
                        this.game.board[r][c] = null;
                        
                        // 切换玩家并评估
                        const originalPlayer = this.game.currentPlayer;
                        this.game.currentPlayer = originalPlayer === 'red' ? 'black' : 'red';
                        
                        const moveValue = this.minimax(depth - 1, -Infinity, Infinity, originalPlayer !== 'red');
                        
                        // 恢复棋子和玩家
                        this.game.board[r][c] = movingPiece;
                        this.game.board[toRow][toCol] = originalPiece;
                        this.game.currentPlayer = originalPlayer;
                        
                        // 更新最佳移动
                        if ((currentPlayer === 'red' && moveValue > bestValue) || 
                            (currentPlayer === 'black' && moveValue < bestValue)) {
                            bestValue = moveValue;
                            bestMove = { from: [r, c], to: [toRow, toCol] };
                        }
                    }
                }
            }
        }
        
        return bestMove;
    }

    // 极大极小算法
    minimax(depth, alpha, beta, isMaximizing) {
        if (depth === 0 || this.game.isGameOver()) {
            return this.evaluateBoard();
        }
        
        const currentPlayer = this.game.currentPlayer;
        
        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let r = 0; r < 10; r++) {
                for (let c = 0; c < 9; c++) {
                    const piece = this.game.board[r][c];
                    if (piece && piece.color === currentPlayer) {
                        const possibleMoves = this.game.getPossibleMoves(r, c);
                        
                        for (const [toRow, toCol] of possibleMoves) {
                            // 临时移动
                            const originalPiece = this.game.board[toRow][toCol];
                            const movingPiece = this.game.board[r][c];
                            
                            this.game.board[toRow][toCol] = movingPiece;
                            this.game.board[r][c] = null;
                            
                            // 递归
                            const originalPlayer = this.game.currentPlayer;
                            this.game.currentPlayer = originalPlayer === 'red' ? 'black' : 'red';
                            
                            const eval = this.minimax(depth - 1, alpha, beta, false);
                            
                            // 恢复
                            this.game.board[r][c] = movingPiece;
                            this.game.board[toRow][toCol] = originalPiece;
                            this.game.currentPlayer = originalPlayer;
                            
                            maxEval = Math.max(maxEval, eval);
                            alpha = Math.max(alpha, eval);
                            
                            if (beta <= alpha) break; // Alpha-beta剪枝
                        }
                    }
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let r = 0; r < 10; r++) {
                for (let c = 0; c < 9; c++) {
                    const piece = this.game.board[r][c];
                    if (piece && piece.color === currentPlayer) {
                        const possibleMoves = this.game.getPossibleMoves(r, c);
                        
                        for (const [toRow, toCol] of possibleMoves) {
                            // 临时移动
                            const originalPiece = this.game.board[toRow][toCol];
                            const movingPiece = this.game.board[r][c];
                            
                            this.game.board[toRow][toCol] = movingPiece;
                            this.game.board[r][c] = null;
                            
                            // 递归
                            const originalPlayer = this.game.currentPlayer;
                            this.game.currentPlayer = originalPlayer === 'red' ? 'black' : 'red';
                            
                            const eval = this.minimax(depth - 1, alpha, beta, true);
                            
                            // 恢复
                            this.game.board[r][c] = movingPiece;
                            this.game.board[toRow][toCol] = originalPiece;
                            this.game.currentPlayer = originalPlayer;
                            
                            minEval = Math.min(minEval, eval);
                            beta = Math.min(beta, eval);
                            
                            if (beta <= alpha) break; // Alpha-beta剪枝
                        }
                    }
                }
            }
            return minEval;
        }
    }

    // 获取建议
    getSuggestion() {
        const bestMove = this.getBestMove();
        if (!bestMove) {
            return "目前没有好的移动建议。";
        }
        
        const fromRow = bestMove.from[0];
        const fromCol = bestMove.from[1];
        const toRow = bestMove.to[0];
        const toCol = bestMove.to[1];
        
        const piece = this.game.board[fromRow][fromCol];
        if (!piece) return "计算建议时出现错误。";
        
        // 将坐标转换为中文描述
        const colNames = ['9', '8', '7', '6', '5', '4', '3', '2', '1']; // 从右到左
        const rowNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; // 从下到上（对于红方视角）
        
        // 根据当前玩家视角决定行坐标
        let fromColName, toColName, fromRowName, toRowName;
        if (this.game.currentPlayer === 'red') {
            // 红方视角（下方）
            fromColName = colNames[fromCol];
            toColName = colNames[toCol];
            fromRowName = rowNames[9 - fromRow]; // 翻转行号
            toRowName = rowNames[9 - toRow]; // 翻转行号
        } else {
            // 黑方视角（上方）
            fromColName = colNames[8 - fromCol]; // 翻转列号
            toColName = colNames[8 - toCol]; // 翻转列号
            fromRowName = rowNames[fromRow]; // 不翻转行号
            toRowName = rowNames[toRow]; // 不翻转行号
        }
        
        // 简单的中文描述
        const pieceNames = {
            'king': '将',
            'advisor': '士',
            'bishop': '象',
            'knight': '马',
            'rook': '车',
            'cannon': '炮',
            'pawn': '兵'
        };
        
        const pieceName = pieceNames[piece.type];
        
        return `建议移动：${pieceName} 从 ${fromColName}${fromRowName} 到 ${toColName}${toRowName}。这是一个优势明显的移动！`;
    }
}

// 游戏界面控制
class ChessGameUI {
    constructor() {
        this.game = new ChineseChess();
        this.ai = new ChessMasterAI(this.game);
        this.selectedSquare = null;
        this.initUI();
    }

    initUI() {
        this.renderBoard();
        this.bindEvents();
        this.updateGameInfo();
    }

    renderBoard() {
        const chessboard = document.getElementById('chessboard');
        chessboard.innerHTML = '';
        
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 9; c++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = r;
                square.dataset.col = c;
                
                const piece = this.game.board[r][c];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `piece ${piece.color}`;
                    pieceElement.textContent = piece.chinese;
                    pieceElement.title = piece.color === 'red' ? '红方' : '黑方';
                    square.appendChild(pieceElement);
                }
                
                chessboard.appendChild(square);
            }
        }
    }

    bindEvents() {
        // 棋盘点击事件
        document.getElementById('chessboard').addEventListener('click', (e) => {
            const square = e.target.closest('.square');
            if (!square) return;
            
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            
            this.handleSquareClick(row, col);
        });
        
        // 获取大师建议按钮
        document.getElementById('suggest-move').addEventListener('click', () => {
            this.showSuggestion();
        });
        
        // 新游戏按钮
        document.getElementById('new-game').addEventListener('click', () => {
            this.newGame();
        });
        
        // 悔棋按钮
        document.getElementById('undo-move').addEventListener('click', () => {
            this.undoMove();
        });
    }

    handleSquareClick(row, col) {
        const piece = this.game.board[row][col];
        
        if (this.selectedSquare) {
            const [selectedRow, selectedCol] = this.selectedSquare;
            
            // 如果点击的是同一个格子，取消选择
            if (selectedRow === row && selectedCol === col) {
                this.selectedSquare = null;
                this.renderBoard();
                return;
            }
            
            // 如果点击的是自己的另一个棋子，切换选择
            if (piece && piece.color === this.game.currentPlayer) {
                this.selectedSquare = [row, col];
                this.showPossibleMoves();
                return;
            }
            
            // 尝试移动棋子
            if (this.game.movePiece(selectedRow, selectedCol, row, col)) {
                this.selectedSquare = null;
                this.renderBoard();
                this.updateGameInfo();
                
                if (this.game.isGameOver()) {
                    const winner = this.game.currentPlayer === 'red' ? '黑方' : '红方';
                    alert(`游戏结束！${winner}获胜！`);
                } else {
                    // 如果是黑方回合，稍等一下再显示AI建议
                    setTimeout(() => {
                        if (this.game.currentPlayer === 'black') {
                            this.showSuggestion();
                        }
                    }, 500);
                }
            } else {
                alert('不能这样移动！');
            }
        } else {
            // 如果点击的是当前玩家的棋子，选择它
            if (piece && piece.color === this.game.currentPlayer) {
                this.selectedSquare = [row, col];
                this.showPossibleMoves();
            }
        }
    }

    showPossibleMoves() {
        this.renderBoard();
        
        if (this.selectedSquare) {
            const [row, col] = this.selectedSquare;
            const possibleMoves = this.game.getPossibleMoves(row, col);
            
            // 高亮选中的棋子
            const selectedSquare = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
            if (selectedSquare) {
                selectedSquare.classList.add('selected');
            }
            
            // 标记可能的移动位置
            for (const [r, c] of possibleMoves) {
                const square = document.querySelector(`.square[data-row="${r}"][data-col="${c}"]`);
                if (square) {
                    square.classList.add('possible-move');
                }
            }
        }
    }

    updateGameInfo() {
        const currentPlayerElement = document.getElementById('current-player');
        currentPlayerElement.textContent = this.game.currentPlayer === 'red' ? '红方' : '黑方';
    }

    showSuggestion() {
        if (this.game.currentPlayer === 'black') {
            // 为黑方提供AI建议
            const suggestion = this.ai.getSuggestion();
            document.getElementById('suggestion-text').textContent = suggestion;
        } else {
            // 为红方提供AI建议
            // 临时切换玩家以获取红方的建议
            this.game.currentPlayer = 'red';
            const suggestion = this.ai.getSuggestion();
            this.game.currentPlayer = 'black'; // 切换回黑方
            document.getElementById('suggestion-text').textContent = suggestion;
        }
    }

    newGame() {
        this.game = new ChineseChess();
        this.ai = new ChessMasterAI(this.game);
        this.selectedSquare = null;
        this.renderBoard();
        this.updateGameInfo();
        document.getElementById('suggestion-text').textContent = '等待你的回合...';
    }

    undoMove() {
        if (this.game.undoMove()) {
            this.selectedSquare = null;
            this.renderBoard();
            this.updateGameInfo();
            document.getElementById('suggestion-text').textContent = '已悔棋，继续游戏...';
        } else {
            alert('无法悔棋！');
        }
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new ChessGameUI();
});