import Dispatcher from './dispatcher.jsx';
import ActionTypes from './constants.jsx';

class Actions {

    execute(action, data) {
        if (typeof data === 'string') {
            eval('this.' + action + '("' + data + '")');
        } else {
            eval('this.' + action + '(' + data + ')');
        }
    }

    clear() {
        Dispatcher.dispatch({
            actionType: ActionTypes.CLEAR_CANVAS,
            payload: null
        });
    }

    resize() {
        Dispatcher.dispatch({
            actionType: ActionTypes.RESIZE_CANVAS,
            payload: null
        });
    }

    save() {
        Dispatcher.dispatch({
            actionType: ActionTypes.SAVE_DATA,
            payload: null
        });
    }

    drawSize(data) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DRAW_SIZE,
            payload: data
        });
    }

    drawSizeUp() {
        Dispatcher.dispatch({
            actionType: ActionTypes.DRAW_SIZE_UP,
            payload: null
        });
    }

    drawSizeDown() {
        Dispatcher.dispatch({
            actionType: ActionTypes.DRAW_SIZE_DOWN,
            payload: null
        });
    }

    setColor(data) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SET_COLOR,
            payload: data
        });
    }
}

export default new Actions();