import React, {Component} from 'react';

class SubmissionForm extends Component {
    render() {
        return(
            <div id='submissionForm'>
                <textarea id='codeInput'> </textarea>
                <button id='codeInputButton'>Submit Answer</button>
            </div>
        )
    }
}

export default SubmissionForm;