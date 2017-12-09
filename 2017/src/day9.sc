val input = ""


var groupCount = 0
var groupValue = 0

var groupLevel = 0
var ignoreNext = false
var inGarbage = false
input.foreach(c => {
  if (!ignoreNext) {
    c match {
      case '!' => ignoreNext = true
      case '<' => inGarbage = true
      case '>' => inGarbage = false
      case '{' =>
        if (!inGarbage) {
          groupLevel += 1
        }
      case '}' =>
        if (!inGarbage) {
          groupCount += 1
          groupValue += groupLevel
          groupLevel -= 1
        }
      case default => null
    }
  } else {
    ignoreNext = false
  }
})

println(groupCount, groupValue)
