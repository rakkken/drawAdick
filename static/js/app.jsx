import React from "react";
import DickCanvas from "./components/dickcanvas/dickcanvas.jsx";
import DickButton from "./components/dickbutton/dickbutton.jsx"

class App extends React.Component {
  render () {
    return (<div>
      <DickButton css='clear' text='CLEAR' action='clear'/>
     <DickCanvas/>
    </div>);
  }
}

export default App;