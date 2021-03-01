import Vue from 'vue'
import Router from 'vue-router'
import index from '../../components/views/site/index'

Vue.use(Router)

export default new Router({
    mode: 'history',
    hash: false,
    routes: [
         {
      path: '/',
      name: 'index',
      component: index,
      props: {page: 1}
    },
{
             path: '*',
             redirect: '/'
         },
       {
            path: '/security/roles_list',
            name: 'roles_list',
            component: require('../../components/views/security/roles/list/roles_list').default,
            props: {page: 1}
        },
       {
            path: '/security/roles_form',
            name: 'roles_form',
            component: require('../../components/views/security/roles/form/roles_form').default,
            props: {page: 1}
        },
       {
            path: '/security/users_list',
            name: 'users_list',
            component: require('../../components/views/security/users/list/users_list').default,
            props: {page: 1}
        },
       {
            path: '/security/users_form',
            name: 'users_form',
            component: require('../../components/views/security/users/form/users_form').default,
            props: {page: 1}
        },
       {
            path: '/security/permissions_list',
            name: 'permissions_list',
            component: require('../../components/views/security/permissions/list/permissions_list').default,
            props: {page: 1}
        },
       {
            path: '/security/permissions_form',
            name: 'permissions_form',
            component: require('../../components/views/security/permissions/form/permissions_form').default,
            props: {page: 1}
        },
       {
            path: '/security/role_permission_list_list',
            name: 'role_permission_list_list',
            component: require('../../components/views/security/role_permission_list/list/role_permission_list_list').default,
            props: {page: 1}
        },
       {
            path: '/security/role_permission_list_form',
            name: 'role_permission_list_form',
            component: require('../../components/views/security/role_permission_list/form/role_permission_list_form').default,
            props: {page: 1}
        },
       {
            path: '/types/countries_list',
            name: 'countries_list',
            component: require('../../components/views/types/countries/list/countries_list').default,
            props: {page: 1}
        },
       {
            path: '/types/countries_form',
            name: 'countries_form',
            component: require('../../components/views/types/countries/form/countries_form').default,
            props: {page: 1}
        },
       {
            path: '/types/levels_list',
            name: 'levels_list',
            component: require('../../components/views/types/levels/list/levels_list').default,
            props: {page: 1}
        },
       {
            path: '/types/levels_form',
            name: 'levels_form',
            component: require('../../components/views/types/levels/form/levels_form').default,
            props: {page: 1}
        },
       {
            path: '/types/sports_list',
            name: 'sports_list',
            component: require('../../components/views/types/sports/list/sports_list').default,
            props: {page: 1}
        },
       {
            path: '/types/sports_form',
            name: 'sports_form',
            component: require('../../components/views/types/sports/form/sports_form').default,
            props: {page: 1}
        },
       {
            path: '/types/status_list',
            name: 'status_list',
            component: require('../../components/views/types/status/list/status_list').default,
            props: {page: 1}
        },
       {
            path: '/types/status_form',
            name: 'status_form',
            component: require('../../components/views/types/status/form/status_form').default,
            props: {page: 1}
        },
       {
            path: '/types/types_list',
            name: 'types_list',
            component: require('../../components/views/types/types/list/types_list').default,
            props: {page: 1}
        },
       {
            path: '/types/types_form',
            name: 'types_form',
            component: require('../../components/views/types/types/form/types_form').default,
            props: {page: 1}
        },
       {
            path: '/types/contents_list',
            name: 'contents_list',
            component: require('../../components/views/types/contents/list/contents_list').default,
            props: {page: 1}
        },
       {
            path: '/types/contents_form',
            name: 'contents_form',
            component: require('../../components/views/types/contents/form/contents_form').default,
            props: {page: 1}
        },
       {
            path: '/types/error_level_list',
            name: 'error_level_list',
            component: require('../../components/views/types/error_level/list/error_level_list').default,
            props: {page: 1}
        },
       {
            path: '/types/error_level_form',
            name: 'error_level_form',
            component: require('../../components/views/types/error_level/form/error_level_form').default,
            props: {page: 1}
        },
       {
            path: '/types/flows_list',
            name: 'flows_list',
            component: require('../../components/views/types/flows/list/flows_list').default,
            props: {page: 1}
        },
       {
            path: '/types/flows_form',
            name: 'flows_form',
            component: require('../../components/views/types/flows/form/flows_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/content_error_list_list',
            name: 'content_error_list_list',
            component: require('../../components/views/managment/content_error_list/list/content_error_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/content_error_list_form',
            name: 'content_error_list_form',
            component: require('../../components/views/managment/content_error_list/form/content_error_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/content_level_list_list',
            name: 'content_level_list_list',
            component: require('../../components/views/managment/content_level_list/list/content_level_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/content_level_list_form',
            name: 'content_level_list_form',
            component: require('../../components/views/managment/content_level_list/form/content_level_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/error_level_list_list',
            name: 'error_level_list_list',
            component: require('../../components/views/managment/error_level_list/list/error_level_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/error_level_list_form',
            name: 'error_level_list_form',
            component: require('../../components/views/managment/error_level_list/form/error_level_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/principal_school_list_list',
            name: 'principal_school_list_list',
            component: require('../../components/views/managment/principal_school_list/list/principal_school_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/principal_school_list_form',
            name: 'principal_school_list_form',
            component: require('../../components/views/managment/principal_school_list/form/principal_school_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/session_level_list_list',
            name: 'session_level_list_list',
            component: require('../../components/views/managment/session_level_list/list/session_level_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/session_level_list_form',
            name: 'session_level_list_form',
            component: require('../../components/views/managment/session_level_list/form/session_level_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/sport_student_list_list',
            name: 'sport_student_list_list',
            component: require('../../components/views/managment/sport_student_list/list/sport_student_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/sport_student_list_form',
            name: 'sport_student_list_form',
            component: require('../../components/views/managment/sport_student_list/form/sport_student_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/teacher_sport_list_list',
            name: 'teacher_sport_list_list',
            component: require('../../components/views/managment/teacher_sport_list/list/teacher_sport_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/teacher_sport_list_form',
            name: 'teacher_sport_list_form',
            component: require('../../components/views/managment/teacher_sport_list/form/teacher_sport_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_level_list_list',
            name: 'test_level_list_list',
            component: require('../../components/views/managment/test_level_list/list/test_level_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_level_list_form',
            name: 'test_level_list_form',
            component: require('../../components/views/managment/test_level_list/form/test_level_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_session_list_list',
            name: 'test_session_list_list',
            component: require('../../components/views/managment/test_session_list/list/test_session_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_session_list_form',
            name: 'test_session_list_form',
            component: require('../../components/views/managment/test_session_list/form/test_session_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_student_list_list',
            name: 'test_student_list_list',
            component: require('../../components/views/managment/test_student_list/list/test_student_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_student_list_form',
            name: 'test_student_list_form',
            component: require('../../components/views/managment/test_student_list/form/test_student_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_teacher_list_list',
            name: 'test_teacher_list_list',
            component: require('../../components/views/managment/test_teacher_list/list/test_teacher_list_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/test_teacher_list_form',
            name: 'test_teacher_list_form',
            component: require('../../components/views/managment/test_teacher_list/form/test_teacher_list_form').default,
            props: {page: 1}
        },
       {
            path: '/managment/tests_list',
            name: 'tests_list',
            component: require('../../components/views/managment/tests/list/tests_list').default,
            props: {page: 1}
        },
       {
            path: '/managment/tests_form',
            name: 'tests_form',
            component: require('../../components/views/managment/tests/form/tests_form').default,
            props: {page: 1}
        },
       {
            path: '/entities/principals_list',
            name: 'principals_list',
            component: require('../../components/views/entities/principals/list/principals_list').default,
            props: {page: 1}
        },
       {
            path: '/entities/principals_form',
            name: 'principals_form',
            component: require('../../components/views/entities/principals/form/principals_form').default,
            props: {page: 1}
        },
       {
            path: '/entities/students_list',
            name: 'students_list',
            component: require('../../components/views/entities/students/list/students_list').default,
            props: {page: 1}
        },
       {
            path: '/entities/students_form',
            name: 'students_form',
            component: require('../../components/views/entities/students/form/students_form').default,
            props: {page: 1}
        },
       {
            path: '/entities/teachers_list',
            name: 'teachers_list',
            component: require('../../components/views/entities/teachers/list/teachers_list').default,
            props: {page: 1}
        },
       {
            path: '/entities/teachers_form',
            name: 'teachers_form',
            component: require('../../components/views/entities/teachers/form/teachers_form').default,
            props: {page: 1}
        },
       {
            path: '/entities/sessions_list',
            name: 'sessions_list',
            component: require('../../components/views/entities/sessions/list/sessions_list').default,
            props: {page: 1}
        },
       {
            path: '/entities/sessions_form',
            name: 'sessions_form',
            component: require('../../components/views/entities/sessions/form/sessions_form').default,
            props: {page: 1}
        },
       {
            path: '/entities/schools_list',
            name: 'schools_list',
            component: require('../../components/views/entities/schools/list/schools_list').default,
            props: {page: 1}
        },
       {
            path: '/entities/schools_form',
            name: 'schools_form',
            component: require('../../components/views/entities/schools/form/schools_form').default,
            props: {page: 1}
        },
       {
            path: '/entities/errors_list',
            name: 'errors_list',
            component: require('../../components/views/entities/errors/list/errors_list').default,
            props: {page: 1}
        },
       {
            path: '/entities/errors_form',
            name: 'errors_form',
            component: require('../../components/views/entities/errors/form/errors_form').default,
            props: {page: 1}
        },
       {
            path: '/entities/evaluation_list',
            name: 'evaluation_list',
            component: require('../../components/views/entities/evaluation/list/evaluation_list').default,
            props: {page: 1}
        },
       {
            path: '/entities/evaluation_form',
            name: 'evaluation_form',
            component: require('../../components/views/entities/evaluation/form/evaluation_form').default,
            props: {page: 1}
        },
    ]
})

