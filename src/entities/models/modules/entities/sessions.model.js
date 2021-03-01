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

  const url = 'entities/sessions';

    export default class Sessions extends BaseModel {

       id_session
       session_name
       sport_id

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_session = attributes.id_session|| undefined
        this.session_name = attributes.session_name|| null
        this.sport_id = attributes.sport_id|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_session = attributes.id_session
        this.session_name = attributes.session_name
        this.sport_id = attributes.sport_id
      }
    }

    static validations = {
      sessions: {
        session_name: {
          required,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_session,session_name,sport_id}=object
               const _scenario=id_session?'update':'create'
               const params={id_session,session_name,sport_id}
               const validation= await Sessions.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
        sport_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_session,session_name,sport_id}=object
               const _scenario=id_session?'update':'create'
               const params={id_session,session_name,sport_id}
               const validation= await Sessions.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
      },
    }

    static feedbacks = {
      sessions: {
      id_session: {
        isUnique: 'This id_session has been taken' 

      },
      session_name: {
        isUnique: 'The combination of session_name, sport_id has benn taken' 

      },
      sport_id: {
        isUnique: 'The combination of session_name, sport_id has benn taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Session_name',
      dataIndex: 'session_name',
      align:'center',
      key: 'session_name',

      sorter: (a, b) =>  (a.session_name > b.session_name)-(a.session_name < b.session_name)
    },
    {
      title: 'Sport',
      dataIndex: 'sport.sport_name',
      align:'center',
      key: 'sport.sport_name',

      sorter: (a, b) =>  a.sport && b.sport?(a.sport.sport_name > b.sport.sport_name)-(a.sport.sport_name < b.sport.sport_name):0
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
      return this.id_session;
    }
    class_name() {
        return 'Sessions'
      }
  

   }

