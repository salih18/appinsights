<template>
  <div class="product-page">
    <div class="user-context">
      <span>Current User: {{ currentUserContext }}</span>
      <button @click="setUserContext('Customer1')">
        Set Customer1 Context
      </button>
      <button @click="setUserContext('Customer2')">
        Set Customer2 Context
      </button>
    </div>
    <h1>Product Page</h1>
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.image" :alt="product.name" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price }}</p>
        <button @click="handleProductDetailsClick(product.id)">
          Product Details
        </button>
      </div>
    </div>
    <h2>Telemetry Actions</h2>
    <table class="actions-table">
      <tr>
        <td>
          <button @click="logException('example-id')">Track Exception</button>
        </td>
        <td><button @click="logMetric">Track Metric</button></td>
        <td><button @click="logTrace">Track Trace</button></td>
        <td>
          <button @click="logDependencyData">Track Dependency Data</button>
        </td>
      </tr>
      <tr>
        <td><button @click="startTrackEvent">Start Track Event</button></td>
        <td><button @click="stopTrackEvent">Stop Track Event</button></td>
        <td><button @click="startTrackPage">Start Track Page</button></td>
        <td><button @click="stopTrackPage">Stop Track Page</button></td>
      </tr>
      <tr>
        <td><button @click="flushTelemetry">Flush Telemetry</button></td>
        <td><button @click="clearUserContext">Clear User Context</button></td>
        <td>
          <button @click="addTelemetryInitializer">
            Add Telemetry Initializer
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { appInsights } from "./plugins/appInsightsPlugin";

const products = ref([
  {
    id: "12345",
    name: "Product 1",
    description: "Description for product 1.",
    price: 99.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "12346",
    name: "Product 2",
    description: "Description for product 2.",
    price: 149.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "12347",
    name: "Product 3",
    description: "Description for product 3.",
    price: 199.99,
    image: "https://via.placeholder.com/150",
  },
]);

const appInsightsInstance = inject(appInsights);

// Simulate getting the referral source
const referralSource = ref(document.referrer || "direct");

// Measure page load time
const startTime = performance.now();

onMounted(() => {
  const loadTime = performance.now() - startTime;
  appInsightsInstance.trackPageView({
    name: "ProductPage",
    properties: {
      userRole: "customer",
      referralSource: referralSource.value,
    },
    measurements: {
      loadTime: loadTime,
    },
  });

  // Simulate API call to load products
  appInsightsInstance.trackDependencyData({
    id: "loadProducts",
    target: "api.example.com",
    name: "GET /products",
    duration: 150,
    success: true,
    resultCode: 200,
    data: "GET /products",
    properties: {
      dependencyType: "HTTP",
      dependencyCategory: "ExternalService",
    },
  });
});

const currentUserContext = ref("Guest");
const eventStartTimes = ref({});

const handleProductDetailsClick = (productId) => {
  startTrackEvent(productId);
  goToProductDetails(productId);
};

const goToProductDetails = (productId) => {
  if (productId === "12347") {
    // Simulate an error for the third product
    logException(productId);
    stopTrackEvent(productId, false);
  } else {
    // Simulate successful navigation
    const userConfirmed = window.confirm(
      `Navigating to details for product ${productId}`
    );
    stopTrackEvent(productId, userConfirmed);
  }
};

const startTrackEvent = (productId) => {
  if (appInsightsInstance) {
    const startTime = performance.now();
    eventStartTimes.value[productId] = startTime;
    appInsightsInstance.instance.then((instance) => {
      instance.startTrackEvent(`ProductDetails_${productId}`);
    });
  }
};

const stopTrackEvent = (productId, success) => {
  if (appInsightsInstance) {
    const endTime = performance.now();
    const duration = endTime - eventStartTimes.value[productId];
    delete eventStartTimes.value[productId];

    appInsightsInstance.instance.then((instance) => {
      instance.stopTrackEvent(
        `ProductDetails_${productId}`,
        {
          success: success,
          userAction: "ProductDetailsClick",
        },
        {
          duration: duration,
        }
      );
    });
  }
};

const logException = (productId) => {
  if (appInsightsInstance) {
    appInsightsInstance.trackException({
      exception: new Error(`Error loading details for product ${productId}`),
      properties: {
        severityLevel: 3,
        userAction: "ProductDetailsClick",
      },
      measurements: {
        errorCount: 1,
      },
    });
  }
};

const logMetric = () => {
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

const logTrace = () => {
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

const logDependencyData = () => {
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

const startTrackPage = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackPageView({ name: "StartTestPage" });
  }
};

const stopTrackPage = () => {
  if (appInsightsInstance) {
    appInsightsInstance.trackPageView({
      name: "StopTestPage",
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
    appInsightsInstance.instance.then((instance) => {
      instance.flush();
    });
  }
};

const setUserContext = (userContext) => {
  currentUserContext.value = userContext;
  if (appInsightsInstance) {
    appInsightsInstance.instance.then((instance) => {
      instance.context.user.id = userContext;
    });
  }
};

const clearUserContext = () => {
  currentUserContext.value = "Guest";
  if (appInsightsInstance) {
    appInsightsInstance.instance.then((instance) => {
      instance.clearAuthenticatedUserContext();
    });
  }
};

const addTelemetryInitializer = () => {
  if (appInsightsInstance) {
    appInsightsInstance.instance.then((instance) => {
      instance.addTelemetryInitializer((envelope) => {
        envelope.tags["ai.cloud.role"] = "Web";
      });
    });
  }
};
</script>

<style scoped>
.product-page {
  padding: 20px;
}

.user-context {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-context span {
  font-size: 16px;
  font-weight: bold;
}

.user-context button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-context button:hover {
  background-color: #369d75;
}

.product-grid {
  display: flex;
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.actions-table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

.actions-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

button {
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
