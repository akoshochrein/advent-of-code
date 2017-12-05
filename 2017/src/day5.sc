val input = "".split("\n").map(s => s.toInt)

var currentIndex = 0
var numberOfJumps = 0
var done = false
while (!done) {
  try {
    val jumpValue = input(currentIndex)
    input(currentIndex) += 1
    currentIndex += jumpValue
    numberOfJumps += 1
  } catch {
    case ex: IndexOutOfBoundsException => done = true;
  }
}

println(numberOfJumps)
