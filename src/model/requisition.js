import mongoose from "mongoose";

const ApprovalSchema = new mongoose.Schema({
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approvedAt: { type: Date, default: Date.now },
  comments: { type: String }
});

const RequisitionSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { 
    type: String, 
    enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'], 
    required: true 
  },
  openings: { type: Number, default: 1, min: 1 },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobDescription: { type: String, required: true },

  status: { 
    type: String, 
    enum: ['DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'CLOSED'], 
    default: 'DRAFT' 
  },

  approval: { type: ApprovalSchema, default: null },

  lifeCycles: [],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

RequisitionSchema.pre('save', async function() {
  this.updatedAt = Date.now();
});

ApprovalSchema.pre('save', async function() {
  this.approvedAt = Date.now();
});


export default mongoose.model('Requisition', RequisitionSchema);
