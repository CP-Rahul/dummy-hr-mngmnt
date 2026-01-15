import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const JobPostingSchema = new Schema({
  requisitionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Requisition'
  },
  internalPosting: {
    type: Boolean,
    default: true
  },
  externalPosting: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { 
      type: String, 
      enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'], 
      required: true 
    },
   openings: { type: Number, default: 1, min: 1 },
   jobDescription: { type: String, required: true },
  postedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default model('Job', JobPostingSchema);
