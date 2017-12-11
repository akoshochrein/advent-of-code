import scala.collection.mutable.ListBuffer

var steps =
  """"""
    .split(",")

class Direction(val name: String, val opposite: String, val oneAways: List[Tuple2[String, String]])
def directionBuilder(name: String): Direction = {
  name match {
    case "n" => new Direction("n", "s", List(("se", "ne"), ("sw", "nw")))
    case "ne" => new Direction("ne", "sw", List(("s", "se"), ("nw", "n")))
    case "se" => new Direction("se", "nw", List(("n", "ne"), ("sw", "s")))
    case "s" => new Direction("s", "n", List(("ne", "se"), ("nw", "sw")))
    case "sw" => new Direction("sw", "ne", List(("n", "nw"), ("se", "s")))
    case "nw" => new Direction("nw", "se", List(("ne", "n"), ("s", "sw")))
  }
}

var mySteps = ListBuffer[String]()
steps.foreach((step) => {
  var actualStep = directionBuilder(step)

  // Biggest win when we can move 0
  if (mySteps.contains(actualStep.opposite)) {
    mySteps.remove(mySteps.indexOf(actualStep.opposite))
  }
  else if (mySteps.contains(actualStep.oneAways(0)._1)) {
    mySteps.remove(mySteps.indexOf(actualStep.oneAways(0)._1))
    mySteps.append(actualStep.oneAways(0)._2)
  }
  else if (mySteps.contains(actualStep.oneAways(1)._1)) {
    mySteps.remove(mySteps.indexOf(actualStep.oneAways(1)._1))
    mySteps.append(actualStep.oneAways(1)._2)
  } else {
    mySteps.append(step)
  }
})

println(mySteps.length)
