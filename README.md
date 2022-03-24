# Learning Through Chess
This project is to help me learn many things such as javascript (what the chess logic is built on), databases and sql (Storing moves and games), network "stuff" (online two player), as well learning good programming practices.

# Roadmap
Finish the main chessboard logic (v1.0.0)
    * En passant 
    * Castling 
    * Promotion

Create an AI to play against(v1.5.0)
    * Random moves
    * Basic preference to taking over pieces when possible (If option to take a piece exists, do it)
    * Over take pieces depending on value


Refactor code to use FEN strings (possible complete code rewrite with better practices) and start storing them into a database, learn sql (v2.0.0)

Send FEN string list of played games to a database on checkmate*

Create a more complicated AI(v2.5.0)
    * Takes into strong areas to keep pieces in (knight somewhere in the center)
    * Start Looking moves into the future, min max and alpha beta pruning
    * consider piece sacrificing
    * Machine learning using FEN strings of completed games (I know nothing about machine learning)*



Create online two player (v3.0.0)

*Unsure whether to follow through implenting it and or when to incorporate it

**This roadmap is subject to change**


# What I Did Before Using Github

## Back story / Everythin that happened before git

When I started this project I didn't know how to use git or github, but now I do (kinda).

I started this project as a means to learn javascript. The original goal was to create a chess engine with AI and all from scratch. For some reason I thought that I could do it in a weekend, didn't happen but I tried. When first starting I wanted to create everything from scratch includin the UI, but I chose not and use a free to use already created chess board UI, this way I could focus more the logic of chess. 

The first day I spent it thinking and planning my ideas to work with the chessboard UI. Some documentation reading, and few hours later I managed to create turns. Once I figured only allow valid moves for the pawn on the board I quickly implemented the rest of the pieces (excluding some bugs which I fixed later throught play tests). At this point I thought nearly halfway done. I believed that I would quickly finish implementing the rules relating to the king (check, check mate), en passant, and castling, was mistaken

It took me about two - three weeks to finish up with all the king relate rules. My solution to check for check mate was to calculate every possible move of the opposing color and place them into an array that would compare to an array that contained the kings moves. For every king move found in the list of opposing team moves, that king move would get removed. If the kings list was empty that is what would be considered a checkmate. 

I used very similar logic to prevent the king from placing itself in danger, except the logic runs when moving the king instead of after the opposing colors move.

After this I created check logic. I settled on checking for a check after each piece movement, but only seeing if the piece moved would place the opposing king in check. I did this through a line of sight implementation. For the most recently moved piece (last piece), calculate all its valid moves and if the king is found to be within one of those moves then it is in check. I thought I with this part, but found a bug during play. The king was able to move to a square that was part of the line of sight that placed the king in check. I fixed this by having the line of sight carry past the the opposing color piece only if it happened to be the king. 

I then foud another problem which was a player being able to move a piece that is body blocking the line of sight of an opposing color piece for the king. The solution I went with to solve this problem was to create a copy of the board and have the move play out and then run the logic for a check, and if that would place the king into check the move would not be allowed on the main board. I ran into a bug that was caused by binding (something new to me), so my copied board was actually the real board. I fixed this by just undoing the move if it would place the king in check.

This how the code became what it was in the first commit.
