import React, {Component, PropTypes} from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.base.css';
import 'quill/dist/quill.snow.css';

export default class InfoView extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: "# Markdown"
    }

  }

  handleChange(prop, event) {
    var state = this.state;
    state[prop] = event.target.value;
    this.setState(state);
  }

  updateValue(value) {
    console.log(this, value)
    // this.setState({value})
  }

  render() {
    const toolbars = [
      { label:'Formats', type:'group', items: [
        { label:'Size', type:'size', items: [
          { label:'Small',  value:'10px' },
          { label:'Normal', value:'13px', selected:true },
          { label:'Large',  value:'18px' },
          { label:'Huge',   value:'32px' }
        ]}
      ]},

      { label:'Text', type:'group', items: [
        { type:'bold', label:'Bold' },
        { type:'italic', label:'Italic' },
        { type:'strike', label:'Strike' },
        { type:'underline', label:'Underline' },
        { type:'separator' },
        { type:'link', label:'Link' }
      ]},

      { label:'Blocks', type:'group', items: [
        { type:'bullet', label:'Bullet' },
        { type:'separator' },
        { type:'list', label:'List' }
      ]},

      { label:'Blocks', type:'group', items: [
        { type:'image', label:'Image' }
      ]}
    ];

    return (
      <ReactQuill theme="snow"
        value={this.state.value}
        onChange={this.updateValue}
        toolbar={toolbars}
      />
    )
  }

}
