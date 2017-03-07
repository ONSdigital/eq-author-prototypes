import React, { Component } from 'react'

import Field from 'components/forms/Field'
import Input from 'components/forms/Input'
import Label from 'components/forms/Label'
import Checkbox from 'components/forms/Checkbox'
import RichTextArea from 'components/forms/RichTextArea'
import OptionsInputList from 'components/OptionsInputList'

export default class AnswerFields extends Component {

  handleChangeQuestion = e => {
    const { name, value } = e.target
    this.props.onChangeQuestion({[name]: value})
    e.stopPropagation()
  }

  handleChange = e => {
    const { name, value, type, checked} = e.target
    switch (type) {
      case 'checkbox':
        this.props.onChangeAnswer(this.props.answerIndex, {[name]: checked})
        break
      default:
        this.props.onChangeAnswer(this.props.answerIndex, {[name]: value})
    }
    if (e.stopPropagation) {
      e.stopPropagation()
    }
  }

  handleRemoveOption = e => {
    const optionIndex = e.target.name
    this.props.onRemoveOption(this.props.answerIndex, optionIndex)
    e.stopPropagation()
  }

  handleAddOption = e => {
    const {label, value, description} = e
    this.props.onAddOption(this.props.answerIndex, {
      label: label,
      value: value,
      description: description
    })
  }

  render () {
    const {id, mandatory, guidance, options, description, ...otherProps} = this.props.answer
    const validationMessage = otherProps.validation.messages.MANDATORY

    const validationName = `answers.${this.props.answerIndex}.validation.messages.MANDATORY`

    return (
      <div onChange={this.handleChange}>
          <Field id="answer-id">
              <Label>Answer Id</Label>
              <Input value={id} name="id" />
          </Field>

          <Field id="mandatory">
              <Checkbox checked={mandatory}
                name="mandatory" onChange={this.handleChange} />
              <Label>Mandatory</Label>
          </Field>
          <Field id="guidance">
              <Label>Answer Guidance</Label>
              <RichTextArea value={guidance} name="guidance" onChange={this.handleChange} />
          </Field>
          <Field id="options">
              <Label>Answer Options</Label>
              <OptionsInputList options={options}
                onAddOption={this.handleAddOption}
                onRemoveOption={this.handleRemoveOption}
                emptyText="There are currently no options, add one below!" />
          </Field>
          <Field id="description">
              <Label>Answer Description</Label>
              <Input value={description} name="description"/>
          </Field>
          <Field id="validation-message">
              <Label>Validation Message</Label>
              <Input onChange={this.handleChangeQuestion} value={validationMessage}
                name={validationName} />
          </Field>
      </div>
    )
  }
}
