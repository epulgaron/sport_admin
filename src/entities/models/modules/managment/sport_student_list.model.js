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

const url = 'management/sport_student_list'

export default class Sport_student_list extends BaseModel {
       id_sport_student_list
       student_id
       sport_id
       level_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_sport_student_list = attributes.id_sport_student_list || undefined
           this.student_id = attributes.student_id || null
           this.sport_id = attributes.sport_id || null
           this.level_id = attributes.level_id || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_sport_student_list = attributes.id_sport_student_list
           this.student_id = attributes.student_id
           this.sport_id = attributes.sport_id
           this.level_id = attributes.level_id
         }
       }

    static validations = {
      sport_student_list: {
        student_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_sport_student_list, student_id, sport_id, level_id} = object
            const _scenario = id_sport_student_list ? 'update' : 'create'
            const params = {id_sport_student_list, student_id, sport_id, level_id}
            const validation = await Sport_student_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        sport_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_sport_student_list, student_id, sport_id, level_id} = object
            const _scenario = id_sport_student_list ? 'update' : 'create'
            const params = {id_sport_student_list, student_id, sport_id, level_id}
            const validation = await Sport_student_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        level_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_sport_student_list, student_id, sport_id, level_id} = object
            const _scenario = id_sport_student_list ? 'update' : 'create'
            const params = {id_sport_student_list, student_id, sport_id, level_id}
            const validation = await Sport_student_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      sport_student_list: {
        id_sport_student_list: {
          isUnique: 'This id_sport_student_list has been taken'

        },
        student_id: {
          isUnique: 'The combination of student_id, sport_id, level_id has benn taken'

        },
        sport_id: {
          isUnique: 'The combination of student_id, sport_id, level_id has benn taken'

        },
        level_id: {
          isUnique: 'The combination of student_id, sport_id, level_id has benn taken'

        }
      }
    }

  static columns = [
    {
      title: 'Student',
      dataIndex: 'student.student_address1',
      align: 'center',
      key: 'student.student_address1',

      sorter: (a, b) => a.student && b.student ? (a.student.student_address1 > b.student.student_address1) - (a.student.student_address1 < b.student.student_address1) : 0
    },
    {
      title: 'Sport',
      dataIndex: 'sport.sport_name',
      align: 'center',
      key: 'sport.sport_name',

      sorter: (a, b) => a.sport && b.sport ? (a.sport.sport_name > b.sport.sport_name) - (a.sport.sport_name < b.sport.sport_name) : 0
    },
    {
      title: 'Level',
      dataIndex: 'level.level_acr',
      align: 'center',
      key: 'level.level_acr',

      sorter: (a, b) => a.level && b.level ? (a.level.level_acr > b.level.level_acr) - (a.level.level_acr < b.level.level_acr) : 0
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
    return this.id_sport_student_list
  }
  class_name () {
    return 'Sport_student_list'
  }
}
