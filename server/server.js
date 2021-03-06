/* eslint no-console: 0 */

const app = require('./app');
const { PORT, PUBLIC_URL, GRAPHQL_ENDPOINT } = require('./config/config');

app.listen(PORT, () => console.log(`🚀 Server ready at ${PUBLIC_URL}${GRAPHQL_ENDPOINT}`));
