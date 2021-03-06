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

const url = 'management/teacher_sport_list'

export default class Teacher_sport_list extends BaseModel {
       id_teacher_sport_list
       teacher_id
       sport_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_teacher_sport_list = attributes.id_teacher_sport_list || undefined
           this.teacher_id = attributes.teacher_id || null
           this.sport_id = attributes.sport_id || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_teacher_sport_list = attributes.id_teacher_sport_list
           this.teacher_id = attributes.teacher_id
           this.sport_id = attributes.sport_id
         }
       }

    static validations = {
      teacher_sport_list: {
        teacher_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_teacher_sport_list, teacher_id, sport_id} = object
            const _scenario = id_teacher_sport_list ? 'update' : 'create'
            const params = {id_teacher_sport_list, teacher_id, sport_id}
            const validation = await Teacher_sport_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        sport_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_teacher_sport_list, teacher_id, sport_id} = object
            const _scenario = id_teacher_sport_list ? 'update' : 'create'
            const params = {id_teacher_sport_list, teacher_id, sport_id}
            const validation = await Teacher_sport_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      teacher_sport_list: {
        id_teacher_sport_list: {
          isUnique: 'This id_teacher_sport_list has been taken'

        },
        teacher_id: {
          isUnique: 'The combination of teacher_id, sport_id has benn taken'

        },
        sport_id: {
          isUnique: 'The combination of teacher_id, sport_id has benn taken'

        }
      }
    }

  static columns = [
    {
      title: 'Teacher',
      dataIndex: 'teacher.teacher_address',
      align: 'center',
      key: 'teacher.teacher_address',

      sorter: (a, b) => a.teacher && b.teacher ? (a.teacher.teacher_address > b.teacher.teacher_address) - (a.teacher.teacher_address < b.teacher.teacher_address) : 0
    },
    {
      title: 'Sport',
      dataIndex: 'sport.sport_name',
      align: 'center',
      key: 'sport.sport_name',

      sorter: (a, b) => a.sport && b.sport ? (a.sport.sport_name > b.sport.sport_name) - (a.sport.sport_name < b.sport.sport_name) : 0
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
    return this.id_teacher_sport_list
  }
  class_name () {
    return 'Teacher_sport_list'
  }
}
