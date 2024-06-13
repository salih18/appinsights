<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div>
        <button @click="trackPageView">Track Page View</button>
        <button @click="trackException">Track Exception</button>
        <button @click="trackEvent">Track Event</button>
        <button @click="trackMetric">Track Metric</button>
        <button @click="trackTrace">Track Trace</button>
        <button @click="trackDependencyData">Track Dependency Data</button>
        <button @click="startTrackEvent">Start Track Event</button>
        <button @click="stopTrackEvent">Stop Track Event</button>
        <button @click="startTrackPage">Start Track Page</button>
        <button @click="stopTrackPage">Stop Track Page</button>
        <button @click="flushTelemetry">Flush Telemetry</button>
        <button @click="setUserContext">Set User Context</button>
        <button @click="clearUserContext">Clear User Context</button>
        <button @click="addTelemetryInitializer">Add Telemetry Initializer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { appInsights } from "./plugins/appInsightsPlugin";

const msg = ref("Welcome to Your Vue.js App");

// Inject the appInsights instance
const appInsightsInstance = inject(appInsights);

// Track page view on component mount with additional properties
onMounted(() => {
  if (appInsightsInstance) {
    appInsightsInstance.trackPageView({
      name: "HomePage",
      properties: {
        userRole: "admin",
        appVersion: "1.0.0",
      },
    });
  }
});

const trackPageView = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackPageView({
      name: "DetailedTestPageView",
      properties: {
        pageCategory: "Test Category",
        isAuthenticated: true,
      },
      measurements: {
        loadTime: 2.5,
      },
    });
  }
};

const trackException = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackException({
      exception: new Error("Test Exception"),
      properties: {
        severityLevel: 3,
        userAction: "Testing",
      },
      measurements: {
        errorCount: 1,
      },
    });
  }
};

const trackEvent = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackEvent({
      name: "TestEvent",
      properties: {
        eventCategory: "Test",
        userRole: "tester",
      },
      measurements: {
        eventDuration: 120,
      },
    });
  }
};

const trackMetric = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackMetric({
      name: "TestMetric",
      average: 42,
      sampleCount: 10,
      min: 40,
      max: 45,
    });
  }
};

const trackTrace = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackTrace({
      message: "Test Trace",
      properties: {
        traceCategory: "Debug",
        userRole: "tester",
      },
    });
  }
};

const trackDependencyData = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackDependencyData({
      id: "12345",
      target: "http://example.com",
      name: "GET /example",
      duration: 123,
      success: true,
      resultCode: 200,
      data: "Example data",
      properties: {
        dependencyType: "HTTP",
        dependencyCategory: "ExternalService",
      },
    });
  }
};

const startTrackEvent = () => {
  if (appInsightsInstance) {
    appInsightsInstance.startTrackEvent("StartTestEvent");
  }
};

const stopTrackEvent = () => {
  if (appInsightsInstance) {
    appInsightsInstance.stopTrackEvent("StartTestEvent", {
      properties: {
        eventCategory: "Test",
        userAction: "Stopped",
      },
      measurements: {
        duration: 300,
      },
    });
  }
};

const startTrackPage = () => {
  if (appInsightsInstance) {
    appInsightsInstance.startTrackPage("StartTestPage");
  }
};

const stopTrackPage = () => {
  if (appInsightsInstance) {
    appInsightsInstance.stopTrackPage("StartTestPage", {
      properties: {
        pageCategory: "Test Page",
      },
      measurements: {
        loadTime: 5.0,
      },
    });
  }
};

const flushTelemetry = () => {
  if (appInsightsInstance) {
    appInsightsInstance.flush();
  }
};

const setUserContext = () => {
  if (appInsightsInstance) {
    appInsightsInstance.setAuthenticatedUserContext("userId", "accountId");
  }
};

const clearUserContext = () => {
  if (appInsightsInstance) {
    appInsightsInstance.clearAuthenticatedUserContext();
  }
};

const addTelemetryInitializer = () => {
  if (appInsightsInstance) {
    appInsightsInstance.addTelemetryInitializer((envelope) => {
      envelope.tags["ai.cloud.role"] = "Web";
    });
  }
};
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
