import { set, get, del, keys, clear, all } from './idb';

const objUrls = new Map();
const getOrCreateObjectUrl = file => {
  if(objUrls.has(file)) return objUrls.get(file);
  const objurl = window.URL.createObjectURL(file);
  objUrls.set(file, objurl);
  set(objurl, file);
  return objurl;
}




export const init = (editor) => {
  const am = editor.AssetManager;
  const promises = [];
  const fn = (img, file) => {
    const objurl = getOrCreateObjectUrl(file);
    img.set('src', objurl);
    return objurl;
  };
  editor.on('load ', async () => {
    const root = editor.getWrapper();
    const allkeys = await keys();
    const allfiles = await all();
    const combined = allkeys.map((k, idx) => [k , allfiles[idx]]);
    const allImages = root.find(`[data-gjs-type=img]`);
    const allassets = am.getAll();
    for(const [k, file] of combined) {
      for(const img of allImages.filter(i => i.get("src") === k)) {
        fn(img, file);
      }
      for(const img of allassets.where({ src: k })) {
        fn(img, file);
      }
      del(k);
    }
    await editor.store();
  });
};

export default () => {
    return function (e) {
        const editor = this;
        // List files dropped
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        const response = { data: [] };
      
        // Unlikely, widely supported now
        if (!FileReader) {
          throw new Error('Unsupported platform, FileReader is not defined');
        }
      
        const promises = [];
        const mimeTypeMatcher = /^(.+)\/(.+)$/;
      
        for (const file of files) {
            console.log("UPLOAD FILE HERE", file)
          // For each file a reader (to read the base64 URL)
          // and a promise (to track and merge results and errors)
          const promise = new Promise((resolve, reject) => {
            const objurl = getOrCreateObjectUrl(file);
            set(objurl, file);
            const reader = new FileReader();
            reader.addEventListener('load', event => {
              let type;
              const name = file.name;
      
              // Try to find the MIME type of the file.
              const match = mimeTypeMatcher.exec(file.type);
              if (match) {
                type = match[1]; // The first part in the MIME, "image" in image/png
              } else {
                type = file.type;
              }
      
              // If it's an image, try to find its size
              if (type === 'image') {
                const data = {
                  src: objurl,
                  name,
                  type,
                  height: 0,
                  width: 0,
                };
      
                const image = new Image();
                image.addEventListener('error', error => {
                  reject(error);
                });
                image.addEventListener('load', () => {
                  data.height = image.height;
                  data.width = image.width;
                  resolve(data);
                });
                image.src = data.src;
              } else if (type) {
                const data = {
                  src: objurl,
                  name,
                  type,
                };
                // Not an image, but has a type
                resolve(data);
              } else {
                const data = {
                  src: objurl,
                  name,
                };
                // No type found, resolve with the URL only
                resolve(data);
              }
            });
            reader.addEventListener('error', error => {
              reject(error);
            });
            reader.addEventListener('abort', error => {
              reject('Aborted');
            });
      
            reader.readAsDataURL(file);
          });
      
          promises.push(promise);
        }

        const uploader = editor?.AssetManager?.FileUploader?.() ?? editor?.module?.FileUploader?.();
      
        Promise.all(promises).then(
          data => {
            response.data = data;
            uploader.onUploadResponse(response);
          },
          error => {
            uploader.onUploadError(error);
          }
        );
      };
}