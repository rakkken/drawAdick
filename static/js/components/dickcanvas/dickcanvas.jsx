import React from "react";
import Dispatcher from '../../utils/dispatcher.jsx';
import Actions from '../../utils/constants.jsx'
import '../../../styles/components/dickcanvas/dickcanvas.scss'

class DickCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.resizeInProgress = false;
        this.modX = 300;
        this.modY = 40;

        this.state = {
            width: document.body.clientWidth - this.modX,
            height: document.body.clientHeight - this.modY
        }
        Dispatcher.register(this._registerToActions.bind(this));
        Dispatcher.register(this._registerToActions.bind(this));
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case Actions.CLEAR_CANVAS:
                this.reset();
            case Actions.RESIZE_CANVAS:
                this.resize();
                break;
        }
    }

    resize() {
        if (!this.resizeInProgress) {
            this.resizeInProgress = true;
            var imageData = this.getImageData();
            this.setState({
                width: document.body.clientWidth - this.modX,
                height: document.body.clientHeight - this.modY
            })
            this.redraw(imageData);
        }
    }

    redraw(imageData) {
        this.resizeInProgress = false;
        this.ctx.putImageData(imageData, 0, 0, 0, 0, this.state.width, this.state.height);
    }

    getImageData() {
        return this.ctx.getImageData(0, 0, this.state.width, this.state.height);
    }

    componentDidMount() {
        this.reset();
    }

    draw(e) { //response to Draw button click 
        this.setState({
            mode: 'draw'
        });
    }

    erase() { //response to Erase button click
        this.setState({
            mode: 'erase'
        });
    }

    drawingMouse(e) { //if the pen is down in the canvas, draw/erase
        e.preventDefault();

        if (this.state.pen === 'down') {

            this.ctx.beginPath()
            this.ctx.lineWidth = this.state.lineWidth
            this.ctx.lineCap = 'round';


            if (this.state.mode === 'draw') {
                this.ctx.strokeStyle = this.state.penColor
            }

            if (this.state.mode === 'erase') {
                this.ctx.strokeStyle = '#ffffff'
            }

            this.ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1])
            this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            this.ctx.stroke();

            this.setState({
                penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
            });
        }
    }

    drawingThumb(e) {
        e.preventDefault();
        var x = e.changedTouches[0].pageX - this.modX/2;
        var y = e.changedTouches[0].pageY;
        this.setState({
            pen: 'down',
            penCoords: [x, y]
        });
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    mouseDown(e) {
        this.setState({
            pen: 'down',
            penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        });
    }

    thumbDown(e) {
        this.ctx.beginPath();
        var x = e.changedTouches[0].pageX - this.modX/2;
        var y = e.changedTouches[0].pageY;
        this.setState({
            pen: 'down',
            penCoords: [x, y]
        });
        this.ctx.moveTo(x, y)
    }

    up() { //mouse is up on the canvas
        this.setState({
            pen: 'up'
        });
    }

    penSizeUp() { //increase pen size button clicked
        this.setState({
            lineWidth: this.state.lineWidth += 5
        });
    }

    penSizeDown() {//decrease pen size button clicked
        this.setState({
            lineWidth: this.state.lineWidth -= 5
        });
    }

    setColor(c) { //a color button was clicked
        this.setState({
            penColor: c
        });
    }

    reset() { //clears it to all white, resets state to original
        this.setState({
            mode: 'draw',
            pen: 'up',
            lineWidth: 1,
            penColor: 'black'
        });

        this.ctx = this.refs.canvas.getContext('2d');
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.state.width, this.state.height);
        this.ctx.lineWidth = 1;
    }

    render() {
        return (
            <div className="maindiv">
                <canvas id='drawADick' ref="canvas" width={this.state.width} height={this.state.height} className="canvas"
                    onMouseMove={(e) => this.drawingMouse(e)}
                    onMouseDown={(e) => this.mouseDown(e)}
                    onMouseUp={(e) => this.up(e)}

                    onTouchMove={(e) => this.drawingThumb(e)}
                    onTouchStart={(e) => this.thumbDown(e)}
                    onTouchEnd={(e) => this.up(e)}
                >
                </canvas>
            </div>
        )
    }
}

export default DickCanvas;