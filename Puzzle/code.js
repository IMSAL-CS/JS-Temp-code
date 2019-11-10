//Interne voorstelling van de puzzel als een tweedimensionale lijst
let my_puzzle = [[0, 1, 2],
[7, 4, 8],
[3, 5, 6]];

//Wanneer de volledige HTML-pagina geladen is wordt onderstaande functie uitgevoerd
window.onload = function () {
  draw_puzzle(my_puzzle);
}

//Deze functie neemt als invoer de lijstrepresentatie van onze puzzel
function draw_puzzle(puzzle) {
  let puzzle_html = generate_puzzle_html(puzzle);
  document.getElementById("puzzle_container").innerHTML = puzzle_html;
}

function generate_puzzle_html(puzzle) {
  let puzzle_inner_html = "";
  for (let i = 0; i < puzzle.length; i++) {

    let row_html = "<tr>"
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] == 0) {
        row_html += "<td class=\"emptyTile\"></td>";
      } else {
        row_html += "<td onclick=\"square_click_handler(this)\">" + puzzle[i][j] + "</td>";
      }
    }
    row_html += "</tr>";
    puzzle_inner_html += row_html;
  }

  return `<table>${puzzle_inner_html}</table>`;
}

function check_game_complete(puzzle) {
  let solution = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle.length; j++) {
      if (puzzle[i][j] != solution[i][j]) { return false }
    }
  }
  return true;
}


function swap_empty_square(puzzle, row, col) {
  for (i = 0; i < puzzle.length; i++) {
    for (j = 0; j < puzzle.length; j++) {
      if (puzzle[i][j] == 0) {
        let row_new = i;
        let col_new = j;
        if (if_next_to(row, col, row_new, col_new)) {
          ///if (puzzle[row_new][col_new] == 0) {
          puzzle[row_new][col_new] = puzzle[row][col];
          puzzle[row][col] = 0;
        }
      }
    }
  }
  draw_puzzle(puzzle);
}

function if_next_to(row, col, row_new, col_new) {
  if ((row != row_new) && (col != col_new)) {
    return false;
  }
  if (row == row_new) {
    if ((col == col_new + 1) || (col == col_new - 1)) {
      return true;
    }
  } if (col == col_new) {
    if ((row == row_new + 1) || (row == row_new - 1)) {
      return true;
    }
  }
  return false;
}




function square_click_handler(cell) {
  let col = cell.cellIndex;
  let row = cell.parentNode.rowIndex;
  swap_empty_square(my_puzzle, row, col);
  //draw_puzzle(puzzle);
  if (check_game_complete(my_puzzle)) {
    alert("Proficiat!");
  }
}
