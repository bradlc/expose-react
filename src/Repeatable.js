import React, { Component } from 'react'

class Repeatable extends Component {
  state = {
    data: null
  }
  componentDidMount() {
    window
      .fetch('http://laravel-react.test/api/editable/%2F/sections')
      .then(res => res.json())
      .then(({ data }) => {
        this.setState({ data })
      })
  }
  render() {
    return this.state.data ? JSON.stringify(this.state.data) : 'loading...'
  }
}

export default Repeatable
