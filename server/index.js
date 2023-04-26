///clear console
// console.clear();
// process.stdout.write("\x1Bc");

import server from "./app.js";
import React from "./react/react.js";

async function startServer() {
  console.log(React())
  const port = process.env.SERVER_PORT || 5000;
  await server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
startServer()
