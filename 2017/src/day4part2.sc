val input =
  """""".stripMargin

var passphaseValids = 0
input.split("\n").foreach((line) => {
  val words = line.split("\\s+")
  val sortedWords = words.map(word => word.sorted)
  if (sortedWords.distinct.length == sortedWords.length) {
    passphaseValids += 1
  }
})

println(passphaseValids)
