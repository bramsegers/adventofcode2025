require('./_aoc')
let solver = require('javascript-lp-solver')

let day10 = (notes, part) => {

  let machines = notes.map(e => {
    let parts = e.split` `
    let lights = parts.shift().match(/[\.#]/g).fold((r, e, i) => r += (e == '#') << i, 0)
    let buttons = parts.map(e => e.match(/\d+/g).map(int))
    let joltage = buttons.pop()
    return { lights, buttons, joltage }
  })

  let part1 = (state, buttons, i) => {
    if (!buttons[i]) return state ? inf : 0
    return min(
      part1(state, buttons, i + 1),
      part1(buttons[i].fold((r, e) => r ^= (1 << e), state), buttons, i + 1) + 1
    )
  }

  let part2 = (state, buttons) => {
    let b = state
    let A = state.map((_, i) => buttons.map(e => +e.includes(i)))
    return minimizeIntegerSumWithEqualityConstraints(A, b).objective
  }

  /**
   * Solve min sum(x) subject to A x = b, x >= 0, x integer.
   * @param {number[][]} A - m x n matrix
   * @param {number[]} b  - length m
   * @returns { { feasible:boolean, solution:number[]|null, objective:number|null, raw:any } }
   */
  function minimizeIntegerSumWithEqualityConstraints(A, b) {
    const m = A.length;
    if (m === 0) return { feasible: true, solution: [], objective: 0 };
    const n = A[0].length;

    const model = {
      optimize: "sum",
      opType: "min",
      constraints: {},
      variables: {},
      ints: {}         // <---- INTEGER CONSTRAINTS
    };

    // Build equality constraints
    for (let j = 0; j < m; j++) {
      model.constraints["eq" + j] = { equal: b[j] };
    }

    // Build variables x0..x{n-1}
    for (let i = 0; i < n; i++) {
      const varName = "x" + i;
      const varObj = { sum: 1 }; // objective coefficient

      // Add coefficients for each row
      for (let j = 0; j < m; j++) {
        varObj["eq" + j] = A[j][i];
      }

      model.variables[varName] = varObj;
      model.ints[varName] = 1;   // <---- force integer
    }

    // Solve
    const result = solver.Solve(model);

    if (!result || result.feasible === false) {
      return { feasible: false, solution: null, objective: null, raw: result };
    }

    // Extract variable values
    const solution = Array.from({ length: n }, (_, i) => {
      const v = result["x" + i];
      return typeof v === "number" ? v : 0;
    });

    return {
      feasible: true,
      solution,
      objective: result.result,
      raw: result
    };
  }

  return machines.fold((res, { lights, buttons, joltage }) =>
    res += part == 1
    ? part1(lights, buttons, 0)
    : part2(joltage, buttons)
  , 0)

}

test(day10, 1, 520)
test(day10, 2, 20626)