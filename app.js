const express = require('express');
const app = express();
const port = 4000;
const host = '0.0.0.0';

app.use(express.static(`${__dirname}/dist`));
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, host, () => {
  console.log(`Приложение доступно по адресу: http://localhost:${port}!`);
});
