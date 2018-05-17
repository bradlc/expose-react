import React, { Component } from 'react'
import { EditableContext } from './EditableContext'
import { Subscribe } from 'unstated'
import EditableContainer from './EditableContainer'
import { withRouter } from 'react-router'
import dlv from 'dlv'

class Editable extends Component {
  state = {
    value: ''
  }
  componentDidMount() {
    // window
    //   .fetch(
    //     `http://laravel-react.test/api/editable/${encodeURIComponent(
    //       this.props.value.page
    //     )}/${encodeURIComponent(this.props.value.key)}`
    //   )
    //   .then(res => res.json())
    //   .then(({ data }) => {
    //     this.setState({
    //       value: data.filter(datum => datum.name === this.props.name)[0].value
    //     })
    //   })
  }
  render() {
    console.log(this.props.value)

    let value = dlv(
      this.props.e.state.editables2,
      `${this.props.e.state.pages[this.props.location.pathname]}.${
        this.props.value.key ? this.props.value.key + '.' : ''
      }${this.props.name}.value`,
      this.props.initial || 'Lorem ipsum'
    )

    if (this.props.render) {
      return this.props.render(value)
    }

    return (
      <div
        contentEditable
        suppressContentEditableWarning
        style={{ outline: 0 }}
        onBlur={event => {
          let id = dlv(
            this.props.e.state.editables2,
            `${this.props.e.state.pages[this.props.location.pathname]}.${
              this.props.value.key ? this.props.value.key + '.' : ''
            }${this.props.name}.id`
          )
          window.fetch(`http://localhost:3002/editables/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ value: event.target.textContent })
          })
        }}
        // onClick={() => {
        //   this.props.e.setEditable(
        //     `${this.props.e.state.pages[this.props.location.pathname]}.${
        //       this.props.value.key ? this.props.value.key + '.' : ''
        //     }${this.props.name}`,
        //     'foobar'
        //   )
        // }}
      >
        {value}
      </div>
    )

    try {
      return this.props.e.state.editables[
        this.props.e.state.pages[this.props.location.pathname]
      ].filter(
        x => x.key === this.props.value.key && x.name === this.props.name
      )[0].value
    } catch (e) {
      return this.props.initial || 'Lorem ipsum'
    }
  }
}

export default withRouter(props => (
  <Subscribe to={[EditableContainer]}>
    {e => (
      <EditableContext.Consumer>
        {value => <Editable {...props} value={value} e={e} />}
      </EditableContext.Consumer>
    )}
  </Subscribe>
))
