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

const url = 'types/contents'

export default class Contents extends BaseModel {
       id_content
       content_name
       content_description
       sport_id
       session_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_content = attributes.id_content || undefined
           this.content_name = attributes.content_name || ''
           this.content_description = attributes.content_description || ''
           this.sport_id = attributes.sport_id || ''
           this.session_id = attributes.session_id || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_content = attributes.id_content
           this.content_name = attributes.content_name
           this.content_description = attributes.content_description
           this.sport_id = attributes.sport_id
           this.session_id = attributes.session_id
         }
       }

    static validations = {
      contents: {
        content_name: {
          required,
          maxLength: maxLength(50),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_content, content_name, sport_id, session_id} = object
            const _scenario = id_content ? 'update' : 'create'
            const params = {id_content, content_name, sport_id, session_id}
            const validation = await Contents.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        content_description: {
          maxLength: maxLength(65535)
        },
        sport_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_content, content_name, sport_id, session_id} = object
            const _scenario = id_content ? 'update' : 'create'
            const params = {id_content, content_name, sport_id, session_id}
            const validation = await Contents.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        session_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_content, content_name, sport_id, session_id} = object
            const _scenario = id_content ? 'update' : 'create'
            const params = {id_content, content_name, sport_id, session_id}
            const validation = await Contents.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      contents: {
        id_content: {
          isUnique: 'This id_content has been taken'

        },
        content_name: {
          isUnique: 'The combination of content_name, sport_id, session_id has benn taken'

        },
        sport_id: {
          isUnique: 'The combination of content_name, sport_id, session_id has benn taken'

        },
        session_id: {
          isUnique: 'The combination of content_name, sport_id, session_id has benn taken'

        }
      }
    }

  static columns = [
    {
      title: 'Name',
      dataIndex: 'content_name',
      align: 'center',
      key: 'content_name',

      sorter: (a, b) => (a.content_name > b.content_name) - (a.content_name < b.content_name)
    },
    {
      title: 'Description',
      dataIndex: 'content_description',
      align: 'center',
      key: 'content_description',

      sorter: (a, b) => (a.content_description > b.content_description) - (a.content_description < b.content_description)
    },
    {
      title: 'Sport',
      dataIndex: 'sport.sport_name',
      align: 'center',
      key: 'sport.sport_name',

      sorter: (a, b) => a.sport && b.sport ? (a.sport.sport_name > b.sport.sport_name) - (a.sport.sport_name < b.sport.sport_name) : 0
    },
    {
      title: 'Session',
      dataIndex: 'session.session_name',
      align: 'center',
      key: 'session.session_name',

      sorter: (a, b) => a.session && b.session ? (a.session.session_name > b.session.session_name) - (a.session.session_name < b.session.session_name) : 0
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
    return this.id_content
  }
  class_name () {
    return 'Contents'
  }
}
