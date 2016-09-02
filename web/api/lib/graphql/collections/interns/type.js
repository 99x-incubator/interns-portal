'use strict'

const GraphQLObjectType =require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.export =new GraphQLObjectType(
  {
    name : 'Intern',
    description :'Interns',
    fields :() => ({
      id : {type:GraphQLString},
      firstname: {type:GraphQLString},
      lastname :{type: GraphQLString},
      startdate :{type: GraphQLString},
      enddate :{type:GraphQLString}
    })

  }
);
