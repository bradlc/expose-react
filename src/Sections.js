import React from 'react'
import Editable from './Editable'
import Repeater from './Repeater'
import Variant from './Variant'
import Props from './Props'
import tinycolor from 'tinycolor2'

export function Text(props) {
  return (
    <div
      style={{ paddingTop: '10vw', paddingBottom: '10vw' }}
      className={props.index % 2 === 0 ? 'bg-grey-light' : 'bg-grey-lighter'}
    >
      <div className="mx-auto max-w-lg">
        <Editable name="text" />
      </div>
    </div>
  )
}

export function TextColor(props) {
  return (
    <Props
      props={{
        color: {
          type: 'color',
          colors: ['#fff', '#000'],
          default: '#fff'
        }
      }}
    >
      {({ color }) => (
        <div
          style={{
            paddingTop: '10vw',
            paddingBottom: '10vw',
            background: color,
            color: tinycolor(color).isDark() ? 'white' : 'black'
          }}
        >
          <div className="mx-auto max-w-lg">
            <Editable name="text" />
          </div>
        </div>
      )}
    </Props>
  )
}

export function TextText(props) {
  return (
    <div
      style={{ paddingTop: '10vw', paddingBottom: '10vw' }}
      className={props.index % 2 === 0 ? 'bg-grey-light' : 'bg-grey-lighter'}
    >
      <div className="mx-auto max-w-lg flex">
        <div className="w-1/2 flex-none">
          <Editable name="text1" />
        </div>
        <div className="w-1/2 flex-none">
          <Editable name="text2" />
        </div>
      </div>
    </div>
  )
}

export function List(props) {
  return (
    <div
      style={{ paddingTop: '10vw', paddingBottom: '10vw' }}
      className={props.index % 2 === 0 ? 'bg-grey-light' : 'bg-grey-lighter'}
    >
      <div className="mx-auto max-w-lg flex">
        <ul>
          <Repeater name="list">
            <Variant
              name="item"
              render={() => (
                <li>
                  <Editable name="itemtext" />
                </li>
              )}
            />
          </Repeater>
        </ul>
      </div>
    </div>
  )
}
