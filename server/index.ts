import express from 'express';
const app = express();

app.post('/add-image', (req, res) => {
  res.send('hello world');
});

app.delete('/delete-image', (req, res) => {

});
