import { useRegisterSW } from 'virtual:pwa-register/react';

/**

Periodically updating the service worker is crucial for several reasons:

1. **Security**: Updates ensure vulnerabilities are patched, keeping your app safe.
2. **Bug Fixes**: It allows for the resolution of bugs and inefficiencies in caching or background tasks.
3. **New Features**: Updates enable support for new features like updated cache policies and background syncs.
4. **Cache Management**: Ensures users receive fresh, up-to-date content instead of stale cached resources.
5. **Browser Compatibility**: Maintains compatibility with evolving web standards and browser updates.
6. **Performance**: Optimizes performance by improving caching strategies and network handling.
7. **Sync**: Prevents the service worker from being out of sync with the updated app, avoiding unexpected behavior.

Regular updates keep the web app secure, performant, and in sync with the latest features and standards.

 * @param {number} period - The interval in milliseconds for checking updates. Default is 1 hour (60 * 60 * 1000). 
 * @returns {Object} - An object containing the updateServiceWorker function.
 */

const useSyncServiceWorker = (period = 60 * 60 * 1000) => {
  const { updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0 || !r) return;

      const checkForUpdates = async () => {
        if ('onLine' in navigator && !navigator.onLine) return; // Skip if offline

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            'cache': 'no-store',
            'cache-control': 'no-cache',
          },
        });

        if (resp?.status === 200) await r.update();
        scheduleUpdate(); // Schedule the next check
      };

      const scheduleUpdate = () => {
        setTimeout(checkForUpdates, period);
      };

      const registerPeriodicSync = () => {
        if (r?.active?.state === 'activated') {
          scheduleUpdate();
        } else if (r?.installing) {
          r.installing.addEventListener('statechange', (e) => {
            const sw = e.target;
            if (sw.state === 'activated') scheduleUpdate();
          });
        }
      };

      registerPeriodicSync();
    },
  });

  // Optionally, return any useful data or functions for further use
  return { updateServiceWorker };
};

export default useSyncServiceWorker;
