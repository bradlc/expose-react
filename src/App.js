import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg'
// import Repeatable from './Repeatable'
import './App.css'
import Page from './Page'
import Parent from './Parent'
import Editable from './Editable'
import Repeater from './Repeater'
import Variant from './Variant'
import { EditableContext } from './EditableContext'

import { Provider, Subscribe } from 'unstated'

import EditableContainer from './EditableContainer'
import { Text, TextColor, TextText, List } from './Sections'

import Props from './Props'
import Admin from './Admin'

let loaded = false
// let pages = {}

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/foo">FOO</Link>
        {/* <Parent>{val => <Parent>{value => value}</Parent>}</Parent> */}
        <Page name="home">
          <Props
            name="test-props"
            props={{
              color: {
                type: 'color',
                colors: ['#f00', '#0f0', '#00f'],
                default: '#f00'
              },
              showText: {
                type: 'boolean',
                default: false
              }
            }}
          >
            {({ color, showText }) => (
              <div style={{ height: 100, backgroundColor: color }}>
                {showText && 'hiya'}
              </div>
            )}
          </Props>
          <Props
            name="test-props-2"
            props={{
              layout: {
                type: 'select',
                options: [
                  { value: '1', label: 'One column' },
                  { value: '2', label: 'Two column' },
                  { value: '3', label: 'Three column' }
                ],
                default: '2'
              }
            }}
          >
            {({ layout }) => (
              <div class="flex" style={{ height: 200 }}>
                {Array.from({ length: parseInt(layout, 10) }).map(x => (
                  <div class="flex-auto">hello</div>
                ))}
              </div>
            )}
          </Props>
          <Props
            name="test-props-3"
            props={{
              first: {
                type: 'number',
                default: 10
              },
              second: {
                type: 'number',
                default: 40
              },
              third: {
                type: 'number',
                default: 80
              }
            }}
          >
            {({ first, second, third }) => (
              <div class="p-8" style={{ height: 200 }}>
                <div
                  class="relative"
                  style={{
                    background: 'tomato',
                    height: 20,
                    width: `${first / Math.max(first, second, third) * 100}%`
                  }}
                >
                  <span
                    class="absolute leading-none ml-3"
                    style={{ left: '100%', top: '50%', marginTop: '-0.5em' }}
                  >
                    {first}
                  </span>
                </div>
                <div
                  class="relative mt-3"
                  style={{
                    background: 'tomato',
                    height: 20,
                    width: `${second / Math.max(first, second, third) * 100}%`
                  }}
                >
                  <span
                    class="absolute leading-none ml-3"
                    style={{ left: '100%', top: '50%', marginTop: '-0.5em' }}
                  >
                    {second}
                  </span>
                </div>
                <div
                  class="relative mt-3"
                  style={{
                    background: 'tomato',
                    height: 20,
                    width: `${third / Math.max(first, second, third) * 100}%`
                  }}
                >
                  <span
                    class="absolute leading-none ml-3"
                    style={{ left: '100%', top: '50%', marginTop: '-0.5em' }}
                  >
                    {third}
                  </span>
                </div>
              </div>
            )}
          </Props>
          <Props
            name="test-props-4"
            props={{
              numbers: {
                type: 'number[]',
                default: [10, 40, 80]
              }
            }}
          >
            {({ numbers }) => (
              <div class="p-8">
                {numbers.map(number => (
                  <div
                    class="relative mb-3"
                    style={{
                      background: 'tomato',
                      height: 20,
                      width: `${number / Math.max(...numbers) * 100}%`
                    }}
                  >
                    <span
                      class="absolute leading-none ml-3"
                      style={{ left: '100%', top: '50%', marginTop: '-0.5em' }}
                    >
                      {number}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Props>
          <div class="flex flex-wrap" style={{ padding: '100px 0' }}>
            <Repeater name="blocks">
              <Variant
                name="block"
                render={() => (
                  <Props
                    name="icon"
                    props={{
                      icon: {
                        type: 'icon',
                        icons: [
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        ]
                      }
                    }}
                  >
                    {({ icon }) => {
                      return <div class="w-1/3">{icon}</div>
                    }}
                  </Props>
                )}
              />
            </Repeater>
          </div>
          <Repeater name="foobar">
            <Variant name="text" component={Text} />
            <Variant name="color" component={TextColor} />
            <Variant name="text-text" component={TextText} />
            <Variant name="list" component={List} />
          </Repeater>
          {/* <Parent name="foo">
  <Editable name="bar" />
</Parent> */}
          <ul>
            <Repeater name="list">
              <Variant
                name="item"
                render={() => (
                  <li>
                    <Editable name="text" initial="New item" />
                    <Repeater name="nah">
                      <Variant name="maybe" render={() => <div>no way</div>} />
                    </Repeater>
                  </li>
                )}
              />
            </Repeater>
          </ul>
          <Repeater name="sections">
            <Variant
              name="one"
              render={() => (
                <div>
                  <Editable name="foo" initial="placeholder" />
                </div>
              )}
            />
            <Variant name="two" render={() => <div>yo</div>} />
          </Repeater>
          <Editable name="test" initial="placeholder" />
        </Page>
      </div>
    )
  }
}

class Foo extends Component {
  render() {
    return (
      <div>
        <Link to="/">home</Link>
      </div>
    )
  }
}

class NR extends Component {
  constructor(props) {
    super(props)
    // pages[this.props.path] = this.props.name
    this.props.e.addPage({ [this.props.path]: this.props.name })

    if (props.location.pathname !== this.props.path) return

    window
      .fetch(
        `http://localhost:3002/editables?page=${encodeURIComponent(
          this.props.name
        )}`
      )
      .then(res => res.json())
      .then(data => {
        this.props.e.addEditables({
          [this.props.name]: data
        })
        this.props.e.addEditables2(this.props.name, data)
      })

    window
      .fetch(
        `http://localhost:3002/variants?page=${encodeURIComponent(
          this.props.name
        )}`
      )
      .then(res => res.json())
      .then(data => {
        this.props.e.addVariants({
          [this.props.name]: data
        })
      })

    window
      .fetch(
        `http://localhost:3002/props?page=${encodeURIComponent(
          this.props.name
        )}`
      )
      .then(res => res.json())
      .then(data => {
        this.props.e.addProps(this.props.name, data)
      })
  }

  render() {
    let { component: Component, ...rest } = this.props
    return <Route {...rest} render={props => <Component {...props} />} />
  }
}
let NamedRoute = withRouter(NR)

class Wrapper extends Component {
  constructor(props) {
    super(props)

    this.unblock = this.props.history.block(nextLocation => {
      if (
        !this.props.e.state.editables[
          this.props.e.state.pages[nextLocation.pathname]
        ]
      ) {
        let p = [
          window
            .fetch(
              `http://localhost:3002/editables?page=${encodeURIComponent(
                this.props.e.state.pages[nextLocation.pathname]
              )}`
            )
            .then(res => res.json())
            .then(data => {
              this.props.e.addEditables({
                [this.props.e.state.pages[nextLocation.pathname]]: data
              })
            }),
          window
            .fetch(
              `http://localhost:3002/variants?page=${encodeURIComponent(
                this.props.e.state.pages[nextLocation.pathname]
              )}`
            )
            .then(res => res.json())
            .then(data => {
              this.props.e.addVariants({
                [this.props.e.state.pages[nextLocation.pathname]]: data
              })
            }),
          window
            .fetch(
              `http://localhost:3002/props?page=${encodeURIComponent(
                this.props.e.state.pages[nextLocation.pathname]
              )}`
            )
            .then(res => res.json())
            .then(data => {
              this.props.e.addProps({
                [this.props.e.state.pages[nextLocation.pathname]]: data
              })
            })
        ]

        Promise.all(p).then(() => {
          window.setTimeout(() => {
            this.props.history.push(nextLocation.pathname)
          }, 0)
        })
        return false
      }
      return true
    })
  }
  componentWillUnmount() {
    this.unblock()
  }
  render() {
    return this.props.children
  }
}
let W = withRouter(Wrapper)

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Subscribe to={[EditableContainer]}>
            {e => (
              <div>
                {/* <pre style={{ height: '300px', overflow: 'auto' }}>
                  {JSON.stringify(e.state, null, 2)}
                </pre>
                <button onClick={() => e.addEditables({ foo: 'bar' })}>
                  click
                </button> */}
                <W e={e}>
                  <NamedRoute
                    exact
                    path="/"
                    component={Home}
                    name="home"
                    e={e}
                  />
                  <NamedRoute
                    exact
                    path="/foo"
                    component={Foo}
                    name="foo"
                    e={e}
                  />
                </W>
                <Route exact path="/admin" component={Admin} />
              </div>
            )}
          </Subscribe>
        </Router>
      </Provider>
    )
  }
}

export default App

/*
<Page name="home">
  <Repeater name="sections">
    <Editable name="foo" />
  </Repeater>
</Page>
*/
