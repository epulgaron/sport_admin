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

const url = 'entities/schools'

export default class Schools extends BaseModel {
       id_school
       school_name
       school_email
       school_phone
       school_address1
       school_address2
       school_city
       school_state
       country_id
       school_zip_code
       school_logo

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_school = attributes.id_school || undefined
           this.school_name = attributes.school_name || null
           this.school_email = attributes.school_email || null
           this.school_phone = attributes.school_phone || null
           this.school_address1 = attributes.school_address1 || null
           this.school_address2 = attributes.school_address2 || null
           this.school_city = attributes.school_city || null
           this.school_state = attributes.school_state || null
           this.country_id = attributes.country_id || null
           this.school_zip_code = attributes.school_zip_code || null
           this.school_logo = attributes.school_logo || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_school = attributes.id_school
           this.school_name = attributes.school_name
           this.school_email = attributes.school_email
           this.school_phone = attributes.school_phone
           this.school_address1 = attributes.school_address1
           this.school_address2 = attributes.school_address2
           this.school_city = attributes.school_city
           this.school_state = attributes.school_state
           this.country_id = attributes.country_id
           this.school_zip_code = attributes.school_zip_code
           this.school_logo = attributes.school_logo
         }
       }

    static validations = {
      schools: {
        school_name: {
          required,
          maxLength: maxLength(100),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_school, school_name} = object
            const _scenario = id_school ? 'update' : 'create'
            const params = {id_school, school_name}
            const validation = await Schools.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        school_email: {
          required,
          maxLength: maxLength(50),
          async isUnique (value, object) {
            if (!value) { return true }
            const _specific = true
            const {id_school, school_email} = object
            const _scenario = id_school ? 'update' : 'create'
            const params = {id_school, school_email}
            const validation = await Schools.validate({...params, _scenario, _specific})
            return !validation.data ? false : validation.data.success
          }
        },
        school_phone: {
          maxLength: maxLength(30)
        },
        school_address1: {
          required,
          maxLength: maxLength(100)
        },
        school_address2: {
          maxLength: maxLength(100)
        },
        school_city: {
          maxLength: maxLength(50)
        },
        school_state: {
          maxLength: maxLength(50)
        },
        country_id: {
          integer
        },
        school_zip_code: {
          integer,
          maxLength: maxLength(11)
        },
        school_logo: {
        }
      }
    }

    static feedbacks = {
      schools: {
        id_school: {
          isUnique: 'This id_school has been taken'

        },
        school_name: {
          isUnique: 'This name has been taken'

        },
        school_email: {
          isUnique: 'This email has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Name',
      dataIndex: 'school_name',
      align: 'center',
      key: 'school_name',

      sorter: (a, b) => (a.school_name > b.school_name) - (a.school_name < b.school_name)
    },
    {
      title: 'Email',
      dataIndex: 'school_email',
      align: 'center',
      key: 'school_email',

      sorter: (a, b) => (a.school_email > b.school_email) - (a.school_email < b.school_email)
    },
    {
      title: 'Phone',
      dataIndex: 'school_phone',
      align: 'center',
      key: 'school_phone',

      sorter: (a, b) => (a.school_phone > b.school_phone) - (a.school_phone < b.school_phone)
    },
    {
      title: 'Address 1',
      dataIndex: 'school_address1',
      align: 'center',
      key: 'school_address1',

      sorter: (a, b) => (a.school_address1 > b.school_address1) - (a.school_address1 < b.school_address1)
    },
    {
      title: 'Address 2',
      dataIndex: 'school_address2',
      align: 'center',
      key: 'school_address2',

      sorter: (a, b) => (a.school_address2 > b.school_address2) - (a.school_address2 < b.school_address2)
    },
    {
      title: 'City',
      dataIndex: 'school_city',
      align: 'center',
      key: 'school_city',

      sorter: (a, b) => (a.school_city > b.school_city) - (a.school_city < b.school_city)
    },
    {
      title: 'State',
      dataIndex: 'school_state',
      align: 'center',
      key: 'school_state',

      sorter: (a, b) => (a.school_state > b.school_state) - (a.school_state < b.school_state)
    },
    {
      title: 'Country',
      dataIndex: 'country.country_acr',
      align: 'center',
      key: 'country.country_acr',

      sorter: (a, b) => a.country && b.country ? (a.country.country_acr > b.country.country_acr) - (a.country.country_acr < b.country.country_acr) : 0
    },
    {
      title: 'Zip Code',
      dataIndex: 'school_zip_code',
      align: 'center',
      key: 'school_zip_code',

      sorter: (a, b) => a.school_zip_code - b.school_zip_code
    },
    {
      title: 'Logo',
      dataIndex: 'school_logo',
      align: 'center',
      key: 'school_logo',

      sorter: (a, b) => (a.school_logo > b.school_logo) - (a.school_logo < b.school_logo)
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
    return this.id_school
  }
  class_name () {
    return 'Schools'
  }
}
