import {v2 as cloudinary} from "cloudinary"
import { TbPlugConnectedX } from "react-icons/tb"

const connectCloudinary = async() => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_APLI_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    }   
    )

}

export default connectCloudinary