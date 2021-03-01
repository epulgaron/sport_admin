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

  const url = 'types/sports';

    export default class Sports extends BaseModel {

       id_sport
       sport_name

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_sport = attributes.id_sport|| undefined
        this.sport_name = attributes.sport_name|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_sport = attributes.id_sport
        this.sport_name = attributes.sport_name
      }
    }

    static validations = {
      sports: {
        sport_name: {
          required,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_sport,sport_name}=object
               const _scenario=id_sport?'update':'create'
               const params={id_sport,sport_name}
               const validation= await Sports.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
      },
    }

    static feedbacks = {
      sports: {
      id_sport: {
        isUnique: 'This id_sport has been taken' 

      },
      sport_name: {
        isUnique: 'This sport_name has been taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Sport_name',
      dataIndex: 'sport_name',
      align:'center',
      key: 'sport_name',

      sorter: (a, b) =>  (a.sport_name > b.sport_name)-(a.sport_name < b.sport_name)
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
      return this.id_sport;
    }
    class_name() {
        return 'Sports'
      }
  

   }

