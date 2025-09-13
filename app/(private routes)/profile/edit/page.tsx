// app/(private routes)/profile/edit/page.tsx


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usersApi } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";

interface UpdateError {
  message?: string;
}

export default function EditProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Ініціалізація username після завантаження даних користувача
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.loading}>Loading...</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await usersApi.updateMe({ username });
      router.push("/profile");
    } catch (err) {
      const error = err as UpdateError;
      console.error("Update failed:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || "/default-avatar.png"} // Використовуємо аватарку з user
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}