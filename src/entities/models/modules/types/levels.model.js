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

const url = 'types/levels'

export default class Levels extends BaseModel {
       id_level
       level_acr
       level_name
       sport_id

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_level = attributes.id_level || undefined
           this.level_acr = attributes.level_acr || ''
           this.level_name = attributes.level_name || ''
           this.sport_id = attributes.sport_id || ''
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_level = attributes.id_level
           this.level_acr = attributes.level_acr
           this.level_name = attributes.level_name
           this.sport_id = attributes.sport_id
         }
       }

    static validations = {
      levels: {
        level_acr: {
          maxLength: maxLength(10)
        },
        level_name: {
          required,
          maxLength: maxLength(30),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_level, level_name, sport_id} = object
            const _scenario = id_level ? 'update' : 'create'
            const params = {id_level, level_name, sport_id}
            const validation = await Levels.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        sport_id: {
          required,
          integer,
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_level, level_name, sport_id} = object
            const _scenario = id_level ? 'update' : 'create'
            const params = {id_level, level_name, sport_id}
            const validation = await Levels.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      levels: {
        id_level: {
          isUnique: 'This id_level has been taken'

        },
        level_name: {
          isUnique: 'The combination of level_name, sport_id has benn taken'

        },
        sport_id: {
          isUnique: 'The combination of level_name, sport_id has benn taken'

        }
      }
    }

  static columns = [
    {
      title: 'Acronym',
      dataIndex: 'level_acr',
      align: 'center',
      key: 'level_acr',

      sorter: (a, b) => (a.level_acr > b.level_acr) - (a.level_acr < b.level_acr)
    },
    {
      title: 'Name',
      dataIndex: 'level_name',
      align: 'center',
      key: 'level_name',

      sorter: (a, b) => (a.level_name > b.level_name) - (a.level_name < b.level_name)
    },
    {
      title: 'Sport',
      dataIndex: 'sport.sport_name',
      align: 'center',
      key: 'sport.sport_name',

      sorter: (a, b) => a.sport && b.sport ? (a.sport.sport_name > b.sport.sport_name) - (a.sport.sport_name < b.sport.sport_name) : 0
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
    return this.id_level
  }
  class_name () {
    return 'Levels'
  }
}
