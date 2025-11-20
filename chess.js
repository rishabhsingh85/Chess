document.addEventListener('DOMContentLoaded',() => {
    const BOARD_SIZE=8;
    const table=document.getElementById('chessboard');
    const rows=Array.from(table.querySelectorAll('tr')).slice(0, BOARD_SIZE);
    const info=createInfo();

    const board=Array.from({length: BOARD_SIZE},() => Array(BOARD_SIZE).fill(null));

let currentTurn='w';
let selected=null;  
let highlights=[];
let gameOver=false;

  rows.forEach((tr,r) => {
    const cells=Array.from(tr.children).slice(0,BOARD_SIZE);
    cells.forEach((td,c) => {
      td.dataset.r=r;
      td.dataset.c=c;
      td.style.padding = '0';
      td.addEventListener('click',() => onCellClick(r,c,td));
      const img=td.querySelector('img');
      if (img) {
        img.classList.add('piece');
        const piece=inferPieceFromFilename(img.src, r);
        if (piece) {
          board[r][c]=piece;
        }
      }
    });
  });

  function createInfo() {
    const el=document.createElement('div');
    el.id = 'gameInfo';
    el.textContent = 'Turn: White';
    table.parentNode.insertBefore(el,table);
    return el;
  }
  function inferPieceFromFilename(src,r) {
    const name=src.split('/').pop().toLowerCase();
    const map = {
      'pawn': 'P', 'wpawn': 'P', 'blackpawn': 'P',
      'elephant': 'R', 'welephant': 'R', 'rook': 'R',
      'horse': 'N', 'whorse': 'N', 'knight': 'N',
      'camel': 'B', 'wcamel': 'B', 'bishop': 'B',
      'queen': 'Q', 'wqueen': 'Q',
      'king': 'K', 'wking': 'K'
    };
    let matched=null;
    for (const k of Object.keys(map)) { if (name.includes(k)) { matched=k; break; } }
    if (!matched) return null;
    const type = map[matched];
    let color = null;
    if (name.startsWith('w') || name.includes('white') || name.includes('w')) color = 'w';
    if (name.includes('black')) color = 'b';
    if (!color) {
      color=(r >= 6 ? 'w' : (r <= 1 ? 'b' : 'b'));
    }
    return { type,color,imgName: name };
  }

  function onCellClick(r,c,td) {
  if (gameOver) return;
  const cellPiece=board[r][c];

    if (selected) {
      if (isHighlighted(r,c)) {
        makeMove(selected.r, selected.c,r,c);
        clearSelection();
        return;
      }
      if (cellPiece && cellPiece.color === currentTurn) {
        clearSelection();
        selectCell(r,c);
        return;
      }
      clearSelection();
    }
    if (cellPiece && cellPiece.color === currentTurn) {
      selectCell(r,c);
    }
  }

  function selectCell(r,c) {
    selected = {r,c};
    getCell(r,c).classList.add('selected');
    const moves=getLegalMoves(r,c);
    highlights=moves;
    for (const m of moves) {
      const cell=getCell(m.r,m.c);
      if (board[m.r][m.c]) cell.classList.add('capture'); else cell.classList.add('highlight');
    }
  }

  function clearSelection() {
    selected=null;
    highlights.forEach(m => getCell(m.r,m.c).classList.remove('highlight','capture'));
    highlights = [];
    table.querySelectorAll('td.selected').forEach(el => el.classList.remove('selected'));
  }

  function isHighlighted(r,c) {
    return highlights.some(m => m.r === r && m.c === c);
  }

  function getCell(r,c) {
    return rows[r].children[c];
  }

  function makeMove(sr,sc,tr,tc) {
  const movingPiece = board[sr][sc];
  if (!movingPiece) return;

  const fromCell=getCell(sr,sc);
  const toCell=getCell(tr,tc);

  const targetPiece=board[tr][tc];
  if (targetPiece) {
    const targetImg=toCell.querySelector('img');
    if (targetImg) {
      if (targetPiece.color === 'w') {
        blackCapturedList.appendChild(targetImg);
      } else {
        whiteCapturedList.appendChild(targetImg);
      }
      targetImg.classList.remove('piece');
      targetImg.style.width = '40px';
      targetImg.style.height = '40px';
      targetImg.style.pointerEvents = 'none';
      targetImg.style.margin = '2px';
    }
    if (targetPiece.type === 'K') {
      gameOver=true;
      info.textContent = `${movingPiece.color === 'w' ? 'White' : 'Black'} wins — King captured`;
    }
  }
  const movingImg=fromCell.querySelector('img');
  if (movingImg) {
    toCell.appendChild(movingImg);
    movingImg.classList.add('piece');
    movingImg.style.width = '70px';
    movingImg.style.height = '70px';
    movingImg.style.pointerEvents = 'none';
  } else {
    const newImg=document.createElement('img');
    newImg.classList.add('piece');
    newImg.src=getImageSrc(movingPiece);
    newImg.style.width = '70px';
    newImg.style.height = '70px';
    newImg.style.pointerEvents = 'none';
    toCell.appendChild(newImg);
  }
  board[tr][tc]=movingPiece;
  board[sr][sc]=null;

  if (movingPiece.type === 'P') {
    if ((movingPiece.color === 'w' && tr === 0) || (movingPiece.color === 'b' && tr === 7)) {
      const promote = (prompt('Promote pawn to (Q/R/B/N). Default Q:', 'Q') || 'Q').toUpperCase();
      movingPiece.type = ['Q','R','B','N'].includes(promote) ? promote : 'Q';
      const movedImg = getCell(tr,tc).querySelector('img');
      if (movedImg) movedImg.src = getImageSrc(movingPiece);
    }
  }
  if (gameOver) {
    clearSelection();
    table.querySelectorAll('td.highlight, td.capture, td.selected').forEach(el => el.classList.remove('highlight','capture','selected'));
    return;
  }
  currentTurn=currentTurn === 'w' ? 'b' : 'w';
  info.textContent = `Turn: ${currentTurn === 'w' ? 'White' : 'Black'}`;
  checkGameState();

}
  function getImageSrc(piece) {
    const prefix=piece.color === 'w' ? 'w' : 'black';
    const map = {
      'P': prefix === 'w' ? 'Images/wpawn.png' : 'Images/blackpawn.png',
      'R': prefix === 'w' ? 'Images/welephant.png' : 'Images/elephant.png',
      'N': prefix === 'w' ? 'Images/whorse.png' : 'Images/horse.png',
      'B': prefix === 'w' ? 'Images/wcamel.png' : 'Images/camel.png',
      'Q': prefix === 'w' ? 'Images/wqueen.png' : 'Images/queen.png',
      'K': prefix === 'w' ? 'Images/wking.png' : 'Images/king.png'
    };
    return map[piece.type] || map['Q'];
  }
  function getLegalMoves(r,c) {
    const p=board[r][c];
    if (!p) return [];
    const moves = [];
    const color = p.color;
    switch(p.type) {
      case 'P': pawnMoves(r,c,color,moves); break;
      case 'N': knightMoves(r,c,color,moves); break;
      case 'B': slidingMoves(r,c,color,moves, [[1,1],[1,-1],[-1,1],[-1,-1]]); break;
      case 'R': slidingMoves(r,c,color,moves, [[1,0],[-1,0],[0,1],[0,-1]]); break;
      case 'Q': slidingMoves(r,c,color,moves, [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]); break;
      case 'K': kingMoves(r,c,color,moves); break;
    }
    return moves.filter(m => !(board[m.r][m.c] && board[m.r][m.c].color === color));
  }
  function inBounds(r,c) { return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE; }

  function pawnMoves(r,c,color,out) {
    const dir=color === 'w' ? -1 : 1;
    const startRow=color === 'w' ? 6 : 1;
    const oneR=r+dir;

    if (inBounds(oneR,c) && !board[oneR][c]) out.push({r:oneR,c});
    
    const twoR=r+dir*2;
    if (r === startRow && inBounds(twoR,c) && !board[oneR][c] && !board[twoR][c]) out.push({r:twoR,c});

    for (const dc of [-1,1]) {
      const nr=r+dir,nc=c+dc;
      if (inBounds(nr,nc) && board[nr][nc] && board[nr][nc].color !== color) out.push({r:nr,c:nc});
    }
  }

  function knightMoves(r,c,color,out) {
    const deltas = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
    for (const d of deltas) {
      const nr=r+d[0],nc=c+d[1];
      if (!inBounds(nr,nc)) continue;
      if (!board[nr][nc] || board[nr][nc].color !== color) out.push({r:nr,c:nc});
    }
  }
  function slidingMoves(r,c,color,out,directions) {
    for (const d of directions) {
      let nr=r+d[0],nc=c+d[1];
      while (inBounds(nr,nc)) {
        if (!board[nr][nc]) { out.push({r:nr,c:nc}); }
        else {
          if (board[nr][nc].color !== color) out.push({r:nr,c:nc});
          break;
        }
        nr += d[0]; nc += d[1];
      }
    }
  }

  function kingMoves(r,c,color,out) {
    for (let dr=-1;dr<=1;dr++) {
      for (let dc=-1; dc<=1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr=r+dr,nc=c+dc;
        if (!inBounds(nr,nc)) continue;
        if (!board[nr][nc] || board[nr][nc].color !== color) out.push({r:nr,c:nc});
      }
    }
  }

  function checkGameState() {
    const kingPos=findKing(currentTurn);
    if (!kingPos) {
        info.textContent = `${currentTurn === 'w' ? 'White' : 'Black'} King Captured — Checkmate!`;
        gameOver=true;
        return;
    }
    if (isSquareAttacked(kingPos.r,kingPos.c,currentTurn)) {
        info.textContent = `Check on ${currentTurn === 'w' ? 'White' : 'Black'}!`;
        const moves = getLegalMoves(kingPos.r, kingPos.c);
        if (moves.length === 0) {
            info.textContent = `Checkmate! ${currentTurn === 'w' ? 'Black' : 'White'} wins!`;
            gameOver=true;
        }
    }
}

function findKing(color) {
    for (let r=0;r<8;r++) {
        for (let c=0;c<8;c++) {
            if (board[r][c] && board[r][c].type === 'K' && board[r][c].color === color) {
                return { r,c };
            }
        }
    }
    return null;
}

function isSquareAttacked(r, c, color) {
    const enemy=color === 'w' ? 'b' : 'w';

    for (let i=0;i<8;i++) {
        for (let j=0;j<8;j++) {
            if (board[i][j] && board[i][j].color === enemy) {
                const moves=getLegalMoves(i, j);
                if (moves.some(m => m.r === r && m.c === c)) {
                    return true;
                }
            }
        }
    }
    return false;
}
  window.printBoard = () => {
    console.table(board.map(row => row.map(cell => cell ? cell.color+cell.type : '--')));
  };
});