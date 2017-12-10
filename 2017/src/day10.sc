var input = "46,41,212,83,1,255,157,65,139,52,39,254,2,86,0,204"

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
input.split(",").foreach(c => {
  val length = c.toInt
  val section = list.take(length).reverse
  list = section ++ list.takeRight(list.length - length)

  val rotateBy = (length + skipSize) % list.length
  list = rotateLeft(list, rotateBy)
  totalRotated += rotateBy
  skipSize += 1
})

list = rotateRight(list, totalRotated)
println(list(0) * list(1))
