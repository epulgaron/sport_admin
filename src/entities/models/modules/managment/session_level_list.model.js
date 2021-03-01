/**Generate by ASGENS
*@author Charlietyn
*@date Thu Feb 25 22:09:39 GMT-05:00 2021
*@time Thu Feb 25 22:09:39 GMT-05:00 2021
*/
import {
    required,
    integer,
    between,
    maxLength,
    minLength,
    decimal
  } from 'vuelidate/lib/validators';

  import BaseModel from '../../base.model';

  const url = 'management/session_level_list';

    export default class Session_level_list extends BaseModel {

       id_session_level
       session_id
       level_id

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_session_level = attributes.id_session_level|| undefined
        this.session_id = attributes.session_id|| null
        this.level_id = attributes.level_id|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_session_level = attributes.id_session_level
        this.session_id = attributes.session_id
        this.level_id = attributes.level_id
      }
    }

    static validations = {
      session_level_list: {
        session_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_session_level,session_id,level_id}=object
               const _scenario=id_session_level?'update':'create'
               const params={id_session_level,session_id,level_id}
               const validation= await Session_level_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
        level_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_session_level,session_id,level_id}=object
               const _scenario=id_session_level?'update':'create'
               const params={id_session_level,session_id,level_id}
               const validation= await Session_level_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
      },
    }

    static feedbacks = {
      session_level_list: {
      id_session_level: {
        isUnique: 'This id_session_level has been taken'

      },
      session_id: {
        isUnique: 'The combination of session_id, level_id has benn taken'

      },
      level_id: {
        isUnique: 'The combination of session_id, level_id has benn taken'

      },
      },
    }

  static columns = [
    {
      title: 'Session',
      dataIndex: 'session.session_name',
      align:'center',
      key: 'session.session_name',

      sorter: (a, b) =>  a.session && b.session?(a.session.session_name > b.session.session_name)-(a.session.session_name < b.session.session_name):0
    },
    {
      title: 'Level',
      dataIndex: 'level.level_acr',
      align:'center',
      key: 'level.level_acr',

      sorter: (a, b) =>  a.level && b.level?(a.level.level_acr > b.level.level_acr)-(a.level.level_acr < b.level.level_acr):0
    },
    {
      title: 'Acciones',
      key: 'action_elements',
      fixed: 'right',
      scopedSlots: {
        customRender: 'action'
      }
    }
  ];

    static get url() {
      return url
    };

    get url() {
      return url
    };

    get_id() {
      return this.id_session_level;
    }
    class_name() {
        return 'Session_level_list'
      }


   }

