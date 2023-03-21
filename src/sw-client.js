import swal from 'sweetalert';

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

let reloading = false;
export default async ({
    promptForUpdate,
    beforeReload,
    toast,
}) => { 
  if ('serviceWorker' in navigator) {
    const {Workbox} = await import('workbox-window');

    const wb = new Workbox('/sw.js');
    let registration;
  
    const showSkipWaitingPrompt = async (event) => {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      wb.addEventListener('controlling', async () => {
        if(reloading) return;
        // At this point, reloading will ensure that the current
        // tab is loaded under the control of the new service worker.
        // Depending on your web app, you may want to auto-save or
        // persist transient state before triggering the reload.
        await beforeReload();
        reloading = true;
        window.location.reload();
      });
      const adviceUpdate = async () => {
        toast({text: "New version launched in sepearte tab! Reloading the page!"});
        await Promise.all([
            beforeReload(),
            sleep(1000),
        ]);
      }
  
      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.
  
      // This code assumes your app has a promptForUpdate() method,
      // which returns true if the user wants to update.
      const updateAccepted = event.isExternal ? adviceUpdate() : promptForUpdate({ id: "REFRESH", title: "New version available!", text: "Reload the page?" });
  
      if (await updateAccepted) {
        wb.messageSkipWaiting();
        swal("Application updating", "Installing new version and reload the page", "success");
      }
    };
  
    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', (event) => {
      showSkipWaitingPrompt(event);
    });

    wb.addEventListener('activated', event => {
        // `event.isUpdate` will be true if another version of the service
        // worker was controlling the page when this version was registered.
        toast({
            text: event.isUpdate ? 'App updated' : 'App installed'
        })
    });
  
    registration = wb.register();
    return registration;
  }
  return new Error(`Service worker not available`);
}