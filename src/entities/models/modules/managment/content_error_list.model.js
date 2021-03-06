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

const url = 'management/content_error_list'

export default class Content_error_list extends BaseModel {
       id_content_error_list
       content_id
       error_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_content_error_list = attributes.id_content_error_list || undefined
           this.content_id = attributes.content_id || ''
           this.error_id = attributes.error_id || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_content_error_list = attributes.id_content_error_list
           this.content_id = attributes.content_id
           this.error_id = attributes.error_id
         }
       }

    static validations = {
      content_error_list: {
        content_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_content_error_list, content_id, error_id} = object
            const _scenario = id_content_error_list ? 'update' : 'create'
            const params = {id_content_error_list, content_id, error_id}
            const validation = await Content_error_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        error_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_content_error_list, content_id, error_id} = object
            const _scenario = id_content_error_list ? 'update' : 'create'
            const params = {id_content_error_list, content_id, error_id}
            const validation = await Content_error_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      content_error_list: {
        id_content_error_list: {
          isUnique: 'This id_content_error_list has been taken'

        },
        content_id: {
          isUnique: 'The combination of content_id, error_id has benn taken'

        },
        error_id: {
          isUnique: 'The combination of content_id, error_id has benn taken'

        }
      }
    }

  static columns = [
    {
      title: 'Content',
      dataIndex: 'content.content_name',
      align: 'center',
      key: 'content.content_name',

      sorter: (a, b) => a.content && b.content ? (a.content.content_name > b.content.content_name) - (a.content.content_name < b.content.content_name) : 0
    },
    {
      title: 'Error',
      dataIndex: 'error.error_name',
      align: 'center',
      key: 'error.error_name',

      sorter: (a, b) => a.error && b.error ? (a.error.error_name > b.error.error_name) - (a.error.error_name < b.error.error_name) : 0
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
    return this.id_content_error_list
  }
  class_name () {
    return 'Content_error_list'
  }
}
