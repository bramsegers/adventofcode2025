require('./_aoc')

let day10 = (notes, part) => {

  let machines = notes.map(e => {
    let parts = e.split` `
    let lights = parts.shift().match(/[\.#]/g).fold((r, e, i) => r += (e == '#') << i, 0)
    let buttons = parts.map(e => e.match(/\d+/g).map(int))
    let joltage = buttons.pop()
    return { lights, buttons, joltage }
  })
 
  let binary = b => b.fold((r, e) => r + (1 << e), 0)


  let part1 = (state, buttons, i) => {
    if (!buttons[i]) return state ? inf : 0
    return min(
      part1(state, buttons, i + 1),
      part1(state ^ binary(buttons[i]), buttons, i + 1) + 1
    )
  }
 

  let part2 = (state, buttons) => {

    let best = inf
    let slen = len(state)
    let blen = len(buttons)
    let binbuttons = buttons.map(binary)
   
    let solve = (state, start, steps) => {
      
      let todo = 0
      for (let i = 0; i < slen; i++) {
        if (state[i] < 0) return
        todo = max(todo, state[i])
      }

      if (!todo) return best = min(best, steps)
      if (steps + todo >= best) return

      for (let i = 0; i < slen; i++) {
        for (let j = 0; j < slen; j++) {
          if (state[i] > state[j]) {
            let use = [], u = 0
            for (let k = start; k < blen && u < 2; k++) {
              let b = buttons[k]
              let bb = binbuttons[k]
              if ((bb >> i) % 2 && (bb >> j) % 2 == 0) use[u++] = b
            }
            if (u == 0) return
            if (u == 1) {
              for (let v of use[0]) state[v]--
              solve(state, start, steps + 1)
              for (let v of use[0]) state[v]++
              return
            }
          }
        }
      }
     
      for (let i = start; i < blen; i++) {
        for (let v of buttons[i]) state[v]--
        solve(state, i, steps + 1)
        for (let v of buttons[i]) state[v]++
      }
      
    }
 
    solve(state, 0, 0)
    return best
  }

  let tot = 0
  machines.for(({ lights, buttons, joltage }, i) => {
    let res = part == 1 ? part1(lights, buttons, 0) : part2(joltage, buttons)
    print({ line: (i + 1) + '/' + len(machines), res })
    tot += res
  })
  return tot
}

test(day10, 1, 520)
test(day10, 2, 20626) // 9 min 17 sec