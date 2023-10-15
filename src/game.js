export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playFieldHeight = 20;
    playFieldWidth = 10;
    playField = this.generatePlayField(this.playFieldHeight, this.playFieldWidth);
    activePiece = this.createPiece();
    nextPiece = this.createPiece()

    createPiece(){
        const index = Math.floor(Math.random()*7);
        const piece = {};

        switch (index){
            case 0:
                piece.blocks = [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ];
                break;
            case 1:
                piece.blocks = [
                    [2, 2],
                    [2, 2]
                ];
                break;
            case 2:
                piece.blocks = [
                    [3,3,0],
                    [0,3,3],
                    [0,0,0]
                ];
                break;
            case 3:
                piece.blocks = [
                    [0, 4, 4],
                    [4, 4, 0],
                    [0, 0, 0]
                ];
                break;
            case 4:
                piece.blocks = [
                    [5, 5, 0],
                    [0, 5, 0],
                    [0, 5, 0]
                ];
                break;
            case 5:
                piece.blocks = [
                    [0, 6, 0],
                    [0, 6, 0],
                    [6, 6, 0]
                ];
                break;
            case 6:
                piece.blocks = [
                    [0, 0, 0, 0],
                    [7, 7, 7, 7],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
        }
        piece.x = Math.floor((this.playFieldWidth - piece.blocks.length)/2);
        piece.y = 0;

        return piece;
    }

    movePieceLeft(){
        this.activePiece.x -= 1;

        if(this.hasCollision())
            this.activePiece.x += 1;
    }

    movePieceRight(){
        this.activePiece.x += 1;

        if(this.hasCollision())
            this.activePiece.x -= 1;
    }

    movePieceDown(){
        this.activePiece.y += 1;

        if(this.hasCollision()) {
            this.activePiece.y -= 1;
            this.fixPiece();
            this.clearLines();
            this.activePiece = this.nextPiece;
            this.nextPiece = this.createPiece();
        }
    }

    clearLines(){
        const lineFalls = []
        for (let i=0; i<this.playFieldHeight; i++)
            lineFalls[i] = 0;

        again:
        for(let y=this.playFieldHeight - 1; y>=0; y--){
            for(let x=0; x<this.playFieldWidth; x++){
                if(this.playField[y][x] === 0)
                    continue again;
            }
            this.lines += 1;
            for(let i=y-1; i>=0; i--){
                lineFalls[i] += 1;
            }
        }
        console.log(lineFalls);

        for(let y=this.playFieldHeight - 1; y>=0; y--){
            if(lineFalls[y] > 0 && y+lineFalls[y]<this.playFieldHeight){
                for (let x=0; x < this.playFieldWidth; x++){
                    this.playField[y+lineFalls[y]][x] = this.playField[y][x];
                }
            }
        }
        this.updateScore();
    }

    updateScore(){
        this.score = (this.level+1)*50*this.lines;
        if(this.lines >= 10){
            this.level += 1;
            this.lines -= 10;
        }
    }

    getGameState(){
        const playField = this.generatePlayField(this.playFieldHeight, this.playFieldWidth);
        for (let y = 0; y < this.playFieldHeight; y++)
            for (let x = 0; x < this.playFieldWidth; x++)
                playField[y][x] = this.playField[y][x];

        for (let y = 0; y < this.activePiece.blocks.length; y++)
            for (let x = 0; x < this.activePiece.blocks[y].length; x++)
                if(this.activePiece.blocks[y][x])
                    playField[y + this.activePiece.y][x + this.activePiece.x] = this.activePiece.blocks[y][x];

        return {
            score: this.score,
            level: this.level,
            lines: this.lines,
            nextPiece: this.nextPiece,
            playField
        }
    }

    generatePlayField(height, width){
        const field = [];
        for (let y = 0; y < height; y++){
            field[y] = [];
            for (let x = 0; x < width; x++)
                field[y][x] = 0;
        }
        return field;
    }

    turnPiece(){
        const blocks = this.activePiece.blocks
        const length = blocks.length
        const blocksCopy = []
        for (let y = 0; y < length; y++){
            blocksCopy[y] = [];
            for (let x = 0; x < length; x++)
                blocksCopy[y][x] = blocks[y][x];
        }
        for (let y = 0; y < length; y++){
            for (let x = 0; x < length; x++)
                blocks[x][y] = blocksCopy[length - 1 - y][x]
        }

        if(this.hasCollision())
            this.activePiece.blocks = blocksCopy;
    }

    hasCollision(){
        const playField = this.playField;
        const blocks = this.activePiece.blocks
        const yPiece = this.activePiece.y;
        const xPiece = this.activePiece.x;
        for (let y = 0; y < blocks.length; y++){
            for (let x = 0; x < blocks[y].length; x++){
                if (
                    blocks[y][x] &&
                    ((playField[y + yPiece] === undefined || playField[y + yPiece][x + xPiece] === undefined) ||
                    playField[y + yPiece][x + xPiece])
                ) return true;
            }
        }
        return false;
    }

    fixPiece(){
        const activePiece = this.activePiece
        const blocks = activePiece.blocks
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++){
                if(blocks[y][x])
                    this.playField[y + activePiece.y][x + activePiece.x] = blocks[y][x];
            }
        }
    }


}