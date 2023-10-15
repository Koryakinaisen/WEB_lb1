export default class GUI{
    static colors = {
        '1': 'red',
        '2': 'green',
        '3': 'blue',
        '4': 'pink',
        '5': 'cyan',
        '6': 'purple',
        '7': 'orange'
    };
    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.playFieldBorderWidth = 4;
        this.playFieldX = this.playFieldBorderWidth;
        this.playFieldY = this.playFieldBorderWidth;
        this.playFieldWidth = this.width*2/3;
        this.playFieldHeight = this.height;
        this.playFieldInnerWidth = this.playFieldWidth - 2*this.playFieldBorderWidth;
        this.playFieldInnerHeight = this.playFieldHeight - 2*this.playFieldBorderWidth;

        this.blockWidth = this.playFieldInnerWidth / columns;
        this.blockHeight = this.playFieldInnerHeight / rows;

        this.panelX = this.playFieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);

    }

    render({score, level, lines, nextPiece, playField}){
        this.clearScreen();
        this.renderPanel({score, level, lines, nextPiece})
        this.renderPLayField(playField);
    }

    clearScreen(){
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderPanel({score, level, lines, nextPiece}){
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Lines: ${lines + level*10}`, this.panelX, this.panelY + 48);
        this.context.fillText(`Next`, this.panelX, this.panelY + 96);

        for (let y=0; y<nextPiece.blocks.length; y++){
            for (let x =0; x<nextPiece.blocks[y].length; x++){
                if(nextPiece.blocks[y][x]){
                    this.renderBlock(
                        this.panelX + x*this.blockWidth*0.7, this.panelY + 125 + y*this.blockHeight*0.7,
                        this.blockWidth*0.7, this.blockHeight*0.7,
                        GUI.colors[nextPiece.blocks[y][x]]);
                }
            }
        }

    }

    renderPLayField(playField){
        for (let y = 0; y < playField.length; y++){
            const line = playField[y];
            for (let x = 0; x < line.length; x++){
                const block = line[x];

                if (block){
                    this.renderBlock(
                        this.playFieldX + x*this.blockWidth,
                        this.playFieldY+ y*this.blockHeight,
                        this.blockWidth,
                        this.blockHeight,
                        GUI.colors[block]);
                }
            }
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playFieldBorderWidth;
        this.context.strokeRect(0, 0, this.playFieldWidth, this.playFieldHeight);
    }

    renderBlock(x, y, width, height, color){
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height)
    }
}