import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbconnect(): Promise<void> {
    if(connection.isConnected) {
        console.log("Already connected to Database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

        connection.isConnected = db.connections[0].readyState
        console.log("Connected to Database Successfully")
    } catch (error) {
        console.error("Error connecting to Database", error)

        process.exit(1)
    }
}
export default dbconnect;