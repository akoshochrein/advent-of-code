import java.security.MessageDigest

val doorId = "wtnhxymk"
var passcode = ""

var index = 0
while (8 != passcode.length) {
  val testHashBase = doorId + index.toString
  val testHash = MessageDigest getInstance "MD5" digest testHashBase.getBytes

  val asHex = testHash.map("%02X" format _).mkString
  if (asHex.startsWith("00000")) {
    println(passcode, testHashBase, asHex)
  }

  index += 1
}

passcode.mkString.toLowerCase
