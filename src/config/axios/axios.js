/**Generate by ASGENS
*@author Charlietyn 
*@date Thu Sep 03 00:09:29 GMT-04:00 2020  
*@time Thu Sep 03 00:09:29 GMT-04:00 2020  
*/
import axios from 'axios';

/*Globally*/
axios.defaults.baseURL = process.env.BASE_URL;

axios.defaults.headers.common['Authorization'] = 'token';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Accepts'] = 'application/text';


axios.pending=null
const reqInt = axios.interceptors.request.use(
  config => {
    return config;
  }
)
const respInt = axios.interceptors.response.use(
  res => {
    return res;
  }
)
// axios.interceptors.request.eject(reqInt)
// axios.interceptors.response.eject(respInt)
export default axios;
export const Axios = axios

