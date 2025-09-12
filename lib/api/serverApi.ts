// lib/api/serverApi.ts


import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const serverApi = {
  fetchNotes: async (
    page = 1,
    perPage = 12,
    search = '',
    tag?: string
  ): Promise<NotesResponse> => {
    try {
      const cookieStore = await cookies();
      const cookiesString = cookieStore.getAll()
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');

      const params: Record<string, string> = {
        page: page.toString(),
        perPage: perPage.toString(),
        search
      };
      
      if (tag && tag !== 'All') {
        params.tag = tag;
      }
      
      const response = await nextServer.get<NotesResponse>('/notes', { 
        params,
        headers: {
          Cookie: cookiesString,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Помилка запиту до /notes:', {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(error.response?.data?.error || error.message || 'Failed to fetch notes');
    }
  },

  fetchNoteById: async (id: string): Promise<Note> => {
    try {
      const cookieStore = await cookies();
      const cookiesString = cookieStore.getAll()
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');

      const response = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
          Cookie: cookiesString,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching note:', error);
      if (error.response?.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(error.response?.data?.error || error.message || 'Failed to fetch note');
    }
  },

  getMe: async (): Promise<User> => {
    try {
      const cookieStore = await cookies();
      const cookiesString = cookieStore.getAll()
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');

      const response = await nextServer.get<User>('/users/me', {
        headers: {
          Cookie: cookiesString,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch user:', error);
      if (error.response?.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error(error.response?.data?.error || error.message || 'Failed to fetch user profile');
    }
  },

  // Alternative method using fetch
  getMeWithFetch: async (): Promise<User> => {
    try {
      const cookieStore = await cookies();
      const cookiesString = cookieStore.getAll()
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          'Cookie': cookiesString,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error('Failed to fetch user profile');
      }

      return response.json();
    } catch (error: any) {
      console.error('Failed to fetch user with fetch:', error);
      throw new Error(error.message || 'Failed to fetch user profile');
    }
  }
};

export const { fetchNotes, fetchNoteById, getMe, getMeWithFetch } = serverApi;