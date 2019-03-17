import React from "react";
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx";
import Actions from './utils/actions.jsx';

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
      <div>
        <table>
          <tr>
            <td>

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
            <DickButton css='clear' text='CLEAR' action='clear'/>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;