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

import Users from '../../modules/security/users.model'

const url = 'entities/principals'

export default class Principals extends Users {
       user_id

       constructor (attributes = null) {
         super(attributes)
         if (attributes != null) {
           this.user_id = attributes.user_id || undefined
         }
       }

       set_attributes (attributes = null) {
         super.set_attributes(attributes)
         if (attributes != null) {
           this.user_id = attributes.user_id
         }
       }

    static validations = {
      principals: {
        user_first_name: {
          required,
          maxLength: maxLength(50)
        },
        user_last_name: {
          required,
          maxLength: maxLength(50)
        },
        user_email: {
          required,
          maxLength: maxLength(50)
        },
        user_phone: {
          maxLength: maxLength(30)
        },
        user_password: {
          maxLength: maxLength(50)
        },
        role_id: {
          required,
          integer
        },
        user_id: {
          required,
          integer
        }
      }
    }

    static feedbacks = {
      principals: {
        user_id: {
          isUnique: 'This user_id has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'First Name',
      dataIndex: 'user_first_name',
      align: 'center',
      key: 'user_first_name',

      sorter: (a, b) => (a.user_first_name > b.user_first_name) - (a.user_first_name < b.user_first_name)
    },
    {
      title: 'Last Name',
      dataIndex: 'user_last_name',
      align: 'center',
      key: 'user_last_name',

      sorter: (a, b) => (a.user_last_name > b.user_last_name) - (a.user_last_name < b.user_last_name)
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      align: 'center',
      key: 'user_email',

      sorter: (a, b) => (a.user_email > b.user_email) - (a.user_email < b.user_email)
    },
    {
      title: 'Phone',
      dataIndex: 'user_phone',
      align: 'center',
      key: 'user_phone',

      sorter: (a, b) => (a.user_phone > b.user_phone) - (a.user_phone < b.user_phone)
    },
    {
      title: 'User_password',
      dataIndex: 'user_password',
      align: 'center',
      key: 'user_password',

      sorter: (a, b) => (a.user_password > b.user_password) - (a.user_password < b.user_password)
    },
    {
      title: 'Role',
      dataIndex: 'role.role_name',
      align: 'center',
      key: 'role.role_name',

      sorter: (a, b) => a.role && b.role ? (a.role.role_name > b.role.role_name) - (a.role.role_name < b.role.role_name) : 0
    },
    {
      title: 'User',
      dataIndex: 'user.user_first_name',
      align: 'center',
      key: 'user.user_first_name',

      sorter: (a, b) => a.user && b.user ? (a.user.user_first_name > b.user.user_first_name) - (a.user.user_first_name < b.user.user_first_name) : 0
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
    return this.user_id
  }
  class_name () {
    return 'Principals'
  }
}
