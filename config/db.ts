import mongoose, { ConnectOptions } from "mongoose";

declare const process: {
    env: {
        MONGODB_URI: string;
        POOL_SIZE: number;
    };
};

try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: Number(process.env.POOL_SIZE) || 5,
    } as ConnectOptions);

    mongoose.connection.on("connected", () => {
        console.log("Database connected..");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Database not connected: " + err);
    });
} catch (error) {
    console.log("error catch DB connection: " + error);
}

export default {};
