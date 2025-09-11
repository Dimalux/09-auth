// app/api/auth/logout/route.ts



// import { NextResponse } from "next/server";
// import { api } from "../../api";
// import { cookies } from "next/headers";
// import { isAxiosError } from "axios";
// import { logErrorResponse } from "../../_utils/utils";

// export async function POST() {
//   try {
//     const cookieStore = await cookies();

//     const accessToken = cookieStore.get("accessToken")?.value;
//     const refreshToken = cookieStore.get("refreshToken")?.value;

//     await api.post("auth/logout", null, {
//       headers: {
//         Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
//       },
//     });

//     cookieStore.delete("accessToken");
//     cookieStore.delete("refreshToken");

//     return NextResponse.json(
//       { message: "Logged out successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.status }
//       );
//     }
//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  try {
    // Формуємо правильні заголовки Cookie
    const cookieHeader = [];
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    
    if (accessToken) cookieHeader.push(`accessToken=${accessToken}`);
    if (refreshToken) cookieHeader.push(`refreshToken=${refreshToken}`);
    
    // Робимо запит до зовнішнього API
    await api.post("/auth/logout", null, {
      headers: {
        Cookie: cookieHeader.join('; '),
      },
    });
  } catch (error) {
    // Ігноруємо помилки від зовнішнього API, все одно очищаємо куки
    console.log("External logout API might not be available, proceeding with local cleanup");
  }

  // Завжди очищаємо куки на нашому сервері
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}