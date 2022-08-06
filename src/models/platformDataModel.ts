import mongoose from "mongoose";



export interface platformDataInterface {
    handle: string;
    totalSolved: number;
    ranking: number;
    contests: [{
        name: string;
        rank: number;
        solved: number;
        rating: number;
        contestId: string;
        contestDate: string;
    }],
    submissions: [{
        problemUrl: string;
        problemName: string;
        submissionDate: Date;
        submissionLanguage: string;
        submissionStatus: string;
        codeUrl: string;
    }]
}



export const platformDataSchema = new mongoose.Schema<platformDataInterface>({
    handle: {
        type: String,
        default: "",
    },
    totalSolved: Number,
    ranking: Number,
    contests: [{
        contestName: String,
        rank: Number,
        solved: Number,
        rating: Number,
        contestDate: String
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