import mongoose from "mongoose";

export const platformDataSchema = new mongoose.Schema({
    handle: String,
    totalSolved: Number,
    ranking: Number,
    contests: [{
        name: String,
        rank: Number,
        solved: Number,
        rating: Number,
    }],
    submissions: [{
        problemUrl: String,
        problemName: String,
        submissionDate: Date,
        submissionLanguage: String,
        submissionStatus: {
            type: String,
            enum: ["AC", "WA", "TLE", "MLE", "RTE", "CE"],
        },
        codeUrl: String,
    }],

});
