const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const fs = require("fs");
const path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // Allow all origins
        headers: ["Accept", "Content-Type"],
        exposedHeaders: ["Accept", "Content-Type"],
        additionalHeaders: ["X-Requested-With"]
      }
    }
  });

  await server.register(Inert);

  server.route({
    method: "POST",
    path: "/upload",
    options: {
      payload: {
        // output: "stream",
        // parse: true,
        // allow: "multipart/form-data",
        // multipart: true, // Explicitly handling multipart
        output: "file",
        maxBytes: 1024 * 1024 * 1024,
        parse: true, 
        allow: "multipart/form-data",
        multipart: true, // Explicitly handling multip
      },
    },
    handler: (request, h) => {
      const { file } = request.payload;
      if (!file) {
        return h.response({ error: "No file received" }).code(400);
      }
      console.log("::Array.isArray(file)::" + Array.isArray(file));
       const fileArrayData = []
      if(!Array.isArray(file)) {
        console.log("!Array.isArray(file)::",file.filename);
        fileArrayData.push({
          filename: file.filename,
          headers: file.headers,
          bytes: file.bytes,
        })
      }
        else {
          file.map((file) => {
            fileArrayData.push({
              filename: file.filename,
              headers: file.headers,
              bytes: file.bytes,
            })
          })
        }
fileArrayData.map((file) => {
  const filename = file.filename;
  const filepath = path.join(__dirname, "uploads", filename);
  fs.createWriteStream(filepath);
  fs.createReadStream(filepath);
});
return h.response("Node JS uploaded successfully").code(200);
  
    },
  },
  {
    method: "GET",
    path: "/verify",
    handler: (request, h) => {
     return h.response("Node JS uploaded successfully").code(200);
    },
  }
);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
