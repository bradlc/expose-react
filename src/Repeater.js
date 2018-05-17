import React, { Component } from 'react'
import { EditableContext } from './EditableContext'
import { Subscribe } from 'unstated'
import EditableContainer from './EditableContainer'
import { withRouter } from 'react-router'

class Repeater extends Component {
  state = { variants: [] }
  render() {
    let variants = []

    try {
      variants = this.props.e.state.variants[
        this.props.e.state.pages[this.props.location.pathname]
      ].filter(
        x => x.key === this.props.value.key // && x.name === this.props.name
      )
    } catch (err) {
      return null
    }

    let children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children]

    return (
      <React.Fragment>
        {children.map(child => (
          <button
            onClick={() =>
              this.props.e.createVariant(
                this.props.e.state.pages[this.props.location.pathname],
                { key: this.props.value.key, name: child.props.name }
              )
            }
          >
            {child.props.name}
          </button>
        ))}
        {variants.map((variant, i) => {
          let C = children.filter(child => child.props.name === variant.name)[0]
          let Component = C.props.component

          // return 'hi'
          // let C = this.props.variants.filter(x => x.name === variant.name)[0]
          return (
            <EditableContext.Provider
              value={{
                ...this.props.value,
                key: `${
                  this.props.value.key ? this.props.value.key + '.' : ''
                }${variant.name}.${i}`
              }}
            >
              <button
                onClick={() => {
                  this.props.e.deleteVariant(
                    this.props.e.state.pages[this.props.location.pathname],
                    this.props.value.key,
                    i
                  )
                }}
              >
                x
              </button>
              {Component ? <Component index={i} /> : C.props.render()}
            </EditableContext.Provider>
          )
        })}
      </React.Fragment>
    )
  }
}

export default withRouter(props => (
  <Subscribe to={[EditableContainer]}>
    {e => (
      <EditableContext.Consumer>
        {value => (
          <EditableContext.Provider
            value={{
              ...value,
              key: `${value.key ? value.key + '.' : ''}${props.name}`
            }}
          >
            <EditableContext.Consumer>
              {value => <Repeater {...props} value={value} e={e} />}
            </EditableContext.Consumer>
          </EditableContext.Provider>
        )}
      </EditableContext.Consumer>
    )}
  </Subscribe>
))
