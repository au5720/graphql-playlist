const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;


// dummy data
var books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorid: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorid: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3',  authorid: '3'},
  {name: 'The Hero Of Ages', genre: 'Fantasy', id: '4', authorid: '2'},
  {name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorid: '3'},
  {name: 'The Light Fantasttic', genre: 'Fantasy', id: '6',  authorid: '3'}

];

var authors = [
  {name: 'Patrick Rothfuss', age: 44, id: '1' },
  {name: 'Brandon Clarke', age: 42, id: '2' },
  {name: 'Mark Cohen', age: 66, id: '3' }
];


const BootType = new GraphQLObjectType({
  name: 'Book',
  fields: ()=> ({
    id: { type: GraphQLID},
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorid: { type: GraphQLID},
    author: {

      type: AuthorType,
      resolve(parent, args){
        console.log(parent);
        return _.find(authors, { id: parent.authorid });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BootType),
      resolve(parent, args) {
        return _.filter(books, {authorid: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BootType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // code to get data from db / other source
        console.log(typeof args.id);
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // code to get data from db / other source
        console.log(typeof args.id);
        return _.find(authors, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BootType),
      resolve(parent, args){
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});


