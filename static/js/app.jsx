import React from "react";
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx";
import Actions from './utils/actions.jsx';

class App extends React.Component {

  componentDidMount() {
    window.addEventListener('resize', function (e){
      Actions.resize();
    });

    var canvas = document.getElementById('drawADick');
    document.body.addEventListener('touchstart', function(e){
      if(e.target === canvas){
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener('touchend', function(e){
      if(e.target === canvas){
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener('touchmove', function(e){
      if(e.target === canvas){
        e.preventDefault();
      }
    }, false);

    canvas.addEventListener('touchstart', function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener('touchend', function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mouseup", {});
      canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener('touchmove', function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, true);
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>
            </td>
            <td>
              <DickCanvas />
            </td>
            <td>
              <div>
                <DickButton css='clear' text='CLEAR' action='clear' />
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;