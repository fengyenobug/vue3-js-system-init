<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 兼容旧版本WebKit浏览器 */
  -webkit-box-sizing: border-box;
  /* 兼容旧版本Firefox浏览器 */
  -moz-box-sizing: border-box;
}
</style>
