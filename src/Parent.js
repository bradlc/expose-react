import { EditableContext } from './EditableContext'
import React from 'react'

function Parent(props) {
  return (
    <EditableContext.Consumer>
      {value => (
        <EditableContext.Provider
          value={{ ...value, key: `${value.key || ''}${props.name}` }}
        >
          {props.children}
        </EditableContext.Provider>
      )}
    </EditableContext.Consumer>
  )
}

export default Parent
