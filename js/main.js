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

            if(game.Castled===true){
                switch(target){
                    case 'c1':
                        board1.move('a1-d1')
                        game.SetLastPieceMoved('wR','d1')
                        break;
                    case 'g1':
                        board1.move('h1-f1')
                        game.SetLastPieceMoved('wR','f1')
                        break;
                    case 'c8':
                        board1.move('a8-d8')
                        game.SetLastPieceMoved('bR','d8')
                        break;
                    case 'g8':
                        board1.move('h8-f8')
                        game.SetLastPieceMoved('bR','f8')
                        break;
                }
                game.Castled=false;
            }
            
            else{
                game.SetLastPieceMoved(piece,target);
            }
            
            
            
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
    
    function onSnapEnd(source,target,piece){
        
        if(game.enpassanted===true){
            console.log("after enpassant")
            console.log(`${target}-${game.PawnLocation}`)
            console.log(target)
            console.log(game.PawnLocation)
            console.log(`${target}-${game.PawnLocation}`)
            board1.move(`${target}-${game.PawnLocation}`)
            board1.move(`${game.PawnLocation}-${target}`)
            game.enpassanted=false;
        }
       
        console.log(game.EvaluateBoard())
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
    console.log(game.EvaluateBoard())
    var config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd:onSnapEnd,
        sparePieces: true
        //onSnapbackEnd: onSnapbackEnd
      }
    board1 = ChessBoard('board1', config);
    
})

function init(){
    console.log("init() called");
};

