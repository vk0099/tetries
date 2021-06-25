document.addEventListener("DOMContentLoaded",() => {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    const score=document.getElementById("score");
    let s=0
    const size=20
    const empty ="WHITE"
    let board = [];
    const ShapePosition = {
        x : 3,
        y : -2
    }
    let decreasedTime=0
    for(rows= 0;rows<20;rows++){
        board[rows] = [];
        for(cols= 0; cols< 10; cols++){
            board[rows][cols] = empty;
        }
    }
    function drawBoard(){
        for(rows= 0;rows<20;rows++){
            for(cols= 0; cols< 10; cols++){
                drawSquare(cols,rows,board[rows][cols]);
            }
        }
        score.innerHTML=s;
    }
    function drawSquare(x,y,color){
        ctx.fillStyle = color;
        ctx.fillRect(x*size,y*size,size,size);
        
        ctx.strokeStyle = "BLACK";      
        ctx.strokeRect(x*size,y*size,size,size);
        ctx.lineWidth = 0.5;
    }
    drawBoard();


    let pices=[
    [   [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]    ],
    [   [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]   ],
    [   [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]   ],
    [   [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]    ],
    [   [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]   ],
    [   [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]   ],
    [   [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]   ]   
    ]
    let color =["CYAN","blue","orange","yellow","green","purple","red"]
    function random(){
        let r = Math.floor(Math.random() * pices.length)
        ShapePosition.x=3;
        ShapePosition.y=-2;
        return r
    }
    let randomelement
    randomelement =random()
    let randamShape=pices[randomelement]
    let randamColor=color[randomelement]
    
    function squareColor(newarray,color) {
        for(let row=0;row<newarray.length;row++){
            for(let col=0;col<newarray[row].length;col++){
                if(newarray[row][col]){
                    drawSquare(col+ShapePosition.x,row+ShapePosition.y,color);
                }
            }
        }
    }

    
    document.addEventListener("keydown",CONTROL);

    function CONTROL(event){
        if(event.keyCode == 37){
            moveLeft();
        }else if(event.keyCode == 38){
            moveUp();
        }else if(event.keyCode == 39){
            moveRight();
        }else if(event.keyCode == 40){
            moveDown();
        }
    }

    function rotate(){
        let matrix=randamShape
        randamShape=matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
    }
    function moveDown(){
        if(!CollisionDetection(ShapePosition.x,ShapePosition.y+1,randamShape)){
            squareColor(randamShape,empty)
            ShapePosition.y++;
            squareColor(randamShape,randamColor)
        }
        else{
            storeInArray();
            randomelement=random();
            randamShape=pices[randomelement];
            randamColor=color[randomelement];
        }
    }
    function moveLeft(){
        if(!CollisionDetection(ShapePosition.x-1,ShapePosition.y,randamShape)){
            squareColor(randamShape,empty)
            ShapePosition.x--;
            squareColor(randamShape,randamColor)
        }
    }
    function moveRight(){
        if(!CollisionDetection(ShapePosition.x+1,ShapePosition.y,randamShape)){
            squareColor(randamShape,empty)
            ShapePosition.x++;
            squareColor(randamShape,randamColor)
        }
    }
    function moveUp(){
            squareColor(randamShape,empty)
            rotate();
        if(CollisionDetection(ShapePosition.x,ShapePosition.y,randamShape)){
            if(ShapePosition.x >5){
                ShapePosition.x--;
            }
            else{
                ShapePosition.x++;
            }
        }
        squareColor(randamShape,randamColor)
    }


    function CollisionDetection(x,y,newarray){
        for(let row=0;row<newarray.length;row++){
            for(let col=0;col<newarray[row].length;col++){
                let newx=x+col;
                let newy=y+row;
                if(!newarray[row][col])
                    continue;
                else if(newx < 0 || newx >=10 || newy >=20)
                    return true;
                else if(newy < 0)
                    continue;
                else if(board[newy][newx]!=empty){
                    return true;
                }
            }
        }
        return false;
    }
let gameOver = false;
    function storeInArray(){
        for(let row=0;row<randamShape.length;row++){
            for(let col=0;col<randamShape[row].length;col++){
                if(!randamShape[row][col]){
                    continue;
                }
                else if(ShapePosition.y+row<0){
                    gameOver = true;
                    break;
                }
                board[ShapePosition.y+row][ShapePosition.x+col] = randamColor
            }
        }
        for(row = 0; row < board.length; row++){
        let removeBlock = true;
        for( col = 0; col < board[row].length; col++){
            removeBlock = removeBlock && (board[row][col] != empty);
        }
        if(removeBlock){
            for( y = row; y > 1; y--){
                for( col = 0; col < board[y].length; col++){
                    board[y][col] = board[y-1][col];
                }
            }
            for( col = 0; col <  board[y].length; col++){
                board[0][col] = empty;
            }
            decreasedTime=decreasedTime+10;
            s =s+10;
        }
    }
    drawBoard();
    //score.innerHTML=s;
}

    

    let lastAnimationTime;
    const step = (time) => {
        if (!lastAnimationTime) {
            lastAnimationTime = time;
        } 
        if (time - lastAnimationTime > 500-decreasedTime) {
            lastAnimationTime = time;
            moveDown(); 
        }
        if(!gameOver){
            window.requestAnimationFrame(step);
        }
        else{
            alert("Game Over")
            window.location.reload();
        }
    };
    window.requestAnimationFrame(step);
});