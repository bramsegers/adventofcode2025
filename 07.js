require('./_aoc')

let day7 = (notes, part) => {

  let splits = 0
  let pos = arr(notes[0]).map(e => +(e == 'S'))

  notes.for(row => {
    let x2 = arr(pos, 0)
    pos.for((v, j) => {
      if (!v) return
      if (row[j] != '^') return x2[j] += v
      x2[j - 1] += v
      x2[j + 1] += v
      splits++
    })
    pos = x2
  })

  if (part == 1) return splits
  if (part == 2) return sum(pos)
}

test(day7, 1, 1524)
test(day7, 2, 32982105837605)