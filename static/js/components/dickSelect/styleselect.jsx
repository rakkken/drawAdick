import React from "react";
import ReactDOM from 'react-dom';
import Actions from '../../utils/actions.jsx'
import Constants from '../../utils/constants.jsx'
import Dispatcher from '../../utils/dispatcher.jsx';
import '../../../styles/components/dickselect/dickselect.scss'

class StyleSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.options[0].class
        }

        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case Constants.CLEAR_CANVAS:
                this.reset();
                break;
        }
    }

    reset() {
        this.setState({
            value: this.props.options[0].class
        })
    }

    onChange(action, event) {
        var v = event.target.value;
        this.setState({
            value: this.state.value = v
        });
        Actions.execute(action, v);
    }

    drawOption(obj) {
        return <option className={obj.class} key={obj.class} value={obj.class}></option>
    }

    drawOptions() {
        let options = [];
        for (var i = 0; i < this.props.options.length; i++) {
            options.push(this.drawOption(this.props.options[i]));
        }
        return options;
    }

    render() {
        return <select style={{background: this.state.value}} value={this.state.value.value} className={this.props.css} onChange={this.onChange.bind(this, this.props.action)}>
            {this.drawOptions()}
        </select>
    }
}

export default StyleSelect;