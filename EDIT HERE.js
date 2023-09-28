// The blocks that you want to have (ie, for, while, print)
/*
  BLOCK COMPONENT EXAMPLE:
  {
    type: "Block",
    block_type: "if",
    top: "if 1 == 2",
    multi: true,
    bottom: "end",
    content: ['print "2 is 2!"']
  }
  PARAMS DESCRIPTIONS:
  component - The component for the statement ^^^
  run_line_of_code - Quick way to eval code. Should be used for component.top. Gives an output.
  run_lines_of_code - Longer way to eval code. Should be used for component.content. No output.
*/
const BLOCKS = {
  if: {
    func: function (component, run_line_of_code, run_lines_of_code) {
      console.log(component.top)
      if (component.top.includes("1")) alert(get_var("hello"))
      else set_var("hello", "world")
      if (run_line_of_code(component.top.replace("if", "")) === 1)
        run_lines_of_code(component.content)
    },
    multi_line: true
  }
}
// The operators you want to have (+, -, ==, etc)
/*
  PARAMS:
  a - The left var
  b - The right var
  a + b
*/
const OPERATORS = {
  "+": {
    func: function (a, b) {
      return a + b
    },
    address: false
  }
}

// Functions to set and get vars
const get_var = (v, address = false) => address ? vars[v] : vars[v][0]
const set_var = (var_, value) => Array.isArray(value) ? vars[var_] = value : vars[var_] = [value]