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

const url = 'security/roles'

export default class Roles extends BaseModel {
       id_role
       role_name
       role_description

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_role = attributes.id_role || undefined
           this.role_name = attributes.role_name || null
           this.role_description = attributes.role_description || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_role = attributes.id_role
           this.role_name = attributes.role_name
           this.role_description = attributes.role_description
         }
       }

    static validations = {
      roles: {
        role_name: {
          required,
          maxLength: maxLength(50),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_role, role_name} = object
            const _scenario = id_role ? 'update' : 'create'
            const params = {id_role, role_name}
            const validation = await Roles.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        role_description: {
          maxLength: maxLength(65535)
        }
      }
    }

    static feedbacks = {
      roles: {
        id_role: {
          isUnique: 'This id_role has been taken'

        },
        role_name: {
          isUnique: 'This name has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Name',
      dataIndex: 'role_name',
      align: 'center',
      key: 'role_name',

      sorter: (a, b) => (a.role_name > b.role_name) - (a.role_name < b.role_name)
    },
    {
      title: 'Description',
      dataIndex: 'role_description',
      align: 'center',
      key: 'role_description',

      sorter: (a, b) => (a.role_description > b.role_description) - (a.role_description < b.role_description)
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
    return this.id_role
  }
  class_name () {
    return 'Roles'
  }
}
