// app/(auth routes)/sign-up/page.tsx



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';



import { clientApi } from '@/lib/api/clientApi';


import { SignUpData } from '@/types/user';
import css from './SignUpPage.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const signUpMutation = useMutation({
    mutationFn: clientApi.signUp,
    onSuccess: () => {
      // Успішна реєстрація - редірект на профіль
      router.push('/profile');
    },
    onError: (error: Error) => {
      // Обробка помилок реєстрації
      setError(error.message);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    setError(''); // Очищаємо попередні помилки

    const userData: SignUpData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Валідація даних
    if (!userData.email || !userData.password) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    if (userData.password.length < 6) {
      setError('Пароль має містити щонайменше 6 символів');
      return;
    }

    signUpMutation.mutate(userData);
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            className={css.input} 
            required 
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
            minLength={6}
          />
        </div>

        <div className={css.actions}>
          <button 
            type="submit" 
            className={css.submitButton}
            disabled={signUpMutation.isPending}
          >
            {signUpMutation.isPending ? 'Реєстрація...' : 'Register'}
          </button>
        </div>

        {error && (
          <p className={css.error}>{error}</p>
        )}
      </form>
    </main>
  );
}