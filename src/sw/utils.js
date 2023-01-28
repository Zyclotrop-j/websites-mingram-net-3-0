
export const hprefix = "sitecloud";
export const sendMessage = msg => {
    self.clients.matchAll().then(clients => {
        try {
            clients.forEach(client => client.postMessage(msg));
        } catch (e) {
            console.error(e);
        }
    });
};
