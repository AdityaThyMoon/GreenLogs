import mongoose from "mongoose";

const plantSchema = mongoose.Schema(
    {
        picture: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true,
          },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Plant = mongoose.model("Plant", plantSchema)
