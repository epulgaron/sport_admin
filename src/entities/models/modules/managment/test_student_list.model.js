/** Generate by ASGENS
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
} from 'vuelidate/lib/validators'

import BaseModel from '../../base.model'

const url = 'management/test_student_list'

export default class Test_student_list extends BaseModel {
       id_test_student_list
       test_id
       student_id
       notify_tutor

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_test_student_list = attributes.id_test_student_list || undefined
           this.test_id = attributes.test_id || null
           this.student_id = attributes.student_id || null
           this.notify_tutor = attributes.notify_tutor == '1'
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_test_student_list = attributes.id_test_student_list
           this.test_id = attributes.test_id
           this.student_id = attributes.student_id
           this.notify_tutor = attributes.notify_tutor
         }
       }

    static validations = {
      test_student_list: {
        test_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_test_student_list, test_id, student_id} = object
            const _scenario = id_test_student_list ? 'update' : 'create'
            const params = {id_test_student_list, test_id, student_id}
            const validation = await Test_student_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        student_id: {
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_test_student_list, test_id, student_id} = object
            const _scenario = id_test_student_list ? 'update' : 'create'
            const params = {id_test_student_list, test_id, student_id}
            const validation = await Test_student_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        notify_tutor: {
          integer
        }
      }
    }

    static feedbacks = {
      test_student_list: {
        id_test_student_list: {
          isUnique: 'This id_test_student_list has been taken'

        },
        test_id: {
          isUnique: 'The combination of test_id, student_id has benn taken'

        },
        student_id: {
          isUnique: 'The combination of test_id, student_id has benn taken'

        }
      }
    }

  static columns = [
    {
      title: 'Test',
      dataIndex: 'test.id_test',
      align: 'center',
      key: 'test.id_test',

      sorter: (a, b) => a.test && b.test ? a.test.id_test - b.test.id_test : 0
    },
    {
      title: 'Student',
      dataIndex: 'student.student_address1',
      align: 'center',
      key: 'student.student_address1',

      sorter: (a, b) => a.student && b.student ? (a.student.student_address1 > b.student.student_address1) - (a.student.student_address1 < b.student.student_address1) : 0
    },
    {
      title: 'Notify_tutor',
      dataIndex: 'notify_tutor',
      align: 'center',
      key: 'notify_tutor',

      sorter: (a, b) => a.notify_tutor - b.notify_tutor
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

  static get url () {
    return url
  };

  get url () {
    return url
  };

  get_id () {
    return this.id_test_student_list
  }
  class_name () {
    return 'Test_student_list'
  }
}
