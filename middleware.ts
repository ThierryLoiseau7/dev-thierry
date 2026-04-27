import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Lang } from "./lib/i18n/translations";

const COUNTRY_TO_LANG: Record<string, Lang> = {
  // French
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr",
  SN: "fr", CI: "fr", CM: "fr", ML: "fr", BF: "fr",
  DZ: "fr", MA: "fr", TN: "fr", MG: "fr", CD: "fr",
  RW: "fr", BI: "fr", GA: "fr", CG: "fr", NE: "fr",
  TD: "fr", GN: "fr", MR: "fr", DJ: "fr",
  // Haitian Creole
  HT: "ht",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", PE: "es",
  CL: "es", VE: "es", EC: "es", BO: "es", PY: "es",
  UY: "es", CU: "es", DO: "es", GT: "es", HN: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", PR: "es", GQ: "es",
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only auto-detect if user has not manually chosen a language
  if (!request.cookies.get("lang")) {
    const country =
      request.headers.get("x-vercel-ip-country") ||
      "";
    const lang: Lang = COUNTRY_TO_LANG[country] ?? "en";
    response.cookies.set("lang", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
