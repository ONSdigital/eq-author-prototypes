import React, {Component} from 'react'
import RichTextEditor from 'react-rte'
import './RichTextArea.css'

export default class RichTextArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue()
        }
    }

    onChange = (value) => {
        this.setState({value})
    }

    render() {

        const toolbarConfig = {
            display: [
                'INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'
            ],
            INLINE_STYLE_BUTTONS: [
                {
                    label: 'Bold',
                    style: 'BOLD',
                    className: 'custom-css-class'
                }, {
                    label: 'Italic',
                    style: 'ITALIC'
                }
            ],
            BLOCK_TYPE_BUTTONS: [
                {
                    label: 'UL',
                    style: 'unordered-list-item'
                }, {
                    label: 'OL',
                    style: 'ordered-list-item'
                }
            ]
        }

        return (<RichTextEditor className="rte" value={this.state.value} toolbarConfig={toolbarConfig} onChange={this.onChange}/>)
    }
}
