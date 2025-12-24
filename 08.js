require('./_aoc')

let day8 = (notes, part) => {

  let boxes = notes.map(e => e.split`,`.map(int)).map(([x, y, z]) => ({ circuit: 0, x, y, z }))
  let dist = ([a, b]) => hyp(a.x - b.x, a.y - b.y, a.z - b.z)

  let pairs = []
  let circuits = 0
  let n = len(boxes)

  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      pairs.push([boxes[i], boxes[j]])
  pairs.sort((a, b) => dist(a) - dist(b))

  if (part == 1) pairs = pairs.slice(0, 1000)

  for (let [a, b] of pairs) {
    let [ca, cb] = [a.circuit, b.circuit]
    if (!ca && cb) a.circuit = cb, n--
    else if (ca && !cb) b.circuit = ca, n--
    else if (!ca && !cb) a.circuit = b.circuit = ++circuits, n -= 2
    else if (ca != cb) boxes.for(e => e.circuit == ca && (e.circuit = cb))
    if (!n) return a.x * b.x
  }

  let groups = {}
  boxes.for(e => (e = e.circuit) && (groups[e] = -~groups[e]))
  let largest = Object.values(groups).sort((a, b) => a - b)
  return largest.slice(-3).fold((p, e) => p * e, 1)
}

test(day8, 1, 57970)
test(day8, 2, 8520040659)