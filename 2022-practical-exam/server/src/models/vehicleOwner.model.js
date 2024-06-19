import mongoose from "mongoose"
const { Schema, model }= mongoose
import mongoosePaginate from 'mongoose-paginate-v2';

const vehicleOwnerSchema = new Schema({
    owner:{
        type:String,
        required:true,
        ref: "owner"
    },
    vehicle:{
        type:String,
        required:true,
        ref: "vehicle"
    },
    plateNumber:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

vehicleOwnerSchema.plugin(mongoosePaginate);

export const VehicleOwner = model('vehicle_owner',vehicleOwnerSchema)
