const main = async () => {
    const { wrappedWorkerRxStorage } = await import('rxdb/plugins/worker');
    const { getRxStorageLoki } = await import('rxdb/plugins/lokijs');
    const LokiIncrementalIndexedDBAdapter = await import('lokijs/src/incremental-indexeddb-adapter');
    wrappedWorkerRxStorage({
        /**
         * You can wrap any implementation of the RxStorage interface
         * into a worker.
         * Here we use the LokiJS RxStorage.
         */
        storage: getRxStorageLoki({
            adapter: new LokiIncrementalIndexedDBAdapter.default(), // up to 60MB
        })
    });
}

main()