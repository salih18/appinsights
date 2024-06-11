<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script setup>
import { inject, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { appInsights } from './plugins/appInsightsPlugin';

// Inject the appInsights instance
const appInsightsInstance = inject(appInsights);

// Track page view on component mount
onMounted(() => {
  if (appInsightsInstance) {
    console.log("🚀 ~ file: App.vue:21 ~ appInsightsInstance:", appInsightsInstance);
    appInsightsInstance.trackPageView({ name: 'App Loaded' });
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
