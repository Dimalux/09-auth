// lib/api/serverApi.ts



import { cookies } from 'next/headers';
import { nextServer, ApiError } from './api';
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
      const params: Record<string, string> = {
        page: page.toString(),
        perPage: perPage.toString(),
        search
      };
      
      if (tag && tag !== 'All') {
        params.tag = tag;
      }
      
      const response = await nextServer.get<NotesResponse>('/notes', { params });
      return response.data;
    } catch (error) {
      console.error('Помилка запиту:', error);
      throw error;
    }
  },

  fetchNoteById: async (id: string): Promise<Note> => {
    try {
      const response = await nextServer.get<Note>(`/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw new Error('Failed to fetch note');
    }
  },

  getMe: async (): Promise<User> => {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('accessToken')?.value;

      const response = await nextServer.get<User>('/users/me', {
        headers: accessToken ? {
          Cookie: `accessToken=${accessToken}`,
        } : {},
      });

      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(apiError.response?.data?.error || apiError.message || 'Failed to fetch user profile');
    }
  },

  getMeWithFetch: async (): Promise<User> => {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('accessToken')?.value;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          'Cookie': accessToken ? `accessToken=${accessToken}` : '',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return response.json();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to fetch user profile');
    }
  }
};

export const { fetchNotes, fetchNoteById, getMe, getMeWithFetch } = serverApi;