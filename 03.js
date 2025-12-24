require('./_aoc')

let day3 = (notes, part) => {

  let n = part == 1 ? 2 : 12
  let f = (r, q, c) => r && q.at(-1) < c ? f(--r, q, c, q.pop()) : r
  let g = (s, r) => arr(s).fold((q, c) => (r = f(r, q, c), q.push(c), q), [])
  
  return notes.fold((r, s) => r += +g(s, len(s) - n).slice(0, n).join``, 0)
}

test(day3, 1, 17535)
test(day3, 2, 173577199527257)
