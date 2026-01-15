import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const candidateSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  source: { 
    type: String, 
    enum: ['CAREER_PORTAL', 'REFERRAL', 'LINKEDIN', 'AGENCY'], 
    required: true 
  }
}, { timestamps: true }); 

export default model('Candidate', candidateSchema);

