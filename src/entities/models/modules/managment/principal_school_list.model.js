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

const url = 'management/principal_school_list'

export default class Principal_school_list extends BaseModel {
       id_principal_school_list
       principal_id
       school_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_principal_school_list = attributes.id_principal_school_list || undefined
           this.principal_id = attributes.principal_id || null
           this.school_id = attributes.school_id || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_principal_school_list = attributes.id_principal_school_list
           this.principal_id = attributes.principal_id
           this.school_id = attributes.school_id
         }
       }

    static validations = {
      principal_school_list: {
        principal_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_principal_school_list, principal_id, school_id} = object
            const _scenario = id_principal_school_list ? 'update' : 'create'
            const params = {id_principal_school_list, principal_id, school_id}
            const validation = await Principal_school_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        school_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_principal_school_list, principal_id, school_id} = object
            const _scenario = id_principal_school_list ? 'update' : 'create'
            const params = {id_principal_school_list, principal_id, school_id}
            const validation = await Principal_school_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      principal_school_list: {
        id_principal_school_list: {
          isUnique: 'This id_principal_school_list has been taken'

        },
        principal_id: {
          isUnique: 'The combination of principal_id, school_id has benn taken'

        },
        school_id: {
          isUnique: 'The combination of principal_id, school_id has benn taken'

        }
      }
    }

  static columns = [
    {
      title: 'Principal',
      dataIndex: 'principal.user_id',
      align: 'center',
      key: 'principal.user_id',

      sorter: (a, b) => a.principal && b.principal ? a.principal.user_id - b.principal.user_id : 0
    },
    {
      title: 'School',
      dataIndex: 'school.school_name',
      align: 'center',
      key: 'school.school_name',

      sorter: (a, b) => a.school && b.school ? (a.school.school_name > b.school.school_name) - (a.school.school_name < b.school.school_name) : 0
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
    return this.id_principal_school_list
  }
  class_name () {
    return 'Principal_school_list'
  }
}
