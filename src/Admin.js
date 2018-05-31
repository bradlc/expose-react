import React, { Component } from 'react'
import './App.css'
import { Provider, Subscribe, Container } from 'unstated'

class SidebarContainer extends Container {
  state = {
    key: '',
    props: {},
    callback: () => {}
  }

  setProps(key, props, callback) {
    console.log(props)
    if (callback) {
      this.setState({ key, props, callback })
    } else {
      this.setState({ key, props })
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
      <div className="w-300 flex-none bg-grey-lighter flex flex-col relative">
        <div className="logo-container mt-6 absolute pin-t pin-l w-full pointer-events-none">
          <div className="mx-auto mb-6" style={{ width: 110 }}>
            <div className="relative aspect-ratio-logo">
              <svg
                viewBox="0 0 867.23 208.84"
                className="absolute pin w-full h-full"
              >
                <g fill="#333">
                  <path d="M316.6 138.32c-5.33 18.11-22 33.24-47.73 33.24-28.76 0-54.12-20.67-54.12-56 0-33.45 24.72-55.18 51.56-55.18 32.39 0 51.78 20.67 51.78 54.33 0 4-.43 8.31-.43 8.74h-75c.64 13.85 12.36 23.86 26.42 23.86 13.21 0 20.46-6.6 23.87-16zM290.18 104c-.43-10.44-7.25-20.67-23.44-20.67-14.7 0-22.8 11.08-23.44 20.67zM355.5 115.74l-37.29-52.2h33.66c3.63 5.75 17.26 25.35 20.88 31.11l20.67-31.11h32.17L389 114.89l37.92 53.47h-33.29l-21.94-32.17c-3.84 5.75-17.9 26.42-21.52 32.17h-32zM437 208.84V63.54h27.48v12.78c4.69-8.09 16.41-15.13 32.17-15.13 30.68 0 48.37 23.44 48.37 54.55 0 31.74-19.82 55.18-49.43 55.18-14.49 0-25.14-5.75-30.26-12.78v50.7zm54.06-122.29c-14.48 0-26.2 10.87-26.2 29.4s11.72 29.62 26.2 29.62 26-10.87 26-29.62c0-18.53-11.51-29.4-26-29.4zM663.85 116c0 32.17-23.65 55.61-55 55.61s-55-23.44-55-55.61c0-32.38 23.65-55.61 55-55.61s55 23.18 55 55.61zm-28.33 0c0-19.81-12.79-29.83-26.64-29.83s-26.63 10-26.63 29.83c0 19.6 12.78 29.83 26.63 29.83s26.64-10.06 26.64-29.83zM695.36 133.85c.64 8.31 6.82 16 19.18 16 9.37 0 13.85-4.9 13.85-10.44 0-4.69-3.2-8.52-11.3-10.23L703.24 126c-20.24-4.47-29.4-16.61-29.4-31.31 0-18.75 16.62-34.31 39.21-34.31 29.82 0 39.84 19 41.12 30.26l-23.65 5.32c-.86-6.18-5.33-14.06-17.26-14.06-7.46 0-13.42 4.48-13.42 10.44 0 5.12 3.83 8.31 9.58 9.38l14.92 3.19c20.66 4.26 31.1 16.83 31.1 32.17 0 17.05-13.21 34.52-40.69 34.52-31.53 0-42.4-20.45-43.68-32.39zM865.74 138.32c-5.32 18.11-21.94 33.24-47.72 33.24-28.77 0-54.12-20.67-54.12-56 0-33.45 24.72-55.18 51.56-55.18 32.39 0 51.77 20.67 51.77 54.33 0 4-.42 8.31-.42 8.74h-75c.64 13.85 12.36 23.86 26.42 23.86 13.21 0 20.45-6.6 23.86-16zM839.32 104c-.42-10.44-7.24-20.67-23.43-20.67-14.7 0-22.8 11.08-23.44 20.67z" />
                </g>
                <circle
                  cx="110.69"
                  cy="72.59"
                  r="72.59"
                  transform="rotate(-6.9 110.659 72.596)"
                  fill="#cebeec"
                />
                <ellipse
                  cx="67.14"
                  cy="119.61"
                  rx="67.17"
                  ry="67.11"
                  transform="rotate(-45.03 67.144 119.61)"
                  fill="#8360d6"
                />
                <circle cx="134.28" cy="152.43" r="32.82" fill="#3c374e" />
              </svg>
            </div>
          </div>
        </div>
        <div className="overflow-auto" style={{ paddingTop: 160 }}>
          {Object.keys(this.props.sidebar.state.props).length > 0 && (
            <div className="border-t border-grey mx-4 py-4">
              <h2 className="flex items-center text-base leading-none mb-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  className="fill-current mr-3"
                >
                  <path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                </svg>
                Settings
              </h2>
              {Object.keys(this.props.sidebar.state.props).map(prop => {
                let id = makeid()
                switch (this.props.sidebar.state.props[prop].type) {
                  case 'color':
                    return (
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <h2
                          className="font-normal mb-2"
                          style={{ fontSize: 16 }}
                        >
                          {camelToSentence(prop)}
                        </h2>
                        {this.props.sidebar.state.props[prop].colors.map(
                          color => (
                            <button
                              key={this.props.sidebar.state.key + prop + color}
                              type="button"
                              className="appearance-none p-0 border border-purple-dark w-32 h-32 rounded mr-3"
                              style={{
                                background: color
                              }}
                              onClick={() => {
                                this.props.sidebar.state.callback(prop, color)
                              }}
                            />
                          )
                        )}
                      </div>
                    )
                    break
                  case 'boolean':
                    return (
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <input
                          type="checkbox"
                          defaultChecked={
                            this.props.sidebar.state.props[prop].value
                          }
                          onChange={e => {
                            this.props.sidebar.state.callback(
                              prop,
                              e.target.checked
                            )
                          }}
                          className="sr-only"
                          id={id}
                        />
                        <label htmlFor={id} className="block relative checkbox">
                          {camelToSentence(prop)}
                        </label>
                      </div>
                    )
                    break
                  case 'icon':
                    return (
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <h2
                          className="font-normal mb-2"
                          style={{ fontSize: 16 }}
                        >
                          {camelToSentence(prop)}
                        </h2>
                        <div className="flex">
                          {this.props.sidebar.state.props[prop].options.map(
                            (icon, index) => (
                              <div
                                className="mr-3"
                                key={this.props.sidebar.state.key + prop + icon}
                              >
                                <input
                                  type="radio"
                                  className="sr-only"
                                  name={id}
                                  id={id + index}
                                  onChange={() => {
                                    this.props.sidebar.state.callback(
                                      prop,
                                      index
                                    )
                                  }}
                                  defaultChecked={
                                    this.props.sidebar.state.props[prop]
                                      .value === index
                                  }
                                />
                                <label
                                  htmlFor={id + index}
                                  className="appearance-none p-0 border border-purple-dark rounded bg-transparent checked:bg-purple-dark-10 flex items-center justify-center w-48 h-48"
                                >
                                  {icon}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )
                    break
                  case 'text':
                    return (
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <h2
                          className="font-normal mb-2"
                          style={{ fontSize: 16 }}
                        >
                          {this.props.sidebar.state.props[prop].title ||
                            camelToSentence(prop)}
                        </h2>
                        <input
                          type="text"
                          className="block w-full appearance-none bg-transparent rounded h-36 py-0 px-3 border border-purple-dark text-sm text-inherit outline-0 focus:outline-0 focus:bg-white"
                          defaultValue={
                            this.props.sidebar.state.props[prop].value
                          }
                          onInput={e => {
                            if (
                              this.props.sidebar.state.props[prop].validator
                            ) {
                              if (
                                this.props.sidebar.state.props[prop].validator(
                                  e.target.value
                                )
                              ) {
                                this.props.sidebar.state.callback(
                                  prop,
                                  e.target.value
                                )
                              }
                            } else {
                              this.props.sidebar.state.callback(
                                prop,
                                e.target.value
                              )
                            }
                          }}
                        />
                      </div>
                    )
                    break
                  case 'number':
                    return (
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <h2
                          className="font-normal mb-2"
                          style={{ fontSize: 16 }}
                        >
                          {camelToSentence(prop)}
                        </h2>
                        <input
                          type="number"
                          className="block w-full appearance-none bg-transparent rounded h-36 py-0 px-3 border border-purple-dark text-sm text-inherit outline-0 focus:outline-0 focus:bg-white"
                          defaultValue={
                            this.props.sidebar.state.props[prop].value
                          }
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
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <h2
                          className="font-normal mb-2"
                          style={{ fontSize: 16 }}
                        >
                          {camelToSentence(prop)}
                        </h2>
                        {this.props.sidebar.state.props[prop].value.map(
                          (number, i, arr) => (
                            <div className="mb-3">
                              <input
                                type="number"
                                className="block w-full appearance-none bg-transparent rounded h-36 py-0 px-3 border border-purple-dark text-sm text-inherit outline-0 focus:outline-0 focus:bg-white"
                                defaultValue={number}
                                onInput={e => {
                                  let nextValue = arr.map((a, index) => {
                                    if (i === index)
                                      return parseInt(e.target.value, 10)
                                    return a
                                  })
                                  this.props.sidebar.setProps(
                                    this.props.sidebar.state.key,
                                    {
                                      ...this.props.sidebar.state.props,
                                      [prop]: {
                                        ...this.props.sidebar.state.props[prop],
                                        value: nextValue
                                      }
                                    }
                                  )
                                  this.props.sidebar.state.callback(
                                    prop,
                                    nextValue
                                  )
                                }}
                              />
                            </div>
                          )
                        )}
                        <button
                          type="button"
                          className="flex items-center"
                          onClick={() => {
                            let nextValue = this.props.sidebar.state.props[
                              prop
                            ].value.concat([0])
                            this.props.sidebar.setProps(
                              this.props.sidebar.state.key,
                              {
                                ...this.props.sidebar.state.props,
                                [prop]: {
                                  ...this.props.sidebar.state.props[prop],
                                  value: nextValue
                                }
                              }
                            )
                            this.props.sidebar.state.callback(prop, nextValue)
                          }}
                        >
                          <div className="w-32 h-32 bg-purple text-white rounded-full mr-3 flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              className="fill-current"
                            >
                              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                          </div>
                          {this.props.sidebar.state.props[prop].add ||
                            'Add row'}
                        </button>
                      </div>
                    )
                    break
                  case 'image[]':
                    return (
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <h2
                          className="font-normal mb-2"
                          style={{ fontSize: 16 }}
                        >
                          {this.props.sidebar.state.props[prop].title ||
                            camelToSentence(prop)}
                        </h2>
                        <div className="flex flex-wrap -mt-1 -mx-1 mb-3">
                          {this.props.sidebar.state.props[prop].value.map(
                            (src, i, arr) => (
                              <div className="my-1 px-1 w-1/3">
                                <input
                                  type="file"
                                  className="sr-only"
                                  id={this.props.sidebar.state.key + prop + i}
                                  onChange={e => {
                                    let reader = new FileReader()
                                    reader.onload = () => {
                                      let nextValue = arr.map((a, index) => {
                                        if (i === index) return reader.result
                                        return a
                                      })
                                      this.props.sidebar.setProps(
                                        this.props.sidebar.state.key,
                                        {
                                          ...this.props.sidebar.state.props,
                                          [prop]: {
                                            ...this.props.sidebar.state.props[
                                              prop
                                            ],
                                            value: nextValue
                                          }
                                        }
                                      )
                                      this.props.sidebar.state.callback(
                                        prop,
                                        nextValue
                                      )
                                    }
                                    reader.readAsDataURL(e.target.files[0])
                                  }}
                                />
                                <label
                                  htmlFor={
                                    this.props.sidebar.state.key + prop + i
                                  }
                                  className="block w-full bg-purple-dark rounded overflow-hidden"
                                >
                                  <img
                                    src={src}
                                    height={50}
                                    className="block"
                                    style={{
                                      width: '100%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                </label>
                              </div>
                            )
                          )}
                          <div className="my-1 px-1 w-1/3">
                            <input
                              type="file"
                              className="sr-only"
                              id={this.props.sidebar.state.key + prop + 'new'}
                              onChange={e => {
                                let reader = new FileReader()
                                reader.onload = () => {
                                  let nextValue = this.props.sidebar.state.props[
                                    prop
                                  ].value.concat([reader.result])
                                  this.props.sidebar.setProps(
                                    this.props.sidebar.state.key,
                                    {
                                      ...this.props.sidebar.state.props,
                                      [prop]: {
                                        ...this.props.sidebar.state.props[prop],
                                        value: nextValue
                                      }
                                    }
                                  )
                                  this.props.sidebar.state.callback(
                                    prop,
                                    nextValue
                                  )
                                }
                                reader.readAsDataURL(e.target.files[0])
                              }}
                            />
                            <label
                              htmlFor={
                                this.props.sidebar.state.key + prop + 'new'
                              }
                              className="flex w-full items-center justify-center border border-dashed border-purple-dark rounded text-purple-darkest"
                              style={{ height: 50 }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                className="fill-current"
                              >
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    )
                    break
                  case 'select':
                    return (
                      <div
                        className="mb-3"
                        key={this.props.sidebar.state.key + prop}
                      >
                        <h2 style={{ fontSize: 16 }}>
                          {camelToSentence(prop)}
                        </h2>
                        <select
                          defaultValue={
                            this.props.sidebar.state.props[prop].value
                          }
                          onChange={e => {
                            this.props.sidebar.state.callback(
                              prop,
                              e.target.value
                            )
                          }}
                        >
                          {this.props.sidebar.state.props[prop].options.map(
                            option => (
                              <option value={option.value}>
                                {option.label}
                              </option>
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
            </div>
          )}
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
        <a
          href="#"
          className="block flex-none mt-auto bg-grey-light no-underline text-inherit h-96 px-4 flex items-center"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="fill-current mr-2"
          >
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>Log out
        </a>
      </div>
    )
  }
}

class Main extends React.Component {
  componentDidMount() {
    window.setProps = (key, props, callback) => {
      this.props.sidebar.setProps(key, props, callback)
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

function makeid() {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
