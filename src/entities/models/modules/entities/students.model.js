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

  import moment from 'moment';

  import Users from '../../modules/security/users.model';

  const url = 'entities/students';

    export default class Students extends Users {

       user_id
       student_address1
       student_address2
       student_city
       student_state
       student_zip_code
       student_dob
       student_picture
       student_legal_age
       student_tutor_first_name
       student_tutor_last_name
       studen_tutor_email
       school_id

    constructor(attributes = null) {
      super(attributes);
      if (attributes != null) {

        this.user_id = attributes.user_id|| undefined
        this.student_address1 = attributes.student_address1|| null
        this.student_address2 = attributes.student_address2|| null
        this.student_city = attributes.student_city|| null
        this.student_state = attributes.student_state|| null
        this.student_zip_code = attributes.student_zip_code|| null
        this.student_dob = attributes.student_dob?moment(attributes.student_dob).format('YYYY-MM-DD'):null
        this.student_dob = attributes.student_dob|| null
        this.student_picture = attributes.student_picture|| null
        this.student_legal_age = attributes.student_legal_age=='1'?true:false
        this.student_tutor_first_name = attributes.student_tutor_first_name|| null
        this.student_tutor_last_name = attributes.student_tutor_last_name|| null
        this.studen_tutor_email = attributes.studen_tutor_email|| null
        this.school_id = attributes.school_id|| null
      }
    }

    set_attributes(attributes = null) {
      super.set_attributes(attributes);
      if (attributes != null) {

        this.user_id = attributes.user_id
        this.student_address1 = attributes.student_address1
        this.student_address2 = attributes.student_address2
        this.student_city = attributes.student_city
        this.student_state = attributes.student_state
        this.student_zip_code = attributes.student_zip_code
        this.student_dob = moment(attributes.student_dob).format('YYYY-MM-DD')
        this.student_picture = attributes.student_picture
        this.student_legal_age = attributes.student_legal_age
        this.student_tutor_first_name = attributes.student_tutor_first_name
        this.student_tutor_last_name = attributes.student_tutor_last_name
        this.studen_tutor_email = attributes.studen_tutor_email
        this.school_id = attributes.school_id
      }
    }

    static validations = {
      students: {
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
        user_id: {
          required,
          integer,
        },
        student_address1: {
          required,
        },
        student_address2: {
        },
        student_city: {
        },
        student_state: {
        },
        student_zip_code: {
          integer,
        },
        student_dob: {
        },
        student_picture: {
        },
        student_legal_age: {
          integer,
        },
        student_tutor_first_name: {
          required,
        },
        student_tutor_last_name: {
        },
        studen_tutor_email: {
        },
        school_id: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      students: {
      user_id: {
        isUnique: 'This user_id has been taken' 

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
      title: 'User',
      dataIndex: 'user.user_first_name',
      align:'center',
      key: 'user.user_first_name',

      sorter: (a, b) =>  a.user && b.user?(a.user.user_first_name > b.user.user_first_name)-(a.user.user_first_name < b.user.user_first_name):0
    },
    {
      title: 'Student_address1',
      dataIndex: 'student_address1',
      align:'center',
      key: 'student_address1',

      sorter: (a, b) =>  (a.student_address1 > b.student_address1)-(a.student_address1 < b.student_address1)
    },
    {
      title: 'Student_address2',
      dataIndex: 'student_address2',
      align:'center',
      key: 'student_address2',

      sorter: (a, b) =>  (a.student_address2 > b.student_address2)-(a.student_address2 < b.student_address2)
    },
    {
      title: 'Student_city',
      dataIndex: 'student_city',
      align:'center',
      key: 'student_city',

      sorter: (a, b) =>  (a.student_city > b.student_city)-(a.student_city < b.student_city)
    },
    {
      title: 'Student_state',
      dataIndex: 'student_state',
      align:'center',
      key: 'student_state',

      sorter: (a, b) =>  (a.student_state > b.student_state)-(a.student_state < b.student_state)
    },
    {
      title: 'Student_zip_code',
      dataIndex: 'student_zip_code',
      align:'center',
      key: 'student_zip_code',

      sorter: (a, b) => a.student_zip_code - b.student_zip_code
    },
    {
      title: 'Student_dob',
      dataIndex: 'student_dob',
      align:'center',
      key: 'student_dob',

      sorter: (a, b) => a.student_dob - b.student_dob
    },
    {
      title: 'Student_picture',
      dataIndex: 'student_picture',
      align:'center',
      key: 'student_picture',

      sorter: (a, b) =>  (a.student_picture > b.student_picture)-(a.student_picture < b.student_picture)
    },
    {
      title: 'Student_legal_age',
      dataIndex: 'student_legal_age',
      align:'center',
      key: 'student_legal_age',

      sorter: (a, b) => a.student_legal_age - b.student_legal_age
    },
    {
      title: 'Student_tutor_first_name',
      dataIndex: 'student_tutor_first_name',
      align:'center',
      key: 'student_tutor_first_name',

      sorter: (a, b) =>  (a.student_tutor_first_name > b.student_tutor_first_name)-(a.student_tutor_first_name < b.student_tutor_first_name)
    },
    {
      title: 'Student_tutor_last_name',
      dataIndex: 'student_tutor_last_name',
      align:'center',
      key: 'student_tutor_last_name',

      sorter: (a, b) =>  (a.student_tutor_last_name > b.student_tutor_last_name)-(a.student_tutor_last_name < b.student_tutor_last_name)
    },
    {
      title: 'Studen_tutor_email',
      dataIndex: 'studen_tutor_email',
      align:'center',
      key: 'studen_tutor_email',

      sorter: (a, b) =>  (a.studen_tutor_email > b.studen_tutor_email)-(a.studen_tutor_email < b.studen_tutor_email)
    },
    {
      title: 'School',
      dataIndex: 'school.school_name',
      align:'center',
      key: 'school.school_name',

      sorter: (a, b) =>  a.school && b.school?(a.school.school_name > b.school.school_name)-(a.school.school_name < b.school.school_name):0
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
      return this.user_id;
    }
    class_name() {
        return 'Students'
      }
  

   }

