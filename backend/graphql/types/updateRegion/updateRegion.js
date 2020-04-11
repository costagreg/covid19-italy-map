import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    date: { type: GraphQLString},
    region: { type: GraphQLString},
    hospitalizedWithSymptoms: { type: GraphQLInt},
    intensiveCare: { type: GraphQLInt},
    totalHospitalized: { type: GraphQLInt},
    homeIsolation: { type: GraphQLInt},
    totalPositive: { type: GraphQLInt },
    totalChangePositive: { type: GraphQLInt },
    newPositive:{ type: GraphQLInt },
    dischargedHealed:{ type: GraphQLInt },
    totalDeaths: { type: GraphQLInt },
    totalCases: { type: GraphQLInt },
    totalTests: { type: GraphQLInt },
  }
})
