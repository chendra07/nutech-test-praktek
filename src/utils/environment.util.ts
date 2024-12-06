import * as dotenv from "dotenv";
dotenv.config();

enum EnvironmentEnum {
  production = "production",
  staging = "staging",
  development = "development",
}

export type EnvEnumType = `${EnvironmentEnum}`;

export function environmentValidator(envString: string): EnvEnumType {
  if (Object.values(EnvironmentEnum).includes(envString as any)) {
    return envString as EnvironmentEnum;
  }

  return null;
}

function isEnvValid(value: any): boolean {
  if (typeof value === "number" && isNaN(value)) {
    return true;
  } else if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return false;
  } else {
    return true;
  }
}

export function stringToBoolean(str: string) {
  const lowerStr = str?.toLowerCase();
  return lowerStr === "true";
}

/**
 * Checks if all the environment variables used in the application are defined and valid.
 * If any of the variables are undefined or fail a custom validation filter, trigger error to prevent project from running.
 *
 * @throws {Error} If any environment variable is undefined or invalid
 */
export function envValidator(envi: any) {
  let isValid = true;
  const listOfInvalidEnv: string[] = [];

  for (const envKey in envi) {
    if (envi[envKey] === undefined || isEnvValid(envi[envKey])) {
      isValid = false;
      listOfInvalidEnv.push(envKey);
    }
  }

  if (!isValid) {
    throw new Error(
      `ENV [${listOfInvalidEnv.join(", ")}] is undefined or invalid`
    );
  }
}

type EnviType = {
  NODE_ENV: EnvEnumType;
  PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  WHITELIST: string;
  CLD_NAME: string;
  CLD_API_KEY: string;
  CLD_API_SECRET: string;
  BCRYPT_SALT: number;
  JWT_AUTH_SECRET: string;
  JWT_AUTH_EXPIRE: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string;
  BACKEND_BASEURL: string;
};

export const envi: EnviType = {
  NODE_ENV: environmentValidator(process.env.NODE_ENV),
  PORT: +process.env.PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  WHITELIST: process.env.WHITELIST,
  CLD_NAME: process.env.CLD_NAME,
  CLD_API_KEY: process.env.CLD_API_KEY,
  CLD_API_SECRET: process.env.CLD_API_SECRET,
  BCRYPT_SALT: +process.env.BCRYPT_SALT,
  JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
  JWT_AUTH_EXPIRE: process.env.JWT_AUTH_EXPIRE,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
  BACKEND_BASEURL: process.env.BACKEND_BASEURL,
};
