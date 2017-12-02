var captcha = ""

var total = 0

captcha.zipWithIndex.foreach((c) => {
  val currentValue = c._1.asDigit
  val currentIndex = c._2
  val compareValue = captcha.charAt((c._2 + captcha.length() / 2) % captcha.length()).asDigit
  if (currentValue == compareValue) {
    total += currentValue
  }
})

println(total)
