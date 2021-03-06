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

const url = 'entities/errors'

export default class Errors extends BaseModel {
       id_error
       error_name
       recomendacion

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_error = attributes.id_error || undefined
           this.error_name = attributes.error_name || ''
           this.recomendacion = attributes.recomendacion || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_error = attributes.id_error
           this.error_name = attributes.error_name
           this.recomendacion = attributes.recomendacion
         }
       }

    static validations = {
      errors: {
        error_name: {
          required,
          maxLength: maxLength(50)
        },
        recomendacion: {
          maxLength: maxLength(65535)
        }
      }
    }

    static feedbacks = {
      errors: {
        id_error: {
          isUnique: 'This id_error has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Name',
      dataIndex: 'error_name',
      align: 'center',
      key: 'error_name',

      sorter: (a, b) => (a.error_name > b.error_name) - (a.error_name < b.error_name)
    },
    {
      title: 'Advice',
      dataIndex: 'recomendacion',
      align: 'center',
      key: 'recomendacion',

      sorter: (a, b) => (a.recomendacion > b.recomendacion) - (a.recomendacion < b.recomendacion)
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
    return this.id_error
  }
  class_name () {
    return 'Errors'
  }
}
