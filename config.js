import 'dotenv/config'

export const PORT = process.env.PORT || 4000;
export const MONGOOSE_URI = process.env.MONGODB_URI;
export const CLIENT = process.env.CLIENT_URL || "http://localhost:5173"