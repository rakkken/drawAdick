import React from "react";
import {
  BrowserView,
  MobileView,
  isMobile
} from "react-device-detect";
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
      marginBeetwenButtonsMobile: '30px'
    }
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
    }, false);
    document.body.addEventListener('touchend', function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener('touchmove', function (e) {
      if (e.target === canvas) {
        e.preventDefault();
      }
    }, false);
  }

  renderLeftColumn() {
    let col1Style = {
      width: '20%'
    }
    if (!isMobile) {
      return (
        <div className="col" style={col1Style}>
          <div>
            <DickPreview css={'preview'} action={'read/0'} timeout={1000} />
          </div>
          <div>
            <DickPreview css={'preview1'} action={'read/1'} timeout={2000} />
          </div>
          <div>
            <DickPreview css={'preview2'} action={'read/2'} timeout={3000} />
          </div>
        </div>
      )
    }
  }

  renderRightColumn() {
    let col1Style = {
      width: '20%'
    }
    if (!isMobile) {
      return (
        <div className="col" style={col1Style}>
          <div>
            <DickPreview css={'preview3'} action={'read/3'} timeout={4000} />
          </div>
          <div>
            <DickPreview css={'preview4'} action={'read/4'} timeout={5000} />
          </div>
          <div>
            <DickPreview css={'preview5'} action={'read/5'} timeout={6000} />
          </div>
        </div>
      )
    }
  }

  render() {
    let col2Style = {
      width: '60%'
    }
    return (
      <div className='app'>
        <div>
          <div className="row">
            <div className="col">
              <div className='topBar'>
                <img src="static/graphics/g1678.png" alt="logo" className="logo" />
              </div>
            </div>
          </div>
          <div className="row">
            {this.renderLeftColumn()}
            <div className="col" style={col2Style}>
              <div>
                <DickCanvas />
              </div>
              <BrowserView>
                <div className='bottomBar'>
                  <DickButton css='save' text='dickIT' action='save' />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <DickSelect css='drawSize' action='drawSize' options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtons }}></span>
                  <StyleSelect css='setColor' action='setColor' options={[{ class: 'black', value: 'Black' }, { class: 'brown', value: 'Brown' }, { class: 'yellow', value: 'Yellow' }, { class: 'pink', value: 'Pink' }, { class: 'grey', value: 'Grey' }]} />
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
                  <StyleSelect css='setColorMobile' action='setColor' options={[{ class: 'black', value: 'Black' }, { class: 'brown', value: 'Brown' }, { class: 'yellow', value: 'Yellow' }, { class: 'pink', value: 'Pink' }, { class: 'grey', value: 'Grey' }]} />
                  <span style={{ marginLeft: this.state.marginBeetwenButtonsMobile }}></span>
                  <DickButton css='clearMobile' text='cleanIT' action='clear' />
                </div>
              </MobileView>
            </div>
            {this.renderRightColumn()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;