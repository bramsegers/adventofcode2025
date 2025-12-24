require('./_aoc')

let day11 = (notes, part) => {

  let graph = {}
  notes.for(e => {
    let [from, to] = e.split`: `
    graph[from] = to.split` `
  })

  let dfs = (cur, tgt, mem = { [tgt]: 1 }) =>
    cur in mem ? mem[cur] : mem[cur] = cur in graph &&
    graph[cur].fold((r, e) => r += dfs(e, tgt, mem), 0)


  if (part == 1)
    return dfs('you', 'out')


  if (part == 2) {

    let a = dfs('svr', 'dac')
    let b = dfs('dac', 'fft')
    let c = dfs('fft', 'out')

    let d = dfs('svr', 'fft')
    let e = dfs('fft', 'dac')
    let f = dfs('dac', 'out')

    return a * b * c + d * e * f
  }
}

test(day11, 1, 643)
test(day11, 2, 417190406827152)