// app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Registration data:", body);

    // Перевірка наявності обов'язкових полів
    if (!body.email || !body.password || !body.username) {
      return NextResponse.json(
        { error: "Email, username and password are required" },
        { status: 400 }
      );
    }

    // Отримуємо cookies з вхідного запиту
    const cookieStore = await cookies();
    const incomingCookies = cookieStore.getAll();
    const cookieHeader = incomingCookies
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    console.log("Making request to external API with cookies:", cookieHeader);

    // Робимо запит до зовнішнього API з cookies
    const apiRes = await api.post("/auth/register", body, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    console.log("External API response status:", apiRes.status);

    // Обробляємо cookies з відповіді зовнішнього API
    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      console.log("Cookies received from external API");
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        console.log("Parsed cookie keys:", Object.keys(parsed));

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || "/",
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax" as const,
        };

        // Перевіряємо та встановлюємо accessToken
        const accessTokenValue = parsed.accessToken || parsed["access-token"];
        if (accessTokenValue) {
          cookieStore.set("accessToken", accessTokenValue, options);
          console.log("Access token set");
        }

        // Перевіряємо та встановлюємо refreshToken
        const refreshTokenValue =
          parsed.refreshToken || parsed["refresh-token"];
        if (refreshTokenValue) {
          cookieStore.set("refreshToken", refreshTokenValue, options);
          console.log("Refresh token set");
        }

        // Додатково: перевіряємо інші можливі назви токенів
        if (!accessTokenValue && !refreshTokenValue) {
          console.log("No standard token names found, checking all keys:");
          Object.entries(parsed).forEach(([key, value]) => {
            if (key.toLowerCase().includes("token")) {
              console.log(`Found token-like key: ${key} = ${value}`);
            }
          });
        }
      }
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: any) {
    console.error("Full registration error:", error);
    console.error("Error details:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      message: error.message,
    });

    return NextResponse.json(
      {
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Registration failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
