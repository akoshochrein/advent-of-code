import scala.collection.mutable.HashMap

var input = """"""

var register = new HashMap[String, Int]() {
  override def default(key: String): Int = 0
}

var overallMax = 0

def doInstruction(instruction: String, register: HashMap[String, Int]): Unit = {
  val decomposedInstruction = instruction.split(" if ")
  val action = decomposedInstruction(0).split("\\s+")
  val condition = decomposedInstruction(1).split("\\s+")

  val conditionRegister = condition(0)
  val conditionValue = condition(2).toInt
  val conditionEval = condition(1) match {
    case "==" => register(conditionRegister) == conditionValue
    case ">" => register(conditionRegister) > conditionValue
    case "<" => register(conditionRegister) < conditionValue
    case ">=" => register(conditionRegister) >= conditionValue
    case "<=" => register(conditionRegister) <= conditionValue
    case "!=" => register(conditionRegister) != conditionValue
  }

  if (conditionEval) {
    val actionRegister = action(0)
    val actionValue = action(2).toInt
    action(1) match {
      case "inc" => register(actionRegister) += actionValue
      case "dec" => register(actionRegister) -= actionValue
    }
    overallMax =
      if (register(actionRegister) > overallMax) register(actionRegister)
      else overallMax
  }
}

input.split("\n").foreach(instruction => {
  doInstruction(instruction, register)
})

println(overallMax)
