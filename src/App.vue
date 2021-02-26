<template>
  <v-app>
    <v-main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.v-main {
  background: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
