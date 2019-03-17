import Dispatcher from './dispatcher.jsx';
import ActionTypes from './constants.jsx';

class Actions {

    execute(action) {
        eval('this.' + action + '()');
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

}

export default new Actions();