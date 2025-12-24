require('./_aoc')

let day9 = (notes, part) => {

  let poly = notes.map(e => e.split`,`.map(int))

  let rect = ([left, top], [right, bottom]) => {
    if (right < left) [right, left] = [left, right]
    if (bottom < top) [bottom, top] = [top, bottom]
    return { left, right, top, bottom }
  }

  let collision = ([x1, y1], [x2, y2], i1, i2) => {
    let rect1 = rect([x1, y1], [x2, y2])
    for (let i = 0; i in poly; i++) {
      let j = (i + 1) % len(poly)
      if (i == i1 || i == i2 || j == i1 || j == i2) continue
      let rect2 = rect(poly[i], poly[j])
      if (rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top)
          return 1
    }
  }

  let area = 0
  for (let i = 0; i in poly; i++) {
    for (let j = i + 1; j in poly; j++) {
      let [x1, y1] = poly[i]
      let [x2, y2] = poly[j]
      if (part == 2 && collision([x1, y1], [x2, y2], i, j)) continue
      area = max(area, (abs(x1 - x2) + 1) * (abs(y1 - y2) + 1))
    }
  }
  return area
}

test(day9, 1, 4744899849)
test(day9, 2, 1540192500)