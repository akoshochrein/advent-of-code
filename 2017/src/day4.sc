val input =
  """""".stripMargin

val passphaseValids = input
  .split("\n")
  .map(line => line.split("\\s+"))
  .map(words => words.distinct.length == words.length)
  .count(valid => valid)

println(passphaseValids)
