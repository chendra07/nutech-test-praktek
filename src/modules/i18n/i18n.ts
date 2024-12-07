import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import * as path from "path";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(
        process.cwd(),
        "src/modules/i18n/{{lng}}/{{ns}}.json"
      ),
    },
    fallbackLng: "id",
    preload: ["en", "id"],
  });

export default i18next;
