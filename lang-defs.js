// Lang constructs (vars, blocks - if/while/say, code - 1 + 2)
const Lang = {
  Block: function (type, content) {
    this.type = "Block"
    this.block_type = type
    this.top = content.shift()
    this.multi = content.length > 0
    if (this.multi) {
      if (content[content.length - 1].startsWith("end"))
        this.bottom = content.pop()
      else this.bottom = null
      this.content = content
    }
  },
  Code: function (content) {
    this.type = "Code"
    this.content = content
  },
  Var: function (type, content) {
    this.type = type
    this.content = content
  }
}
// types of blocks
const Blocks = {
  Types: Object.fromEntries(Object.entries(BLOCKS).map(([k, v]) => [k, v.multi_line])),
  RegExps: Object.keys(BLOCKS).map(i=>[new RegExp(`^${i}.*`), i]),
}
// operations
const Ops = {
  Basic: [...(new Set(Object.keys(OPERATORS).reduce((a, b) => a + b).split("")))],
  All: Object.keys(OPERATORS)
}
// general utils
const Utils = {
  clone: (i) => JSON.parse(JSON.stringify(i)),
  MatchRegExps: function (l) {
    for (const RE of Blocks.RegExps) {
      if (RE[0].test(l)) return RE[1]
    }
    return "none"
  }
}