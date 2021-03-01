/**Generate by ASGENS
*@author Charlietyn 
*@date Wed Feb 24 11:33:44 GMT-05:00 2021  
*@time Wed Feb 24 11:33:44 GMT-05:00 2021  
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

  const url = 'entities/eval';

    export default class Eval extends BaseModel {

       id_eval
       test_id
       level_id
       session_id
       student_id
       user_id
       score

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_eval = attributes.id_eval|| undefined
        this.test_id = attributes.test_id|| null
        this.level_id = attributes.level_id|| null
        this.session_id = attributes.session_id|| null
        this.student_id = attributes.student_id|| null
        this.user_id = attributes.user_id|| null
        this.score = attributes.score|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_eval = attributes.id_eval
        this.test_id = attributes.test_id
        this.level_id = attributes.level_id
        this.session_id = attributes.session_id
        this.student_id = attributes.student_id
        this.user_id = attributes.user_id
        this.score = attributes.score
      }
    }

    static validations = {
      eval: {
        test_id: {
          required,
          integer,
        },
        level_id: {
          required,
          integer,
        },
        session_id: {
          required,
          integer,
        },
        student_id: {
          required,
          integer,
        },
        user_id: {
          required,
          integer,
        },
        score: {
          required,
          integer,
        },
      },
    }

    static feedbacks = {
      eval: {
      id_eval: {
        isUnique: 'This id_eval has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Test',
      dataIndex: 'test.id_test',
      align:'center',
      key: 'test.id_test',

      sorter: (a, b) => a.test && b.test?a.test.id_test - b.test.id_test:0
    },
    {
      title: 'Level',
      dataIndex: 'level.level_acr',
      align:'center',
      key: 'level.level_acr',

      sorter: (a, b) =>  a.level && b.level?(a.level.level_acr > b.level.level_acr)-(a.level.level_acr < b.level.level_acr):0
    },
    {
      title: 'Session',
      dataIndex: 'session.session_name',
      align:'center',
      key: 'session.session_name',

      sorter: (a, b) =>  a.session && b.session?(a.session.session_name > b.session.session_name)-(a.session.session_name < b.session.session_name):0
    },
    {
      title: 'Student',
      dataIndex: 'student.student_address1',
      align:'center',
      key: 'student.student_address1',

      sorter: (a, b) =>  a.student && b.student?(a.student.student_address1 > b.student.student_address1)-(a.student.student_address1 < b.student.student_address1):0
    },
    {
      title: 'User',
      dataIndex: 'user.teacher_address',
      align:'center',
      key: 'user.teacher_address',

      sorter: (a, b) =>  a.user && b.user?(a.user.teacher_address > b.user.teacher_address)-(a.user.teacher_address < b.user.teacher_address):0
    },
    {
      title: 'Score',
      dataIndex: 'score',
      align:'center',
      key: 'score',

      sorter: (a, b) => a.score - b.score
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
      return this.id_eval;
    }
    class_name() {
        return 'Eval'
      }
  

   }

