val input = ""

var ignoreNext = false
var inGarbage = false
var totalRemoved = 0
input.foreach(c => {
  if (!ignoreNext) {
    c match {
      case '!' => ignoreNext = true
      case '<' =>
        if (inGarbage) totalRemoved += 1
        inGarbage = true
      case '>' =>
        inGarbage = false
      case '{' =>
        if (inGarbage) totalRemoved += 1
      case '}' =>
        if (inGarbage) totalRemoved += 1
      case default =>
        if (inGarbage) totalRemoved += 1
    }
  } else {
    ignoreNext = false
  }
})

println(totalRemoved)
