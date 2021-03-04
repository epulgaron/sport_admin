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

const url = 'types/types'

export default class Types extends BaseModel {
       id_type
       type_acr
       type_name

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_type = attributes.id_type || undefined
           this.type_acr = attributes.type_acr || null
           this.type_name = attributes.type_name || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_type = attributes.id_type
           this.type_acr = attributes.type_acr
           this.type_name = attributes.type_name
         }
       }

    static validations = {
      types: {
        type_acr: {
          maxLength: maxLength(20)
        },
        type_name: {
          required,
          maxLength: maxLength(50),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_type, type_name} = object
            const _scenario = id_type ? 'update' : 'create'
            const params = {id_type, type_name}
            const validation = await Types.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      types: {
        id_type: {
          isUnique: 'This id_type has been taken'

        },
        type_name: {
          isUnique: 'This name has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Acronym',
      dataIndex: 'type_acr',
      align: 'center',
      key: 'type_acr',

      sorter: (a, b) => (a.type_acr > b.type_acr) - (a.type_acr < b.type_acr)
    },
    {
      title: 'Name',
      dataIndex: 'type_name',
      align: 'center',
      key: 'type_name',

      sorter: (a, b) => (a.type_name > b.type_name) - (a.type_name < b.type_name)
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
    return this.id_type
  }
  class_name () {
    return 'Types'
  }
}
