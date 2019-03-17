import React from "react";
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx";
import Actions from './utils/actions.jsx';
import '../styles/app.scss'

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
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <div className='topBar'>

                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <DickCanvas />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='bottomBar'>
                  <DickButton css='save' text='SAVE' action='save' />
                  <DickButton css='clear' text='CLEAR' action='clear' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;