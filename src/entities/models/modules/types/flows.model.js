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

const url = 'types/flows'

export default class Flows extends BaseModel {
       id_flow
       flow_acr
       flow_name
       flow_description

       constructor (attributes = null) {
         super()
         if (attributes != null) {
           this.id_flow = attributes.id_flow || undefined
           this.flow_acr = attributes.flow_acr || null
           this.flow_name = attributes.flow_name || null
           this.flow_description = attributes.flow_description || null
         }
       }

       set_attributes (attributes = null) {
         if (attributes != null) {
           this.id_flow = attributes.id_flow
           this.flow_acr = attributes.flow_acr
           this.flow_name = attributes.flow_name
           this.flow_description = attributes.flow_description
         }
       }

    static validations = {
      flows: {
        flow_acr: {
          maxLength: maxLength(20)
        },
        flow_name: {
          required,
          maxLength: maxLength(30)
        },
        flow_description: {
          maxLength: maxLength(65535)
        }
      }
    }

    static feedbacks = {
      flows: {
        id_flow: {
          isUnique: 'This id_flow has been taken'

        }
      }
    }

  static columns = [
    {
      title: 'Acronym',
      dataIndex: 'flow_acr',
      align: 'center',
      key: 'flow_acr',

      sorter: (a, b) => (a.flow_acr > b.flow_acr) - (a.flow_acr < b.flow_acr)
    },
    {
      title: 'Name',
      dataIndex: 'flow_name',
      align: 'center',
      key: 'flow_name',

      sorter: (a, b) => (a.flow_name > b.flow_name) - (a.flow_name < b.flow_name)
    },
    {
      title: 'Description',
      dataIndex: 'flow_description',
      align: 'center',
      key: 'flow_description',

      sorter: (a, b) => (a.flow_description > b.flow_description) - (a.flow_description < b.flow_description)
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
    return this.id_flow
  }
  class_name () {
    return 'Flows'
  }
}
