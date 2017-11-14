require('dotenv').config();
const seneca = require('seneca')();
const data = require('../sandbox-data');

seneca.add({ role: 'item', cmd: 'createItem' }, (message, reply) => {
  if (!message.label) {
    return reply(null, { error: 'ItemLabelRequired' });
  }
  const item = data.Item.build(message);
  item
    .save()
    .then(item => reply(null, { response: item }))
    .catch(error => reply(error, null));
});

seneca.listen({
  port: process.env.PORT,
  host: process.env.HOST || 'localhost',
});
