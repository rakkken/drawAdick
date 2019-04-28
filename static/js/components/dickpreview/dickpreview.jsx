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
            img: null
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
        }, 2000);
    }

    load() {
        axios({
            method: 'get',
            url: '/' + this.props.action
        }).then(res => {
            this.setState({
                img: res.data
            });
        }).catch(error => {
        });
    }

    render() {
        return <img className={this.props.css} id={this.props.key} src={this.state.img} />
    }
}

export default DickPreview;