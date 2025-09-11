// app/(private routes)/profile/ProfileClient.tsx


'use client';

import { User } from '@/types/user';
import css from './ProfilePage.module.css';

interface ProfileClientProps {
  user: User | null;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p>Please sign in to view your profile.</p>
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
          <p>Username: {user.username || 'Not set'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}