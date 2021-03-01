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

  const url = 'management/test_level_list';

    export default class Test_level_list extends BaseModel {

       id_test_level_list
       test_id
       level_id

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_test_level_list = attributes.id_test_level_list|| undefined
        this.test_id = attributes.test_id|| null
        this.level_id = attributes.level_id|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_test_level_list = attributes.id_test_level_list
        this.test_id = attributes.test_id
        this.level_id = attributes.level_id
      }
    }

    static validations = {
      test_level_list: {
        test_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_test_level_list,test_id,level_id}=object
               const _scenario=id_test_level_list?'update':'create'
               const params={id_test_level_list,test_id,level_id}
               const validation= await Test_level_list.validate({...params,_scenario,_specific})
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
               const {id_test_level_list,test_id,level_id}=object
               const _scenario=id_test_level_list?'update':'create'
               const params={id_test_level_list,test_id,level_id}
               const validation= await Test_level_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
      },
    }

    static feedbacks = {
      test_level_list: {
      id_test_level_list: {
        isUnique: 'This id_test_level_list has been taken'

      },
      test_id: {
        isUnique: 'The combination of test_id, level_id has benn taken'

      },
      level_id: {
        isUnique: 'The combination of test_id, level_id has benn taken'

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
      return this.id_test_level_list;
    }
    class_name() {
        return 'Test_level_list'
      }


   }

