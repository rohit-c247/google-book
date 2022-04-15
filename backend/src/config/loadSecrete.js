import dotenv from "dotenv";
dotenv.config();
export const GOOGLE = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK
}

export const BOOKS_END_POINT = process.env.BOOKS_END_POINT

export const secret = process.env.SECRET