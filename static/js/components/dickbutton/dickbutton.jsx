import React from "react";
import Actions from '../../utils/actions.jsx'
import '../../../styles/components/dickbutton/dickbutton.scss'

class DickButton extends React.Component {
    constructor(props) {
        super(props)
    }

    onClick(action, _) {
        Actions.execute(action);
    }

    render() {
       return <button className={this.props.css} type='button' onClick={this.onClick.bind(this, this.props.action)}>
                {this.props.text}
              </button>
    }
}

export default DickButton;