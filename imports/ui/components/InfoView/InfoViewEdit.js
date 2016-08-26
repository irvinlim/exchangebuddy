import React, {Component, PropTypes} from 'react';
import ReactMarkdownMediumEditor from 'meteor/universe:react-markdown-wysiwyg/ReactMarkdownMediumEditor';

export default class InfoViewEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "# Markdown finally"
    }
  }

  render() {

    const options = {
      toolbar: {
        /* These are the default options for the toolbar,
        if nothing is passed this is what is used */
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'image', 'h1', 'h2', 'h3', 'h4', 'orderedlist', 'unorderedlist', 'indent', 'outdent', 'quote', 'pre'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        standardizeSelectionStart: false,
        static: false,
        relativeContainer: null,
        buttonLabels: true
      },
    };

    return (
      <div id="mdEditor">
        <ReactMarkdownMediumEditor markdown={ this.state.value } options={options} onChange={console.log.bind(this)} />
      </div>
    )

  }

}
