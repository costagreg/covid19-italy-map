import { gql } from 'apollo-server-express'

export default gql`
   type Query {
      latestUpdates(date: String!): latestUpdates,
      latestTrendParam(date: String!, param: String!, region: String!, days: Int!) : xy,
   }

   type latestUpdates {
      id: ID!, 
      date: String!,
      regions: [updateRegion!]
   }

   type xy {
      id: ID!,
      x: [String!],
      y: [Int!],
   }

   type updateRegion {
      region: String!,
      hospitalizedWithSymptoms: Int!,
      intensiveCare: Int!,
      totalHospitalized: Int!,
      homeIsolation: Int!,
      totalPositive: Int!,
      totalChangePositive: Int!,
      newPositive:Int!,
      dischargedHealed:Int!,
      totalDeaths: Int!,
      totalCases: Int!,
      totalTests: Int!, 
   }`
