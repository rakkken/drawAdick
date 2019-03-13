import Dispatcher from './dispatcher.jsx';
import ActionTypes from './constants.jsx';
 
class Actions {

    execute(action) {
        eval('this.'+action+'()');
    }
 
    clear() {
        Dispatcher.dispatch({
            actionType: ActionTypes.CLEAR_CANVAS,
            payload: null
        });
    }
 
}
 
export default new Actions();