import { Request } from "express";
import { TranslationKeys } from "../modules/i18n/translations.generated";

export function t(
  req: Request,
  key: TranslationKeys,
  options?: Record<string, any>
) {
  return req.t(key, options);
}
