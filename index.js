const express = require('express');
const redis = require('redis');

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
const app = express();

app.get('/', (req, res) => {
  client.get('visitors', (err, visitors) => {
    console.log(visitors);
    if(!visitors) { visitors = 0; }
    res.send(`total visitors: ${visitors}`);
    client.set('visitors', parseInt(visitors) + 1);
  });
});

app.listen(8080, () => {
  console.log(`Server has started on port 8080`);
})
