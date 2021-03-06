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

const url = 'types/error_level'

export default class Error_level extends BaseModel {
       id_error_level
       error_level_name
       error_level_eval
       school_id
       sport_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_error_level = attributes.id_error_level || undefined
           this.error_level_name = attributes.error_level_name || ''
           this.error_level_eval = attributes.error_level_eval || ''
           this.school_id = attributes.school_id || ''
           this.sport_id = attributes.sport_id || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_error_level = attributes.id_error_level
           this.error_level_name = attributes.error_level_name
           this.error_level_eval = attributes.error_level_eval
           this.school_id = attributes.school_id
           this.sport_id = attributes.sport_id
         }
       }

    static validations = {
      error_level: {
        error_level_name: {
          required,
          maxLength: maxLength(100)
        },
        error_level_eval: {
          required,
          integer
        },
        school_id: {
          required,
          integer
        },
        sport_id: {
          required,
          integer
        }
      }
    }

    static feedbacks = {
      error_level: {
        id_error_level: {
          isUnique: 'This id_error_level has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Name',
      dataIndex: 'error_level_name',
      align: 'center',
      key: 'error_level_name',

      sorter: (a, b) => (a.error_level_name > b.error_level_name) - (a.error_level_name < b.error_level_name)
    },
    {
      title: 'Evaluation',
      dataIndex: 'error_level_eval',
      align: 'center',
      key: 'error_level_eval',

      sorter: (a, b) => a.error_level_eval - b.error_level_eval
    },
    {
      title: 'School',
      dataIndex: 'school.school_name',
      align: 'center',
      key: 'school.school_name',

      sorter: (a, b) => a.school && b.school ? (a.school.school_name > b.school.school_name) - (a.school.school_name < b.school.school_name) : 0
    },
    {
      title: 'Sport',
      dataIndex: 'sport.sport_name',
      align: 'center',
      key: 'sport.sport_name',

      sorter: (a, b) => a.sport && b.sport ? (a.sport.sport_name > b.sport.sport_name) - (a.sport.sport_name < b.sport.sport_name) : 0
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
    return this.id_error_level
  }
  class_name () {
    return 'Error_level'
  }
}
