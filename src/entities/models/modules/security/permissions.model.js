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

const url = 'security/permissions'

export default class Permissions extends BaseModel {
       id_permission
       permission_name
       permission_description

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_permission = attributes.id_permission || undefined
           this.permission_name = attributes.permission_name || ''
           this.permission_description = attributes.permission_description || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_permission = attributes.id_permission
           this.permission_name = attributes.permission_name
           this.permission_description = attributes.permission_description
         }
       }

    static validations = {
      permissions: {
        permission_name: {
          required,
          maxLength: maxLength(50),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_permission, permission_name} = object
            const _scenario = id_permission ? 'update' : 'create'
            const params = {id_permission, permission_name}
            const validation = await Permissions.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        permission_description: {
          maxLength: maxLength(65535)
        }
      }
    }

    static feedbacks = {
      permissions: {
        id_permission: {
          isUnique: 'This id_permission has been taken'

        },
        permission_name: {
          isUnique: 'This name has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Name',
      dataIndex: 'permission_name',
      align: 'center',
      key: 'permission_name',

      sorter: (a, b) => (a.permission_name > b.permission_name) - (a.permission_name < b.permission_name)
    },
    {
      title: 'Description',
      dataIndex: 'permission_description',
      align: 'center',
      key: 'permission_description',

      sorter: (a, b) => (a.permission_description > b.permission_description) - (a.permission_description < b.permission_description)
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
    return this.id_permission
  }
  class_name () {
    return 'Permissions'
  }
}
