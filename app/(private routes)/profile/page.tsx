// app/(private routes)/profile/page.tsx


import { Metadata } from 'next';
import css from '@/app/(private routes)/profile/ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'User Profile - Your App Name',
  description: 'View and manage your user profile information',
  keywords: 'profile, user, account, settings, personal information',
  authors: [{ name: 'Your App Team' }],
  openGraph: {
    title: 'User Profile - Your App Name',
    description: 'View and manage your user profile information',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'User Profile - Your App Name',
    description: 'View and manage your user profile information',
  },
  robots: 'noindex, nofollow', // Для приватних сторінок
};

export default function Profile() {
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
            src="/avatar-placeholder.png" // або шлях до аватарки користувача
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}

