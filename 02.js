require('./_aoc')

let day2 = (notes, part) => {

  let nums = notes[0].split`,`
    .map(e => e.split`-`.map(int))

  let d = set()
  for (let m = 1e10, n = 1e5; n; n--)
    for (let t = n; (t = +(t + str(n))) < m;)
      if (d.add(t), part == 1) break  
  
  return nums.fold((r, [a, b]) => d.fold((r, e) =>  
    a > e || e > b ? r : r + e, r), 0, d = arr(d))
}

test(day2, 1, 24747430309)
test(day2, 2, 30962646823)