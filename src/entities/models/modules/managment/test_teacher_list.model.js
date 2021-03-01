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

  const url = 'management/test_teacher_list';

    export default class Test_teacher_list extends BaseModel {

       id_test_teacher_list
       test_id
       teacher_id

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_test_teacher_list = attributes.id_test_teacher_list|| undefined
        this.test_id = attributes.test_id|| null
        this.teacher_id = attributes.teacher_id|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_test_teacher_list = attributes.id_test_teacher_list
        this.test_id = attributes.test_id
        this.teacher_id = attributes.teacher_id
      }
    }

    static validations = {
      test_teacher_list: {
        test_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_test_teacher_list,test_id,teacher_id}=object
               const _scenario=id_test_teacher_list?'update':'create'
               const params={id_test_teacher_list,test_id,teacher_id}
               const validation= await Test_teacher_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
        teacher_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_test_teacher_list,test_id,teacher_id}=object
               const _scenario=id_test_teacher_list?'update':'create'
               const params={id_test_teacher_list,test_id,teacher_id}
               const validation= await Test_teacher_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
      },
    }

    static feedbacks = {
      test_teacher_list: {
      id_test_teacher_list: {
        isUnique: 'This id_test_teacher_list has been taken'

      },
      test_id: {
        isUnique: 'The combination of test_id, teacher_id has benn taken'

      },
      teacher_id: {
        isUnique: 'The combination of test_id, teacher_id has benn taken'

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
      title: 'Teacher',
      dataIndex: 'teacher.teacher_address',
      align:'center',
      key: 'teacher.teacher_address',

      sorter: (a, b) =>  a.teacher && b.teacher?(a.teacher.teacher_address > b.teacher.teacher_address)-(a.teacher.teacher_address < b.teacher.teacher_address):0
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
      return this.id_test_teacher_list;
    }
    class_name() {
        return 'Test_teacher_list'
      }


   }

