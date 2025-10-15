import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document{
    username: string;
    email: string;
    image?: string;
    password: string;
    verifyCode: string;
    verifyCodeExpires: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ]
    },
    image: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    verifyCode: {
        type: String,
        required: [true, "Verification code is required"],
    },
    verifyCodeExpires: {
        type: Date,
        required: true,
        default: () => Date.now() + 3600000, // 1 hour from now
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
},
{
      timestamps: true,
}
);

// Prevent model overwrite error in development
const User = (mongoose.models.User as mongoose.Model<IUser>)|| mongoose.model<IUser>('User', UserSchema);
export default User;