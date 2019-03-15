import React from "react";
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx"

class App extends React.Component {
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