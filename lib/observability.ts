// lib/observability.ts
import { captureException, captureMessage } from '@sentry/node';
import { register, Summary, Gauge } from '@prom-client';

// Sentry initialization
export const initSentry = (dsn: string, release: string) => {
  // Initialize Sentry SDK with project DSN and release name
  if (!dsn || !release) {
    throw new Error('Sentry DSN and release name must be provided');
  }
  // Add any custom initialization here (e.g., integrations)
};

// Error tracking helper
export const captureError = (error: Error & { message: string }) => {
  captureException({
    message: error.message,
    stacktrace: error.stack,
    level: 'error',
  });
};

// Event tracking helper
export const recordEvent = (eventName: string, context?: Record<string, any>) => {
  captureMessage(eventName, { extra: context || {} });
};

// Prometheus client initialization
export const initPrometheus = () => {
  const registry = register(); // Creates default registry
  
  // Example metrics (replace with pharmacy-specific metrics)
  const API_REQUEST_COUNTER = registry.counter('api_requests_total', 'Total API requests');
  const PAGE_LOAD_TIME = registry.register(new Gauge({
    name: 'page_load_time_seconds',
    help: 'Time taken to load a page',
  }));

  // Add your pharmacy-specific metrics here
  return { registry, API_REQUEST_COUNTER, PAGE_LOAD_TIME };
};

// Export helpers
export { initSentry, captureError, recordEvent, initPrometheus };