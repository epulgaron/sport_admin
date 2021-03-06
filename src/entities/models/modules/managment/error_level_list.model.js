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

const url = 'management/error_level_list'

export default class Error_level_list extends BaseModel {
       id_error_level_list
       error_id
       error_level_id
       eval_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_error_level_list = attributes.id_error_level_list || undefined
           this.error_id = attributes.error_id || null
           this.error_level_id = attributes.error_level_id || null
           this.eval_id = attributes.eval_id || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_error_level_list = attributes.id_error_level_list
           this.error_id = attributes.error_id
           this.error_level_id = attributes.error_level_id
           this.eval_id = attributes.eval_id
         }
       }

    static validations = {
      error_level_list: {
        error_id: {
          required,
          integer
        },
        error_level_id: {
          required,
          integer
        },
        eval_id: {
          required,
          integer
        }
      }
    }

    static feedbacks = {
      error_level_list: {
        id_error_level_list: {
          isUnique: 'This id_error_level_list has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Error',
      dataIndex: 'error.error_name',
      align: 'center',
      key: 'error.error_name',

      sorter: (a, b) => a.error && b.error ? (a.error.error_name > b.error.error_name) - (a.error.error_name < b.error.error_name) : 0
    },
    {
      title: 'Error_level',
      dataIndex: 'error_level.id_error_level',
      align: 'center',
      key: 'error_level.id_error_level',

      sorter: (a, b) => a.error_level && b.error_level ? a.error_level.id_error_level - b.error_level.id_error_level : 0
    },
    {
      title: 'Eval',
      dataIndex: 'eval.id_eval',
      align: 'center',
      key: 'eval.id_eval',

      sorter: (a, b) => a.eval && b.eval ? a.eval.id_eval - b.eval.id_eval : 0
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
    return this.id_error_level_list
  }
  class_name () {
    return 'Error_level_list'
  }
}
