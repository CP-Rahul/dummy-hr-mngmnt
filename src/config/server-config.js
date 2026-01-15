import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;
export const BASE_URL = process.env.BASE_URL || "/api/v1";
export const DATA_EXCEPTION = process.env.DATA_EXCEPTION || "RFL100"
export const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/dummy"
export const REQUIRED_FIELDS_MISSING = process.env.REQUIRED_FIELDS_MISSING || "HR100"
export const RESOURCE_NOT_FOUND = process.env.RESOURCE_NOT_FOUND || "HR101"
export const USER_UNAUTHORIZED = process.env.USER_UNAUTHORIZED || "HR102"
export const INVALID_DATA = process.env.INVALID_DATA || "HR103"

