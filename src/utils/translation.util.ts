import { TranslationKeys } from "../modules/i18n/translations.generated";
import i18next from "../modules/i18n/i18n";
import { ZodError, ZodIssue } from "zod";
import { Request } from "express";

export function t(
  key: TranslationKeys,
  options?: Record<string, any>,
  req?: Request
) {
  return (req ? req.t(key, options) : i18next.t(key, options)) as string;
}

export function extractZodError(
  error: ZodError,
  type: "query" | "parameter" | "input" = "input"
) {
  if (error) {
    const result = error.errors.map((issue: ZodIssue) => {
      return type ? `${type} ${issue.message}` : issue.message;
    });

    return result.join(", ");
  }
}
