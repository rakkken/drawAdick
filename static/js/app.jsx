import React from "react";
import {
  BrowserView,
  MobileView,
  isMobile
} from "react-device-detect";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx";
import Actions from './utils/actions.jsx';
import '../styles/app.scss'
import DickSelect from "./components/dickSelect/dickselect.jsx";
import StyleSelect from "./components/dickSelect/styleselect.jsx";
import DickPreview from "./components/dickpreview/dickpreview.jsx";
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      marginBeetwenButtons: '5px',
      marginBeetwenButtonsMobile: '15px'
    }


    this.colStyle = {
      width: 'auto'
    };
  }

  count() {
    axios({
        method: 'get',
        url: '/count',
        headers: { "X-CSRFToken": csrf_token },
        data: {}
    }).then(res => {
        this.setState({
            counter: res.data
        });
    }).catch(error => {
        this.setState({
          counter: 'unknown'
        });
    });
}

  componentDidMount() {
    window.addEventListener('resize', function (e) {
      Actions.resize();
    });

    window.addEventListener('beforeunload', function (e) {
      Actions.save();
    });

    var canvas = document.getElementById('drawADick');
    document.body.addEventListener('touchstart', function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener('touchend', function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, { passive: false });
    document.body.addEventListener('touchmove', function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, { passive: false });

    this.count();
  }

  renderLeftColumn() {
    if (!isMobile) {
      return (
        <div className="col" style={this.colStyle}>
          <div>
            <DickPreview css={'preview'} action={'read/0'} timeout={1200} />
          </div>
          <div>
            <DickPreview css={'preview1'} action={'read/1'} timeout={1400} />
          </div>
          <div>
            <DickPreview css={'preview2'} action={'read/2'} timeout={1600} />
          </div>
        </div>
      )
    }
  }

  renderRightColumn() {
    if (!isMobile) {
      return (
        <div className="col" style={this.colStyle}>
          <div>
            <DickPreview css={'preview3'} action={'read/3'} timeout={1800} />
          </div>
          <div>
            <DickPreview css={'preview4'} action={'read/4'} timeout={2000} />
          </div>
          <div>
            <DickPreview css={'preview5'} action={'read/5'} timeout={2200} />
          </div>
        </div>
      )
    }
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className='app'>
        <div>
          <div className="row">
            <div className="col">
              <div className='topBar'>
                <img src="static/graphics/dad.png" alt="logo draw a dick aka narysuj kutasa" className="logo" />
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderLeftColumn()}
            <div className="col" style={this.colStyle}>
              <div className="counter">{this.state.counter}</div>
              <div>
                <DickCanvas i18n={i18n}/>
              </div>
              <BrowserView>
                <div className='bottomBar'>
                  <DickButton css='save' text={i18n.t('Save')} action='save' />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <DickSelect css='drawSize' action='drawSize' options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <StyleSelect css='setColor' action='setColor' options={[{ class: 'blue', value: 'Blue' }, { class: 'black', value: 'Black' }, { class: 'brown', value: 'Brown' }, { class: 'yellow', value: 'Yellow' }, { class: 'pink', value: 'Pink' }, { class: 'grey', value: 'Grey' }, { class: 'white', value: 'White' }]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <DickButton css='clear' text={i18n.t('Clear')} action='clear' />
                </div>
              </BrowserView>
              <MobileView>
                <div className='bottomBar'>
                  <DickButton css='saveMobile' text={i18n.t('Save')} action='save' />
                  <span style={{ marginLeft: this.state.marginBeetwenButtonsMobile }}></span>
                  <DickSelect css='drawSizeMobile' action='drawSize' options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtonsMobile }}></span>
                  <StyleSelect css='setColorMobile' action='setColor' options={[{ class: 'blue', value: 'Blue' }, { class: 'black', value: 'Black' }, { class: 'brown', value: 'Brown' }, { class: 'yellow', value: 'Yellow' }, { class: 'pink', value: 'Pink' }, { class: 'grey', value: 'Grey' }, { class: 'white', value: 'White' }]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtonsMobile }}></span>
                  <DickButton css='clearMobile' text={i18n.t('Clear')} action='clear' />
                </div>
              </MobileView>
            </div>
            {this.renderRightColumn()}
          </div>
          <div className="row">
            <div className='explBar'>
              <em className='explanation'><sup>{i18n.t('exp1')}</sup></em>
            </div>
          </div>
          <div className="row">
            <div className='explBar2'>
              <em className='explanation'><sup>{i18n.t('exp2')}</sup></em>
            </div>
          </div>
          <div className="row">
            <div className='explBar2'>
              <em className='explanation'><sup>{i18n.t('exp3')}</sup></em>
            </div>
          </div>
          <MobileView>
            <div className="row">
              <div className='mobilePreview'>
                <div className='col'>
                  <DickPreview css={'mobilePreviewSize'} action={'read/0'} timeout={1200} />
                </div>
                <div>
                  <DickPreview css={'mobilePreviewSize'} action={'read/1'} timeout={1400} />
                </div>
                <div>
                  <DickPreview css={'mobilePreviewSize'} action={'read/2'} timeout={1600} />
                </div>
              </div>
            </div>
          </MobileView>
          <div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_LEFT} />
          </div>
        </div>
      </div>
    );
  }
}

export default (App);