import mongoose from 'mongoose'

const updateRegionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  hospitalizedWithSymptoms: {
    type: Number,
    required: true,
  },
  intensiveCare: {
    type: Number,
    required: true,
  },
  totalHospitalized: {
    type: Number,
    required: true,
  },
  homeIsolation: {
    type: Number,
    required: true,
  },
  totalPositive: {
    type: Number,
    required: true,
  },
  totalChangePositive: {
    type: Number,
    required: true,
  },
  newPositive: {
    type: Number,
    required: true,
  },
  dischargedHealed: {
    type: Number,
    required: true,
  },
  totalDeaths: {
    type: Number,
    required: true,
  },
  totalCases: {
    type: Number,
    required: true,
  },
  totalTests: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('UpdateRegion', updateRegionSchema)

