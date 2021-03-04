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

const url = 'types/countries'

export default class Countries extends BaseModel {
       id_country
       country_acr
       country_name

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_country = attributes.id_country || undefined
           this.country_acr = attributes.country_acr || null
           this.country_name = attributes.country_name || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_country = attributes.id_country
           this.country_acr = attributes.country_acr
           this.country_name = attributes.country_name
         }
       }

    static validations = {
      countries: {
        country_acr: {
          maxLength: maxLength(10)
        },
        country_name: {
          required,
          maxLength: maxLength(50),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_country, country_name} = object
            const _scenario = id_country ? 'update' : 'create'
            const params = {id_country, country_name}
            const validation = await Countries.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        }
      }
    }

    static feedbacks = {
      countries: {
        id_country: {
          isUnique: 'This id_country has been taken'

        },
        country_name: {
          isUnique: 'This name has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Acronym',
      dataIndex: 'country_acr',
      align: 'center',
      key: 'country_acr',

      sorter: (a, b) => (a.country_acr > b.country_acr) - (a.country_acr < b.country_acr)
    },
    {
      title: 'Name',
      dataIndex: 'country_name',
      align: 'center',
      key: 'country_name',

      sorter: (a, b) => (a.country_name > b.country_name) - (a.country_name < b.country_name)
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
    return this.id_country
  }
  class_name () {
    return 'Countries'
  }
}
