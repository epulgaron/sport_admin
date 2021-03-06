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

const url = 'entities/evaluation'

export default class Evaluation extends BaseModel {
       id_eval
       test_id
       level_id
       session_id
       student_id
       teacher_id
       score

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_eval = attributes.id_eval || undefined
           this.test_id = attributes.test_id || ''
           this.level_id = attributes.level_id || ''
           this.session_id = attributes.session_id || ''
           this.student_id = attributes.student_id || ''
           this.teacher_id = attributes.teacher_id || ''
           this.score = attributes.score || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_eval = attributes.id_eval
           this.test_id = attributes.test_id
           this.level_id = attributes.level_id
           this.session_id = attributes.session_id
           this.student_id = attributes.student_id
           this.teacher_id = attributes.teacher_id
           this.score = attributes.score
         }
       }

    static validations = {
      evaluation: {
        test_id: {
          required,
          integer
        },
        level_id: {
          required,
          integer
        },
        session_id: {
          required,
          integer
        },
        student_id: {
          required,
          integer
        },
        teacher_id: {
          required,
          integer
        },
        score: {
          required,
          integer
        }
      }
    }

    static feedbacks = {
      evaluation: {
        id_eval: {
          isUnique: 'This id_eval has been taken'

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
      title: 'Level',
      dataIndex: 'level.level_acr',
      align: 'center',
      key: 'level.level_acr',

      sorter: (a, b) => a.level && b.level ? (a.level.level_acr > b.level.level_acr) - (a.level.level_acr < b.level.level_acr) : 0
    },
    {
      title: 'Session',
      dataIndex: 'session.session_name',
      align: 'center',
      key: 'session.session_name',

      sorter: (a, b) => a.session && b.session ? (a.session.session_name > b.session.session_name) - (a.session.session_name < b.session.session_name) : 0
    },
    {
      title: 'Student',
      dataIndex: 'student.student_address1',
      align: 'center',
      key: 'student.student_address1',

      sorter: (a, b) => a.student && b.student ? (a.student.student_address1 > b.student.student_address1) - (a.student.student_address1 < b.student.student_address1) : 0
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher.teacher_address',
      align: 'center',
      key: 'teacher.teacher_address',

      sorter: (a, b) => a.teacher && b.teacher ? (a.teacher.teacher_address > b.teacher.teacher_address) - (a.teacher.teacher_address < b.teacher.teacher_address) : 0
    },
    {
      title: 'Score',
      dataIndex: 'score',
      align: 'center',
      key: 'score',

      sorter: (a, b) => a.score - b.score
    },
    {
      title: 'Actions',
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
    return this.id_eval
  }
  class_name () {
    return 'Evaluation'
  }
}
