require('./_aoc')

let day1 = (notes, part) => {

  let nums = notes.map(([d, ...n]) => [d == 'R' ? 1 : -1, +n.join``])

  let pos = 50
  let mod = 100

  return nums.fold((r, [d, n], t) => (
    t = (d == 1 ? mod - pos : pos) % mod,
    pos = (((pos + d * n) % mod) + mod) % mod,
    r += part == 1 ? !pos : int(n / mod) + (t > 0 && t <= n % mod)
  ), 0)

}

test(day1, 1, 1102)
test(day1, 2, 6175)