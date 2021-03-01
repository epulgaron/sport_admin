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

  const url = 'security/role_permission_list';

    export default class Role_permission_list extends BaseModel {

       id_role_permission
       role_id
       permission_id

    constructor(attributes = null) {
      super();
      if (attributes != null) {

        this.id_role_permission = attributes.id_role_permission|| undefined
        this.role_id = attributes.role_id|| null
        this.permission_id = attributes.permission_id|| null
      }
    }

    set_attributes(attributes = null) {
      if (attributes != null) {

        this.id_role_permission = attributes.id_role_permission
        this.role_id = attributes.role_id
        this.permission_id = attributes.permission_id
      }
    }

    static validations = {
      role_permission_list: {
        role_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_role_permission,role_id,permission_id}=object
               const _scenario=id_role_permission?'update':'create'
               const params={id_role_permission,role_id,permission_id}
               const validation= await Role_permission_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
        permission_id: {
          required,
          integer,
          async isUnique(value,object) {
               if(!value)
                   return true
               const _specific=true
               const {id_role_permission,role_id,permission_id}=object
               const _scenario=id_role_permission?'update':'create'
               const params={id_role_permission,role_id,permission_id}
               const validation= await Role_permission_list.validate({...params,_scenario,_specific})
               return !validation.data?false:validation.data.success
        }
        },
      },
    }

    static feedbacks = {
      role_permission_list: {
      id_role_permission: {
        isUnique: 'This id_role_permission has been taken' 

      },
      role_id: {
        isUnique: 'The combination of role_id, permission_id has benn taken' 

      },
      permission_id: {
        isUnique: 'The combination of role_id, permission_id has benn taken' 

      },
      },
    }

  static columns = [
    {
      title: 'Role',
      dataIndex: 'role.role_name',
      align:'center',
      key: 'role.role_name',

      sorter: (a, b) =>  a.role && b.role?(a.role.role_name > b.role.role_name)-(a.role.role_name < b.role.role_name):0
    },
    {
      title: 'Permission',
      dataIndex: 'permission.permission_name',
      align:'center',
      key: 'permission.permission_name',

      sorter: (a, b) =>  a.permission && b.permission?(a.permission.permission_name > b.permission.permission_name)-(a.permission.permission_name < b.permission.permission_name):0
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
      return this.id_role_permission;
    }
    class_name() {
        return 'Role_permission_list'
      }
  

   }

