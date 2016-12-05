val steps = "R2, L1, R2, R1, R1, L3, R3, L5, L5, L2, L1, R4, R1, R3, L5, L5, R3, L4, L4, R5, R4, R3, L1, L2, R5, R4, L2, R1, R4, R4, L2, L1, L1, R190, R3, L4, R52, R5, R3, L5, R3, R2, R1, L5, L5, L4, R2, L3, R3, L1, L3, R5, L3, L4, R3, R77, R3, L2, R189, R4, R2, L2, R2, L1, R5, R4, R4, R2, L2, L2, L5, L1, R1, R2, L3, L4, L5, R1, L1, L2, L2, R2, L3, R3, L4, L1, L5, L4, L4, R3, R5, L2, R4, R5, R3, L2, L2, L4, L2, R2, L5, L4, R3, R1, L2, R2, R4, L1, L4, L4, L2, R2, L4, L1, L1, R4, L1, L3, L2, L2, L5, R5, R2, R5, L1, L5, R2, R4, R4, L2, R5, L5, R5, R5, L4, R2, R1, R1, R3, L3, L3, L4, L3, L2, L2, L2, R2, L1, L3, R2, R5, R5, L4, R3, L3, L4, R2, L5, R5"

val splitSteps = steps.split(", ")

var horizontal = 0
var vertical = 0
var currentAngle = 0

splitSteps.foreach((s) => {
  if ('R' == s.charAt(0)) currentAngle += 1
  else currentAngle -= 1

  if (currentAngle < 0) currentAngle += 4

  val movementValue = Integer.parseInt(s.substring(1))
  if (currentAngle % 4 == 0) vertical += movementValue
  else if (currentAngle % 4 == 1) horizontal += movementValue
  else if (currentAngle % 4 == 2) vertical -= movementValue
  else if (currentAngle % 4 == 3) horizontal -= movementValue

  println(currentAngle, vertical, horizontal)
})

Math.abs(horizontal) + Math.abs(vertical)
