declare namespace Express {
    export type UObject = {
        id?: string;
        name?: string;
        email?: string;
        role?: string;
        number?: number;
    };

    export interface Request {
        user?: UObject | any;
        loggedIn?: UObject | any;
    }
}

declare const process: {
    env: {
        JWT_SECRET: string;
        MONGODB_URI: string;
        POOL_SIZE: number;
        MESSAGEBIRD_API_KEY: string;
    };
};

// declare global {
//     namespace NodeJS {
//         interface ProcessEnv {
//             MONGODB_URI: "URI_MONGO_DB";
//             NODE_ENV: "development" | "production";
//             PORT?: string;
//             PWD: string;
//         }
//     }
// }

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
// export {};
