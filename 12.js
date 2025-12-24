require('./_aoc')

let day12 = (notes, part) => {

  let parts = notes.join`|`.split`||`

  let regions = parts.pop().split`|`.map(e => 
    e.match(/\d+/g).map(int)).map(([w, h, ...p]) => 
    ({ area: w * h, presents: p }))

  let presents = parts.map(e =>
    ({size: len(e.match(/#/g)) }))

  let fits = e => {
    let needs = e.presents.map((e, i) => e * presents[i].size)
    return sum(needs) <= e.area
  }

  return regions.fold((r, e) => r += fits(e), 0)
}

test(day12, 1, 557)