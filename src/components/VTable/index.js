import IScroll from 'iscroll/build/iscroll-probe'

// class Scroller {
//   constructor(selector, options) {
//     this._selector = selector
//     this._options = options

//     this.scroller = new IScroll(selector, {
//       scrollX: true, // 启动x轴滑动
//       scrollY: true, // 启动y轴滑动
//       // freeScroll: true, // 自动滑动
//       probeType: 3,
//       // mouseWheel: true, // 是否监听鼠标滚轮事件
//       scrollbars: false, // 控制滚动条的显示隐藏
//     })
//     this.scroller.on('scroll', () => {
//       this.updatePosition()
//     })
//   }

//   updatePosition() {
//     const cols = document.querySelectorAll(`${this._selector} table tr .tds`)
//     for (let i = 0; i < cols.length; i++) {
//       if (i % 8 == 0) {
//         cols[i].style.transform = `translate(${-1 *
//           this.x}px, 0px) translateZ(0px)`
//       }
//     }

//     const rows = document.querySelectorAll(`${this._selector} table tr`)
//     rows[0].style.transform = `translate(0px,${-1 * this.y}px) translateZ(0px)`
//   }
// }
// export default Scroller

let scroller = null
export default function createScroller(selector) {
  scroller = new IScroll(selector, {
    scrollX: true, // 启动x轴滑动
    scrollY: true, // 启动y轴滑动
    // freeScroll: true, // 自由滑动
    probeType: 3,
    bindToWrapper: true,
    // mouseWheel: true, // 是否监听鼠标滚轮事件
    scrollbars: false, // 控制滚动条的显示隐藏
    bounce: false, //  当滚动到边界时是否有小反弹
  })

  scroller.on('scroll', onScroll)
  scroller.on('scrollEnd', onScrollEnd)

  function onScroll() {
    const cols = document.querySelectorAll(`${selector} table tr .tds`)
    for (let i = 0; i < cols.length; i++) {
      if (i % 14 == 0) {
        cols[i].style.transform = `translate(${-1 *
          this.x}px, 0px) translateZ(0px)`
      }
    }
    const rows = document.querySelectorAll(`${selector} table tr`)
    rows[0].style.transform = `translate(0px,${-1 * this.y}px) translateZ(0px)`
    rows[1].style.transform = `translate(0px,${-1 * this.y}px) translateZ(0px)`
  }

  function onScrollEnd() {
    console.log(scroller)
  }

  return scroller
}
