// app/(auth routes)/sign-up/page.tsx

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signUp } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
// import css from "./SignUpPage.module.css";

// const SignUp = () => {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { setUser } = useAuthStore();

//   const handleSubmit = async (formData: FormData) => {
//     setIsLoading(true);
//     setError("");

//     try {
//       const email = formData.get("email") as string;
//       const username = formData.get("username") as string;
//       const password = formData.get("password") as string;

//       if (!email || !username || !password) {
//         setError("Будь ласка, заповніть всі поля");
//         setIsLoading(false);
//         return;
//       }

//       if (password.length < 6) {
//         setError("Пароль повинен містити щонайменше 6 символів");
//         setIsLoading(false);
//         return;
//       }

//       if (username.length < 3) {
//         setError("Ім'я користувача повинно містити щонайменше 3 символи");
//         setIsLoading(false);
//         return;
//       }

//       const user = await signUp({ email, username, password });
//       setUser(user);
//       router.push("/profile");
//     } catch (error: any) {
//       if (
//         error.message.includes("409") ||
//         error.message.includes("вже існує")
//       ) {
//         setError(
//           "Користувач з такою email адресою вже існує. Спробуйте увійти."
//         );
//       } else {
//         setError(error.message || "Помилка реєстрації. Спробуйте ще раз.");
//       }
//       console.error("Registration error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className={css.mainContent}>
//       <h1 className={css.formTitle}>Sign up</h1>
//       <form className={css.form} action={handleSubmit}>
//         <div className={css.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             name="email"
//             className={css.input}
//             required
//             placeholder="Введіть ваш email"
//           />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             type="text"
//             name="username"
//             className={css.input}
//             required
//             placeholder="Введіть ім'я користувача (мінімум 3 символи)"
//             minLength={3}
//           />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             name="password"
//             className={css.input}
//             required
//             placeholder="Введіть пароль (мінімум 6 символів)"
//             minLength={6}
//           />
//         </div>

//         <div className={css.actions}>
//           <button
//             type="submit"
//             className={css.submitButton}
//             disabled={isLoading}
//           >
//             {isLoading ? "Реєстрація..." : "Зареєструватися"}
//           </button>
//         </div>

//         {error && (
//           <div className={css.errorContainer}>
//             <p className={css.error}>{error}</p>
//             {error.includes("вже існує") && (
//               <button
//                 type="button"
//                 className={css.loginLink}
//                 onClick={() => router.push("/sign-in")}
//               >
//                 Перейти до входу
//               </button>
//             )}
//           </div>
//         )}
//       </form>
//     </main>
//   );
// };

// export default SignUp;

// app/(auth routes)/sign-up/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignUpPage.module.css";

interface SignUpError {
  message?: string;
  response?: {
    data?: {
      error?: string;
    };
  };
}

const SignUp = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const email = formData.get("email") as string;
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (!email || !username || !password) {
        setError("Будь ласка, заповніть всі поля");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Пароль повинен містити щонайменше 6 символів");
        setIsLoading(false);
        return;
      }

      if (username.length < 3) {
        setError("Ім'я користувача повинно містити щонайменше 3 символи");
        setIsLoading(false);
        return;
      }

      const user = await signUp({ email, username, password });
      setUser(user);
      router.push("/profile");
    } catch (err) {
      const error = err as SignUpError;
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Помилка реєстрації. Спробуйте ще раз.";

      if (errorMessage.includes("409") || errorMessage.includes("вже існує")) {
        setError(
          "Користувач з такою email адресою вже існує. Спробуйте увійти."
        );
      } else {
        setError(errorMessage);
      }
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            placeholder="Введіть ваш email"
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className={css.input}
            required
            placeholder="Введіть ім'я користувача (мінімум 3 символи)"
            minLength={3}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            placeholder="Введіть пароль (мінімум 6 символів)"
            minLength={6}
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Реєстрація..." : "Зареєструватися"}
          </button>
        </div>

        {error && (
          <div className={css.errorContainer}>
            <p className={css.error}>{error}</p>
            {error.includes("вже існує") && (
              <button
                type="button"
                className={css.loginLink}
                onClick={() => router.push("/sign-in")}
              >
                Перейти до входу
              </button>
            )}
          </div>
        )}
      </form>
    </main>
  );
};

export default SignUp;
