class PIESA{
    constructor(Source,piecevalue){
        this.value = 1;
        this.id=1;
        this.Source = Source;
        this.target=null;
    }
    GetValue(){
        return this.value;
    }
    GetId(){
        return this.id;
    }
    GetSource(){
        return this.Source;

    }
    GetTarget(){
        return this.target;
    }
    
    
    
}




class GAME{
    constructor(){
        
        
        this.BoardSquares=BoardSquares
        this.BoardRF=BoardRF
        this.MoveMaker=COLORS.WHITE;
        this.SourceIndex=null
        this.TargetIndex=null
        this.FileRank=null
        this.index=null
        this.temp=null
        this.check=0
        this.checkmate=0
        this.LastPieceMoved=null
        this.LastPieceMovedSource=null
        this.LastPieceMovedLineOfSight=LINEOFSIGHT.NONE
        this.LastPieceMovedLineOfSightMoves=[];
        this.BoardSquaresCopy=BoardSquares;
        this.PieceOverTaken=PIECES.EMPTY
        this.CCLeftbRook=true;//can castle, left black rook
        this.CCRightbRook=true;// can castle, right black rook
        this.CCleftwRook=true;//can castle, left white rook
        this.CCRightwRook=true;//can castle, right white rook
        this.CCbKing=true;//can castle, black king
        this.CCwKing=true;//can castle, white king


        
        /*
        var FILES ={FILE_A:0, FILE_B:1, FILE_C:2, FILE_D:3, FILE_E:4, FILE_F:5,FILE_G:6,FILE_H:7,FILE_NONE:8};

        var RANKS ={RANK_1:0, RANK_2:1, RANK_3:2, RANK_4:3, RANK_5:4, RANK_6:5, RANK_7:6, RANK_8:7,RANK_NONE:8};
        */
        
    }
    swap(BoardSquares,SIndex,TIndex){
        //If it is a piece attacking the opposite color replace the piece with an empty square so when it swaps the attacked piece is removed
        // A move validation should happen before this as to only allow the swap function to be called when a piece is moving to empty spot or attacking
        if (this.BoardSquares[TIndex]!==PIECES.EMPTY)
            this.BoardSquares[TIndex]=PIECES.EMPTY

        this.temp=this.BoardSquares[SIndex];
        this.BoardSquares[SIndex]=this.BoardSquares[TIndex];
        this.BoardSquares[TIndex]=this.temp;
        
    }
    IBKSwap(SIndex,TIndex)
    {
        if (this.BoardSquaresCopy[TIndex]!==PIECES.EMPTY)
        {
            this.PieceOverTaken=this.BoardSquaresCopy[TIndex]
            this.BoardSquaresCopy[TIndex]=PIECES.EMPTY
        }
        this.temp=this.BoardSquaresCopy[SIndex];
        this.BoardSquaresCopy[SIndex]=this.BoardSquaresCopy[TIndex];
        this.BoardSquaresCopy[TIndex]=this.temp;
    }
    IBKSwapUndo(SIndex,TIndex)
    {
        this.temp=this.BoardSquaresCopy[TIndex];
        this.BoardSquaresCopy[TIndex]=this.BoardSquaresCopy[SIndex];
        this.BoardSquaresCopy[SIndex]=this.temp;

        if(this.PieceOverTaken!==PIECES.EMPTY)
        {
            this.BoardSquaresCopy[TIndex]=PIECES.EMPTY
            this.PieceOverTaken=PIECES.EMPTY

        }
    }
    GetRanks(){
        return this.FILES
    }
    NextTurn(){
        if(this.MoveMaker===COLORS.WHITE)
            this.MoveMaker =COLORS.BLACK;
        else
            this.MoveMaker=COLORS.WHITE;
        
    }
    //function that searches for source tile and returns index 
    //if a piece is killed convert source to empty(0)
    Move(source,target,piece){
        this.FileRank=source;
        this.SourceIndex=this.FindFileRank(this.FileRank);
        this.FileRank=target;
        this.TargetIndex=this.FindFileRank(this.FileRank);
        console.log(this.BoardSquares[this.SourceIndex]);

        if(this.check===this.MoveMaker)
        {
            if(this.ValidMoveCheck(source,target,piece) && (game.LastPieceMovedLineOfSightMoves.indexOf(target)!==-1 || piece[1]==='K'))
            {
                this.swap(this.BoardSquares,this.SourceIndex,this.TargetIndex);
                this.NextTurn();
                this.check=0
            }
            else{
                return false;
            }
        }
        else if(this.ValidMoveCheck(source,target,piece) && this.check!==this.MoveMaker && this.IsBlockingking(this.SourceIndex,this.TargetIndex))
        {
            //if (this.IsBlockingking()) return false
            //this.BoardSquares=this.BoardSquaresCopy
            //this.swap(this.BoardSquares,this.SourceIndex,this.TargetIndex);
            this.NextTurn();
            return true;
        }
        else{
            return false;
        }
        
    }

    CastlingCheck(source,target,piece){
        if(piece[1]==='R'){

        }
    }
    Castling(source,target,piece){
        switch(this.MoveMaker){
            case COLORS.WHITE: 
                if(piece[1]==='R' && BoardSquares[this.TargetIndex]===PIECES.wK)
                    {
                        
                    }
        }


        
    }

    SetLastPieceMoved(piece, target)
    {
        this.LastPieceMovedSource=target
        this.LastPieceMovedLineOfSightMoves=[];
        this.LastPieceMovedLineOfSight=LINEOFSIGHT.NONE
        switch(piece)
        {
            case 'wP':this.LastPieceMoved=PIECES.wP
            break;
            case 'bP':this.LastPieceMoved=PIECES.bP
            break;
            case 'wR':this.LastPieceMoved=PIECES.wR
            break;
            case 'bR':this.LastPieceMoved=PIECES.bR
            break;
            case 'wB':this.LastPieceMoved=PIECES.wB
            break;
            case 'bB':this.LastPieceMoved=PIECES.bB
            break;
            case 'wN':this.LastPieceMoved=PIECES.wN
            break;
            case 'bN':this.LastPieceMoved=PIECES.bN
            break;
            case 'wQ':this.LastPieceMoved=PIECES.wQ
            break;
            case 'bQ':this.LastPieceMoved=PIECES.bQ
            break;
            case 'wK':this.LastPieceMoved=PIECES.wK
            break;
            case 'bK':this.LastPieceMoved=PIECES.bK
            break;

        }
    }


    ValidMoveCheck(source,target,piece){
        this.FileRank=source;
        this.SourceIndex=this.FindFileRank(this.FileRank);
        this.FileRank=target;
        this.TargetIndex=this.FindFileRank(this.FileRank);
        this.ValidMove=[];
        switch(piece){
            case "wP": 
            
            // this checks they are trying to move forward but there is a piece in the way
            if (target===BoardRF[this.SourceIndex-10]  &&BoardSquares[this.SourceIndex-10]===PIECES.EMPTY)
            {
                this.ValidMove.push (BoardRF[this.SourceIndex-10]);
            }
            //this checks the right diagnal for a black piece and if its there it can move there to overtake it 
            if(target===BoardRF[this.SourceIndex-9] && BoardSquares[this.SourceIndex-9]<0 )
            {
                this.ValidMove.push(BoardRF[this.SourceIndex-9])
            }
            //this checks the left diagnol for a black piece and if its there it can move there to overtake it
            if(target===BoardRF[this.SourceIndex-11] && BoardSquares[this.SourceIndex-11]<0 )
            {
                this.ValidMove.push(BoardRF[this.SourceIndex-11])
            }
            //The basic foward movement of the piece
            
            for(let i=0;i<8;i++)
            {
                
                if(source===FILES[i]+RANKS[1] && BoardSquares[this.SourceIndex-20]===PIECES.EMPTY)
                {
                    this.ValidMove.push (BoardRF[this.SourceIndex-20]);
                }
            }
            console.log("valid move "+this.ValidMove)
            console.log("target move "+target)
            return this.CheckValidMove(target)
            break;
            case "bP":
                
                if (target===BoardRF[this.SourceIndex+10]  &&BoardSquares[this.SourceIndex+10]===PIECES.EMPTY)
                {
                    this.ValidMove.push (BoardRF[this.SourceIndex+10]);
                }
                if(target===BoardRF[this.SourceIndex+9] && BoardSquares[this.SourceIndex+9]>0 )
                {
                    this.ValidMove.push(BoardRF[this.SourceIndex+9])
                }
                if(target===BoardRF[this.SourceIndex+11] && BoardSquares[this.SourceIndex+11]>0 )
                {
                    this.ValidMove.push(BoardRF[this.SourceIndex+11])
                }
                
                for(let i=0;i<8;i++)
                {
                    //console.log("hola"+FILES[i]+RANKS[6])
                    if(source===FILES[i]+RANKS[6] && BoardSquares[this.SourceIndex+20]===PIECES.EMPTY)
                    {
                        this.ValidMove.push (BoardRF[this.SourceIndex+20]);
                    }
                }
                console.log("valid move "+this.ValidMove)
                console.log("target move "+target)
                return this.CheckValidMove(target)
                break;  
            case "wR":
                
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        console.log("empy forward")
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        console.log("empy back")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        console.log("empy left")
                    }
                }
                return this.CheckValidMove(target)
                break;
            case "bR":
                
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        console.log("empy backward")
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        console.log("empy forward")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        console.log("empy left")
                    }
                }
                return this.CheckValidMove(target)
                break;
            case "wB":
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                return this.CheckValidMove(target)
                break;
            case "bB":
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                return this.CheckValidMove(target)
                break;
            case "wQ":
                
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        console.log("empy forward")
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        console.log("empy back")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        console.log("empy left")
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                return this.CheckValidMove(target)
                break;
            case "bQ":
                
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        console.log("empy backward")
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        console.log("empy forward")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        console.log("empy left")
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            console.log("Ataccking")
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            console.log("Not attacking")
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                return this.CheckValidMove(target)
                break;
            case "wN":
                
                //top right upper
                if(BoardRF[this.SourceIndex-19]!=='x' && BoardSquares[this.SourceIndex-19]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-19])
                }
                //top left upper
                if(BoardRF[this.SourceIndex-21]!=='x' && BoardSquares[this.SourceIndex-21]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-21])
                }
                //bottom left lower
                if(BoardRF[this.SourceIndex+19]!=='x' && BoardSquares[this.SourceIndex+19]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+19])
                }
                //bottom right lower
                if(BoardRF[this.SourceIndex+21]!=='x' && BoardSquares[this.SourceIndex+21]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+21])
                }
                //top right lower
                if(BoardRF[this.SourceIndex-8]!=='x' && BoardSquares[this.SourceIndex-8]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-8])
                }
                //top left lower
                if(BoardRF[this.SourceIndex-12]!=='x' && BoardSquares[this.SourceIndex-12]<=0)
                {   
                    this.ValidMove.push(BoardRF[this.SourceIndex-12])
                }
                //bottom right upper
                if(BoardRF[this.SourceIndex+12]!=='x' && BoardSquares[this.SourceIndex+12]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+12])
                }
                //bottom left uppeer
                if(BoardRF[this.SourceIndex+8]!=='x' && BoardSquares[this.SourceIndex+8]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+8])
                }
                return this.CheckValidMove(target)
                break;
            case "bN":
                
                //top right upper
                if(BoardRF[this.SourceIndex-19]!=='x' && BoardSquares[this.SourceIndex-19]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-19])
                }
                //top left upper
                if(BoardRF[this.SourceIndex-21]!=='x' && BoardSquares[this.SourceIndex-21]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-21])
                }
                //bottom left lower
                if(BoardRF[this.SourceIndex+19]!=='x' && BoardSquares[this.SourceIndex+19]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+19])
                }
                //bottom right lower
                if(BoardRF[this.SourceIndex+21]!=='x' && BoardSquares[this.SourceIndex+21]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+21])
                }
                //top right lower
                if(BoardRF[this.SourceIndex-8]!=='x' && BoardSquares[this.SourceIndex-8]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-8])
                }
                //top left lower
                if(BoardRF[this.SourceIndex-12]!=='x' && BoardSquares[this.SourceIndex-12]>=0)
                {   
                    this.ValidMove.push(BoardRF[this.SourceIndex-12])
                }
                //bottom right upper
                if(BoardRF[this.SourceIndex+12]!=='x' && BoardSquares[this.SourceIndex+12]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+12])
                }
                //bottom left uppeer
                if(BoardRF[this.SourceIndex+8]!=='x' && BoardSquares[this.SourceIndex+8]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+8])
                }
                return this.CheckValidMove(target)
                break;
            case 'wK':
                
                //move up
                if(BoardRF[this.SourceIndex-10]!=='x' && BoardSquares[this.SourceIndex-10]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-10])
                }
                //move down
                if(BoardRF[this.SourceIndex+10]!=='x' && BoardSquares[this.SourceIndex+10]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+10])
                }
                //move right 
                if(BoardRF[this.SourceIndex+1]!=='x' && BoardSquares[this.SourceIndex+1]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+1])
                }
                //move left
                if(BoardRF[this.SourceIndex-1]!=='x' && BoardSquares[this.SourceIndex-1]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-1])
                }
                //move diagnol top right
                if(BoardRF[this.SourceIndex-9]!=='x' && BoardSquares[this.SourceIndex-9]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-9])
                }
                //move diagnal top left
                if(BoardRF[this.SourceIndex-11]!=='x' && BoardSquares[this.SourceIndex-11]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-11])
                }
                //move diagnol bottom left
                if(BoardRF[this.SourceIndex+9]!=='x' && BoardSquares[this.SourceIndex+9]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+9])
                }
                //move diagnal bottom right
                if(BoardRF[this.SourceIndex+11]!=='x' && BoardSquares[this.SourceIndex+11]<=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+11])
                }
                if(this.CheckValidMove(target))
                {
                    return this.CheckValidKingMove(target)
                }
                return false
                break;
            case 'bK':
                
                //move up
                if(BoardRF[this.SourceIndex-10]!=='x' && BoardSquares[this.SourceIndex-10]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-10])
                }
                //move down
                if(BoardRF[this.SourceIndex+10]!=='x' && BoardSquares[this.SourceIndex+10]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+10])
                }
                //move right 
                if(BoardRF[this.SourceIndex+1]!=='x' && BoardSquares[this.SourceIndex+1]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+1])
                }
                //move left
                if(BoardRF[this.SourceIndex-1]!=='x' && BoardSquares[this.SourceIndex-1]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-1])
                }
                //move diagnol top right
                if(BoardRF[this.SourceIndex-9]!=='x' && BoardSquares[this.SourceIndex-9]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-9])
                }
                //move diagnal top left
                if(BoardRF[this.SourceIndex-11]!=='x' && BoardSquares[this.SourceIndex-11]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex-11])
                }
                //move diagnol bottom left
                if(BoardRF[this.SourceIndex+9]!=='x' && BoardSquares[this.SourceIndex+9]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+9])
                }
                //move diagnal bottom right
                if(BoardRF[this.SourceIndex+11]!=='x' && BoardSquares[this.SourceIndex+11]>=0)
                {    
                    this.ValidMove.push(BoardRF[this.SourceIndex+11])
                }
                if(this.CheckValidMove(target))
                {
                    
                    return this.CheckValidKingMove(target)

                }
                return false
                break;
            }   

    }

    ValidMoveGeneration(source,piece){
        this.VMGFileRank=source;
        this.VMGSourceIndex=this.FindFileRank(this.VMGFileRank);
        
        if(this.MoveMaker===COLORS.BLACK)
        this.CheckKingsSurroundings(BoardRF [this.BoardSquares.indexOf(PIECES.bK)],PIECES.bK);
        if(this.MoveMaker===COLORS.WHITE)
        this.CheckKingsSurroundings(BoardRF [this.BoardSquares.indexOf(PIECES.wK)],PIECES.wK);
        
        switch(piece){
            case PIECES.wP: 
            console.log("whiete Pawn")
            // this checks they are trying to move forward but there is a piece in the way
            if (BoardSquares[this.VMGSourceIndex-10]===PIECES.EMPTY)
            {
                //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
            }
            //this checks the right diagnal for a black piece and if its there it can move there to overtake it 
            if((BoardSquares[this.VMGSourceIndex-9]<=0 ))
            {
                console.log("white pawn move "+BoardRF[this.VMGSourceIndex-9])
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                
            }
            //this checks the left diagnol for a black piece and if its there it can move there to overtake it
            if((BoardSquares[this.VMGSourceIndex-11]<=0))
            {
                console.log("white pawn move"+BoardRF[this.VMGSourceIndex-11])
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT  
                        
                    }
            }
            //The basic foward movement of the piece
            for(let i=0;i<8;i++)
            {
                
                if(source===FILES[i]+RANKS[1])
                {
                    //this.AllValidMoves.push (BoardRF[this.VMGSourceIndex-20]);
                }
            }
            //console.log("White Pawn moves "+this.AllValidMoves)
            //console.log("target move "+target)
            
            break;
            case PIECES.bP:
                
                if (BoardSquares[this.VMGSourceIndex+10]===PIECES.EMPTY)
                {
                    //this.AllValidMoves.push (BoardRF[this.VMGSourceIndex+10]);
                }
                if((BoardSquares[this.VMGSourceIndex+9]>=0) )
                {
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                if((BoardSquares[this.VMGSourceIndex+11]>=0 ) )
                {
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                
                for(let i=0;i<8;i++)
                {
                    //console.log("hola"+FILES[i]+RANKS[6])
                    if(source===FILES[i]+RANKS[6])
                    {
                        //this.AllValidMoves.push (BoardRF[this.VMGSourceIndex+20]);
                    }
                }
                console.log("Black pawn moves "+this.AllValidMoves)
                //console.log("target move "+target)
                
                break;  
            case PIECES.wR:
                
                //forward loop
                
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        console.log(this.BoardSquares.indexOf(PIECES.bK)+"current king index")
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]<=0)
                        {

                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            //if the king is on on the tile skip keep checking because king could try to 
                            //move back in the same direction
                            
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*10))
                            {
                                console.log("cotinuing becauae found king")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*10) && BoardSquares[this.VMGSourceIndex-(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]>0)
                        {
                            //this.CKSValidMove = this.CheckKingsSurroundings(this.BoardSquares.indexOf(PIECES.bK),PIECES.bK)   
                            //this checks the kings possible moves and if a friendly is within attacking distance of 
                            //the king it means it could try to move to that square we shouldn't allow it if its in path
                            // of attacking move 
                            
                            console.log("CKSVALIDMOVE "+this.CKSValidMove)
                            console.log(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]))
                            console.log(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy forward")
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*10))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*10) && BoardSquares[this.VMGSourceIndex+(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy back")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+i)
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+i && BoardSquares[this.VMGSourceIndex+i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+i]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+i]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                                continue;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-i]<=0)
                        {
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-i && BoardSquares[this.VMGSourceIndex-i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-i]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-i]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                
                break;
            case PIECES.bR:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*10) && BoardSquares[this.VMGSourceIndex-(i*10)]>0)
                            {
                                break;
                            }
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy backward")
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*10) && BoardSquares[this.VMGSourceIndex+(i*10)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy forward")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+i && BoardSquares[this.VMGSourceIndex+i]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-i && BoardSquares[this.VMGSourceIndex-i]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                
                break;
            case PIECES.wB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*9) && BoardSquares[this.VMGSourceIndex-(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]>0)
                        {
                            console.log(this.CKSValidMove)
                            this.CheckKingsSurroundings(BoardRF [this.BoardSquares.indexOf(PIECES.bK)],PIECES.bK)
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*9)]!==-1))
                            {
                                console.log("in white bishop right diagnoal")
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*1)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT;
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*11) && BoardSquares[this.VMGSourceIndex-(i*11)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*11)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*9) && BoardSquares[this.VMGSourceIndex+(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+(i*9)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*11) && BoardSquares[this.VMGSourceIndex+(i*11)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+(i*11)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.bB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===BoardRF [this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*9) && BoardSquares[this.VMGSourceIndex-(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*11) && BoardSquares[this.VMGSourceIndex-(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*9) && BoardSquares[this.VMGSourceIndex+(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop downright diagnal black bishop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]>=0)
                        {
                            console.log(BoardSquares[this.VMGSourceIndex+(i*11)])
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            console.log("asdfwsadfewsdfwsdf "+BoardRF[this.VMGSourceIndex]+" laspieced moved soruce "+this.LastPieceMovedSource+" Line of sight is "+this.LastPieceMovedLineOfSight)
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                console.log("PUSHING THE SHIT")
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                                console.log(this.LastPieceMovedLineOfSightMoves)
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*11) && BoardSquares[this.VMGSourceIndex+(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.wQ:
                
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*10))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*10) && BoardSquares[this.VMGSourceIndex-(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy forward")
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*10))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*10) && BoardSquares[this.VMGSourceIndex+(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy back")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+i)
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+i && BoardSquares[this.VMGSourceIndex+i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+i]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-i)
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-i && BoardSquares[this.VMGSourceIndex-i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-i]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===  BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*9) && BoardSquares[this.VMGSourceIndex-(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*11) && BoardSquares[this.VMGSourceIndex-(i*11)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*9) && BoardSquares[this.VMGSourceIndex+(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex]  && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*11) && BoardSquares[this.VMGSourceIndex+(i*11)]<0)
                            {
                                break;
                            }
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.bQ:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*10) && BoardSquares[this.VMGSourceIndex-(i*10)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy backward")
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*10) && BoardSquares[this.VMGSourceIndex+(i*10)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy forward")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+i && BoardSquares[this.VMGSourceIndex+i]>0)
                            {
                                break;
                            }
                        }
                        if(BoardSquares[this.VMGSourceIndex+i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-i && BoardSquares[this.VMGSourceIndex-i]>0)
                            {
                                break;
                            }
                        }
                        if(BoardSquares[this.VMGSourceIndex-i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*9) && BoardSquares[this.VMGSourceIndex-(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*11) && BoardSquares[this.VMGSourceIndex-(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*9) && BoardSquares[this.VMGSourceIndex+(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquares.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*11) && BoardSquares[this.VMGSourceIndex+(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.wN:
                
                //top right upper
                if(BoardRF[this.VMGSourceIndex-19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                        
                        
                    }
                    
                }
                //top left upper
                if(BoardRF[this.VMGSourceIndex-21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //bottom left lower
                if(BoardRF[this.VMGSourceIndex+19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //bottom right lower
                if(BoardRF[this.VMGSourceIndex+21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //top right lower
                if(BoardRF[this.VMGSourceIndex-8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                //top left lower
                if(BoardRF[this.VMGSourceIndex-12]!=='x' )
                {   
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //bottom right upper
                if(BoardRF[this.VMGSourceIndex+12]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //bottom left uppeer
                if(BoardRF[this.VMGSourceIndex+8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                
                break;
            case PIECES.bN:
                
                //top right upper
                if(BoardRF[this.VMGSourceIndex-19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                        
                    }
                }
                //top left upper
                if(BoardRF[this.VMGSourceIndex-21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //bottom left lower
                if(BoardRF[this.VMGSourceIndex+19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //bottom right lower
                if(BoardRF[this.VMGSourceIndex+21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //top right lower
                if(BoardRF[this.VMGSourceIndex-8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                //top left lower
                if(BoardRF[this.VMGSourceIndex-12]!=='x' )
                {   
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //bottom right upper
                if(BoardRF[this.VMGSourceIndex+12]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //bottom left uppeer
                if(BoardRF[this.VMGSourceIndex+8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                
                break;
            case PIECES.wK:
                
                //move up
                if(BoardRF[this.VMGSourceIndex-10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //move down
                if(BoardRF[this.VMGSourceIndex+10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //move right 
                if(BoardRF[this.VMGSourceIndex+1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //move left
                if(BoardRF[this.VMGSourceIndex-1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                //move diagnol top right
                if(BoardRF[this.VMGSourceIndex-9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnal top left
                if(BoardRF[this.VMGSourceIndex-11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnol bottom left
                if(BoardRF[this.VMGSourceIndex+9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //move diagnal bottom right
                if(BoardRF[this.VMGSourceIndex+11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                
                break;
            case PIECES.bK:
                
                //move up
                if(BoardRF[this.VMGSourceIndex-10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //move down
                if(BoardRF[this.VMGSourceIndex+10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //move right 
                if(BoardRF[this.VMGSourceIndex+1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //move left
                if(BoardRF[this.VMGSourceIndex-1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                //move diagnol top right
                if(BoardRF[this.VMGSourceIndex-9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnal top left
                if(BoardRF[this.VMGSourceIndex-11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex-11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnol bottom left
                if(BoardRF[this.VMGSourceIndex+9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //move diagnal bottom right
                if(BoardRF[this.VMGSourceIndex+11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquares.indexOf(PIECES.bK)===this.VMGSourceIndex+11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                
                break;
        }   

    }

    CheckKingsSurroundings(source, KingtoCheck)
    {
        console.log("Checking king surrounds")
        this.CKSFileRank=source;
        this.CKSSourceIndex=this.FindFileRank(this.CKSFileRank);
        this.CKSValidMove=[];
        switch(KingtoCheck)
        {
        case PIECES.wK:
                
            //move up
            if(BoardRF[this.CKSSourceIndex-10]!=='x' && BoardSquares[this.CKSSourceIndex-10]<=0)
            {   console.log("white up king "+BoardSquares[this.CKSSourceIndex-10])
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-10])
            }
            //move down
            if(BoardRF[this.CKSSourceIndex+10]!=='x' && BoardSquares[this.CKSSourceIndex+10]<=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+10])
            }
            //move right 
            if(BoardRF[this.CKSSourceIndex+1]!=='x' && BoardSquares[this.CKSSourceIndex+1]<=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+1])
            }
            //move left
            if(BoardRF[this.CKSSourceIndex-1]!=='x' && BoardSquares[this.CKSSourceIndex-1]<=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-1])
            }
            //move diagnol top right
            if(BoardRF[this.CKSSourceIndex-9]!=='x' && BoardSquares[this.CKSSourceIndex-9]<=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-9])
            }
            //move diagnal top left
            if(BoardRF[this.CKSSourceIndex-11]!=='x' && BoardSquares[this.CKSSourceIndex-11]<=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-11])
            }
            //move diagnol bottom left
            if(BoardRF[this.CKSSourceIndex+9]!=='x' && BoardSquares[this.CKSSourceIndex+9]<=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+9])
            }
            //move diagnal bottom right
            if(BoardRF[this.CKSSourceIndex+11]!=='x' && BoardSquares[this.CKSSourceIndex+11]<=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+11])
            }
            
            //return this.CKSValidMove
            break;
        case PIECES.bK:
            
            //move up
            if(BoardRF[this.CKSSourceIndex-10]!=='x' && BoardSquares[this.CKSSourceIndex-10]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-10])
            }
            //move down
            if(BoardRF[this.CKSSourceIndex+10]!=='x' && BoardSquares[this.CKSSourceIndex+10]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+10])
            }
            //move right 
            if(BoardRF[this.CKSSourceIndex+1]!=='x' && BoardSquares[this.CKSSourceIndex+1]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+1])
            }
            //move left
            if(BoardRF[this.CKSSourceIndex-1]!=='x' && BoardSquares[this.CKSSourceIndex-1]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-1])
            }
            //move diagnol top right
            if(BoardRF[this.CKSSourceIndex-9]!=='x' && BoardSquares[this.CKSSourceIndex-9]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-9])
            }
            //move diagnal top left
            if(BoardRF[this.CKSSourceIndex-11]!=='x' && BoardSquares[this.CKSSourceIndex-11]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex-11])
            }
            //move diagnol bottom left
            if(BoardRF[this.CKSSourceIndex+9]!=='x' && BoardSquares[this.CKSSourceIndex+9]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+9])
            }
            //move diagnal bottom right
            if(BoardRF[this.CKSSourceIndex+11]!=='x' && BoardSquares[this.CKSSourceIndex+11]>=0)
            {    
                this.CKSValidMove.push(BoardRF[this.CKSSourceIndex+11])
            }
            //return this.CKSValidMove;
            break;
        }
    }

    CheckValidMove(target){
        if(this.ValidMove.indexOf(target)!==-1){
            return true;
        }
        return false;
    }
    CheckValidKingMove(target){
        //all valid moves will be initialized only in functions that require all moves of a color
        this.AllValidMoves=[];
        if(this.MoveMaker===COLORS.WHITE)
        {
            for(let i =0;i<BoardSquares.length;i++)
            {
                if(BoardSquares[i]<0 && BoardSquares[i]!=='x'){
                    this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                }
            }
            console.log("aftyer loop "+this.AllValidMoves)
            if(this.AllValidMoves.indexOf(target)===-1){
                this.AllValidMoves=[];
                return true;
            }
            this.AllValidMoves=[];
            return false; 
        }

        if(this.MoveMaker===COLORS.BLACK)
        {
            for(let i =0;i<BoardSquares.length;i++)
            {
                if(BoardSquares[i]>0){
                    this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                }
            }
            console.log("aftyer loop "+this.AllValidMoves)
            if(this.AllValidMoves.indexOf(target)===-1){
                this.AllValidMoves=[];
                return true;
            }
            this.AllValidMoves=[];
            return false; 
            
        }
    }

    CheckCheckMate()
    {/*
        this.FileRank=source;
        this.SourceIndex=this.FindFileRank(this.FileRank);
        this.FileRank=target;
        this.TargetIndex=this.FindFileRank(this.FileRank);*/
        this.check=0;
        this.AllValidMoves=[];
        this.CKSValidMove=[];
        this.PossibleAvailableCounterMoves=[];
        this.AvailableCounterMoves=[];
        //this.LastPieceMovedLineOfSightMoves=['d1'];
        //this.LastPieceMovedLineOfSightMoves=[];
        this.LastPieceMovedLineOfSight=LINEOFSIGHT.NONE;
        switch(this.MoveMaker)
        {
        case COLORS.WHITE:
            
            
            this.ValidMoveGeneration(this.LastPieceMovedSource,this.LastPieceMoved)
            //check to see if the king kings spot is within attacking distance of last moved piece
            //if yes activate check to only king to move and check to see if king is in checkmate
            if(this.AllValidMoves.indexOf(this.BoardRF [this.BoardSquares.indexOf(PIECES.wK)])!==-1)
            {
                this.AllValidMoves=[];
                for(let i =0;i<BoardSquares.length;i++)
                {
                    if(BoardSquares[i]<0){
                        this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                    }
                }
                let length=this.AllValidMoves.length
                this.CheckKingsSurroundings(this.BoardRF [this.BoardSquares.indexOf(PIECES.wK)],PIECES.wK)
                this.LastPieceMovedLineOfSightMoves.push(this.LastPieceMovedSource)
                this.PossibleAvailableCounterMoves=this.LastPieceMovedLineOfSightMoves
                console.log(this.CKSValidMove)
                //this loops removes the moves that kings can't do
                for(let i=0; i<length;i++)
                {
                    console.log(this.CKSValidMove.length+" "+i)
                    console.log(this.CKSValidMove)
                    
                    if(this.CKSValidMove.indexOf(this.AllValidMoves[i])!==-1)
                    {
                        if (this.CKSValidMove.indexOf(this.AllValidMoves[i])===0)
                        {
                            this.CKSValidMove.shift()
                        }
                        else
                        {
                            console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                            this.CKSValidMove.splice(this.CKSValidMove.indexOf(this.AllValidMoves[i],1))
                            console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                            
                        }
                        //i=-1
                        //length=this.AllValidMoves.length
                    }
                }
                
                console.log("aftyer loop "+this.AllValidMoves[45])
                console.log(this.AllValidMoves)
                console.log(this.CKSValidMove)

                this.AllValidMoves=[];
                for(let i =0;i<BoardSquares.length;i++)
                {
                    if(BoardSquares[i]>0){
                        this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                    }
                }

                length =this.AllValidMoves.length
                //this loop gets rid of available counter moves
                for(let i=0; i<length;i++)
                {
                    
                    
                    if(this.PossibleAvailableCounterMoves.indexOf(this.AllValidMoves[i])!==-1)
                    {
                        this.AvailableCounterMoves.push(this.AllValidMoves[i])
                       
                    }
                } 
                if(this.CKSValidMove.length!==0 || this.AvailableCounterMoves.length!==0)
                {
                    this.check=this.MoveMaker
                    //AvaileableTargetList
                    console.log(this.LastPieceMovedLineOfSightMoves)
                    console.log("line of sight is "+this.LastPieceMovedLineOfSight)
                    console.log(this.LastPieceMovedSource)
                }
                else
                {
                    this.checkmate=this.MoveMaker
                }
                
            }
            
            console.log("checking white king")
            break;
        case COLORS.BLACK:

            this.ValidMoveGeneration(this.LastPieceMovedSource,this.LastPieceMoved)
            
            //check to see if the king kings spot is within attacking distance of last moved piece
            //if yes activate check to only king to move and check to see if king is in checkmate
            if(this.AllValidMoves.indexOf(this.BoardRF [this.BoardSquares.indexOf(PIECES.bK)])!==-1)
            {
                this.AllValidMoves=[];
                for(let i =0;i<BoardSquares.length;i++)
                {
                    if(BoardSquares[i]>0){
                        this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                    }
                }
                let length=this.AllValidMoves.length
                this.CheckKingsSurroundings(this.BoardRF [this.BoardSquares.indexOf(PIECES.bK)],PIECES.bK)
                this.LastPieceMovedLineOfSightMoves.push(this.LastPieceMovedSource)
                this.PossibleAvailableCounterMoves=this.LastPieceMovedLineOfSightMoves
                console.log(this.CKSValidMove)
                for(let i=0; i<length;i++)
                {
                    console.log(this.CKSValidMove.length)
                    
                    if(this.CKSValidMove.indexOf(this.AllValidMoves[i])!==-1)
                    {
                        if (this.CKSValidMove.indexOf(this.AllValidMoves[i])===0)
                        {
                            this.CKSValidMove.shift()
                        }
                        else
                        {
                            console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                            this.CKSValidMove.splice(this.CKSValidMove.indexOf(this.AllValidMoves[i],1))
                            console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                            
                        }
                    }
                }
                
                console.log("aftyer loop "+this.AllValidMoves)
                console.log(this.CKSValidMove)
                this.AllValidMoves=[];
                for(let i =0;i<BoardSquares.length;i++)
                {
                    if(BoardSquares[i]<0){
                        this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                    }
                }

                length =this.AllValidMoves.length
                //this loop gets rid of available counter moves
                for(let i=0; i<length;i++)
                {
                    
                    
                    if(this.PossibleAvailableCounterMoves.indexOf(this.AllValidMoves[i])!==-1)
                    {
                        this.AvailableCounterMoves.push(this.AllValidMoves[i])
                        
                    }
                }
                if(this.CKSValidMove.length!==0 || this.AvailableCounterMoves.length!==0)
                {
                    this.check=this.MoveMaker
                    //AvaileableTargetList
                    console.log(this.LastPieceMovedLineOfSightMoves)
                }
                else
                {
                    this.checkmate=this.MoveMaker
                }
                
            }
            console.log("Checking black king")

            break;
        }
    
    }

    IsBlockingking(SIndex,TIndex)
    {
        
        this.BoardSquaresCopy=this.BoardSquares
        this.IBKSwap(SIndex,TIndex)
        let s=0
        for(let i=0;i<this.BoardSquaresCopy.length;i++)
        {
        s+= this.BoardSquaresCopy[i]+" ";
        if (i%10===9 )
        {
            console.log(s);
            s=""
        }
        }
        console.log("lelll")
        for(let i=0;i<BoardSquares.length;i++)
    {
        s+= BoardSquares[i]+" ";
        if (i%10===9 )
        {
            console.log(s);
            s=""
        }
    }
        return this.ISBKCheckCheckMate(SIndex,TIndex)
        

    }

    ISBKCheckCheckMate(SIndex,TIndex)
    {/*
        this.FileRank=source;
        this.SourceIndex=this.FindFileRank(this.FileRank);
        this.FileRank=target;
        this.TargetIndex=this.FindFileRank(this.FileRank);*/
        this.check=0;
        this.AllValidMoves=[];
        this.CKSValidMove=[];
        this.PossibleAvailableCounterMoves=[];
        this.AvailableCounterMoves=[];
        let s=0
        for(let i=0;i<this.BoardSquaresCopy.length;i++)
        {
        s+= this.BoardSquaresCopy[i]+" ";
        if (i%10===9 )
        {
            console.log(s);
            s=""
        }
        }
        //this.LastPieceMovedLineOfSightMoves=['d1'];
        //this.LastPieceMovedLineOfSightMoves=[];
        this.LastPieceMovedLineOfSight=LINEOFSIGHT.NONE;
        switch(this.MoveMaker)
        {
        case COLORS.WHITE:
        
            
            
            this.AllValidMoves=[];
            console.log(this.BoardSquaresCopy)
            for(let i =0;i<this.BoardSquaresCopy.length;i++)
            {
                if(this.BoardSquaresCopy[i]<0){
                    this.ValidMoveGeneration(BoardRF[i],this.BoardSquaresCopy[i])
                }
            }
            
            if (this.LastPieceMovedLineOfSight=== LINEOFSIGHT.NONE)
            {
                
                return true
            }
            else
            {
                this.IBKSwapUndo(SIndex,TIndex)
                return false
                
            }
            let llength=this.AllValidMoves.length
            this.CheckKingsSurroundings(this.BoardRF [this.BoardSquaresCopy.indexOf(PIECES.wK)],PIECES.wK)
            this.LastPieceMovedLineOfSightMoves.push(this.LastPieceMovedSource)
            this.PossibleAvailableCounterMoves=this.LastPieceMovedLineOfSightMoves
            console.log(this.CKSValidMove)
            //this loops removes the moves that kings can't do
            for(let i=0; i<llength;i++)
            {
                console.log(this.CKSValidMove.length+" "+i)
                console.log(this.CKSValidMove)
                
                if(this.CKSValidMove.indexOf(this.AllValidMoves[i])!==-1)
                {
                    if (this.CKSValidMove.indexOf(this.AllValidMoves[i])===0)
                    {
                        this.CKSValidMove.shift()
                    }
                    else
                    {
                        console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                        this.CKSValidMove.splice(this.CKSValidMove.indexOf(this.AllValidMoves[i],1))
                        console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                        
                    }
                    //i=-1
                    //length=this.AllValidMoves.length
                }
            }
            
            

            console.log("aftyer loop "+this.AllValidMoves[45])
            console.log(this.AllValidMoves)
            console.log(this.CKSValidMove)

            this.AllValidMoves=[];
            for(let i =0;i<this.BoardSquaresCopy.length;i++)
            {
                if(this.BoardSquaresCopy[i]>0){
                    this.ValidMoveGeneration(BoardRF[i],this.BoardSquaresCopy[i])
                }
            }

            llength =this.AllValidMoves.length
            //this loop gets rid of available counter moves
            for(let i=0; i<llength;i++)
            {
                
                
                if(this.PossibleAvailableCounterMoves.indexOf(this.AllValidMoves[i])!==-1)
                {
                    this.AvailableCounterMoves.push(this.AllValidMoves[i])
                    
                }
            } 
            if(this.CKSValidMove.length!==0 && this.AvailableCounterMoves.length!==0)
            {
                this.check=this.MoveMaker
                //AvaileableTargetList
                console.log(this.LastPieceMovedLineOfSightMoves)
                console.log("line of sight is "+this.LastPieceMovedLineOfSight)
                console.log(this.LastPieceMovedSource)
            }
            else
            {
                this.checkmate=this.MoveMaker
            }
                
            
            
            console.log("checking white king")
            break;
        case COLORS.BLACK:

            
            this.AllValidMoves=[];
            for(let i =0;i<this.BoardSquaresCopy.length;i++)
            {
                if(this.BoardSquaresCopy[i]>0){
                    this.ValidMoveGeneration(BoardRF[i],this.BoardSquaresCopy[i])
                }
            }
            if (this.LastPieceMovedLineOfSight=== LINEOFSIGHT.NONE)
            {
                return true
            }
            else
            {
                this.IBKSwapUndo(SIndex,TIndex)
                return false
            }
            let length=this.AllValidMoves.length
            this.CheckKingsSurroundings(this.BoardRF [this.BoardSquaresCopy.indexOf(PIECES.bK)],PIECES.bK)
            this.LastPieceMovedLineOfSightMoves.push(this.LastPieceMovedSource)
            this.PossibleAvailableCounterMoves=this.LastPieceMovedLineOfSightMoves
            console.log(this.CKSValidMove)
            for(let i=0; i<length;i++)
            {
                console.log(this.CKSValidMove.length)
                
                if(this.CKSValidMove.indexOf(this.AllValidMoves[i])!==-1)
                {
                    if (this.CKSValidMove.indexOf(this.AllValidMoves[i])===0)
                    {
                        this.CKSValidMove.shift()
                    }
                    else
                    {
                        console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                        this.CKSValidMove.splice(this.CKSValidMove.indexOf(this.AllValidMoves[i],1))
                        console.log(this.CKSValidMove.indexOf(this.AllValidMoves[i]))
                        
                    }
                }
            }
            
            

            console.log("aftyer loop "+this.AllValidMoves)
            console.log(this.CKSValidMove)
            this.AllValidMoves=[];
            for(let i =0;i<this.BoardSquaresCopy.length;i++)
            {
                if(this.BoardSquaresCopy[i]<0){
                    this.ValidMoveGeneration(BoardRF[i],this.BoardSquaresCopy[i])
                }
            }

            length =this.AllValidMoves.length
            //this loop gets rid of available counter moves
            for(let i=0; i<length;i++)
            {
                
                
                if(this.PossibleAvailableCounterMoves.indexOf(this.AllValidMoves[i])!==-1)
                {
                    this.AvailableCounterMoves.push(this.AllValidMoves[i])
                    
                }
            }
            if(this.CKSValidMove.length!==0 && this.AvailableCounterMoves.length!==0)
            {
                this.check=this.MoveMaker
                //AvaileableTargetList
                console.log(this.LastPieceMovedLineOfSightMoves)
            }
            else
            {
                this.checkmate=this.MoveMaker
            }
                
            
            console.log("Checking black king")

            break;
        }
    
    }

    ISBKValidMoveGeneration(source,piece){
        this.VMGFileRank=source;
        this.VMGSourceIndex=this.FindFileRank(this.VMGFileRank);
        
        if(this.MoveMaker===COLORS.BLACK)
        this.CheckKingsSurroundings(BoardRF [this.BoardSquaresCopy.indexOf(PIECES.bK)],PIECES.bK);
        if(this.MoveMaker===COLORS.WHITE)
        this.CheckKingsSurroundings(BoardRF [this.BoardSquaresCopy.indexOf(PIECES.wK)],PIECES.wK);
        
        switch(piece){
            case PIECES.wP: 
            console.log("whiete Pawn")
            // this checks they are trying to move forward but there is a piece in the way
            if (this.BoardSquaresCopy[this.VMGSourceIndex-10]===PIECES.EMPTY)
            {
                //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
            }
            //this checks the right diagnal for a black piece and if its there it can move there to overtake it 
            if((this.BoardSquaresCopy[this.VMGSourceIndex-9]<=0 ))
            {
                console.log("white pawn move "+BoardRF[this.VMGSourceIndex-9])
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                
            }
            //this checks the left diagnol for a black piece and if its there it can move there to overtake it
            if((this.BoardSquaresCopy[this.VMGSourceIndex-11]<=0))
            {
                console.log("white pawn move"+BoardRF[this.VMGSourceIndex-11])
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT  
                        
                    }
            }
            //The basic foward movement of the piece
            for(let i=0;i<8;i++)
            {
                
                if(source===FILES[i]+RANKS[1])
                {
                    //this.AllValidMoves.push (BoardRF[this.VMGSourceIndex-20]);
                }
            }
            //console.log("White Pawn moves "+this.AllValidMoves)
            //console.log("target move "+target)
            
            break;
            case PIECES.bP:
                
                if (this.BoardSquaresCopy[this.VMGSourceIndex+10]===PIECES.EMPTY)
                {
                    //this.AllValidMoves.push (BoardRF[this.VMGSourceIndex+10]);
                }
                if((this.BoardSquaresCopy[this.VMGSourceIndex+9]>=0) )
                {
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                if((this.BoardSquaresCopy[this.VMGSourceIndex+11]>=0 ) )
                {
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                
                for(let i=0;i<8;i++)
                {
                    //console.log("hola"+FILES[i]+RANKS[6])
                    if(source===FILES[i]+RANKS[6])
                    {
                        //this.AllValidMoves.push (BoardRF[this.VMGSourceIndex+20]);
                    }
                }
                console.log("Black pawn moves "+this.AllValidMoves)
                //console.log("target move "+target)
                
                break;  
            case PIECES.wR:
                
                //forward loop
                
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        console.log(this.BoardSquaresCopy.indexOf(PIECES.bK)+"current king index")
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<=0)
                        {

                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            //if the king is on on the tile skip keep checking because king could try to 
                            //move back in the same direction
                            
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*10))
                            {
                                console.log("cotinuing becauae found king")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>0)
                        {
                            //this.CKSValidMove = this.CheckKingsSurroundings(this.BoardSquaresCopy.indexOf(PIECES.bK),PIECES.bK)   
                            //this checks the kings possible moves and if a friendly is within attacking distance of 
                            //the king it means it could try to move to that square we shouldn't allow it if its in path
                            // of attacking move 
                            
                            console.log("CKSVALIDMOVE "+this.CKSValidMove)
                            console.log(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]))
                            console.log(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy forward")
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*10))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy back")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+i)
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+i && this.BoardSquaresCopy[this.VMGSourceIndex+i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+i]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                                continue;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]<=0)
                        {
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-i && this.BoardSquaresCopy[this.VMGSourceIndex-i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-i]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                
                break;
            case PIECES.bR:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>0)
                            {
                                break;
                            }
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy backward")
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy forward")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+i && this.BoardSquaresCopy[this.VMGSourceIndex+i]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-i && this.BoardSquaresCopy[this.VMGSourceIndex-i]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                
                break;
            case PIECES.wB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>0)
                        {
                            console.log(this.CKSValidMove)
                            this.CheckKingsSurroundings(BoardRF [this.BoardSquaresCopy.indexOf(PIECES.bK)],PIECES.bK)
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*9)]!==-1))
                            {
                                console.log("in white bishop right diagnoal")
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*1)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT;
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*11)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+(i*9)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex+(i*11)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.bB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===BoardRF [this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop downright diagnal black bishop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]>=0)
                        {
                            console.log(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)])
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            console.log("asdfwsadfewsdfwsdf "+BoardRF[this.VMGSourceIndex]+" laspieced moved soruce "+this.LastPieceMovedSource+" Line of sight is "+this.LastPieceMovedLineOfSight)
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                console.log("PUSHING THE SHIT")
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                                console.log(this.LastPieceMovedLineOfSightMoves)
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.wQ:
                
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*10))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>0)
                        {
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            console.log("Not attacking")
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy forward")
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*10))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy back")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+i)
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+i && this.BoardSquaresCopy[this.VMGSourceIndex+i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-i)
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-i && this.BoardSquaresCopy[this.VMGSourceIndex-i]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===  BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex-(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*9))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex]  && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+(i*11))
                            {
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.bK)!==this.VMGSourceIndex+(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<0)
                            {
                                break;
                            }
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]>0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.bQ:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        console.log("empy backward")
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*10))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*10) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        console.log("empy forward")
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+i && this.BoardSquaresCopy[this.VMGSourceIndex+i]>0)
                            {
                                break;
                            }
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        console.log("empy right")
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-i)
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-i && this.BoardSquaresCopy[this.VMGSourceIndex-i]>0)
                            {
                                break;
                            }
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        console.log("empy left")
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        console.log("empy upright")
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex-(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        console.log("empy upleft")
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*9))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*9) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        console.log("empy downleft")
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    console.log("In loop")
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            console.log("Ataccking")
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+(i*11))
                            {
                                console.log("continuing")
                                this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                                continue;
                            }
                            if(this.BoardSquaresCopy.indexOf(PIECES.wK)!==this.VMGSourceIndex+(i*11) && this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]>0)
                            {
                                break;
                            }
                            
                        }
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<0)
                        {
                            console.log("Not attacking")
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        console.log("empy downright")
                    }
                }
                
                break;
            case PIECES.wN:
                
                //top right upper
                if(BoardRF[this.VMGSourceIndex-19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                        
                    }
                    
                }
                //top left upper
                if(BoardRF[this.VMGSourceIndex-21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //bottom left lower
                if(BoardRF[this.VMGSourceIndex+19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //bottom right lower
                if(BoardRF[this.VMGSourceIndex+21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //top right lower
                if(BoardRF[this.VMGSourceIndex-8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                //top left lower
                if(BoardRF[this.VMGSourceIndex-12]!=='x' )
                {   
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //bottom right upper
                if(BoardRF[this.VMGSourceIndex+12]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //bottom left uppeer
                if(BoardRF[this.VMGSourceIndex+8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                
                break;
            case PIECES.bN:
                
                //top right upper
                if(BoardRF[this.VMGSourceIndex-19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPLEFT
                        
                    }
                }
                //top left upper
                if(BoardRF[this.VMGSourceIndex-21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //bottom left lower
                if(BoardRF[this.VMGSourceIndex+19]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+19])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+19])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+19)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //bottom right lower
                if(BoardRF[this.VMGSourceIndex+21]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+21])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+21])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+21)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //top right lower
                if(BoardRF[this.VMGSourceIndex-8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                //top left lower
                if(BoardRF[this.VMGSourceIndex-12]!=='x' )
                {   
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //bottom right upper
                if(BoardRF[this.VMGSourceIndex+12]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+12])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+12])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+12)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //bottom left uppeer
                if(BoardRF[this.VMGSourceIndex+8]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+8])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+8])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex+8)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                
                break;
            case PIECES.wK:
                
                //move up
                if(BoardRF[this.VMGSourceIndex-10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //move down
                if(BoardRF[this.VMGSourceIndex+10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //move right 
                if(BoardRF[this.VMGSourceIndex+1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //move left
                if(BoardRF[this.VMGSourceIndex-1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                //move diagnol top right
                if(BoardRF[this.VMGSourceIndex-9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnal top left
                if(BoardRF[this.VMGSourceIndex-11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnol bottom left
                if(BoardRF[this.VMGSourceIndex+9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //move diagnal bottom right
                if(BoardRF[this.VMGSourceIndex+11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                
                break;
            case PIECES.bK:
                
                //move up
                if(BoardRF[this.VMGSourceIndex-10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.UP
                        
                    }
                }
                //move down
                if(BoardRF[this.VMGSourceIndex+10]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+10])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+10])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+10)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.DOWN
                        
                    }
                }
                //move right 
                if(BoardRF[this.VMGSourceIndex+1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.RIGHT
                        
                    }
                }
                //move left
                if(BoardRF[this.VMGSourceIndex-1]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-1])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-1])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-1)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.LEFT
                        
                    }
                }
                //move diagnol top right
                if(BoardRF[this.VMGSourceIndex-9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnal top left
                if(BoardRF[this.VMGSourceIndex-11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex-11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                }
                //move diagnol bottom left
                if(BoardRF[this.VMGSourceIndex+9]!=='x')
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+9])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                //move diagnal bottom right
                if(BoardRF[this.VMGSourceIndex+11]!=='x' )
                {    
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+11])
                    }
                    console.log("Ataccking")
                    if(this.BoardSquaresCopy.indexOf(PIECES.bK)===this.VMGSourceIndex+11)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMRIGHT
                        
                    }
                }
                
                break;
        }   

    }

    FindFileRank(FileRank){
        for(let i =0;i<120;i++)
        {
            if(BoardRF[i]==FileRank)
            {
                return i
            }
        }
    }
}

var FILES =['a', 'b', 'c', 'd', 'e', 'f','g','h','x'];

var RANKS =['1', '2', '3', '4', '5', '6', '7', '8','x'];

var PIECES = { EMPTY:0,wP:1,wN:2,wB:3,wR:4,wQ:5,wK:6,bP:-1,bN:-2,bB:-3,bR:-4,bQ:-5,bK:-6};
var BoardSize=120

var LINEOFSIGHT={TOPLEFT:0,UP:1,TOPRIGHT:2,RIGHT:3,BOTTOMRIGHT:4,DOWN:5,BOTTOMLEFT:6,LEFT:7,NONE:null}

var COLORS = { WHITE:"w",BLACK:"b"};

//var COLORS = { WHITE:0,BLACK:1};




let BoardSquares = new Array(120);

//Below the board is initialized, a better way to do this is to create an FEN string inperter
for (let i =0; i<120;i++)
{   //console.log(i)
    if (i>=41 && i <=48)
    {
        BoardSquares[i]=0;
    }
    else if (i>=51 && i <=58)
    {
        BoardSquares[i]=0;
    }
    else if (i>=61 && i <=68)
    {
        BoardSquares[i]=0;
    }
    else if (i>=71 && i <=78)
    {
        BoardSquares[i]=0;
    }
    else if (i>=31 && i<=38)
    {
        BoardSquares[i]=PIECES.bP
    }
    else if (i>=81 && i<=88)
    {
        BoardSquares[i]=PIECES.wP
    }
    else if (i>=21 && i<=28)
    {
        switch(i){
            case 21: BoardSquares[i]=PIECES.bR
            break;
            case 22: BoardSquares[i]=PIECES.bN
            break;
            case 23: BoardSquares[i]=PIECES.bB
            break;
            case 24: BoardSquares[i]=PIECES.bQ
            break;
            case 25: BoardSquares[i]=PIECES.bK
            break;
            case 26: BoardSquares[i]=PIECES.bB
            break;
            case 27: BoardSquares[i]=PIECES.bN
            break;
            case 28: BoardSquares[i]=PIECES.bR
            break;
            
        }
    }
    else if (i>=91 && i<=98)
    {
        switch(i){
            case 91: BoardSquares[i]=PIECES.wR
            break;
            case 92: BoardSquares[i]=PIECES.wN
            break;
            case 93: BoardSquares[i]=PIECES.wB
            break;
            case 94: BoardSquares[i]=PIECES.wQ
            break;
            case 95: BoardSquares[i]=PIECES.wK
            break;
            case 96: BoardSquares[i]=PIECES.wB
            break;
            case 97: BoardSquares[i]=PIECES.wN
            break;
            case 98: BoardSquares[i]=PIECES.wR
            break;
            
        }

    }
    else{
    
        BoardSquares[i]="x"
    }

}

// creating a copy of the board but that is rank and files
let BoardRF =new Array(120);

for(let i=0;i<120;i++){
    if (i>=21 && i <=28)
    {
        BoardRF[i]=FILES[i-21]+RANKS[7];
    }
    else if (i>=31 && i <=38)
    {
        BoardRF[i]=FILES[i-31]+RANKS[6];
    }
    else if (i>=41 && i <=48)
    {
        BoardRF[i]=FILES[i-41]+RANKS[5];
    }
    else if (i>=51 && i <=58)
    {
        BoardRF[i]=FILES[i-51]+RANKS[4];
    }
    else if (i>=61 && i <=68)
    {
        BoardRF[i]=FILES[i-61]+RANKS[3];
    }
    else if (i>=71 && i <=78)
    {
        BoardRF[i]=FILES[i-71]+RANKS[2];
    }
    else if (i>=81 && i <=88)
    {
        BoardRF[i]=FILES[i-81]+RANKS[1];
    }
    else if (i>=91 && i <=98)
    {
        BoardRF[i]=FILES[i-91]+RANKS[0];
    }
    else
    {
        BoardRF[i]='x'
    }


}
    

    




function whatpiece(piece){
    console.log(piece);
}



var BRD_SQ_NUM=120;







