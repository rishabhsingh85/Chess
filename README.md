# ♟️ Chess Board Project  

A fully interactive web-based chess game built using HTML, CSS, and JavaScript — now upgraded with piece movement, turn-based logic, capturing mechanics, and real-time game feedback.

## 📌 Overview
The project has evolved from a simple static chessboard into a functional, interactive chess experience.
Players can now move pieces, capture opponents, track turns, and view captured pieces in dedicated areas.

This marks a major milestone in transforming the board from a layout-only structure to a dynamic chess engine prototype.

## 🛠️ Tech Used
HTML – structure & board layout

CSS – board styling, highlighting, and UI aesthetics

JavaScript – piece movement, turn system, capture logic

## 🚀 Features
✔ Interactive Piece Movement

Click-to-select and click-to-move system

Legal cells highlight

Capture cells shown in red outline

Selected piece shown with blue outline

✔ Turn-Based Gameplay

Game enforces alternate turns

White moves first

After each move, the turn switches automatically

No player can move twice in a row

✔ Capture System Implemented

When a piece is captured, it is removed from the board

Captured pieces appear in dedicated UI boxes:

Black Captured (left top corner)

White Captured (right top corner)

Captured pieces shrink to 40×40 for compact display

✔ Player Feedback (Live Game Info)

“Turn: White / Black” displayed at top center

Updates instantly after every valid move

✔ Game-Over (King Capture Detection)

When the King is captured, the game stops

Message displayed:

“Checkmate – White Wins” or

“Checkmate – Black Wins”

(You will later upgrade to real check/checkmate detection, but this is the first functional version.)

✔ Aesthetic UI Improvements

Applied a premium dark gradient background

Board positioned lower so top HUD is clearly visible

Captured piece boxes now fixed neatly in top-left and top-right corners

## 📅 Progress

### Day 1 – Initial Layout
- Started the project and set up the basic HTML file.  
- Created the outline of the chess board using the `<table>` element.  
- Defined a fixed width and height for the board area to maintain square proportions.  
- Ensured the structure could support an 8×8 grid layout.  

### Day 2 – Rows & Columns
- Added 8 rows and 8 columns to represent the 64 squares of the chess board.  
- Structured each square using `<tr>` for rows and `<td>` for columns.  
- Verified alignment so the board looks like a proper grid.  
- Checked that the table cells are evenly spaced to keep the chessboard uniform.  

### Day 3 – Adding Chess Pieces
- Inserted all chess pieces in their standard starting positions.  
- Used appropriate symbols/letters (♙♘♗♖♕♔ for White and ♟♞♝♜♛♚ for Black).  
- Placed pawns on the second and seventh rows.  
- Positioned rooks, knights, bishops, queens, and kings on the first and last rows.  
- Ensured both Black and White sides are mirrored correctly. 


## 📷 Screenshot
---
<img width="827" height="846" alt="Image" src="https://github.com/user-attachments/assets/b14f668a-bfd9-473c-b2ee-c0798a80b1f9" />
