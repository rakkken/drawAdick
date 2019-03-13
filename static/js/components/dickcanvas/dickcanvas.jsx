import React from "react";
import Dispatcher from '../../utils/dispatcher.jsx';
import Actions from '../../utils/constants.jsx'
import '../../../styles/components/dickcanvas/dickcanvas.scss'

class DickCanvas extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            width: document.body.clientWidth - 666,
            height: document.body.clientHeight - 40
          }
        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case Actions.CLEAR_CANVAS:
                this.reset();
            break;
        }
    }

    componentDidMount() {
        this.reset()
    }

    draw(e) { //response to Draw button click 
        this.setState({
            mode:'draw'
        })
    }

    erase() { //response to Erase button click
        this.setState({
            mode:'erase'
        })
    }

    drawing(e) { //if the pen is down in the canvas, draw/erase

        if(this.state.pen === 'down') {

            this.ctx.beginPath()
            this.ctx.lineWidth = this.state.lineWidth
            this.ctx.lineCap = 'round';


            if(this.state.mode === 'draw') {
                this.ctx.strokeStyle = this.state.penColor
            }

            if(this.state.mode === 'erase') {
                this.ctx.strokeStyle = '#ffffff'
            }

            this.ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1]) //move to old position
            this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) //draw to new position
            this.ctx.stroke();

            this.setState({ //save new position 
                penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
            })
        }
    }

    penDown(e) { //mouse is down on the canvas
        this.setState({
            pen:'down',
            penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        })
    }

    penUp() { //mouse is up on the canvas
        this.setState({
            pen:'up'
        })
    }

    penSizeUp(){ //increase pen size button clicked
        this.setState({
            lineWidth: this.state.lineWidth += 5
        })
    }

    penSizeDown() {//decrease pen size button clicked
        this.setState({
            lineWidth: this.state.lineWidth -= 5
        })
    }

    setColor(c){ //a color button was clicked
        this.setState({
            penColor : c
        })
    }

    reset() { //clears it to all white, resets state to original
        this.setState({
            mode: 'draw',
            pen : 'up',
            lineWidth : 1,
            penColor : 'black'
        })

        this.ctx = this.refs.canvas.getContext('2d')
        this.ctx.fillStyle="white"
        this.ctx.fillRect(0,0,this.state.width,this.state.height)
        this.ctx.lineWidth = 1
    }

    render() {
        return (
            <div className="maindiv">
                <canvas ref="canvas" width={this.state.width} height={this.state.height} className="canvas" 
                    onMouseMove={(e)=>this.drawing(e)} 
                    onMouseDown={(e)=>this.penDown(e)} 
                    onMouseUp={(e)=>this.penUp(e)}>
                </canvas>
            </div>
        )
    }
}

export default DickCanvas;