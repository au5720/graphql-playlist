const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();


//"mongodb://<dbuser>:<dbpassword>@ds219983.mlab.com:19983/gql-ninja"
//mongoose.connect('mongodb://jennifer:Rtt1bf2006@ds219983.mlab.com:19983/gql-ninja');
//'mongodb://jennifer:Rtt1bf2006@127.0.0.1:27017/gql-ninja'
//mongoose.connect('mongodb://127.0.0.1:27017');
mongoose.connect('mongodb://jennifer:Rtt1bf2006@127.0.0.1:27017/gql-ninja');

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});


//db.createUser({user: "jennifer", pwd: "Rtt1bf2006",roles: [ "readWrite", "dbAdmin" ] })