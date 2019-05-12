import React from "react";
import {
  BrowserView,
  MobileView,
  isMobile
} from "react-device-detect";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx";
import Actions from './utils/actions.jsx';
import '../styles/app.scss'
import DickSelect from "./components/dickSelect/dickselect.jsx";
import StyleSelect from "./components/dickSelect/styleselect.jsx";
import DickPreview from "./components/dickpreview/dickpreview.jsx";

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
    return (
      <div className='app'>
        <div>
          <div className="row">
            <div className="col">
              <div className='topBar'>
                <img src="static/graphics/dad.png" alt="logo" className="logo" />
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderLeftColumn()}
            <div className="col" style={this.colStyle}>
              <div>
                <DickCanvas />
              </div>
              <BrowserView>
                <div className='bottomBar'>
                  <DickButton css='save' text='dickIT' action='save' />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <DickSelect css='drawSize' action='drawSize' options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <StyleSelect css='setColor' action='setColor' options={[{ class: 'blue', value: 'Blue' }, { class: 'black', value: 'Black' }, { class: 'brown', value: 'Brown' }, { class: 'yellow', value: 'Yellow' }, { class: 'pink', value: 'Pink' }, { class: 'grey', value: 'Grey' }, { class: 'white', value: 'White' }]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <DickButton css='clear' text='cleanIT' action='clear' />
                </div>
              </BrowserView>
              <MobileView>
                <div className='bottomBar'>
                  <DickButton css='saveMobile' text='dickIT' action='save' />
                  <span style={{ marginLeft: this.state.marginBeetwenButtonsMobile }}></span>
                  <DickSelect css='drawSizeMobile' action='drawSize' options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtonsMobile }}></span>
                  <StyleSelect css='setColorMobile' action='setColor' options={[{ class: 'black', value: 'Black' }, { class: 'brown', value: 'Brown' }, { class: 'yellow', value: 'Yellow' }, { class: 'pink', value: 'Pink' }, { class: 'grey', value: 'Grey' }, { class: 'white', value: 'White' }]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtonsMobile }}></span>
                  <DickButton css='clearMobile' text='cleanIT' action='clear' />
                </div>
              </MobileView>
            </div>
            {this.renderRightColumn()}
          </div>
          <div className="row">
            <div className='explBar'>
              <em className='explanation'><sup>Hello there, you probably wondering why someone done such stupid page. Simple answer is: FOR FUN</sup></em>
            </div>
          </div>
          <div className="row">
            <div className='explBar2'>
              <em className='explanation'><sup>Little bit long answer is: to easier gather dicks drowings used for neural network learning, still just for FUN. So lets draw some dicks ;)</sup></em>
            </div>
          </div>
          <div>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_LEFT}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;