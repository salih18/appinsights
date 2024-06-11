/**
 * Creates exception data in the required format and tracks in in application insights
 * 
 * @callback TypeFnTrackException
 * @param {import('@microsoft/applicationinsights-web').IExceptionTelemetry} exception - Exception telemetry data
 * @param {import('@microsoft/applicationinsights-web').ICustomProperties} [customProperties] - additional properties
 * @returns {void}
 */
export const trackException = (track, exception, customProperties) => {
    track({
      fn: 'trackException',
      args: [exception, customProperties],
    });
  };
  
  /**
   * Creates event data in the required format and tracks in in application insights
   * 
   * @callback TypeFnTrackEvent
   * @param {import('@microsoft/applicationinsights-web').IEventTelemetry} event - the event to track
   * @param {import('@microsoft/applicationinsights-web').ICustomProperties} [customProperties] - additional properties
   * @returns {void}
   */
  export const trackEvent = (track, event, customProperties) => {
    track({
      fn: 'trackEvent',
      args: [event, customProperties],
    });
  };
  
  /**
   * Creates pageview data in the required format and tracks in in application insights
   * 
   * @callback TypeFnTrackPageView
   * @param {import('@microsoft/applicationinsights-web').IPageViewTelemetry} pageView - name used to identify the page or other item
   * @returns {void}
   */
  export const trackPageView = (track, pageView) => {
    track({
      fn: 'trackPageView',
      args: [pageView],
    });
  };
  
  /**
   * Log a positive numeric value that is not associated with a specific event.
   * Typically used to send regular reports of performance indicators.
   * 
   * @callback TypeFnTrackMetric
   * @param {import('@microsoft/applicationinsights-web').IMetricTelemetry} metric telemetry data
   * @returns {void}
   */
  export const trackMetric = (track, metric) => {
    track({
      fn: 'trackMetric',
      args: [metric],
    });
  };
  
  /**
   * Log a diagnostic event such as entering or leaving a method.
   * 
   * @callback TypeFnTrackTrace
   * @param {import('@microsoft/applicationinsights-web').ITraceTelemetry} trace telemetry data
   * @param {import('@microsoft/applicationinsights-web').ICustomProperties} [customProperties] - additional properties
   * @returns {void}
   */
  
  // Assuming trackTrace and trackDependencyData functions are defined similarly
  export const trackTrace = (track, trace, customProperties) => {
    track({
      fn: 'trackTrace',
      args: [trace, customProperties],
    });
  };
  
  /**
   * Log dependency data
   * 
   * @callback TypeFnTrackDependencyData
   * @param {import('@microsoft/applicationinsights-web').IDependencyTelemetry} dependency telemetry data
   * @returns {void}
   */
  export const trackDependencyData = (track, dependency) => {
    track({
      fn: 'trackDependencyData',
      args: [dependency],
    });
  };
  