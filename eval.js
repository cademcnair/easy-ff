function eval (c) {
  for (const comp of c) {
    if (comp.type == "Block") {
      Eval.Block(comp)
    } else for (const line of parse(comp.content))
        Eval.Code(line)
  }
}
const Eval = {
  EasyUtils: {
    RLOC: function (l) {
      return Eval.Code(parse_line(l))[0]
    },
    RLsOC: function (l) {
      return eval(classify(l))
    }
  },
  Code: function (p) {
    let current = null
    let previous = null
    let operator = ""
    for (const part of p) {
      if (part.type == "op") {
        operator = part.content
      } else {
        if (part.type == "num") {
          current = [Number(part.content)]
        } else if (part.type == "str") {
          let string = part.content
          string = string.slice(1)
          current = [string]
        } else if (part.type == "var") {
          current = vars[part.content]
        }
        if (previous != null && current != null && operator != "") {
          const op_data = OPERATORS[operator]
          if (op_data.address) current = op_data.func(previous, current)
          else current = [op_data.func(previous[0], current[0])]
          operator = ""
        }
        previous = current
        current = null
      }
    }
    return previous
  },
  Block: function (c) {
    BLOCKS[c.block_type].func(c, this.EasyUtils.RLOC, this.EasyUtils.RLsOC)
  }
}