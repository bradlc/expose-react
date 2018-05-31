import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg'
import tinycolor from 'tinycolor2'
// import Repeatable from './Repeatable'
import './App.css'
import './Extra.css'
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

import Doughnut from './Doughnut'
import Sortable from 'react-sortablejs'

import Carousel from 'nuka-carousel'

let loaded = false
// let pages = {}

class Home extends Component {
  render() {
    return (
      <div className="App">
        {/* <Parent>{val => <Parent>{value => value}</Parent>}</Parent> */}
        <Page name="home">
          <Props
            name="image-test"
            props={{
              wrapAround: { type: 'boolean', default: false },
              autoplay: { type: 'boolean', default: false },
              interval: { type: 'number', default: 3000 },
              speed: { type: 'number', default: 1000 },
              imgs: { title: 'Images', type: 'image[]', default: [] }
            }}
          >
            {({ imgs, wrapAround, autoplay, speed, interval }) => {
              if (imgs.length === 0) return null
              if (imgs.length === 1) {
                return (
                  <img
                    src={imgs[0]}
                    height={500}
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                )
              }
              return (
                <Carousel
                  wrapAround={wrapAround}
                  autoplay={autoplay}
                  speed={speed}
                  autoplayInterval={interval}
                  initialSlideHeight={500}
                >
                  {imgs.map(img => (
                    <img
                      src={img}
                      height={500}
                      style={{ objectFit: 'cover' }}
                    />
                  ))}
                </Carousel>
              )
            }}
          </Props>
          <Props
            name="test-props"
            props={{
              backgroundColor: {
                type: 'color',
                colors: ['#fff', '#f4f4f4', '#302741'],
                default: '#fff'
              },
              showHeading: {
                type: 'boolean',
                default: true
              }
            }}
          >
            {({ backgroundColor, showHeading }) => (
              <div
                className="flex flex-col items-center"
                style={{
                  padding: '100px 0',
                  backgroundColor,
                  color: tinycolor(backgroundColor).isDark() ? 'white' : 'black'
                }}
              >
                {showHeading && (
                  <h2 className="mb-4">
                    <Editable name="fooheading" initial="Hello, world" />
                  </h2>
                )}
                <Props
                  name="video-props"
                  props={{
                    id: {
                      type: 'text',
                      title: 'YouTube ID',
                      default: 'w_MSFkZHNi4',
                      validator(val) {
                        return /^[a-zA-Z0-9_-]{11}$/.test(val)
                      }
                    }
                  }}
                >
                  {({ id }) => (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${id}`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  )}
                </Props>
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
              <div style={{ padding: '100px 0' }}>
                <div className="mx-auto flex" style={{ maxWidth: 1280 }}>
                  {Array.from({ length: parseInt(layout, 10) }).map((x, i) => (
                    <div className="flex-auto" key={i}>
                      hello
                    </div>
                  ))}
                </div>
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
              <div className="p-8" style={{ height: 200 }}>
                <div
                  className="relative"
                  style={{
                    background: 'tomato',
                    height: 20,
                    width: `${first / Math.max(first, second, third) * 90}%`
                  }}
                >
                  <span
                    className="absolute leading-none ml-3"
                    style={{ left: '100%', top: '50%', marginTop: '-0.5em' }}
                  >
                    {first}
                  </span>
                </div>
                <div
                  className="relative mt-3"
                  style={{
                    background: 'tomato',
                    height: 20,
                    width: `${second / Math.max(first, second, third) * 90}%`
                  }}
                >
                  <span
                    className="absolute leading-none ml-3"
                    style={{ left: '100%', top: '50%', marginTop: '-0.5em' }}
                  >
                    {second}
                  </span>
                </div>
                <div
                  className="relative mt-3"
                  style={{
                    background: 'tomato',
                    height: 20,
                    width: `${third / Math.max(first, second, third) * 90}%`
                  }}
                >
                  <span
                    className="absolute leading-none ml-3"
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
                default: [10, 40, 80],
                add: 'Add number'
              }
            }}
          >
            {({ numbers }) => (
              <div className="p-8">
                {numbers.map((number, i) => (
                  <div
                    key={i}
                    className="relative mb-3"
                    style={{
                      background: 'tomato',
                      height: 20,
                      width: `${number / Math.max(...numbers) * 90}%`
                    }}
                  >
                    <span
                      className="absolute leading-none ml-3"
                      style={{ left: '100%', top: '50%', marginTop: '-0.5em' }}
                    >
                      {number}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Props>

          <Sortable
            className="flex flex-wrap mx-auto -mx-8"
            style={{ maxWidth: 1280, padding: '100px 0' }}
          >
            <Repeater
              name="blocks"
              placeholder={button => (
                <div class="w-1/3 px-8 mt-8">{button}</div>
              )}
            >
              <Variant
                name="block"
                render={() => (
                  <Props
                    name="icon"
                    props={{
                      icon: {
                        type: 'icon',
                        options: [
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>,
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ],
                        default: 0
                      }
                    }}
                  >
                    {({ icon }) => {
                      return (
                        <div className="w-1/3 px-8 mt-8">
                          {icon}
                          <p class="leading-normal">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                      )
                    }}
                  </Props>
                )}
              />
            </Repeater>
          </Sortable>
          <div
            className="flex items-center justify-center"
            style={{ background: '#302741', padding: '100px 0' }}
          >
            <Props
              name="donut"
              props={{
                values: {
                  type: 'number[]',
                  add: 'Add value',
                  default: [20, 50, 40]
                }
              }}
            >
              {({ values }) => (
                <div style={{ width: 300 }}>
                  <Doughnut values={values} />
                </div>
              )}
            </Props>
          </div>
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
