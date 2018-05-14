import { EditableContext } from './EditableContext'
import React from 'react'

function Page(props) {
  return (
    <EditableContext.Consumer>
      {() => (
        <EditableContext.Provider value={{ page: props.name, key: '' }}>
          {props.children}
        </EditableContext.Provider>
      )}
    </EditableContext.Consumer>
  )
}

export default Page
