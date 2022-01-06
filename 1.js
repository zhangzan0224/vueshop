let timer = setTimeout(() => {
  console.log('ccc')
}, 100)
// console.log('@', !timer)
if (timer) clearTimeout(timer)
console.log('@@@', !timer)
const callnow = !timer

timer = setTimeout(() => {
  timer = null
}, 500)
console.log(callnow)
