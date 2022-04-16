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
        this.CCLeftwRook=true;//can castle, left white rook
        this.CCRightwRook=true;//can castle, right white rook
        this.CCbKing=true;//can castle, black king
        this.CCwKing=true;//can castle, white king
        this.ExecuteCastle=false;
        this.Castled=false;
        this.Promote=false;
        this.PawnLocation=null
        this.bPenpassantable=false;// black pawn up two squars
        this.wPenpassantable=false;
        this.enpassantableFrom=[];
        this.enpassantaTile=null;
        this.ExecuteEnpassant=false;
        this.enpassanted=false;
        this.enpassantMoveCounter=2;
        this.BestMoveSource=null;
        this.BestMoveSource=null;
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

        
        if(this.ExecuteEnpassant===true && TIndex===this.enpassantaTileIndex)
        {
            
            switch(this.MoveMaker){
                case COLORS.WHITE:
                    this.BoardSquares[this.enpassantaTileIndex+10]=PIECES.EMPTY
                    break;
                case COLORS.BLACK:
                    this.BoardSquares[this.enpassantaTileIndex-10]=PIECES.EMPTY
                    break;
    
            }
        }

        this.temp=this.BoardSquaresCopy[SIndex];
        this.BoardSquaresCopy[SIndex]=this.BoardSquaresCopy[TIndex];
        this.BoardSquaresCopy[TIndex]=this.temp;
    }

    CastleSwap(target){
        switch(this.MoveMaker){
            case COLORS.WHITE:
                //This does the piece "swap" involved with a long castle
                if(target=='c1'){
                    this.BoardSquares[93]=PIECES.wK
                    this.BoardSquares[94]=PIECES.wR
                    this.BoardSquares[95]=PIECES.EMPTY
                    this.BoardSquares[91]=PIECES.EMPTY
                }
                if(target=='g1'){
                    this.BoardSquares[97]=PIECES.wK
                    this.BoardSquares[96]=PIECES.wR
                    this.BoardSquares[95]=PIECES.EMPTY
                    this.BoardSquares[98]=PIECES.EMPTY
                }
                break;
            case COLORS.BLACK:
                //This does the piece "swap" involved with a long castle
                if(target=='c8'){
                    this.BoardSquares[23]=PIECES.bK
                    this.BoardSquares[24]=PIECES.bR
                    this.BoardSquares[25]=PIECES.EMPTY
                    this.BoardSquares[21]=PIECES.EMPTY
                }
                if(target=='g8'){
                    this.BoardSquares[27]=PIECES.bK
                    this.BoardSquares[26]=PIECES.bR
                    this.BoardSquares[25]=PIECES.EMPTY
                    this.BoardSquares[28]=PIECES.EMPTY
                }
                break;
        }
    }
    IBKSwapUndo(SIndex,TIndex)
    {
        this.temp=this.BoardSquaresCopy[TIndex];
        this.BoardSquaresCopy[TIndex]=this.BoardSquaresCopy[SIndex];
        this.BoardSquaresCopy[SIndex]=this.temp;

        if(this.ExecuteEnpassant===true && TIndex===this.enpassantaTileIndex)
        {
            this.ExecuteEnpassant === false
            switch(this.MoveMaker){
                case COLORS.WHITE:
                    this.BoardSquares[this.enpassantaTileIndex+10]=PIECES.bP
                    break;
                case COLORS.BLACK:
                    this.BoardSquares[this.enpassantaTileIndex-10]=PIECES.wP
                    break;
    
            }
        }
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
        if(this.Promote===true)
        {
            if(this.Promote===true)
            {
                if(source!=='spare' || target!==this.PawnLocation ){
                    return false;
                }
                else{

                    if(piece[1]==='K')
                        return false;

                    this.PawnLocationIndex= this.FindFileRank(this.PawnLocation)
                    switch(piece){
                        case 'wP':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.wP
                            this.SetLastPieceMoved(PIECES.wP,this.PawnLocationIndex)
                        break;
                        case 'bP':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.bP
                            this.SetLastPieceMoved(PIECES.bP,this.PawnLocationIndex)
                        break;
                        case 'wR':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.wR
                            this.SetLastPieceMoved(PIECES.wR,this.PawnLocationIndex)
                        break;
                        case 'bR':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.bR
                            this.SetLastPieceMoved(PIECES.bR,this.PawnLocationIndex)
                        break;
                        case 'wB':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.wB
                            this.SetLastPieceMoved(PIECES.wB,this.PawnLocationIndex)
                        break;
                        case 'bB':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.bB
                            this.SetLastPieceMoved(PIECES.bB,this.PawnLocationIndex)
                        break;
                        case 'wN':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.wN
                            this.SetLastPieceMoved(PIECES.wN,this.PawnLocationIndex)
                        break;
                        case 'bN':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.bN
                            this.SetLastPieceMoved(PIECES.bN,this.PawnLocationIndex)
                        break;
                        case 'wQ':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.wQ
                            this.SetLastPieceMoved(PIECES.wQ,this.PawnLocationIndex)
                        break;
                        case 'bQ':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.bQ
                            this.SetLastPieceMoved(PIECES.bQ,this.PawnLocationIndex)
                        break;
                        case 'wK':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.wK
                            this.SetLastPieceMoved(PIECES.wK,this.PawnLocationIndex)
                        break;
                        case 'bK':
                            this.BoardSquares[this.PawnLocationIndex]=PIECES.bK
                            this.SetLastPieceMoved(PIECES.bK,this.PawnLocationIndex)
                        break;
                    }
                    
                    this.Promote=false;
                    this.NextTurn()
                    return true;
                }
                
            }
        }
        else if(source!=='spare' && this.check===this.MoveMaker )
        {
            if(this.ValidMoveCheck(source,target,piece) && ((this.IsBlockingking(this.SourceIndex,this.TargetIndex) &&  this.LastPieceMovedLineOfSightMoves.indexOf(target)!==-1) || piece[1]==='K' || piece===PIECES.wK || piece===PIECES.bK))
            {
                this.swap(this.BoardSquares,this.SourceIndex,this.TargetIndex);
                this.RemoveCastleAbility(source,piece);
                this.NextTurn();
                this.check=0
                return true;
            }
            else{
                return false;
            }
        }
        else if(source!=='spare' && this.ValidMoveCheck(source,target,piece) && this.check!==this.MoveMaker )
        {
            //if (this.IsBlockingking()) return false
            //this.BoardSquares=this.BoardSquaresCopy
            //this.swap(this.BoardSquares,this.SourceIndex,this.TargetIndex);

            

            if(this.ExecuteCastle===true){
                    if(this.Castling(target,piece)){
                        this.RemoveCastleAbility(source,piece);
                        this.NextTurn();
                        this.Castled=true;
                        return true;
                    }
                    else{
                        this.ExecuteCastle=false;
                        return false;
                    }
            }
            else if(this.IsBlockingking(this.SourceIndex,this.TargetIndex)){
                if (this.ExecuteEnpassant === true) {
                    this.IBKSwapUndo(this.SourceIndex,this.TargetIndex)
                    this.Enpassant(this.SourceIndex,this.TargetIndex, piece)
                    this.RemoveCastleAbility(source, piece);
                    this.RemoveEnpassant()
                    this.NextTurn();
                    this.enpassanted = true;
                    return true;
                    
                }
                if(this.enpassantMoveCounter===0){
                this.RemoveEnpassant()
                }
                else this.enpassantMoveCounter+=-1;
                this.RemoveCastleAbility(source,piece);
                this.Promotion(this.TargetIndex,target,piece)
                this.NextTurn();
                return true;
            }
            else return false;
        }
        else{
            return false;
        }
        
    }

    RemoveEnpassant(){
        this.bPenpassantable = false;// black pawn up two squars
        this.wPenpassantable = false;
        this.enpassantableFrom = [];
        this.enpassantaTile = null;
        this.ExecuteEnpassant = false;
        this.enpassantMoveCounter=2;
        
    }
    
    Enpassant(SIndex,TIndex,piece){
        this.enpassantaTileIndex = this.FindFileRank(this.enpassantaTile);

        switch(this.MoveMaker){
            case COLORS.WHITE:
                this.BoardSquares[this.enpassantaTileIndex]=PIECES.wP;
                this.BoardSquares[SIndex]=PIECES.EMPTY
                this.BoardSquares[this.enpassantaTileIndex+10]=PIECES.EMPTY
                this.ExecuteEnpassant=false;
                break;
            case COLORS.BLACK:
                this.BoardSquares[this.enpassantaTileIndex]=PIECES.bP;
                this.BoardSquares[SIndex]=PIECES.EMPTY
                this.BoardSquares[this.enpassantaTileIndex-10]=PIECES.EMPTY
                this.ExecuteEnpassant=false;
                break;

        }
        
    }

    Promotion(TIndex,target,piece){
        //last piece moved is promoted piece
        if(piece[1]==='P')
        {
            switch(this.MoveMaker){
                case COLORS.WHITE: 
                    for(let i=21; i<=28;i++ )
                    {
                        if(TIndex===i){
                            this.Promote=true
                            this.PawnLocation=target
                            this.NextTurn()
                        }
                    }
                    break;
                case COLORS.BLACK: 
                    for(let i=91; i<=98;i++ )
                    {
                        if(TIndex===i){
                            this.Promote=true
                            this.PawnLocation=target
                            this.NextTurn()
                        }
                    }
                    break;
            }
        }
    }
    RemoveCastleAbility(source, piece){
        switch(piece){
            case PIECES.wR:
            case 'wR': 
                if(source==='a1'){
                    this.CCLeftwRook=false;
                }
                if(source==='h1'){
                    this.CCRightwRook=false;
                }
                break;
            case PIECES.bR:
            case 'bR':
                if(source==='a8'){
                    this.CCLeftbRook=false;
                }
                if(source==='h8'){
                    this.CCRightbRook=false;
                }
                break;
            case PIECES.wK:
            case 'wK': this.CCwKing=false; 
                break;
            case PIECES.bK:
            case 'bK': this.CCbKing= false; 
                break;

        }
    }
    CastlingCheck(target,piece){
        switch(piece)
        {
            case 'wK':
                
                if((target==='g1' && 
                this.CCRightwRook===true && 
                this.CCwKing===true && 
                this.check!==COLORS.WHITE
                )){
                    //Check to see if there are no pieces in the way (f1,g1)
                    if(BoardSquares[96]===PIECES.EMPTY && BoardSquares[97]===PIECES.EMPTY){
                        this.AllValidMoves=[];
                        for(let i =0;i<BoardSquares.length;i++)
                        {
                            if(BoardSquares[i]<0){
                                this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                            }
                        }
                        for(let i=0;i<this.AllValidMoves.length;i++){
                            if(this.AllValidMoves[i]===BoardRF[96] || this.AllValidMoves[i]===BoardRF[97]){
                                return false;
                            }
                        }
                        return true;
                    }
                }
                else if((target==='c1' && 
                this.CCLeftwRook===true && 
                this.CCwKing===true && 
                this.check!==COLORS.WHITE
                )){
                    //Check to see if there are no pieces in the way (b1,c1,d1)
                    if(BoardSquares[92]===0 && BoardSquares[93]===0 && BoardSquares[94]===0){

                        this.AllValidMoves=[];
                        for(let i =0;i<BoardSquares.length;i++)
                        {
                            if(BoardSquares[i]<0){
                                this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                            }
                        }
                        for(let i=0;i<this.AllValidMoves.length;i++){
                            if(this.AllValidMoves[i]===BoardRF[92] || this.AllValidMoves[i]===BoardRF[93] || this.AllValidMoves[i]===BoardRF[94]){
                                return false;
                            }
                        }
                        return true;
                    }
                }
                else{
                    return false
                }
                break;
            
            case 'bK' :
                if((target==='g8' && 
                this.CCRightbRook===true && 
                this.CCbKing===true && 
                this.check!==COLORS.BLACK
                )){
                    //Check to see if there are no pieces in the way (f1,g1)
                    if(BoardSquares[26]===0 && BoardSquares[27]===0){
                        this.AllValidMoves=[];
                        for(let i =0;i<BoardSquares.length;i++)
                        {
                            if(BoardSquares[i]>0){
                                this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                            }
                        }
                        for(let i=0;i<this.AllValidMoves.length;i++){
                            if(this.AllValidMoves[i]===BoardRF[26] || this.AllValidMoves[i]===BoardRF[27]){
                                return false;
                            }
                        }
                        return true;
                    }
                }
                else if((target==='c8' && 
                this.CCLeftbRook===true && 
                this.CCbKing===true && 
                this.check!==COLORS.BLACK
                )){
                    //Check to see if there are no pieces in the way (b1,c1,d1)
                    if(BoardSquares[22]===0 && BoardSquares[23]===0 && BoardSquares[24]===0){

                        this.AllValidMoves=[];
                        for(let i =0;i<BoardSquares.length;i++)
                        {
                            if(BoardSquares[i]>0){
                                this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
                            }
                        }
                        for(let i=0;i<this.AllValidMoves.length;i++){
                            if(this.AllValidMoves[i]===BoardRF[22] || this.AllValidMoves[i]===BoardRF[23] || this.AllValidMoves[i]===BoardRF[24]){
                                return false;
                            }
                        }
                        return true;
                    }
                }
                else{
                    return false
                }
                break;
            default: return false; 
        }
    }

    Castling(target,piece){ 

        if(this.CastlingCheck(target,piece)){
            this.CastleSwap(target,piece);
            this.ExecuteCastle=false;
            return true;
        }
        else{
            this.ExecuteCastle=false;
            return false;
        }

    }



    SetLastPieceMoved(piece, target)
    {
        this.LastPieceMovedSource=target
        this.LastPieceMovedLineOfSightMoves=[];
        this.LastPieceMovedLineOfSight=LINEOFSIGHT.NONE
        switch(piece)
        {
            case PIECES.wP:
            case 'wP':this.LastPieceMoved=PIECES.wP
            break;
            case PIECES.bP:
            case 'bP':this.LastPieceMoved=PIECES.bP
            break;
            case PIECES.wR:
            case 'wR':this.LastPieceMoved=PIECES.wR
            break;
            case PIECES.bR:
            case 'bR':this.LastPieceMoved=PIECES.bR
            break;
            case PIECES.wB:
            case 'wB':this.LastPieceMoved=PIECES.wB
            break;
            case PIECES.bB:
            case 'bB':this.LastPieceMoved=PIECES.bB
            break;
            case PIECES.wN:
            case 'wN':this.LastPieceMoved=PIECES.wN
            break;
            case PIECES.bN:
            case 'bN':this.LastPieceMoved=PIECES.bN
            break;
            case PIECES.wQ:
            case 'wQ':this.LastPieceMoved=PIECES.wQ
            break;
            case PIECES.bQ:
            case 'bQ':this.LastPieceMoved=PIECES.bQ
            break;
            case PIECES.wK:
            case 'wK':this.LastPieceMoved=PIECES.wK
            break;
            case PIECES.bK:
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
            case PIECES.wP:
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
            
            //for when the pawn moves twice upward, set things up allow it to be enpassantable
            for(let i=0;i<8;i++)
            {
                //this.RemoveEnpassant()
                if(source===FILES[i]+RANKS[1] && BoardSquares[this.SourceIndex-20]===PIECES.EMPTY && BoardSquares[this.SourceIndex-10]===PIECES.EMPTY)
                {
                    this.RemoveEnpassant()
                    this.ValidMove.push (BoardRF[this.SourceIndex-20]);
                    if(BoardRF [this.SourceIndex-19]!=='x')
                    {
                        this.enpassantableFrom.push(BoardRF[this.SourceIndex - 19])
                    }
                    if (BoardRF[this.SourceIndex - 21] !== 'x') {
                        this.enpassantableFrom.push(BoardRF[this.SourceIndex - 21])
                    }
                    
                    this.enpassantaTile = BoardRF[this.SourceIndex - 10];
                    this.enpassantaTileIndex = this.FindFileRank(this.enpassantaTile);
                    this.wPenpassantable=true;
                    this.PawnLocation=BoardRF[this.SourceIndex-20];
                    
                }
            }

            for(let i=0;i<8;i++)
            {
                
                if(source===FILES[i]+RANKS[4] && this.bPenpassantable===true && (source===this.enpassantableFrom[0] || source===this.enpassantableFrom[1]) && target===this.enpassantaTile)
                {
                    this.ValidMove.push (this.enpassantaTile);
                    this.ExecuteEnpassant=true;

                }
            }

            
            console.log("valid move "+this.ValidMove)
            console.log("target move "+target)
            return this.CheckValidMove(target)
            break;
            case PIECES.bP:
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
                    if(source===FILES[i]+RANKS[6] && BoardSquares[this.SourceIndex+20]===PIECES.EMPTY && BoardSquares[this.SourceIndex+10]===PIECES.EMPTY)
                    {
                        this.RemoveEnpassant()
                        this.ValidMove.push (BoardRF[this.SourceIndex+20]);
                        if (BoardRF[this.SourceIndex + 19] !== 'x') {
                            this.enpassantableFrom.push(BoardRF[this.SourceIndex + 19])
                        }
                        if (BoardRF[this.SourceIndex + 21] !== 'x') {
                            this.enpassantableFrom.push(BoardRF[this.SourceIndex + 21])
                        }
                        
                        this.enpassantaTile = BoardRF[this.SourceIndex + 10];
                        this.enpassantaTileIndex = this.FindFileRank(this.enpassantaTile);
                        this.bPenpassantable = true;
                        this.PawnLocation=BoardRF[this.SourceIndex+20];
                        
                    }
                }

                for (let i = 0; i < 8; i++) {

                    if (source === FILES[i] + RANKS[3] && this.wPenpassantable === true && (source === this.enpassantableFrom[0] || source === this.enpassantableFrom[1]) && target===this.enpassantaTile) {
                        this.ValidMove.push(this.enpassantaTile);
                        this.ExecuteEnpassant=true;

                    }
                }

                console.log("valid move "+this.ValidMove)
                console.log("target move "+target)
                return this.CheckValidMove(target)
                break;  
            case PIECES.wR:
            case "wR":
                
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                return this.CheckValidMove(target)
                break;
            case PIECES.bR:
            case "bR":
                
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                return this.CheckValidMove(target)
                break;
            case PIECES.wB:
            case "wB":
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                return this.CheckValidMove(target)
                break;
            case PIECES.bB:
            case "bB":
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                return this.CheckValidMove(target)
                break;
            case PIECES.wQ:
            case "wQ":
                
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                return this.CheckValidMove(target)
                break;
            case PIECES.bQ:
            case "bQ":
                
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            
                            break;
                        }
                        this.ValidMove.push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                return this.CheckValidMove(target)
                break;
            case PIECES.wN:
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
            case PIECES.bN:
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
            case PIECES.wK:
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

                if(this.CCwKing && this.CCLeftwRook && target==='c1'){
                    this.ExecuteCastle=true;
                    this.ValidMove.push(BoardRF[93])
                }
                if(this.CCwKing && this.CCRightwRook && target==='g1'){
                    this.ExecuteCastle=true;
                    this.ValidMove.push(BoardRF[97])
                }
                if(this.CheckValidMove(target))
                {
                    return this.CheckValidKingMove(target)
                }
                return false
                break;
            case PIECES.bK:
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
                if (this.CCbKing && this.CCLeftbRook && target === 'c8'){
                    this.ExecuteCastle=true;
                    this.ValidMove.push(BoardRF[23])
                }
                if (this.CCbKing && this.CCRightbRook && target === 'g8' ){
                    this.ExecuteCastle=true;
                    this.ValidMove.push(BoardRF[27])
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
            
            // this checks they are trying to move forward but there is a piece in the way
            if (BoardSquares[this.VMGSourceIndex-10]===PIECES.EMPTY)
            {
                //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
            }
            //this checks the right diagnal for a black piece and if its there it can move there to overtake it 
            if((BoardSquares[this.VMGSourceIndex-9]!=='x' ))
            {
                
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                
            }
            //this checks the left diagnol for a black piece and if its there it can move there to overtake it
            if((BoardSquares[this.VMGSourceIndex-11]!=='x'))
            {
                
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    
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
                if((BoardSquares[this.VMGSourceIndex+9]!=='x') )
                {
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+9])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+9])
                    }
                    
                    if(this.BoardSquares.indexOf(PIECES.wK)===this.VMGSourceIndex+9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.BOTTOMLEFT
                        
                    }
                }
                if((BoardSquares[this.VMGSourceIndex+11]!=='x' ) )
                {
                    this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+11])
                    if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+11])
                    }
                    
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
                
                //console.log("target move "+target)
                
                break;  
            case PIECES.wR:
                
                //forward loop
                
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                       
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]<=0)
                        {

                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                           
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                
                            break;
                        }
                        
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            
                            break;
                        }
                        
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            
                            break;
                        }
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-i]<=0)
                        {
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            
                            break;
                        }
                        
                    }
                }
                
                break;
            case PIECES.bR:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            
                           
                            break;
                        }
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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

                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            
                            break;
                        }
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        
                        
                    }
                }
                
                break;
            case PIECES.wB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            
                            break;
                        }
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*1)])
                            }
                            
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
                           
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            
                            break;
                        }
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        
                    }
                }
                
                break;
            case PIECES.bB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===BoardRF [this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]>=0)
                        {
                            console.log(BoardSquares[this.VMGSourceIndex+(i*11)])
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                console.log("PUSHING THE SHIT")
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                                console.log(this.LastPieceMovedLineOfSightMoves)
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        
                        
                    }
                }
                
                break;
            case PIECES.wQ:
                
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            break;
                        }
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                       
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===  BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex]  && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        
                        
                    }
                }
                
                break;
            case PIECES.bQ:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            break;
                        }
                        
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.VMGSourceIndex+(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        
                        
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
    
        this.CKSFileRank=source;
        this.CKSSourceIndex=this.FindFileRank(this.CKSFileRank);
        this.CKSValidMove=[];
        switch(KingtoCheck)
        {
        case PIECES.wK:
                
            //move up
            if(BoardRF[this.CKSSourceIndex-10]!=='x' && BoardSquares[this.CKSSourceIndex-10]<=0)
            {  
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
                //this.PossibleAvailableCounterMoves.splice(this.PossibleAvailableCounterMoves.indexOf(this.BoardRF[this.BoardSquares.indexOf(PIECES.wK)],1))
                
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
                //this.PossibleAvailableCounterMoves.splice(this.PossibleAvailableCounterMoves.indexOf(this.BoardRF[this.BoardSquares.indexOf(PIECES.bK)],1))
                
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
                    console.log("Black is in check")
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
        //if(this.check!==this.MoveMaker){
        this.BoardSquaresCopy=this.BoardSquares
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
        this.IBKSwap(SIndex,TIndex)
        
        console.log("lelll")
        return this.ISBKCheckCheckMate(SIndex,TIndex)
        //}
        //else return false;
        

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
            
            // this checks they are trying to move forward but there is a piece in the way
            if (this.BoardSquaresCopy[this.VMGSourceIndex-10]===PIECES.EMPTY)
            {
                //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-10])
            }
            //this checks the right diagnal for a black piece and if its there it can move there to overtake it 
            if((this.BoardSquaresCopy[this.VMGSourceIndex-9]<=0 ))
            {
                
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-9])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-9])
                    }
                    
                    if(this.BoardSquaresCopy.indexOf(PIECES.wK)===this.VMGSourceIndex-9)
                    {
                        console.log("continuing")
                        this.LastPieceMovedLineOfSight=LINEOFSIGHT.TOPRIGHT
                        
                    }
                
            }
            //this checks the left diagnol for a black piece and if its there it can move there to overtake it
            if((this.BoardSquaresCopy[this.VMGSourceIndex-11]<=0))
            {
                
                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-11])
                if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                    {
                        this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-11])
                    }
                    
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
                
                //console.log("target move "+target)
                
                break;  
            case PIECES.wR:
                
                //forward loop
                
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<=0)
                        {

                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                            
                            
                            console.log(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]))
                            console.log(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]<=0)
                        {
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        
                    }
                }
                
                break;
            case PIECES.bR:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.CKSValidMove.indexOf(BoardRF[this.VMGSourceIndex-(i*10)]!==-1))
                            {
                                this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                                break;
                            }
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        
                    }
                }
                
                break;
            case PIECES.wB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*1)])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        
                    }
                }
                
                break;
            case PIECES.bB:
                
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===BoardRF [this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        //this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        
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
                            
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                console.log("PUSHING THE SHIT")
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                                console.log(this.LastPieceMovedLineOfSightMoves)
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
    
                    }
                }
                
                break;
            case PIECES.wQ:
                
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                            
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource ===  BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]<=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex]  && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        
                    }
                }
                
                break;
            case PIECES.bQ:
                
                //backward loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.UP)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*10)])
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*10)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*10)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.DOWN)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.VMGSourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.RIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.VMGSourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-i]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-i]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.LEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-i])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-i])
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex-(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex-(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.TOPLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*9)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*9)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMLEFT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.VMGSourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.VMGSourceIndex+(i*11)]!=='x')
                    {
                        if(this.BoardSquaresCopy[this.VMGSourceIndex+(i*11)]>=0)
                        {
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            if(this.LastPieceMovedSource === BoardRF[this.VMGSourceIndex] && this.LastPieceMovedLineOfSight===LINEOFSIGHT.BOTTOMRIGHT)
                            {
                                this.LastPieceMovedLineOfSightMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            }
                            
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
                            
                            this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                            break;
                        }
                        this.AllValidMoves.push(BoardRF[this.VMGSourceIndex+(i*11)])
                        
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

    EvaluateBoard(PrevScore){
        
        //evaluates pieces and which tile they are on
        for(let i=0;i<BoardSquares.length;i++){
            if(BoardSquares[i]!=='x'){
                PrevScore+=BoardSquares[i]
                switch(BoardSquares[i]){
                    case PIECES.wP: 
                        PrevScore+= PSTW[PIECES.wP][i];
                        break;
                    case PIECES.bP:
                        PrevScore+= PSTW[PIECES.bP][i];
                        break;
                    case PIECES.wR:
                        PrevScore+= PSTW[PIECES.wR][i];
                        break;
                    case PIECES.bR:
                        PrevScore+= PSTW[PIECES.bR][i];
                        break;
                    case PIECES.wB:
                        PrevScore+= PSTW[PIECES.wB][i];
                        break;
                    case PIECES.bB:
                        PrevScore+= PSTW[PIECES.bB][i];
                        break;
                    case PIECES.wQ:
                        PrevScore+= PSTW[PIECES.wQ][i];
                        break;
                    case PIECES.bQ:
                        PrevScore+= PSTW[PIECES.bQ][i];
                        break;
                    case PIECES.wN:
                        PrevScore+= PSTW[PIECES.wN][i];
                        break;
                    case PIECES.bN:
                        PrevScore+= PSTW[PIECES.bN][i];
                        break;
                    case PIECES.wK:
                        PrevScore+= PSTW[PIECES.wK][i];
                        break;
                    case PIECES.bK:
                        PrevScore+= PSTW[PIECES.bK][i];
                        break;
                    default: break;
                }
            }
        }
        this.AllValidMoves=[];
        for(let i =0;i<BoardSquares.length;i++)
        {
            if(BoardSquares[i]>0){
                this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
            }
        }

        PrevScore+=(this.AllValidMoves.length)*10
        console.log(this.AllValidMoves.length)
        console.log("jlksadfhaskljdfhsad")
        this.AllValidMoves=[];
        for(let i =0;i<BoardSquares.length;i++)
        {
            if(BoardSquares[i]<0){
                this.ValidMoveGeneration(BoardRF[i],BoardSquares[i])
            }
        }
        console.log(this.AllValidMoves.length)
        PrevScore+=(this.AllValidMoves.length)*-10


        return PrevScore;
    }

    AIMakeAMove(){
        let score=this.EvaluateBoard(0);
        return this.AIMiniMax()


    }

    AIMiniMax(){

        let ThisDepthsMoves={}
        switch(this.MoveMaker){
            case COLORS.WHITE:
                this.AllValidMoves=[];
                for(let i =0;i<BoardSquares.length;i++){
                    if(BoardSquares[i]>0){
                        ThisDepthsMoves= this.AIValidMoveGeneration(ThisDepthsMoves,BoardRF[i],BoardSquares[i])
                    }
                }
                
                break;
            case COLORS.BLACK:
                this.AllValidMoves=[];
                for(let i =0;i<BoardSquares.length;i++){
                    if(BoardSquares[i]<0){
                        ThisDepthsMoves= this.AIValidMoveGeneration(ThisDepthsMoves,BoardRF[i],BoardSquares[i])
                    }
                }
                

                
                break;
        }
        Object.keys(ThisDepthsMoves).forEach((key) => (ThisDepthsMoves[key] == null) && delete ThisDepthsMoves[key])
        var SuccessfulMove=false;
        console.log(ThisDepthsMoves)
        var seed=Math.random()
        
        var keys = Object.keys(ThisDepthsMoves);
        var randomkey=keys.length * seed << 0
        var RandomSource=this.BoardRF[Object.keys(ThisDepthsMoves)[randomkey]]
        var RandomTarget=ThisDepthsMoves[keys[randomkey]][Math.floor(seed * ThisDepthsMoves[keys[randomkey]].length)]
        var Piece=this.BoardSquares[Object.keys(ThisDepthsMoves)[randomkey]]
        console.log(randomkey)
        console.log(RandomSource)
        console.log( RandomTarget);
        
        var CheckMateTimeOut=0
        do{
            
            seed=Math.random()
            keys = Object.keys(ThisDepthsMoves);
            randomkey=keys.length * seed << 0
            RandomSource=this.BoardRF[Object.keys(ThisDepthsMoves)[randomkey]]
            RandomTarget=ThisDepthsMoves[keys[randomkey]][Math.floor(seed * ThisDepthsMoves[keys[randomkey]].length)]
            Piece=this.BoardSquares[Object.keys(ThisDepthsMoves)[randomkey]]
            
            
            

            if(this.Move(RandomSource,RandomTarget,Piece)===true){
                SuccessfulMove=true;
            }
            else{
                var Index= ThisDepthsMoves[keys[randomkey]].indexOf(RandomTarget)
                ThisDepthsMoves[keys[randomkey]].splice(Index,1);
                
                
            }
            Object.keys(ThisDepthsMoves).forEach((key) => (ThisDepthsMoves[key] == null) && delete ThisDepthsMoves[key])
            console.log(ThisDepthsMoves)
            CheckMateTimeOut+=1
            this.CheckCheckMate()
            if (CheckMateTimeOut>=100)
            {this.checkmate=this.MoveMaker
                break;
            }
        } while((typeof(RandomTarget) === 'undefined' || SuccessfulMove===false ) )

        
        console.log("Randome source"+RandomSource)
        console.log("random target "+ RandomTarget)
        console.log(ThisDepthsMoves[keys[randomkey]])
        console.log("seeed"+seed)
        game.SetLastPieceMoved(Piece,RandomTarget)
        if (SuccessfulMove===true)
            return [RandomSource, RandomTarget]
        else return [null,null]

        
        //
    }

    AIValidMoveGeneration(ValidMoves,source,piece){
        this.FileRank=source;
        this.SourceIndex=this.FindFileRank(this.FileRank);
        console.log("dfasdfasdf"+this.SourceIndex)
        
        
        switch(piece){
            case PIECES.wP:
            ValidMoves[this.SourceIndex]=[]

            // this checks they are trying to move forward but there is a piece in the way
            if (BoardSquares[this.SourceIndex-10]===PIECES.EMPTY)
            {
                
                ValidMoves[this.SourceIndex].push (BoardRF[this.SourceIndex-10]);
            }
            //this checks the right diagnal for a black piece and if its there it can move there to overtake it 
            if(BoardSquares[this.SourceIndex-9]<0 )
            {
                ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-9])
            }
            //this checks the left diagnol for a black piece and if its there it can move there to overtake it
            if(BoardSquares[this.SourceIndex-11]<0 )
            {
                ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-11])
            }
            //The basic foward movement of the piece
            
            //for when the pawn moves twice upward, set things up allow it to be enpassantable
            for(let i=0;i<8;i++)
            {
                //this.RemoveEnpassant()
                if(source===FILES[i]+RANKS[1] && BoardSquares[this.SourceIndex-20]===PIECES.EMPTY && BoardSquares[this.SourceIndex-10]===PIECES.EMPTY)
                {
                    this.RemoveEnpassant()
                    ValidMoves[this.SourceIndex].push (BoardRF[this.SourceIndex-20]);
                    if(BoardRF [this.SourceIndex-19]!=='x')
                    {
                        this.enpassantableFrom.push(BoardRF[this.SourceIndex - 19])
                    }
                    if (BoardRF[this.SourceIndex - 21] !== 'x') {
                        this.enpassantableFrom.push(BoardRF[this.SourceIndex - 21])
                    }
                    
                    this.enpassantaTile = BoardRF[this.SourceIndex - 10];
                    this.enpassantaTileIndex = this.FindFileRank(this.enpassantaTile);
                    this.wPenpassantable=true;
                    this.PawnLocation=BoardRF[this.SourceIndex-20];
                    
                }
            }

            for(let i=0;i<8;i++)
            {
                
                if(source===FILES[i]+RANKS[4] && this.bPenpassantable===true && (source===this.enpassantableFrom[0] || source===this.enpassantableFrom[1]) )
                {
                    ValidMoves[this.SourceIndex].push (this.enpassantaTile);
                    

                }
            }

            
            
            break;
            case PIECES.bP:
                ValidMoves[this.SourceIndex]=[]
                if (BoardSquares[this.SourceIndex+10]===PIECES.EMPTY)
                {
                    ValidMoves[this.SourceIndex].push (BoardRF[this.SourceIndex+10]);
                }
                if(BoardSquares[this.SourceIndex+9]>0 )
                {
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+9])
                }
                if( BoardSquares[this.SourceIndex+11]>0 )
                {
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+11])
                }
                
                for(let i=0;i<8;i++)
                {
                    
                    //console.log("hola"+FILES[i]+RANKS[6])
                    if(source===FILES[i]+RANKS[6] && BoardSquares[this.SourceIndex+20]===PIECES.EMPTY && BoardSquares[this.SourceIndex+10]===PIECES.EMPTY)
                    {
                        this.RemoveEnpassant()
                        ValidMoves[this.SourceIndex].push (BoardRF[this.SourceIndex+20]);
                        if (BoardRF[this.SourceIndex + 19] !== 'x') {
                            this.enpassantableFrom.push(BoardRF[this.SourceIndex + 19])
                        }
                        if (BoardRF[this.SourceIndex + 21] !== 'x') {
                            this.enpassantableFrom.push(BoardRF[this.SourceIndex + 21])
                        }
                        
                        this.enpassantaTile = BoardRF[this.SourceIndex + 10];
                        this.enpassantaTileIndex = this.FindFileRank(this.enpassantaTile);
                        this.bPenpassantable = true;
                        this.PawnLocation=BoardRF[this.SourceIndex+20];
                        
                    }
                }

                for (let i = 0; i < 8; i++) {

                    if (source === FILES[i] + RANKS[3] && this.wPenpassantable === true && (source === this.enpassantableFrom[0] || source === this.enpassantableFrom[1])) {
                        ValidMoves[this.SourceIndex].push(this.enpassantaTile);
                        

                    }
                }

                
               
               
                break;  
            case PIECES.wR:
                ValidMoves[this.SourceIndex]=[]
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                
                break;
            case PIECES.bR:
                ValidMoves[this.SourceIndex]=[]
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                
                break;
            case PIECES.wB:
                ValidMoves[this.SourceIndex]=[]
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                
                break;
            case PIECES.bB:
                ValidMoves[this.SourceIndex]=[]
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                
                break;
            case PIECES.wQ:
                ValidMoves[this.SourceIndex]=[]
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                
                break;
            case PIECES.bQ:
                ValidMoves[this.SourceIndex]=[]
                //backward loop
                for(let i=1; BoardRF[this.SourceIndex-(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*10)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*10)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*10)])
                        
                    }
                }
                //forward loop
                for(let i=1; BoardRF[this.SourceIndex+(i*10)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*10)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*10)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*10)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*10)])
                        
                    }
                }
                //right loop
                for(let i=1; BoardRF[this.SourceIndex+i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+i]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+i]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+i])
                        
                    }
                }
                //left loop
                for(let i=1; BoardRF[this.SourceIndex-i]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-i]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-i]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-i]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-i])
                        
                    }
                }
                //upright  diagnol loop
                for(let i=1; BoardRF[this.SourceIndex-(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*9)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*9)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*9)])
                        
                    }
                }
                // upleft diagnal loop
                for(let i=1; BoardRF[this.SourceIndex-(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex-(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex-(i*11)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex-(i*11)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-(i*11)])
                        
                    }
                }
                //down left diagnal
                for(let i=1; BoardRF[this.SourceIndex+(i*9)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*9)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*9)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*9)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*9)])
                        
                    }
                }
                // downright diagnal loop
                for(let i=1; BoardRF[this.SourceIndex+(i*11)]!=='x';i++)
                {
                    
                    if (BoardRF[this.SourceIndex+(i*11)]!=='x')
                    {
                        if(BoardSquares[this.SourceIndex+(i*11)]>0)
                        {
                            ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                            
                            break;
                        }
                        if(BoardSquares[this.SourceIndex+(i*11)]<0)
                        {
                            
                            break;
                        }
                        ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+(i*11)])
                        
                    }
                }
                
                break;
            case PIECES.wN:
                ValidMoves[this.SourceIndex]=[]
                //top right upper
                if(BoardRF[this.SourceIndex-19]!=='x' && BoardSquares[this.SourceIndex-19]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-19])
                }
                //top left upper
                if(BoardRF[this.SourceIndex-21]!=='x' && BoardSquares[this.SourceIndex-21]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-21])
                }
                //bottom left lower
                if(BoardRF[this.SourceIndex+19]!=='x' && BoardSquares[this.SourceIndex+19]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+19])
                }
                //bottom right lower
                if(BoardRF[this.SourceIndex+21]!=='x' && BoardSquares[this.SourceIndex+21]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+21])
                }
                //top right lower
                if(BoardRF[this.SourceIndex-8]!=='x' && BoardSquares[this.SourceIndex-8]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-8])
                }
                //top left lower
                if(BoardRF[this.SourceIndex-12]!=='x' && BoardSquares[this.SourceIndex-12]<=0)
                {   
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-12])
                }
                //bottom right upper
                if(BoardRF[this.SourceIndex+12]!=='x' && BoardSquares[this.SourceIndex+12]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+12])
                }
                //bottom left uppeer
                if(BoardRF[this.SourceIndex+8]!=='x' && BoardSquares[this.SourceIndex+8]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+8])
                }
                
                break;
            case PIECES.bN:
                ValidMoves[this.SourceIndex]=[]
                //top right upper
                if(BoardRF[this.SourceIndex-19]!=='x' && BoardSquares[this.SourceIndex-19]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-19])
                }
                //top left upper
                if(BoardRF[this.SourceIndex-21]!=='x' && BoardSquares[this.SourceIndex-21]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-21])
                }
                //bottom left lower
                if(BoardRF[this.SourceIndex+19]!=='x' && BoardSquares[this.SourceIndex+19]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+19])
                }
                //bottom right lower
                if(BoardRF[this.SourceIndex+21]!=='x' && BoardSquares[this.SourceIndex+21]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+21])
                }
                //top right lower
                if(BoardRF[this.SourceIndex-8]!=='x' && BoardSquares[this.SourceIndex-8]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-8])
                }
                //top left lower
                if(BoardRF[this.SourceIndex-12]!=='x' && BoardSquares[this.SourceIndex-12]>=0)
                {   
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-12])
                }
                //bottom right upper
                if(BoardRF[this.SourceIndex+12]!=='x' && BoardSquares[this.SourceIndex+12]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+12])
                }
                //bottom left uppeer
                if(BoardRF[this.SourceIndex+8]!=='x' && BoardSquares[this.SourceIndex+8]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+8])
                }
                
                break;
            case PIECES.wK:
                ValidMoves[this.SourceIndex]=[]
                //move up
                if(BoardRF[this.SourceIndex-10]!=='x' && BoardSquares[this.SourceIndex-10]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-10])
                }
                //move down
                if(BoardRF[this.SourceIndex+10]!=='x' && BoardSquares[this.SourceIndex+10]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+10])
                }
                //move right 
                if(BoardRF[this.SourceIndex+1]!=='x' && BoardSquares[this.SourceIndex+1]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+1])
                }
                //move left
                if(BoardRF[this.SourceIndex-1]!=='x' && BoardSquares[this.SourceIndex-1]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-1])
                }
                //move diagnol top right
                if(BoardRF[this.SourceIndex-9]!=='x' && BoardSquares[this.SourceIndex-9]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-9])
                }
                //move diagnal top left
                if(BoardRF[this.SourceIndex-11]!=='x' && BoardSquares[this.SourceIndex-11]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-11])
                }
                //move diagnol bottom left
                if(BoardRF[this.SourceIndex+9]!=='x' && BoardSquares[this.SourceIndex+9]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+9])
                }
                //move diagnal bottom right
                if(BoardRF[this.SourceIndex+11]!=='x' && BoardSquares[this.SourceIndex+11]<=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+11])
                }

                if(this.CCwKing && this.CCLeftwRook ){
                    
                    ValidMoves[this.SourceIndex].push(BoardRF[93])
                }
                if(this.CCwKing && this.CCRightwRook ){
                    
                    ValidMoves[this.SourceIndex].push(BoardRF[97])
                }
                
                break;
            case PIECES.bK:
                ValidMoves[this.SourceIndex]=[]
                //move up
                if(BoardRF[this.SourceIndex-10]!=='x' && BoardSquares[this.SourceIndex-10]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-10])
                }
                //move down
                if(BoardRF[this.SourceIndex+10]!=='x' && BoardSquares[this.SourceIndex+10]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+10])
                }
                //move right 
                if(BoardRF[this.SourceIndex+1]!=='x' && BoardSquares[this.SourceIndex+1]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+1])
                }
                //move left
                if(BoardRF[this.SourceIndex-1]!=='x' && BoardSquares[this.SourceIndex-1]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-1])
                }
                //move diagnol top right
                if(BoardRF[this.SourceIndex-9]!=='x' && BoardSquares[this.SourceIndex-9]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-9])
                }
                //move diagnal top left
                if(BoardRF[this.SourceIndex-11]!=='x' && BoardSquares[this.SourceIndex-11]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex-11])
                }
                //move diagnol bottom left
                if(BoardRF[this.SourceIndex+9]!=='x' && BoardSquares[this.SourceIndex+9]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+9])
                }
                //move diagnal bottom right
                if(BoardRF[this.SourceIndex+11]!=='x' && BoardSquares[this.SourceIndex+11]>=0)
                {    
                    ValidMoves[this.SourceIndex].push(BoardRF[this.SourceIndex+11])
                }
                if (this.CCbKing && this.CCLeftbRook ){
                    
                    ValidMoves[this.SourceIndex].push(BoardRF[23])
                }
                if (this.CCbKing && this.CCRightbRook   ){
                    
                    ValidMoves[this.SourceIndex].push(BoardRF[27])
                }
                
                break;
        }   
        return ValidMoves
    }
    
    
}



var FILES =['a', 'b', 'c', 'd', 'e', 'f','g','h','x'];

var RANKS =['1', '2', '3', '4', '5', '6', '7', '8','x'];

var PIECES = { EMPTY:0,
    wP:100,
    wN:280,
    wB:320,
    wR:479,
    wQ:929,
    wK:60000,
    bP:-100,
    bN:-280,
    bB:-320,
    bR:-479,
    bQ:-929,
    bK:-60000};
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

var PSTW={}

PSTW[PIECES.wP]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',100, 100, 100, 100, 105, 100, 100,  100,'x',
    'x',78,  83,  86,  73, 102,  82,  85,  90,'x',
    'x',7,  29,  21,  44,  40,  31,  44,   7,'x',
    'x',-17,  16,  -2,  15,  14,   0,  15, -13,'x',
    'x',-26,   3,  10,   9,   6,   1,   0, -23,'x',
    'x',-22,   9,   5, -11, -10,  -2,   3, -19,'x',
    'x',-31,   8,  -7, -37, -36, -14,   3, -31,'x',
    'x',0,   0,   0,   0,   0,   0,   0,   0,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bP]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',0,   0,   0,   0,   0,   0,   0,   0,'x',
    'x',-31,   8,  -7, -37, -36, -14,   3, -31,'x',
    'x',-22,   9,   5, -11, -10,  -2,   3, -19,'x',
    'x',-26,   3,  10,   9,   6,   1,   0, -23,'x',
    'x',-17,  16,  -2,  15,  14,   0,  15, -13,'x',
    'x',7,  29,  21,  44,  40,  31,  44,   7,'x',
    'x',78,  83,  86,  73, 102,  82,  85,  90,'x',
    'x',100, 100, 100, 100, 105, 100, 100,  100,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]
PSTW[PIECES.bP]=MakeNegative(PSTW[PIECES.bP])

PSTW[PIECES.wB]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',-59, -78, -82, -76, -23,-107, -37, -50,'x',
    'x',-11,  20,  35, -42, -39,  31,   2, -22,'x',
    'x', -9,  39, -32,  41,  52, -10,  28, -14,'x',
    'x', 25,  17,  20,  34,  26,  25,  15,  10,'x',
    'x', 13,  10,  17,  23,  17,  16,   0,   7,'x',
    'x', 14,  25,  24,  15,   8,  25,  20,  15,'x',
    'x', 19,  20,  11,   6,   7,   6,  20,  16,'x',
    'x', -7,   2, -15, -12, -14, -15, -10, -10,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bB]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x', -7,   2, -15, -12, -14, -15, -10, -10,'x',
    'x', 19,  20,  11,   6,   7,   6,  20,  16,'x',
    'x', 14,  25,  24,  15,   8,  25,  20,  15,'x',
    'x', 13,  10,  17,  23,  17,  16,   0,   7,'x',
    'x', 25,  17,  20,  34,  26,  25,  15,  10,'x',
    'x', -9,  39, -32,  41,  52, -10,  28, -14,'x',
    'x',-11,  20,  35, -42, -39,  31,   2, -22,'x',
    'x',-59, -78, -82, -76, -23,-107, -37, -50,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]


PSTW[PIECES.bB]=MakeNegative(PSTW[PIECES.bB])

PSTW[PIECES.wN]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',-66, -53, -75, -75, -10, -55, -58, -70,'x',
    'x', -3,  -6, 100, -36,   4,  62,  -4, -14,'x',
    'x', 10,  67,   1,  74,  73,  27,  62,  -2,'x',
    'x', 24,  24,  45,  37,  33,  41,  25,  17,'x',
    'x', -1,   5,  31,  21,  22,  35,   2,   0,'x',
    'x',-18,  10,  13,  22,  18,  15,  11, -14,'x',
   'x', -23, -15,   2,   0,   2,   0, -23, -20,'x',
    'x',-74, -23, -26, -24, -19, -35, -22, -69,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bN]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',-74, -23, -26, -24, -19, -35, -22, -69,'x',
    'x', -23, -15,   2,   0,   2,   0, -23, -20,'x',
    'x',-18,  10,  13,  22,  18,  15,  11, -14,'x',
    'x', -1,   5,  31,  21,  22,  35,   2,   0,'x',
    'x', 24,  24,  45,  37,  33,  41,  25,  17,'x',
    'x', 10,  67,   1,  74,  73,  27,  62,  -2,'x',
    'x', -3,  -6, 100, -36,   4,  62,  -4, -14,'x',
    'x',-66, -53, -75, -75, -10, -55, -58, -70,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bN]= MakeNegative(PSTW[PIECES.bN])

PSTW[PIECES.wR]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x', 35,  29,  33,   4,  37,  33,  56,  50,'x',
     'x',55,  29,  56,  67,  55,  62,  34,  60,'x',
    'x', 19,  35,  28,  33,  45,  27,  25,  15,'x',
    'x',  0,   5,  16,  13,  18,  -4,  -9,  -6,'x',
    'x',-28, -35, -16, -21, -13, -29, -46, -30,'x',
    'x',-42, -28, -42, -25, -25, -35, -26, -46,'x',
    'x',-53, -38, -31, -26, -29, -43, -44, -53,'x',
    'x',-30, -24, -18,   5,  -2, -18, -31, -32,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bR]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',-30, -24, -18,   5,  -2, -18, -31, -32,'x',
    'x',-53, -38, -31, -26, -29, -43, -44, -53,'x',
    'x',-42, -28, -42, -25, -25, -35, -26, -46,'x',
    'x',-28, -35, -16, -21, -13, -29, -46, -30,'x',
    'x',  0,   5,  16,  13,  18,  -4,  -9,  -6,'x',
    'x', 19,  35,  28,  33,  45,  27,  25,  15,'x',
    'x',55,  29,  56,  67,  55,  62,  34,  60,'x',
    'x', 35,  29,  33,   4,  37,  33,  56,  50,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]


PSTW[PIECES.bR]= MakeNegative(PSTW[PIECES.bR])

PSTW[PIECES.wQ]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',  6,   1,  -8,-104,  69,  24,  88,  26,'x',
     'x',14,  32,  60, -10,  20,  76,  57,  24,'x',
     'x',-2,  43,  32,  60,  72,  63,  43,   2,'x',
      'x',1, -16,  22,  17,  25,  20, -13,  -6,'x',
    'x',-14, -15,  -2,  -5,  -1, -10, -20, -22,'x',
    'x',-30,  -6, -13, -11, -16, -11, -16, -27,'x',
    'x',-36, -18,   0, -19, -15, -15, -21, -38,'x',
    'x',-39, -30, -31, -13, -31, -36, -34, -42,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bQ]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',-39, -30, -31, -13, -31, -36, -34, -42,'x',
    'x',-36, -18,   0, -19, -15, -15, -21, -38,'x',
    'x',-30,  -6, -13, -11, -16, -11, -16, -27,'x',
    'x',-14, -15,  -2,  -5,  -1, -10, -20, -22,'x',
    'x',1, -16,  22,  17,  25,  20, -13,  -6,'x',
    'x',-2,  43,  32,  60,  72,  63,  43,   2,'x',
    'x',14,  32,  60, -10,  20,  76,  57,  24,'x',
    'x',  6,   1,  -8,-104,  69,  24,  88,  26,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bQ]= MakeNegative(PSTW[PIECES.bQ])

PSTW[PIECES.wK]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',  4,  54,  47, -99, -99,  60,  83, -62,'x',
    'x',-32,  10,  55,  56,  56,  55,  10,   3,'x',
    'x',-62,  12, -57,  44, -67,  28,  37, -31,'x',
    'x',-55,  50,  11,  -4, -19,  13,   0, -49,'x',
    'x',-55, -43, -52, -28, -51, -47,  -8, -50,'x',
    'x',-47, -42, -43, -79, -64, -32, -29, -32,'x',
    'x', -4,   3, -14, -50, -57, -18,  13,   4,'x',
    'x', 17,  30,  -3, -14,   6,  -1,  40,  18,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bK]=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x', 17,  30,  -3, -14,   6,  -1,  40,  18,'x',
    'x', -4,   3, -14, -50, -57, -18,  13,   4,'x',
    'x',-47, -42, -43, -79, -64, -32, -29, -32,'x',
    'x',-55, -43, -52, -28, -51, -47,  -8, -50,'x',
    'x',-55,  50,  11,  -4, -19,  13,   0, -49,'x',
    'x',-62,  12, -57,  44, -67,  28,  37, -31,'x',
    'x',-32,  10,  55,  56,  56,  55,  10,   3,'x',
    'x',  4,  54,  47, -99, -99,  60,  83, -62,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW[PIECES.bK]= MakeNegative(PSTW[PIECES.bK])
//white king end game
PSTW['WKE']=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',  -50, -40, -30, -20, -20, -30, -40, -50,'x',
    'x',-30, -20, -10,   0,   0, -10, -20, -30,'x',
    'x',-30, -10,  20,  30,  30,  20, -10, -30,'x',
    'x',-30, -10,  30,  40,  40,  30, -10, -30,'x',
    'x',-30, -10,  30,  40,  40,  30, -10, -30,'x',
    'x',-30, -10,  20,  30,  30,  20, -10, -30,'x',
    'x',-30, -30,   0,   0,   0,   0, -30, -30,'x',
    'x',-50, -30, -30, -30, -30, -30, -30, -50,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW['BKE']=[
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x',
    'x',-50, -30, -30, -30, -30, -30, -30, -50,'x',
    'x',-30, -30,   0,   0,   0,   0, -30, -30,'x',
    'x',-30, -10,  20,  30,  30,  20, -10, -30,'x',
    'x',-30, -10,  30,  40,  40,  30, -10, -30,'x',
    'x',-30, -10,  30,  40,  40,  30, -10, -30,'x',
    'x',-30, -10,  20,  30,  30,  20, -10, -30,'x',
    'x',-30, -20, -10,   0,   0, -10, -20, -30,'x',
    'x',  -50, -40, -30, -20, -20, -30, -40, -50,'x',
    'x','x','x','x','x','x','x','x','x','x',
    'x','x','x','x','x','x','x','x','x','x'
]

PSTW['BKE']= MakeNegative(PSTW['BKE'])

console.log(PSTW)

PSTW[0]=[]
PSTW[0][PIECES.wP]=[1,2,3,4,5]
console.log(PSTW[0][PIECES.wP])
console.log(Object.keys(PSTW).length)
console.log(PSTW[PIECES.bR].length)

let test={}
test[95]=[]
test[95].push(55);
console.log(Object.keys(test))
let hi=Object.keys(test)[0]
console.log(hi)

function MakeNegative(PSTWArray){
    temp=PSTWArray
    for( let i=0;i<temp.length;i++){
        if(temp[i]!=='x'){
            temp[i]=temp[i]*-1
        }
    }
    
    return temp
}

function ReversePSTW(PSTWArray){
    temp=PSTWArray.slice().reverse();

    for( let i=0;i<temp.length;i++){
        if(temp[i]!=='x'){
            temp[i]=temp[i]*-1
        }
    }
    
    return temp
}

    




function whatpiece(piece){
    console.log(piece);
}



var BRD_SQ_NUM=120;







