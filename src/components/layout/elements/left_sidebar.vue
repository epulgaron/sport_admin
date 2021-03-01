<template>
  <aside class="app-navbar">
    <!-- begin sidebar-nav -->
    <div class="sidebar-nav scrollbar scroll_light">
      <ul class="metismenu" id="sidebarNav">
        <li class="nav-static-title">Managment</li>
        <li>
          <a class="has-arrow" href="javascript:void(0)" aria-expanded="false">
            <i class="nav-icon ti ti-archive"></i>
            <span class="nav-title" >Schools</span>
            <span class="nav-label label label-primary">3</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/entities/schools_list">General</router-link></li>
          </ul>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/entities/teachers_list">Teachers</router-link></li>
          </ul>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/entities/students_list">Students</router-link></li>
          </ul>
        </li>
        <li>
          <a class="has-arrow" href="javascript:void(0)" aria-expanded="false">
            <i class="nav-icon ti ti-archive"></i>
            <span class="nav-title">Tests</span>
            <span class="nav-label label label-primary">6</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/management/tests_list">Manage</router-link></li>
          </ul>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/types/levels_list">Levels</router-link></li>
          </ul>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/entities/sessions_list">Sessions</router-link></li>
          </ul>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/entities/errors_list">Errors</router-link></li>
          </ul>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/types/error_level_list">Errors levels</router-link></li>
          </ul>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/types/contents_list">Contents</router-link></li>
          </ul>
        </li>
        <li class="nav-static-title">Nomenclators</li>
        <li>
          <a class="has-arrow" href="javascript:void(0)" aria-expanded="false">
            <i class="nav-icon ti ti-layers"></i>
            <span class="nav-title">Lists</span>
            <span class="nav-label label label-primary">5</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/types/countries_list">Countries</router-link></li>
            <li><router-link to="/types/flows_list">Flows</router-link></li>
            <li><router-link to="/types/sports_list">Sports</router-link></li>
            <li><router-link to="/types/status_list">Estates</router-link></li>
            <li><router-link to="/types/types_list">Types</router-link></li>
          </ul>
        </li>
        <li class="nav-static-title">Access</li>
        <li>
          <a class="has-arrow" href="javascript:void(0)" aria-expanded="false">
            <i class="nav-icon ti ti-unlock"></i>
            <span class="nav-title">Seguridad</span>
            <span class="nav-label label label-primary">4</span>
          </a>
          <ul aria-expanded="false" class="collapse">
            <li><router-link to="/security/users_list">Users</router-link></li>
            <li><router-link to="/security/roles_list">Roles</router-link></li>
            <li><router-link to="/security/permissions_list">Permissions</router-link></li>
            <li><router-link to="/security/logs_list">Logs</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- end sidebar-nav -->
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
