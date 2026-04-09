import { UnleashClient } from 'unleash-proxy-client';

// Initialize Unleash client for feature flags
export const unleash = new UnleashClient({
  url: process.env.NEXT_PUBLIC_UNLEASH_URL || 'https://app.unleash-hosted.com/proxy',
  clientKey: process.env.NEXT_PUBLIC_UNLEASH_CLIENT_KEY || '',
  appName: 'eagle-analytics',
  environment: process.env.NODE_ENV || 'development',
});

// Start the client (only in browser environment)
if (typeof window !== 'undefined') {
  unleash.start();
}

export default unleash;

