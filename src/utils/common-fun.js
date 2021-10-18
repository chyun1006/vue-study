// export function throttle1(func, delay) {
//   let isRun = false
//   return function() {
//     setTimeout(() => {
//       func.apply()
//       isRun = false
//     }, delay)
//   }
// }

export function throttle2(func, delay) {
  let start = 0
  return function() {
    let end = +Date.now()
    if (end - start > delay) {
      func.apply(this, arguments)
      start = end
    }
  }
}
