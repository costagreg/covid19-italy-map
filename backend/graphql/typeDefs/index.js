import { gql } from 'apollo-server-express'

export default gql`
 type Query {
    allUpdatesRegion: [updateRegion!]
 }

 type updateRegion {
    id: ID!,
    date: String!,
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