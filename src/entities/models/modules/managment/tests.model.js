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

import moment from 'moment'

const url = 'management/tests'

export default class Tests extends BaseModel {
       id_test
       test_name
       test_date
       flow_id
       sport_id
       type_id
       school_id
       status_id
       final_date

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_test = attributes.id_test || undefined
           this.test_name = attributes.test_name || null
           this.test_date = attributes.test_date ? moment(attributes.test_date).format('YYYY-MM-DD') : null
           this.test_date = attributes.test_date || null
           this.flow_id = attributes.flow_id || null
           this.sport_id = attributes.sport_id || null
           this.type_id = attributes.type_id || null
           this.school_id = attributes.school_id || null
           this.status_id = attributes.status_id || null
           this.final_date = attributes.final_date ? moment(attributes.final_date).format('YYYY-MM-DD') : null
           this.final_date = attributes.final_date || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_test = attributes.id_test
           this.test_name = attributes.test_name
           this.test_date = moment(attributes.test_date).format('YYYY-MM-DD')
           this.flow_id = attributes.flow_id
           this.sport_id = attributes.sport_id
           this.type_id = attributes.type_id
           this.school_id = attributes.school_id
           this.status_id = attributes.status_id
           this.final_date = moment(attributes.final_date).format('YYYY-MM-DD')
         }
       }

    static validations = {
      tests: {
        test_name: {
          required,
          integer
        },
        test_date: {
          required
        },
        flow_id: {
          required,
          integer
        },
        sport_id: {
          required,
          integer
        },
        type_id: {
          required,
          integer
        },
        school_id: {
          required,
          integer
        },
        status_id: {
          required,
          integer
        },
        final_date: {
        }
      }
    }

    static feedbacks = {
      tests: {
        id_test: {
          isUnique: 'This id_test has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Name',
      dataIndex: 'test_name',
      align: 'center',
      key: 'test_name',

      sorter: (a, b) => a.test_name - b.test_name
    },
    {
      title: 'Start Date',
      dataIndex: 'test_date',
      align: 'center',
      key: 'test_date',

      sorter: (a, b) => a.test_date - b.test_date
    },
    {
      title: 'Flow',
      dataIndex: 'flow.flow_acr',
      align: 'center',
      key: 'flow.flow_acr',

      sorter: (a, b) => a.flow && b.flow ? (a.flow.flow_acr > b.flow.flow_acr) - (a.flow.flow_acr < b.flow.flow_acr) : 0
    },
    {
      title: 'Sport',
      dataIndex: 'sport.sport_name',
      align: 'center',
      key: 'sport.sport_name',

      sorter: (a, b) => a.sport && b.sport ? (a.sport.sport_name > b.sport.sport_name) - (a.sport.sport_name < b.sport.sport_name) : 0
    },
    {
      title: 'Type',
      dataIndex: 'type.type_acr',
      align: 'center',
      key: 'type.type_acr',

      sorter: (a, b) => a.type && b.type ? (a.type.type_acr > b.type.type_acr) - (a.type.type_acr < b.type.type_acr) : 0
    },
    {
      title: 'School',
      dataIndex: 'school.school_name',
      align: 'center',
      key: 'school.school_name',

      sorter: (a, b) => a.school && b.school ? (a.school.school_name > b.school.school_name) - (a.school.school_name < b.school.school_name) : 0
    },
    {
      title: 'Status',
      dataIndex: 'status.status_acr',
      align: 'center',
      key: 'status.status_acr',

      sorter: (a, b) => a.status && b.status ? (a.status.status_acr > b.status.status_acr) - (a.status.status_acr < b.status.status_acr) : 0
    },
    {
      title: 'Final Date',
      dataIndex: 'final_date',
      align: 'center',
      key: 'final_date',

      sorter: (a, b) => a.final_date - b.final_date
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
    return this.id_test
  }
  class_name () {
    return 'Tests'
  }
}
