import React from "react";
import ReactDOM from 'react-dom';
import Actions from '../../utils/actions.jsx'
import Constants from '../../utils/constants.jsx'
import Dispatcher from '../../utils/dispatcher.jsx';
import axios from 'axios';
import '../../../styles/components/dickpreview/dickpreview.scss'

class DickPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            img: null,
            visible: false
        }

        Dispatcher.register(this._registerToActions.bind(this));
    }

    componentDidMount() {
        this.loadTimeouted();
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case Constants.SAVE_DATA:
                this.loadTimeouted();
                break;
        }
    }

    loadTimeouted() {
        let self = this;
        setTimeout(function () {
            self.load();
        }, this.props.timeout);
    }

    load() {
        axios({
            method: 'post',
            url: '/' + this.props.action,
            headers: { "X-CSRFToken": csrf_token },
            data: {}
        }).then(res => {
            this.setState({
                img: res.data,
                visible: true
            });
        }).catch(error => {
            this.setState({
                visible: false
            });
        });
    }

    render() {
        if (this.state.visible) {
            return <img className={this.props.css} id={this.props.key} src={this.state.img} />
        } else {
            return <span />
        }

    }
}

export default DickPreview;