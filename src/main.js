import { createApp } from 'vue'
import App from './App.vue'
import appInsightsPlugin from './plugins/appInsightsPlugin';

const options = { /* your options here */ };

const app = createApp(App);

// Use the Application Insights plugin
app.use(appInsightsPlugin, options);

app.mount('#app');