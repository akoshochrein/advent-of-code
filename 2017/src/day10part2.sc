var input =
  "46,41,212,83,1,255,157,65,139,52,39,254,2,86,0,204"
    .map(_.toByte)
    .map(_.toInt)
    .toList

input = input ::: List(17, 31, 73, 47, 23)

def rotateLeft[A](seq: List[A], i: Int): List[A] = {
  val size = seq.size
  seq.drop(i % size) ++ seq.take(i % size)
}

def rotateRight[A](seq: List[A], i: Int): List[A] = {
  val size = seq.size
  seq.drop(size - (i % size)) ++ seq.take(size - (i % size))
}

var list = (0 to 255).toList
var totalRotated = 0
var skipSize = 0

(1 to 64).foreach(_ => {
  input.foreach(length => {
    val section = list.take(length).reverse
    list = section ++ list.takeRight(list.length - length)

    val rotateBy = (length + skipSize) % list.length
    list = rotateLeft(list, rotateBy)
    totalRotated += rotateBy
    skipSize += 1
  })
})

val sparseHash = rotateRight(list, totalRotated)
val denseHash = List(
  sparseHash.slice(0, 16).reduce((a, b) => a ^ b),
  sparseHash.slice(16, 32).reduce((a, b) => a ^ b),
  sparseHash.slice(32, 48).reduce((a, b) => a ^ b),
  sparseHash.slice(48, 64).reduce((a, b) => a ^ b),
  sparseHash.slice(64, 80).reduce((a, b) => a ^ b),
  sparseHash.slice(80, 96).reduce((a, b) => a ^ b),
  sparseHash.slice(96, 112).reduce((a, b) => a ^ b),
  sparseHash.slice(112, 128).reduce((a, b) => a ^ b),
  sparseHash.slice(128, 144).reduce((a, b) => a ^ b),
  sparseHash.slice(144, 160).reduce((a, b) => a ^ b),
  sparseHash.slice(160, 176).reduce((a, b) => a ^ b),
  sparseHash.slice(176, 192).reduce((a, b) => a ^ b),
  sparseHash.slice(192, 208).reduce((a, b) => a ^ b),
  sparseHash.slice(208, 224).reduce((a, b) => a ^ b),
  sparseHash.slice(224, 240).reduce((a, b) => a ^ b),
  sparseHash.slice(240, 256).reduce((a, b) => a ^ b)
)

val hash = denseHash
  .map(_.toLong)
  .map(n => {
    val nAsHex = n.toHexString
    if (nAsHex.length == 1) "0" + nAsHex
    else nAsHex
  })

hash.mkString("")
