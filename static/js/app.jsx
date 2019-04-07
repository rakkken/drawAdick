import React from "react";
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx";
import Actions from './utils/actions.jsx';
import '../styles/app.scss'
import DickSelect from "./components/dickSelect/dickselect.jsx";

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('resize', function (e) {
      Actions.resize();
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

  render() {
    return (
      <div className='app'>
        <div>
          <div className="row">
            <div className="col">
              <div className='topBar'>
              <img src="static/graphics/g1678.png" alt="logo" className="logo"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>
                <DickCanvas />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className='bottomBar'>
                <DickButton css='save' text='SAVE' action='save' />
                <DickSelect css='drawSize' action='drawSize' options={[1,2,3,4,5,6,7,8,9,10,11,12]}/>
                <DickButton css='clear' text='CLEAR' action='clear' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;