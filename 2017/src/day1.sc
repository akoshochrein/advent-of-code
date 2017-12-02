var captcha = ""

var total = 0

if (captcha.length() > 0) {
  captcha.zipWithIndex.foreach((c) => {
    val currentValue = c._1.asDigit
    val currentIndex = c._2
    if (currentIndex + 1 < captcha.length) {
      val nextValue = captcha.charAt(currentIndex + 1).asDigit
      if (currentValue == nextValue) {
        total += currentValue
      }
    } else {
      if (currentValue == captcha.charAt(0).asDigit) {
        total += currentValue
      }
    }
  })
}

println(total)
