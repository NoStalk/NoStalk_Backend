import mongoose from "mongoose";
import { platformDataSchema } from "./platformDataModel";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,   
        required: true,
        unique: true,
    },
  name: {
      type: {
          firstName: String,
          lastName: String,
      },
      required: true,
    },
  
    password: {
        
        type: String,
    },
    
    platformData: {
        type: {
            leetcode: platformDataSchema,
            codeforces: platformDataSchema,
            atcoder: platformDataSchema,
            gfg: platformDataSchema,
            spoj: platformDataSchema,
            hackerrank: platformDataSchema,
            hackerearth: platformDataSchema,
            codechef: platformDataSchema,
        }
    },
  
});


userSchema.pre('save', async function (next) { 
    if(!this.isModified('password')) 
        return next();
    
    if(this.password)
        this.password = await bcrypt.hash(this.password, 12);
    
    next();
});

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('users',userSchema);