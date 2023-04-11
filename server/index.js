import server from "./app.js";
// import net from 'net';

async function startServer() {
  const port = process.env.SERVER_PORT || 5000;
  await server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
startServer()
