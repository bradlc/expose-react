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

let loaded = false
// let pages = {}

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/foo">FOO</Link>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Parent>{val => <Parent>{value => value}</Parent>}</Parent> */}
        <Page name="home">
          <Props
            name="test-props"
            props={{
              color: {
                type: 'color',
                colors: ['#f00', '#0f0', '#00f'],
                default: '#f00'
              }
            }}
          >
            {({ color }) => (
              <div style={{ height: 100, backgroundColor: color }} />
            )}
          </Props>
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
        `http://localhost:3000/editables?page=${encodeURIComponent(
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
        `http://localhost:3000/variants?page=${encodeURIComponent(
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
        `http://localhost:3000/props?page=${encodeURIComponent(
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
              `http://localhost:3000/editables?page=${encodeURIComponent(
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
              `http://localhost:3000/variants?page=${encodeURIComponent(
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
              `http://localhost:3000/props?page=${encodeURIComponent(
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
                <pre style={{ height: '300px', overflow: 'auto' }}>
                  {JSON.stringify(e.state, null, 2)}
                </pre>
                <button onClick={() => e.addEditables({ foo: 'bar' })}>
                  click
                </button>
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
