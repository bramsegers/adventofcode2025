require('./_aoc')

let day5 = (notes, part) => {

  let [r, n] = notes.join`|`.split`||`
  let ranges = r.split`|`.map(e => e.split`-`.map(int))
  let nums = n.split`|`.map(int)

  let add = (r, a, b, i) => (
    i = r.findIndex(r => (r[0] - a || r[1] - b) > 0),
    r.splice(i < 0 ? len(r) : i, 0, [a, b + 1]),
    r.fold((n, [a, b, p = n.at(-1)]) => (p && a <= p[1]
    ? (p[1] = max(p[1], b)) : n.push([a, b]), n), [])
  )

  let test = e => rng.some(([a, b]) => a <= e && e < b)
  
  let rng = ranges.fold((r, [a, b]) => add(r, a, b), [])
  if (part == 1) return nums.fold((r, e) => r + test(e), 0)
  if (part == 2) return rng.fold((r, [a, b]) => r + b - a, 0)

}

test(day5, 1, 598)
test(day5, 2, 360341832208407)