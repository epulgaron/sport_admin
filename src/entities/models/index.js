/**Generate by ASGENS
*@author Charlietyn
*@date Thu Sep 03 00:09:29 GMT-04:00 2020
*@time Thu Sep 03 00:09:29 GMT-04:00 2020
*/
import * as utils from './../utils/utils'
const requireModule = require.context("./", true, /(model.js$)/);
const regexp=new RegExp(/(\.\/|\.model.js)/g)
const classes=utils.dynamic_import(regexp,requireModule)
export function instance(class_name,attributes) {
  return  new classes[class_name].default(attributes)
}
export function statics(class_name) {
  return  classes[class_name].default
}
export default classes
