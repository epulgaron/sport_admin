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

const url = 'entities/teachers'

export default class Teachers extends Users {
       user_id
       teacher_address
       school_id
       external

       constructor (attributes = null) {
         super(attributes)
         if (attributes != null) {
           this.user_id = attributes.user_id || undefined
           this.teacher_address = attributes.teacher_address || ''
           this.school_id = attributes.school_id || ''
           this.external = attributes.external == '1'
         }
       }

       set_attributes (attributes = null) {
         super.set_attributes(attributes)
         if (attributes != null) {
           this.user_id = attributes.user_id
           this.teacher_address = attributes.teacher_address
           this.school_id = attributes.school_id
           this.external = attributes.external
         }
       }

    static validations = {
      teachers: {
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
        },
        teacher_address: {
          maxLength: maxLength(100)
        },
        school_id: {
          required,
          integer
        },
        external: {
          integer
        }
      }
    }

    static feedbacks = {
      teachers: {
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
      title: 'Address',
      dataIndex: 'teacher_address',
      align: 'center',
      key: 'teacher_address',

      sorter: (a, b) => (a.teacher_address > b.teacher_address) - (a.teacher_address < b.teacher_address)
    },
    {
      title: 'School',
      dataIndex: 'school.school_name',
      align: 'center',
      key: 'school.school_name',

      sorter: (a, b) => a.school && b.school ? (a.school.school_name > b.school.school_name) - (a.school.school_name < b.school.school_name) : 0
    },
    {
      title: 'External',
      dataIndex: 'external',
      align: 'center',
      key: 'external',

      sorter: (a, b) => a.external - b.external
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
    return 'Teachers'
  }
}
