<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="trackPageView">Track Page View</button>
      <button @click="trackException">Track Exception</button>
      <button @click="trackEvent">Track Event</button>
      <button @click="trackMetric">Track Metric</button>
      <button @click="trackTrace">Track Trace</button>
      <button @click="trackDependencyData">Track Dependency Data</button>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { appInsights } from '../plugins/appInsightsPlugin';


const appInsightsInstance = inject(appInsights);

const trackPageView = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackPageView({ name: 'Test Page View' });
  }
};

const trackException = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackException({ exception: new Error('Test Exception') });
  }
};

const trackEvent = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackEvent({ name: 'Test Event' });
  }
};

const trackMetric = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackMetric({ name: 'Test Metric', average: 42 });
  }
};

const trackTrace = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackTrace({ message: 'Test Trace' });
  }
};

const trackDependencyData = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackDependencyData({
      id: '12345',
      target: 'http://example.com',
      name: 'GET /example',
      duration: 123,
      success: true,
      resultCode: 200,
      data: 'Example data'
    });
  }
};
</script>

<style scoped>
.hello {
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369d75;
}
</style>
