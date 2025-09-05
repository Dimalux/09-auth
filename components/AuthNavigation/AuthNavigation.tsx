// components/Header/AuthNavigation.tsx



// components/AuthNavigation/AuthNavigation.tsx

import Link from "next/link";
import css from "./AuthNavigation.module.css";

const AuthNavigation = () => {
  // Тут потрібно буде додати логіку для отримання email користувача
  // та обробку виходу з системи
  const userEmail = "User email"; // Заглушка - потім замінити на реальний email

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{userEmail}</p>
        <button className={css.logoutButton}>
          Logout
        </button>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;