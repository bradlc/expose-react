// export default {
//     props: {
//     data: {
//     type: Array,
//   required: true
// },
// },
//   data() {
//     return {
//     total: this.data.reduce((acc, slice) => {
//         return acc + slice.value
// }, 0)
// }
// },
//   mounted() {
//     if (this.showTotalInCenter) {
//     fitty(this.$refs.total, {
//       maxSize: 31
//     })
//   }
//   },
//   methods: {
//     getCoordinatesForPercent(percent) {
//   const x = Math.cos(2 * Math.PI * percent)
//   const y = Math.sin(2 * Math.PI * percent)
//   return [x, y]
// }
// },
//   computed: {
//     paths() {
//   let cumulativePercent = 0

//       return this.data.map(slice => {
//         // destructuring assignment sets the two variables at once
//         const [startX, startY] = this.getCoordinatesForPercent(
//     cumulativePercent
//   )

//   // each slice starts where the last slice ended, so keep a cumulative percent
//   cumulativePercent += slice.value / this.total

//   const [endX, endY] = this.getCoordinatesForPercent(cumulativePercent)

//   // if the slice is more than 50%, take the large arc (the long way around)
//   const largeArcFlag = slice.value / this.total > 0.5 ? 1 : 0

//   // create an array and join it just for code readability
//   const pathData = [
//           `M ${startX} ${startY}`, // Move
//           `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
//   `L 0 0` // Line
// ].join(' ')

//         return {d: pathData, fill: slice.color }
// })
// }
// },
//   render() {
//     return (
//       <div class="aspect-ratio-square relative">
//         <svg
//           viewBox="-1 -1 2 2"
//           style="transform: rotate(-90deg)"
//           class="absolute pin w-full h-full"
//         >
//           <defs>
//             <mask id="foo">
//               {/*<circle
//                     cx="0"
//                     cy="0"
//                     r=".816964286"
//                     stroke-width=".366071429"
//                     stroke="red"
//                   />*/}
//               <path
//                 d="M-0.816964286,0a0.816964286,0.816964286 0 1,0 1.633928572,0a0.816964286,0.816964286 0 1,0 -1.633928572,0"
//                 fill="none"
//                 stroke="white"
//                 stroke-width=".366071429"
//                 stroke-dasharray={
//                   this.animate ? 2 * Math.PI * 0.816964286 : ''
//                 }
//                 stroke-dashoffset={
//                   this.animate ? 2 * Math.PI * 0.816964286 : ''
//                 }
//                 transform="scale(-1, 1)"
//                 style={
//                   this.animate
//                     ? {
//                       animation: 'ki-doughnut-chart-in 1s forwards'
//                     }
//                     : {}
//                 }
//               />
//             </mask>
//           </defs>
//           {this.paths.map(path => (
//             <path d={path.d} fill={path.fill} mask="url(#foo)" />
//           ))}
//         </svg>
//       </div>

import React, { Component } from 'react'
let COLORS = ['#fb7d3f', '#ffbb98', '#95919f', '#c9c8ce', '#fff']

export default class Doughnut extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let cumulativePercent = 0
    let total = nextProps.values.reduce((acc, value) => {
      return acc + value
    }, 0)

    return {
      paths: nextProps.values.map(value => {
        // destructuring assignment sets the two variables at once
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent)

        // each slice starts where the last slice ended, so keep a cumulative percent
        cumulativePercent += value / total

        const [endX, endY] = getCoordinatesForPercent(cumulativePercent)

        // if the slice is more than 50%, take the large arc (the long way around)
        const largeArcFlag = value / total > 0.5 ? 1 : 0

        // create an array and join it just for code readability
        const pathData = [
          `M ${startX} ${startY}`, // Move
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
          `L 0 0` // Line
        ].join(' ')

        return pathData
      })
    }
  }
  render() {
    return (
      <div className="relative" style={{ paddingTop: '100%' }}>
        <svg
          viewBox="-1 -1 2 2"
          style={{ transform: 'rotate(-90deg)' }}
          className="absolute pin w-full h-full"
        >
          <defs>
            <mask id="foo">
              <path
                d="M-0.816964286,0a0.816964286,0.816964286 0 1,0 1.633928572,0a0.816964286,0.816964286 0 1,0 -1.633928572,0"
                fill="none"
                stroke="white"
                stroke-width=".366071429"
                transform="scale(-1, 1)"
              />
            </mask>
          </defs>
          {this.state.paths.map((path, i) => (
            <path d={path} fill={COLORS[i]} mask="url(#foo)" />
          ))}
        </svg>
      </div>
    )
  }
}

function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent)
  const y = Math.sin(2 * Math.PI * percent)
  return [x, y]
}
