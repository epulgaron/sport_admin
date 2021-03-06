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

const url = 'management/content_level_list'

export default class Content_level_list extends BaseModel {
       id_content_level_list
       content_id
       level_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_content_level_list = attributes.id_content_level_list || undefined
           this.content_id = attributes.content_id || null
           this.level_id = attributes.level_id || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_content_level_list = attributes.id_content_level_list
           this.content_id = attributes.content_id
           this.level_id = attributes.level_id
         }
       }

    static validations = {
      content_level_list: {
        content_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_content_level_list, content_id, level_id} = object
            const _scenario = id_content_level_list ? 'update' : 'create'
            const params = {id_content_level_list, content_id, level_id}
            const validation = await Content_level_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        level_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_content_level_list, content_id, level_id} = object
            const _scenario = id_content_level_list ? 'update' : 'create'
            const params = {id_content_level_list, content_id, level_id}
            const validation = await Content_level_list.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      content_level_list: {
        id_content_level_list: {
          isUnique: 'This id_content_level_list has been taken'

        },
        content_id: {
          isUnique: 'The combination of content_id, level_id has benn taken'

        },
        level_id: {
          isUnique: 'The combination of content_id, level_id has benn taken'

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
    return this.id_content_level_list
  }
  class_name () {
    return 'Content_level_list'
  }
}
