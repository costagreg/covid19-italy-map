import { gql } from 'apollo-server-express'

export default gql`
 type Query {
   latestUpdates: response,
 }

 type response {
    date: String!,
    regions: [updateRegion!]
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
