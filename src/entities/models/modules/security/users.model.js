/**Generate by ASGENS
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
  } from 'vuelidate/lib/validators';

  import BaseModel from '../../base.model';

  const url = 'security/users';

    export default class Users extends BaseModel {

       id_user
       user_first_name
       user_last_name
       user_email
       user_phone
       user_password
       role_id

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_user = attributes.id_user|| undefined
        this.user_first_name = attributes.user_first_name|| null
        this.user_last_name = attributes.user_last_name|| null
        this.user_email = attributes.user_email|| null
        this.user_phone = attributes.user_phone|| null
        this.user_password = attributes.user_password|| null
        this.role_id = attributes.role_id|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_user = attributes.id_user
        this.user_first_name = attributes.user_first_name
        this.user_last_name = attributes.user_last_name
        this.user_email = attributes.user_email
        this.user_phone = attributes.user_phone
        this.user_password = attributes.user_password
        this.role_id = attributes.role_id
      }
    }

    static validations = {
      users: {
        user_first_name: {
          required,
        },
        user_last_name: {
          required,
        },
        user_email: {
          required,
        },
        user_phone: {
        },
        user_password: {
        },
        role_id: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      users: {
      id_user: {
        isUnique: 'This id_user has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'User_first_name',
      dataIndex: 'user_first_name',
      align:'center',
      key: 'user_first_name',

      sorter: (a, b) =>  (a.user_first_name > b.user_first_name)-(a.user_first_name < b.user_first_name)
    },
    {
      title: 'User_last_name',
      dataIndex: 'user_last_name',
      align:'center',
      key: 'user_last_name',

      sorter: (a, b) =>  (a.user_last_name > b.user_last_name)-(a.user_last_name < b.user_last_name)
    },
    {
      title: 'User_email',
      dataIndex: 'user_email',
      align:'center',
      key: 'user_email',

      sorter: (a, b) =>  (a.user_email > b.user_email)-(a.user_email < b.user_email)
    },
    {
      title: 'User_phone',
      dataIndex: 'user_phone',
      align:'center',
      key: 'user_phone',

      sorter: (a, b) =>  (a.user_phone > b.user_phone)-(a.user_phone < b.user_phone)
    },
    {
      title: 'User_password',
      dataIndex: 'user_password',
      align:'center',
      key: 'user_password',

      sorter: (a, b) =>  (a.user_password > b.user_password)-(a.user_password < b.user_password)
    },
    {
      title: 'Role',
      dataIndex: 'role.role_name',
      align:'center',
      key: 'role.role_name',

      sorter: (a, b) =>  a.role && b.role?(a.role.role_name > b.role.role_name)-(a.role.role_name < b.role.role_name):0
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

    static get url() {
      return url
    };
  
    get url() {
      return url
    };
  
    get_id() {
      return this.id_user;
    }
    class_name() {
        return 'Users'
      }
  

   }

