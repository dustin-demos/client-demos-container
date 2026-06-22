// I could have used a checkbox instead of JS but I was lazy.

const toggle = document.getElementById('toggle')

setTimeout(() => {
  toggle.classList.add('-toggle')
}, 1000)

setTimeout(() => {
  toggle.classList.remove('-toggle')
}, 2000)

toggle.addEventListener('click', () => {
  if(toggle.classList.contains('-toggle')) {
    toggle.classList.remove('-toggle')
  } else {
    toggle.classList.add('-toggle')
  }
})