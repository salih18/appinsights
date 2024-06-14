import {
  trackDependencyData,
  trackEvent,
  trackException,
  trackMetric,
  trackPageView,
  trackTrace,
} from "./appInsightsWrappers.js";

/**
 * Merge plugin options and config.json into an object that Application Insights can understand
 *
 * @param {object} options Options object as the user can pass when initiating from the plugin
 * @param {object} configJson config.json contents that are deployed next to the application
 * @returns {object}
 */
const _normalizeOptions = (options, configJson) => {
  const { ...otherConfigOptions } = configJson.applicationinsights || {};
  // Fallback for teams that still have instrumentationKey defined at root level
  const { instrumentationKey } = configJson;

  return {
    config: {
      instrumentationKey,
      ...otherConfigOptions,
    },
    ...options,
  };
};

/**
 * Install function used to setup the appinsights instance on the vue object
 *
 * @private
 * @param {object} options - Configuration options to pass to App Insights, see: https://github.com/....
 */
const _loadAppInsights = async (options) => {
  // preparing appinsights instance in advance
  console.log("-----------FETCHING CONFIG-----------");
  const response = await fetch("config.json");
  console.log({ response });
  if (response.ok) {
    const config = await response.json();
    console.log("~ const_loadAppInsights~ window:", { window });
    console.log("~ const_loadAppInsights~ config:", config);
    // application insights loaded in in load component so this is available externally
    if (
      typeof Microsoft === "undefined" ||
      // eslint-disable-next-line
      typeof Microsoft.ApplicationInsights === "undefined"
    ) {
      throw new Error("Application insights script tag is not yet loaded");
    }

    const snippet = _normalizeOptions(options, config);
    if (!snippet.config.instrumentationKey) {
      // if no instrumentation key is set we log this warning
      throw new Error(
        "Instrumentation key is not set for this environment, without it insights will not work"
      );
    }
    // extend base functionality of appInsights basic with helper functions
    // eslint-disable-next-line
    const init = new Microsoft.ApplicationInsights.ApplicationInsights(snippet);
    // Resolve the `instance` promise so that we can start tracking
    return init.loadAppInsights();
  } else {
    throw new Error("Error fetching config.json");
  }
};

/**
 * The reason we buffer all calls, is because we load the appInsights instance async
 * Vue Plugins can only provide/inject synchronous data. We basically wrap the calls to
 * app insights, and buffer them until we finally get the app insights instance.
 *
 * @private
 * @param {object} data
 */
const _track = async (data) => {
  $appInsights.instance
    .then((instance) => {
      switch (data.fn) {
        case "trackPageView":
          instance.trackPageView(...data.args);
          break;
        case "trackException":
          instance.trackException(...data.args);
          break;
        case "trackEvent":
          instance.trackEvent(...data.args);
          break;
        case "trackMetric":
          instance.trackMetric(...data.args);
          break;
        case "trackTrace":
          instance.trackTrace(...data.args);
          break;
        case "trackDependencyData":
          instance.trackDependencyData(...data.args);
          break;
        default:
          instance.trackPageView(...data.args);
          break;
      }
      instance.flush();
    })
    .catch((error) => {
      console.warn(error);
    });
};

/**
 * @typedef {Object} ApplicationInsights
 * @property {import('./appInsightsWrappers.js').TypeFnTrackException} trackException
 * @property {import('./appInsightsWrappers.js').TypeFnTrackEvent} trackEvent
 * @property {import('./appInsightsWrappers.js').TypeFnTrackPageView} trackPageView
 * @property {import('./appInsightsWrappers.js').TypeFnTrackMetric} trackMetric
 * @property {import('./appInsightsWrappers.js').TypeFnTrackTrace} trackTrace
 * @property {import('./appInsightsWrappers.js').TypeFnTrackDependencyData} trackDependencyData
 * @property {Promise<import('@microsoft/applicationinsights-web').ApplicationInsights>} instance
 */

let $appInsights = {
  trackException: trackException.bind(this, _track),
  trackEvent: trackEvent.bind(this, _track),
  trackPageView: trackPageView.bind(this, _track),
  trackMetric: trackMetric.bind(this, _track),
  trackTrace: trackTrace.bind(this, _track),
  trackDependencyData: trackDependencyData.bind(this, _track),
  instance: undefined,
};

/**
 * @type {import('vue').InjectionKey<ApplicationInsights>}
 */
export const appInsights = Symbol();

/**
 * @type {import('vue').Plugin}
 */
export default {
  install: (app, options) => {
    $appInsights.instance = _loadAppInsights(options);
    app.config.globalProperties.$appInsights = $appInsights;
    app.provide(appInsights, $appInsights);
  },
};
