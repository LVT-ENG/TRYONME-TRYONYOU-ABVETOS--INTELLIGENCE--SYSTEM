import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking and performance monitoring
 * TryOnU - AVBETOS Intelligence System
 */
export function initSentry() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN || "https://placeholder@placeholder.ingest.sentry.io/placeholder",
    
    // Set environment
    environment: import.meta.env.VITE_ENVIRONMENT || "development",
    
    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Capture replay on errors
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    
    // Performance monitoring: capture 100% of transactions for monitoring
    tracesSampleRate: 1.0,
    
    // Session Replay: capture 10% of sessions, 100% if there's an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || "1.0.0",
    
    // Additional configuration for fashion industry app
    beforeSend(event, hint) {
      // Filter out development errors in production
      if (import.meta.env.VITE_ENVIRONMENT === "production") {
        // Don't send console errors in production
        if (event.exception?.values?.[0]?.value?.includes("console")) {
          return null;
        }
      }
      return event;
    },
    
    // Tag all events with application context
    initialScope: {
      tags: {
        component: "tryonu-frontend",
        system: "avbetos-intelligence"
      },
      user: {
        segment: "fashion-user"
      }
    }
  });
}

// Error boundary wrapper for components
export const SentryErrorBoundary = Sentry.ErrorBoundary;

// Performance monitoring helpers
export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const addBreadcrumb = Sentry.addBreadcrumb;

// Custom performance monitoring for fashion workflows
export function trackFashionEvent(eventName, properties = {}) {
  Sentry.addBreadcrumb({
    message: `Fashion Event: ${eventName}`,
    category: "fashion",
    data: properties,
    level: "info"
  });
  
  // Capture custom event
  Sentry.captureMessage(`Fashion Event: ${eventName}`, {
    level: "info",
    tags: {
      fashion_event: eventName,
      product_id: properties.productId || "unknown"
    },
    extra: properties
  });
}