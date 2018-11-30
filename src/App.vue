<template>
  <div id="app">
    <template v-if="!this.$route.path.includes('login')">
      <ods-container>
        <ods-aside width="72px">
          <side-navigation></side-navigation>
        </ods-aside>
        <ods-container>
          <ods-header>
            <the-header></the-header>
          </ods-header>
          <ods-main>
            <router-view></router-view>
          </ods-main>
        </ods-container>
      </ods-container>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import SideNavigation from '@/components/SideNavigation'
import TheHeader from '@/components/TheHeader'
export default {
  name: 'App',
  components: {
    SideNavigation,
    TheHeader
  }

}
</script>

<style>
html, body {
  font-family: 'Soho', Helvetica, Arial, sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: none;
}
</style>
