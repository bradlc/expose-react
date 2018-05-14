import React, { Component } from 'react'
import { EditableContext } from './EditableContext'
import { Subscribe } from 'unstated'
import EditableContainer from './EditableContainer'
import { withRouter } from 'react-router'
import dlv from 'dlv'

class Props extends Component {
  state = {
    props: {}
  }
  // constructor(props) {
  //   super(props)
  //   console.log(props.e.state.pages[props.location.pathname])

  // }
  static getDerivedStateFromProps(nextProps, prevState) {
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

      props[prop] = value
    })
    return { props }
  }
  render() {
    return (
      <div class="relative">
        {Object.keys(this.props.props).map(prop => {
          if (this.props.props[prop].type === 'color') {
            return (
              <div class="absolute pin-t pin-l bg-white flex px-1 py-2 rounded shadow m-2">
                {this.props.props[prop].colors.map(color => (
                  <button
                    type="button"
                    class="appearance-none rounded-none p-0 border-0 mx-1"
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

                      window.fetch(`http://localhost:3000/props/${id}`, {
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
                class="absolute pin-t pin-l"
              />
            )
          }
        })}

        {this.props.children({ color: this.state.props.color })}
      </div>
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
