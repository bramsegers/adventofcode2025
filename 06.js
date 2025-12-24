require('./_aoc')

let day6 = (notes, part) => {
  
  let ops = notes.pop().match(/[+*]/g)
  let nums = notes.map(e => e.match(/\d+/g))
  nums = nums[0].map((_,i) => nums.map(e => e[i]))
  
  if (part == 1) return sum(nums.map((e, i) => eval(e.join(ops[i]))))

  nums = arr(notes[0], i => notes.map(e => e[i]).join``.trim())
  return sum(nums.join`|`.split`||`.map((e, i) => eval(e.split`|`.join(ops[i]))))
}

test(day6, 1, 7098065460541)
test(day6, 2, 13807151830618)