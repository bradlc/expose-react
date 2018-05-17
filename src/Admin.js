import React, { Component } from 'react'
import './App.css'
import { Provider, Subscribe, Container } from 'unstated'

class SidebarContainer extends Container {
  state = {
    props: {},
    callback: () => {}
  }

  setProps(props, callback) {
    console.log(props)
    if (callback) {
      this.setState({ props, callback })
    } else {
      this.setState({ props })
    }
  }
}

const App = () => (
  <Provider>
    <Subscribe to={[SidebarContainer]}>
      {sidebar => (
        <div className="flex h-screen">
          <Sidebar sidebar={sidebar} />
          <Main sidebar={sidebar} />
        </div>
      )}
    </Subscribe>
  </Provider>
)

class Sidebar extends React.Component {
  render() {
    console.log(this.props.sidebar.state.props)
    return (
      <div className="flex-none" style={{ width: 300, background: '#eee' }}>
        {Object.keys(this.props.sidebar.state.props).map(prop => {
          switch (this.props.sidebar.state.props[prop].type) {
            case 'color':
              return (
                <div>
                  <h2 style={{ fontSize: 16 }}>{camelToSentence(prop)}</h2>
                  {this.props.sidebar.state.props[prop].colors.map(color => (
                    <button
                      type="button"
                      className="appearance-none rounded-none p-0 border-0 mx-1"
                      style={{ width: 16, height: 16, background: color }}
                      onClick={() => {
                        this.props.sidebar.state.callback(prop, color)
                      }}
                    />
                  ))}
                </div>
              )
              break
            case 'boolean':
              return (
                <div>
                  <h2 style={{ fontSize: 16 }}>{camelToSentence(prop)}</h2>
                  <input
                    type="checkbox"
                    defaultChecked={this.props.sidebar.state.props[prop].value}
                    onChange={e => {
                      this.props.sidebar.state.callback(prop, e.target.checked)
                    }}
                  />
                </div>
              )
              break
            case 'icon':
              return (
                <div>
                  <h2 style={{ fontSize: 16 }}>{camelToSentence(prop)}</h2>
                  {this.props.sidebar.state.props[prop].icons.map(icon => (
                    <button
                      onClick={() => {
                        this.props.sidebar.state.callback(prop, icon)
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              )
              break
            case 'number':
              return (
                <div>
                  <h2 style={{ fontSize: 16 }}>{camelToSentence(prop)}</h2>
                  <input
                    type="number"
                    defaultValue={this.props.sidebar.state.props[prop].value}
                    onInput={e => {
                      this.props.sidebar.state.callback(
                        prop,
                        parseInt(e.target.value, 10)
                      )
                    }}
                  />
                </div>
              )
              break
            case 'number[]':
              return (
                <div>
                  {this.props.sidebar.state.props[prop].value.map(
                    (number, i, arr) => (
                      <div>
                        <input
                          type="number"
                          defaultValue={number}
                          onInput={e => {
                            let nextValue = arr.map((a, index) => {
                              if (i === index)
                                return parseInt(e.target.value, 10)
                              return a
                            })
                            this.props.sidebar.setProps({
                              ...this.props.sidebar.state.props,
                              [prop]: {
                                ...this.props.sidebar.state.props[prop],
                                value: nextValue
                              }
                            })
                            this.props.sidebar.state.callback(prop, nextValue)
                          }}
                        />
                      </div>
                    )
                  )}
                  <button
                    onClick={() => {
                      let nextValue = this.props.sidebar.state.props[
                        prop
                      ].value.concat([0])
                      this.props.sidebar.setProps({
                        ...this.props.sidebar.state.props,
                        [prop]: {
                          ...this.props.sidebar.state.props[prop],
                          value: nextValue
                        }
                      })
                      this.props.sidebar.state.callback(prop, nextValue)
                    }}
                  >
                    add
                  </button>
                </div>
              )
              break
            case 'select':
              return (
                <div>
                  <h2 style={{ fontSize: 16 }}>{camelToSentence(prop)}</h2>
                  <select
                    defaultValue={this.props.sidebar.state.props[prop].value}
                    onChange={e => {
                      this.props.sidebar.state.callback(prop, e.target.value)
                    }}
                  >
                    {this.props.sidebar.state.props[prop].options.map(
                      option => (
                        <option value={option.value}>{option.label}</option>
                      )
                    )}
                  </select>
                </div>
              )
          }

          // return (
          //   <input
          //     value={this.state.props.color}
          //     ref={ref => (this.input = ref)}
          //     className="absolute pin-t pin-l"
          //   />
          // )
        })}
        {/* {this.props.sidebar.state.items.map(item => {
          return (
            <input
              type="text"
              defaultValue={item.value}
              onInput={e => {
                item.callback(e.target.value)
              }}
            />
          )
        })} */}
      </div>
    )
  }
}

class Main extends React.Component {
  componentDidMount() {
    window.setProps = (props, callback) => {
      this.props.sidebar.setProps(props, callback)
    }
  }
  render() {
    return (
      <div className="flex-auto relative">
        <iframe src="/" className="absolute pin w-full h-full border-0" />
      </div>
    )
  }
}

export default App

function camelToSentence(str) {
  return str
    .replace(/([A-Z])/g, (m, p1) => ' ' + p1.toLowerCase())
    .replace(/^(.)/, (m, p1) => p1.toUpperCase())
}
