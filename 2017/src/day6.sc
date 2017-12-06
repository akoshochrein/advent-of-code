var currentConfig = ""
var configsSeen = List[String]()

while (!configsSeen.contains(currentConfig)) {
  configsSeen = currentConfig :: configsSeen

  val config = currentConfig.split("\\s+").map(s => s.toInt)
  var blocks = config.max
  var distributionIndex = config.indexOf(blocks)

  config(distributionIndex) = 0
  while (blocks > 0) {
    distributionIndex = (distributionIndex + 1) % config.length
    config(distributionIndex) += 1
    blocks -= 1
  }

  currentConfig = config.map(i => i.toString).mkString(" ")
  println(currentConfig)
}

println(configsSeen.length)
