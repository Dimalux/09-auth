// app/(private routes)/profile/ProfileClient.tsx


'use client';

import { User } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfilePage.module.css';

interface ProfileClientProps {
  user: User | null;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.loading}>Loading profile...</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p className={css.errorMessage}>Please sign in to view your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src="/default-avatar.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          {/* <p><strong>Username:</strong> {user.username || 'Not set'}</p> */}
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </main>
  );
}