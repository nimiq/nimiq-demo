// launcher/client-proxy.ts
function clientFactory(workerFactory, comlinkWrapper) {
  return {
    async create(config) {
      const worker = workerFactory();
      let workerReady;
      const readyPromise = new Promise((resolve) => {
        workerReady = resolve;
      });
      const readyListener = (event) => {
        if (getEventData(event) === "NIMIQ_READY") {
          workerReady();
        }
      };
      addEventListener(worker, "message", readyListener);
      const readyCheckInterval = setInterval(() => {
        worker.postMessage("NIMIQ_CHECKREADY");
      }, 20);
      await readyPromise;
      removeEventListener(worker, "message", readyListener);
      clearInterval(readyCheckInterval);
      console.debug("Client WASM worker loaded");
      const client = comlinkWrapper(worker);
      if (typeof window !== "undefined") {
        window.addEventListener("offline", () => worker.postMessage("offline"));
        window.addEventListener("online", () => worker.postMessage("online"));
      }
      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            worker.postMessage("visible");
          }
        });
      }
      console.debug("Sending NIMIQ_INIT message to client worker");
      worker.postMessage({
        type: "NIMIQ_INIT",
        config
      });
      await new Promise((resolve, reject) => {
        addEventListener(worker, "message", (event) => {
          const eventData = getEventData(event);
          if (typeof eventData !== "object" || !("ok" in eventData)) return;
          if (eventData.ok === true) resolve();
          if (eventData.ok === false && "error" in eventData && typeof eventData.error === "string") {
            const error = new Error(eventData.error);
            if ("stack" in eventData && typeof eventData.stack === "string") {
              error.stack = eventData.stack;
            }
            reject(error);
          }
        });
      });
      console.debug("Have client worker remote");
      return client;
    }
  };
}
function addEventListener(worker, type, listener) {
  const method = "addListener" in worker ? "addListener" : "addEventListener";
  worker[method](type, listener);
}
function removeEventListener(worker, type, listener) {
  const method = "removeListener" in worker ? "removeListener" : "removeEventListener";
  worker[method](type, listener);
}
function getEventData(event) {
  return typeof event === "object" && "data" in event ? event.data : event;
}
export {
  clientFactory
};
