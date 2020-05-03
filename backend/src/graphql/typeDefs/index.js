import { gql } from 'apollo-server-express'

export default gql`
   type Query {
      latestUpdates: latestUpdates,
      latestTrendParam(param: String!, region: String!, days: Int!) : xy,
   }

   type latestUpdates {
      date: String!,
      regions: [updateRegion!]
   }

   type xy {
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
