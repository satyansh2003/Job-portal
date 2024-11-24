import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
   
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
    },
    experienceLevel:{
        type:Number,

    },
    location: {
        type: String,
    },
    jobType: {
        type: String,
    },
    position: {
        type: Number,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId || String,
        ref: 'Company',
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId || String,
        ref: 'User',
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId || String,
            ref: 'Application',
        }
    ]
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema);