import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, required: true },
  candidateId: { type: Schema.Types.ObjectId, required: true },
  stage: {
    type: String,
    enum: ['APPLIED', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED'],
    required: true
  },
  lifeCycle: [],
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() }
});

ApplicationSchema.pre('save', async function() {
  this.updatedAt = Date.now();
});

export default model('Application', ApplicationSchema);
