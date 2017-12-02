var spreadSheet = """"""

var total = 0
spreadSheet.split("\n").foreach((line) => {
  val lineValues = line.split("\\s+").map((c) => c.toInt)
  total += lineValues.max - lineValues.min
})

println(total)
