/* eslint no-console: 0 */

const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
// app.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
