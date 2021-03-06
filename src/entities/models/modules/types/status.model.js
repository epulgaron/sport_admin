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

const url = 'types/status'

export default class Status extends BaseModel {
       id_status
       status_acr
       status_name

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_status = attributes.id_status || undefined
           this.status_acr = attributes.status_acr || ''
           this.status_name = attributes.status_name || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_status = attributes.id_status
           this.status_acr = attributes.status_acr
           this.status_name = attributes.status_name
         }
       }

    static validations = {
      status: {
        status_acr: {
          maxLength: maxLength(20)
        },
        status_name: {
          required,
          maxLength: maxLength(50),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_status, status_name} = object
            const _scenario = id_status ? 'update' : 'create'
            const params = {id_status, status_name}
            const validation = await Status.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      status: {
        id_status: {
          isUnique: 'This id_status has been taken'

        },
        status_name: {
          isUnique: 'This name has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Acronym',
      dataIndex: 'status_acr',
      align: 'center',
      key: 'status_acr',

      sorter: (a, b) => (a.status_acr > b.status_acr) - (a.status_acr < b.status_acr)
    },
    {
      title: 'Name',
      dataIndex: 'status_name',
      align: 'center',
      key: 'status_name',

      sorter: (a, b) => (a.status_name > b.status_name) - (a.status_name < b.status_name)
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
    return this.id_status
  }
  class_name () {
    return 'Status'
  }
}
