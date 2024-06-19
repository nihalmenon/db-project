import * as base from './baseActions';
import { endpoints } from '../config/config';



const registerUser = (user: any) => {
    return base.post(endpoints.register, user);
}

export { registerUser }