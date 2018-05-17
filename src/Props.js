import React, { Component } from 'react'
import { EditableContext } from './EditableContext'
import { Subscribe } from 'unstated'
import EditableContainer from './EditableContainer'
import { withRouter } from 'react-router'
import dlv from 'dlv'
import TetherComponent from 'react-tether'

class Props extends Component {
  state = {
    props: {}
  }
  // constructor(props) {
  //   super(props)
  //   console.log(props.e.state.pages[props.location.pathname])

  // }
  // componentDidMount() {
  //   window.parent.setProps(this.props.props)
  // }
  constructor(nextProps) {
    super(nextProps)
    let props = {}
    Object.keys(nextProps.props).forEach(prop => {
      let value = dlv(
        nextProps.e.state.props,
        `${nextProps.e.state.pages[nextProps.location.pathname]}.${
          nextProps.value.key ? nextProps.value.key + '.' : ''
        }${nextProps.name}.value.${prop}`,
        nextProps.props[prop].default
      )

      // console.log(
      //   props.e.state.props,
      //   `${props.e.state.pages[props.location.pathname]}.${
      //     props.value.key ? props.value.key + '.' : ''
      //   }${props.name}.value.${prop}`
      // )

      props[prop] = { ...nextProps.props[prop], value }
    })
    this.state.props = props
  }
  getValues(props) {
    let vals = {}
    Object.entries(props).map(([prop, { value }]) => {
      vals[prop] = value
    })
    return vals
  }
  render() {
    return (
      <TetherComponent
        attachment="top right"
        targetAttachment="top left"
        constraints={[
          {
            to: 'window',
            pin: ['left']
          }
        ]}
      >
        {this.props.children(this.getValues(this.state.props))}
        <button
          className="rounded shadow bg-white flex items-center justify-center"
          style={{ width: 20, height: 20, outline: 0 }}
          onClick={() => {
            window.parent.setProps(this.state.props, (prop, value) => {
              this.setState(state => ({
                props: {
                  ...state.props,
                  [prop]: { ...state.props[prop], value }
                }
              }))

              // let id = dlv(
              //   this.props.e.state.props,
              //   `${this.props.e.state.pages[this.props.location.pathname]}.${
              //     this.props.value.key ? this.props.value.key + '.' : ''
              //   }${this.props.name}.id`
              // )

              // window.fetch(`http://localhost:3002/props/${id}`, {
              //   method: 'PATCH',
              //   headers: { 'content-type': 'application/json' },
              //   body: JSON.stringify({ value: { [prop]: value } })
              // })
            })
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#333">
            <path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
          </svg>
        </button>
        {/* {Object.keys(this.props.props).map(prop => {
          if (this.props.props[prop].type === 'color') {
            return (
              <div className="absolute pin-t pin-l bg-white flex px-1 py-2 rounded shadow m-2">
                {this.props.props[prop].colors.map(color => (
                  <button
                    type="button"
                    className="appearance-none rounded-none p-0 border-0 mx-1"
                    style={{ width: 16, height: 16, background: color }}
                    onClick={() => {
                      this.setState({ props: { color } })

                      let id = dlv(
                        this.props.e.state.props,
                        `${
                          this.props.e.state.pages[this.props.location.pathname]
                        }.${
                          this.props.value.key ? this.props.value.key + '.' : ''
                        }${this.props.name}.id`
                      )

                      window.fetch(`http://localhost:3002/props/${id}`, {
                        method: 'PATCH',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ value: { color: color } })
                      })
                    }}
                  />
                ))}
              </div>
            )
            return (
              <input
                value={this.state.props.color}
                ref={ref => (this.input = ref)}
                className="absolute pin-t pin-l"
              />
            )
          }
        })} */}
      </TetherComponent>
    )
  }
}

export default withRouter(props => (
  <Subscribe to={[EditableContainer]}>
    {e => (
      <EditableContext.Consumer>
        {value => <Props {...props} value={value} e={e} />}
      </EditableContext.Consumer>
    )}
  </Subscribe>
))
