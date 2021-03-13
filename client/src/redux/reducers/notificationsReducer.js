import { NotificationManager } from 'react-notifications';
import { ERROR, INFO, SUCCESS, WARNING } from '../actions/notificationsAction';
const notificationsReducer=(status='',action)=>{
    
    switch (action.type) {
        case INFO:
          NotificationManager.info(action.data);
          return status;
        case SUCCESS:
          NotificationManager.success(action.data);
          return status;
        case WARNING:
          NotificationManager.warning(action.data);
          return status;
        case ERROR:
          NotificationManager.error(action.data);
          return status;
          default:
              return status 
      }
}

export default notificationsReducer