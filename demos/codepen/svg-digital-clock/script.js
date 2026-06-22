(function() {
  function display(a, n) {
    number = [
      [1, 1, 1, 0, 1, 1, 1], // 0
      [0, 0, 1, 0, 0, 1, 0], // 1
      [1, 0, 1, 1, 1, 0, 1], // 2
      [1, 0, 1, 1, 0, 1, 1], // 3
      [0, 1, 1, 1, 0, 1, 0], // 4
      [1, 1, 0, 1, 0, 1, 1], // 5
      [1, 1, 0, 1, 1, 1, 1], // 6
      [1, 0, 1, 0, 0, 1, 0], // 7
      [1, 1, 1, 1, 1, 1, 1], // 8
      [1, 1, 1, 1, 0, 1, 1]  // 9
    ]

    n = number[n]
    i = 0
    while (i < n.length) {
      crystal = document.getElementById(a + (i + 1))
      if (n[i] === 0) {
        crystal.style.opacity = '0.125'
      }
      else {
        crystal.style.opacity = '1'
      }
      i++
    }
  }

  function format(value) {
    value = value + ''

    if (value.length === 1) {
      return '0' + value
    }

    return value
  }

  (function update() {
    date = new Date()
    hours = format(date.getHours())
    minutes = format(date.getMinutes())
    seconds = format(date.getSeconds())

    setTimeout(function() {
      display('a', hours[0])
      display('b', hours[1])
      display('c', minutes[0])
      display('d', minutes[1])
      display('e', seconds[0])
      display('f', seconds[1])
      update()
    }, 1000)
  })()
})()