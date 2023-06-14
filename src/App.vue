<template>
  <div>
    <div></div>
    <app-top-bar></app-top-bar>
    <router-view/>
  </div>
</template>

<script>
import appTopBar from '@/components/TopBar'
import {actionTypes} from '@/store/modules/auth'
export default {
  name: "App",
  components: {appTopBar},
  mounted(){
    this.$store.dispatch(actionTypes.getCurrentUser)
}
}

</script>
