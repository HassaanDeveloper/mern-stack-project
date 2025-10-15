import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { z } from 'zod';
import { usernameValidationSchema } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidationSchema,
})

export async function GET(request: Request){
    await dbconnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParams = {
            username: searchParams.get("username")
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParams)
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0? usernameErrors.join(", "): 'Invalid query parameters',
            }, { status: 400 })
            
        }
        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username already exists",
            }, { status: 400 })
        }
        return Response.json({
            success: true,
            message: "Username is available",
        }, { status: 200 })
        



    } catch (error) {
        console.log("Erro checking usrername", error)
        return Response.json({
            success: false,
            massage: "Error checking username",
        }, { status: 500 })
    }
}