import React, { Component } from 'react'

import ResponseFields from './ResponseFields.js'

export default class ResponseList extends Component {
  render () {
    return (
      <div className="response-list">
        { this.props.responses.map(response => {
            return (<ResponseFields
              response={response}
              key={this.props.responses.indexOf(response)}
              responseIndex={this.props.responses.indexOf(response)}
              onChangeResponse={this.props.onChangeResponse} />)
        })}
      </div>
    )
  }
}