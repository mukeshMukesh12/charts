<template>
  <div class="layout-wrapper">
    <div class="layout-container">
      <h1><router-link to="/">Home page</router-link></h1>
      <p class="charts-list">
        <router-link to="/line">
          Line chart
        </router-link>
        <router-link to="/bar">
          Bar chart
        </router-link>
        <router-link to="/scatter">
          Scatter chart
        </router-link>
        <router-link to="/pie">
          Pie chart
        </router-link>
      </p>
      <router-view />
    </div>
  </div>
</template>
<script >
</script>
<style lang="scss">
  .charts-list {
    a {
      padding-right: 15px;
    }
  }
</style>