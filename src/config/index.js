export { default as swaggerConfig } from './swagger.config.js'
import { config } from 'dotenv';
config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { DB_URI, PORT, JWT_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY,JWT_VERIFY_EMAIL_KEY, EMAIL_HOST ,EMAIL_PORT,EMAIL_USER , EMAIL_PASS ,EMAIL_FROM , REACT_BASE_URL , AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, BUCKET_NAME } = process.env

export const port = PORT || 8000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const jwtVerifyEmailKey = JWT_VERIFY_EMAIL_KEY;
export const dbUri = DB_URI;
export const emailHost = EMAIL_HOST;
export const emailPort = EMAIL_PORT;
export const EmailUser = EMAIL_USER;
export const emailPassword = EMAIL_PASS;
export const emailFrom = EMAIL_FROM;
export const reactBaseUrl = REACT_BASE_URL;
export const awsAccessKey = AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = AWS_SECRET_ACCESS_KEY;
export const awsRegion = AWS_REGION;
export const bucketName = BUCKET_NAME;
export const prefix = '/api';
export const specs = "/docs";