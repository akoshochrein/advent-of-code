var spreadSheet = """"""

var total = 0
spreadSheet.split("\n").foreach((line) => {
  val lineValues = line.split("\\s+").map((c) => c.toInt)
  lineValues.combinations(2).foreach((combination) => {
    val bigger = combination.max
    val smaller = combination.min
    if (bigger / smaller == bigger.toFloat / smaller) {
      total += bigger / smaller
    }
  })
})

println(total)
