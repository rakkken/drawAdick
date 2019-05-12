import React from "react";
import ReactDOM from 'react-dom';
import { ToastsStore } from 'react-toasts';
import axios from 'axios';
import Dispatcher from '../../utils/dispatcher.jsx';
import Actions from '../../utils/constants.jsx'
import DoActions from '../../utils/actions.jsx'
import '../../../styles/components/dickcanvas/dickcanvas.scss'

class DickCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.resizeInProgress = false;
        this.saveInProgress = false;
        this.modX = 0;
        this.modY = 300;
        this.aspectRatio = 1.333;
        this.maxHeight = 80;
        this.brushSizeLimit = 12;
        this.strokeStyle = '#ffffff';
        //becouse of margin and top image
        this.mobileDeviceModX = 15;
        this.mobileDeviceModY = 180;

        this.state = {
            width: document.body.clientWidth - this.modX,
            height: document.body.clientHeight - this.modY,
            penColor: 'blue',
            lineWidth: 6
        }
        Dispatcher.register(this._registerToActions.bind(this));
    }

    wheel(event) {
        event.wheelDelta < 0 ? DoActions.execute('drawSizeUp') : DoActions.execute('drawSizeDown');
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case Actions.CLEAR_CANVAS:
                this.reset();
                break;
            case Actions.RESIZE_CANVAS:
                this.resize();
                break;
            case Actions.SAVE_DATA:
                this.save();
                break;
            case Actions.DRAW_SIZE:
                this.changeDrawSize(action.payload);
                break;
            case Actions.DRAW_SIZE_UP:
                this.penSizeUp();
                break;
            case Actions.DRAW_SIZE_DOWN:
                this.penSizeDown();
                break;
            case Actions.SET_COLOR:
                this.setColor(action.payload);
                break;
        }
    }

    save() {
        if (this.isClean()){
            return;
        }
        if (!this.saveInProgress) {
            this.saveInProgress = true;
            axios({
                method: 'post',
                url: '/save',
                headers: { "Content-Type": "application/upload", "X-CSRFToken": csrf_token },
                data: this.getImageDataAsIMG()
            }).then(res => {
                this.saveInProgress = false;
                ToastsStore.success("Thank you!")
            }).catch(error => {
                this.saveInProgress = false;
            });
        }
    }

    resize() {
        if (!this.resizeInProgress) {
            this.resizeInProgress = true;
            var imageData = this.getImageData();
            var newWidth = document.body.clientWidth - this.modX;
            var newheight = document.body.clientHeight - this.modY;
            this.setState({
                width: newWidth,
                height: newheight
            })
            this.redraw(imageData);
        }
    }

    changeDrawSize(size) {
        this.setState({
            lineWidth: this.state.lineWidth = size
        });
    }

    redraw(imageData) {
        this.resizeInProgress = false;
        this.ctx.putImageData(imageData, 0, 0, 0, 0, this.state.width, this.state.height);
    }

    getImageData() {
        return this.ctx.getImageData(0, 0, this.state.width, this.state.height);
    }

    isClean() {
        const pixelBuffer = new Uint32Array(
            this.getImageData().data.buffer
        );

        return !pixelBuffer.some(channel => channel !== 0 && channel !== 4294967295);
    }

    getImageDataAsIMG() {
        return this.refs.canvas.toDataURL('image/jpeg', 1.0);
    }

    componentDidMount() {
        this.reset();
        ReactDOM.findDOMNode(this).addEventListener('wheel', this.wheel);
    }

    draw(e) {
        this.setState({
            mode: 'draw'
        });
    }

    erase() {
        this.setState({
            mode: 'erase'
        });
    }

    drawingMouse(e) {
        e.preventDefault();

        if (this.state.pen === 'down') {

            this.ctx.beginPath()
            this.ctx.lineWidth = this.state.lineWidth
            this.ctx.lineCap = 'round';

            this.ctx.strokeStyle = this.state.penColor

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
        var x = e.changedTouches[0].pageX - this.mobileDeviceModX;
        var y = e.changedTouches[0].pageY - this.mobileDeviceModY;
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
        var x = e.changedTouches[0].pageX - this.mobileDeviceModX;
        var y = e.changedTouches[0].pageY - this.mobileDeviceModY;
        this.setState({
            pen: 'down',
            penCoords: [x, y]
        });
        this.ctx.moveTo(x, y)
    }

    up() {
        this.setState({
            pen: 'up'
        });
    }

    penSizeUp() {
        if (this.brushSizeLimit > this.state.lineWidth) {
            this.setState({
                lineWidth: this.state.lineWidth += 1
            });
        }
    }

    penSizeDown() {
        if (this.state.lineWidth > 1) {
            this.setState({
                lineWidth: this.state.lineWidth -= 1
            });
        }
    }

    setColor(c) {
        this.setState({
            penColor: c
        });
    }

    reset() {
        this.ctx = this.refs.canvas.getContext('2d');
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.state.width, this.state.height);
        ToastsStore.info("Cleared")
    }

    render() {
        var w = this.state.width;
        var h = this.state.height;
        var aspectRatio = this.aspectRatio;
        var nh = w / aspectRatio;
        if (nh > h) {
            nh = h;
            w = h * aspectRatio;
        }

        return (
            <div className="maindiv">
                <canvas id='drawADick' ref="canvas" width={w} height={nh} className="canvas"
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