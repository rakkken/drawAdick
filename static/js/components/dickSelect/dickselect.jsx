import React from "react";
import ReactDOM from 'react-dom';
import Actions from '../../utils/actions.jsx'
import Constants from '../../utils/constants.jsx'
import Dispatcher from '../../utils/dispatcher.jsx';
import '../../../styles/components/dickselect/dickselect.scss'

class DickSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.options[0]
        }

        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case Constants.DRAW_SIZE_UP:
                if (this.state.value < this.props.options[this.props.options.length - 1]) {
                    this.setState({
                        value: this.state.value += 1
                    });
                }
                break;
            case Constants.DRAW_SIZE_DOWN:
                if (this.state.value > this.props.options[0]) {
                    this.setState({
                        value: this.state.value -= 1
                    });
                }
                break;
            case Constants.CLEAR_CANVAS:
                this.reset();
                break;
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('wheel', this.wheel);
    }

    onChange(action, event) {
        var v = parseInt(event.target.value);
        this.setState({
            value: this.state.value = v
        });
        Actions.execute(action, v);
    }

    wheel(event) {
        event.wheelDelta < 0 ? Actions.execute('drawSizeUp') : Actions.execute('drawSizeDown');
    }

    reset() {
        this.setState({
            value: this.state.value = this.props.options[0]
        });
    }

    drawOption(value) {
        return <option key={value} value={value}>{value}</option>
    }

    drawOptions() {
        let options = [];
        for (var i = 0; i < this.props.options.length; i++) {
            options.push(this.drawOption(this.props.options[i]));
        }
        return options;
    }

    render() {
        return <select value={this.state.value} className={this.props.css} onChange={this.onChange.bind(this, this.props.action)}>
            {this.drawOptions()}
        </select>
    }
}

export default DickSelect;