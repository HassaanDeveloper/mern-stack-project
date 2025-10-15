import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendverificationEmail";

export async function POST(request: Request) {
    await dbconnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already exists",
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if(existingUserByEmail) {
            if(existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already exists",
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpires = new Date(Date.now() + 3600000);
                await existingUserByEmail.save(); 
            }
        }else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpires: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                createdAt: new Date(),
            })
            await newUser.save();
        }

        //send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: "Error sending verification email",
            }, { status: 500 })
        }
        return Response.json({
            success: true,
            message: emailResponse.message,
        }, { status: 201 })

    } catch (error) {
        console.log('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: "Error registering user",
            },
            { status: 500 }
        )        
    }
}