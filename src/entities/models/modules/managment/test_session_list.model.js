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

  const url = 'management/test_session_list';

    export default class Test_session_list extends BaseModel {

       id_test_session_list
       test_id
       session_id
       value

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_test_session_list = attributes.id_test_session_list|| undefined
        this.test_id = attributes.test_id|| null
        this.session_id = attributes.session_id|| null
        this.value = attributes.value|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_test_session_list = attributes.id_test_session_list
        this.test_id = attributes.test_id
        this.session_id = attributes.session_id
        this.value = attributes.value
      }
    }

    static validations = {
      test_session_list: {
        test_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_test_session_list,test_id,session_id}=object
               const _scenario=id_test_session_list?'update':'create'
               const params={id_test_session_list,test_id,session_id}
               const validation= await Test_session_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
        session_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_test_session_list,test_id,session_id}=object
               const _scenario=id_test_session_list?'update':'create'
               const params={id_test_session_list,test_id,session_id}
               const validation= await Test_session_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
        value: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      test_session_list: {
      id_test_session_list: {
        isUnique: 'This id_test_session_list has been taken'

      },
      test_id: {
        isUnique: 'The combination of test_id, session_id has benn taken'

      },
      session_id: {
        isUnique: 'The combination of test_id, session_id has benn taken'

      },
      },
    }

  static columns = [
    {
      title: 'Test',
      dataIndex: 'test.id_test',
      align:'center',
      key: 'test.id_test',

      sorter: (a, b) => a.test && b.test?a.test.id_test - b.test.id_test:0
    },
    {
      title: 'Session',
      dataIndex: 'session.session_name',
      align:'center',
      key: 'session.session_name',

      sorter: (a, b) =>  a.session && b.session?(a.session.session_name > b.session.session_name)-(a.session.session_name < b.session.session_name):0
    },
    {
      title: 'Value',
      dataIndex: 'value',
      align:'center',
      key: 'value',

      sorter: (a, b) => a.value - b.value
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
      return this.id_test_session_list;
    }
    class_name() {
        return 'Test_session_list'
      }


   }

