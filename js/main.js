$(function(){
    init()
    
    console.log("Main init called");
});

game=new GAME();
var board1 = null
$(function(){
    function onDragStart (source, piece, position, orientation) {
        console.log('Drag started:')
        console.log('Source: ' + source)
        console.log('Piece: ' + piece)
        console.log('Position: ' + Chessboard.objToFen(position))
        console.log('Orientation: ' + orientation)
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        whatpiece(piece[0]);
        console.log(game.MoveMaker[0])
        let tttt=[];
        
        
        if (piece[0] === game.MoveMaker && game.checkmate===0)
        {
            /*if(game.check===game.MoveMaker && piece[1]!=='K')
            return false*/
        }
        else{
            return false
        }
        
        //pisea.GetSource()
    
    

      }


    let s =""
    function onDrop (source, target, piece, newPos, oldPos, orientation) {
        console.log("Dropped")
        console.log('Source: ' + source)
        console.log('Target: ' + target)
        console.log('Piece: ' + piece)
        console.log('New position: ' + Chessboard.objToFen(newPos))
        console.log('Old position: ' + Chessboard.objToFen(oldPos))
        console.log('Orientation: ' + orientation)
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

       /* if(game.check===game.MoveMaker)
        {   if (game.Move(source,target,piece)===false || game.LastPieceMovedLineOfSightMoves.indexOf(target)===-1)// or if target is not found within the available moves(onlywhen king is in check)
            {
                for(let i=0;i<BoardSquares.length;i++)
                {
                    s+= BoardSquares[i]+" ";
                    if (i%10===9 )
                    {
                        console.log(s);
                        s=""
                    }
                }
                return "snapback"
            }
        }
        else*/ if (game.Move(source,target,piece)===false)// or if target is not found within the available moves (only when king is in check)
        {
            for(let i=0;i<BoardSquares.length;i++)
            {
                s+= BoardSquares[i]+" ";
                if (i%10===9 )
                {
                    console.log(s);
                    s=""
                }
            }
            return "snapback"
        }
        else{
            game.SetLastPieceMoved(piece,target);
            
            game.CheckCheckMate()
            for(let i=0;i<BoardSquares.length;i++)
            {
                s+= BoardSquares[i]+" ";
                if (i%10===9 )
                {
                    console.log(s);
                    s=""
                }
    }
        }
        }

    
    //console.log(game.BoardSquares)
    //console.log(FILES[0][0])
    for(let i=0;i<BoardSquares.length;i++)
    {
        s+= BoardSquares[i]+" ";
        if (i%10===9 )
        {
            console.log(s);
            s=""
        }
    }

    for(let i=0;i<BoardRF.length;i++)
    {
        s+= BoardRF[i]+" ";
        if (i%10===9 )
        {
            console.log(s);
            s=""
        }
    }
    var config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        //onSnapbackEnd: onSnapbackEnd
      }
    board1 = ChessBoard('board1', config);
    
})

function init(){
    console.log("init() called");
};

