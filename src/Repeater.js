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
              {/* <button
                onClick={() => {
                  this.props.e.deleteVariant(
                    this.props.e.state.pages[this.props.location.pathname],
                    this.props.value.key,
                    i
                  )
                }}
              >
                x
              </button> */}
              {Component ? <Component index={i} /> : C.props.render()}
            </EditableContext.Provider>
          )
        })}
        {/* <div> */}
        {children.map(
          child =>
            this.props.placeholder
              ? this.props.placeholder(
                  <button
                    type="button"
                    class="flex items-center"
                    onClick={() =>
                      this.props.e.createVariant(
                        this.props.e.state.pages[this.props.location.pathname],
                        { key: this.props.value.key, name: child.props.name }
                      )
                    }
                  >
                    <div class="w-36 h-36 bg-purple text-white rounded-full mr-3 flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        class="fill-current"
                      >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                      </svg>
                    </div>Add block
                  </button>
                )
              : child.props.name
        )}
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
