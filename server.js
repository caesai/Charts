import express from 'express';
import mongodb from 'mongodb';
import fs from 'fs';
import bodyParser from 'body-parser';

const MongoClient = mongodb.MongoClient;
const app = express();

// MongoClient.connect('mongodb://localhost:27017/crypto', function(err, db) {
//   if (err) {
//     throw err;
//   }
//   db.createCollection('charts', {
//     'chartsData': [
//       {x: 1, y: 10},
//       {x: 2, y: 5},
//       {x: 3, y: 15}
//     ]
//   });
//   db.collection('charts').find().toArray(function(err, result) {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   });
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/charts', function(req, res) {
  let chartsData = fs.readFileSync('./data/data.txt', 'utf8');
  res.send(chartsData);
});

app.listen(3000);
