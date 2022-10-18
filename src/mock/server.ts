import express from 'express';
import {HttpTelevisionServer} from './HttpTelevisionServer';
import bodyParser from 'body-parser';

const server = new HttpTelevisionServer();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.post('/play', server.handlePost.bind(server));

app.get('*', (req, res) => {
  console.log('* get')
  res.send('This is a test web page!');
});
app.post('*', (req, res) => {
  console.log('* post')
  res.send('This is a test web page!');
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
