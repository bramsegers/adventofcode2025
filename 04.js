require('./_aoc')

let day4 = (notes, part) => {

  let [paper, empty] = '@.'
  let grid = notes.map(e => arr(e))
  let bounds = (i, j) => grid[i] && grid[i][j] == paper
  let nb = nbs('NW N NE E SE S SW W', bounds)

  for (let res = 0; ;) {
    let more = 0
    grid = grid.map((e, i) => e.map((v, j) => v == paper
      && len(nb(i, j)) < 4 ? (more = 1, res++, empty) : v))
    if (part == 1 || !more) return res
  }

}

test(day4, 1, 1370)
test(day4, 2, 8437)
