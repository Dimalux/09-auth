// lib/api/clientApi.ts


// import axios from 'axios';
// import { Note, NewNote } from '../types/note';
// import { api } from './api';

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// const NOTEHUB_BASE_URL = 'https://notehub-public.goit.study/api';

// // Захисник від подвійних запитів
// let lastRequestTime = 0;
// const REQUEST_DELAY = 500;

// export const clientApi = {
//   // Отримання нотаток (для клієнтських компонентів)
//   fetchNotes: async (
//     page = 1,
//     perPage = 12,
//     search = '',
//     tag?: string
//   ): Promise<NotesResponse> => {
//     const now = Date.now();
//     if (now - lastRequestTime < REQUEST_DELAY) {
//       console.log('Запит відхилено: занадто швидко після попереднього');
//       throw new Error('Request too fast');
//     }
//     lastRequestTime = now;

//     try {
//       const params: Record<string, string | number> = {
//         page,
//         perPage,
//         search
//       };
      
//       if (tag && tag !== 'All') {
//         params.tag = tag;
//       }
      
//       const response = await axios.get<NotesResponse>(`${NOTEHUB_BASE_URL}/notes`, {
//         params,
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error('Помилка запиту:', error);
//       throw error;
//     }
//   },

//   // Отримання нотатки по ID
//   fetchNoteById: async (id: string): Promise<Note> => {
//     const now = Date.now();
//     if (now - lastRequestTime < REQUEST_DELAY) {
//       console.log('Запит відхилено: занадто швидко після попереднього');
//       throw new Error('Request too fast');
//     }
//     lastRequestTime = now;

//     try {
//       const response = await axios.get<Note>(`${NOTEHUB_BASE_URL}/notes/${id}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//       });
//       return response.data;
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 404) {
//           throw new Error(`Note with ID "${id}" not found`);
//         }
//         if (error.response?.status === 401) {
//           throw new Error('Authorization error. Please check access token');
//         }
//       }
//       throw new Error('Failed to fetch note');
//     }
//   },

//   // Створення нотатки
//   createNote: async (note: NewNote): Promise<Note> => {
//     try {
//       const response = await axios.post<Note>(`${NOTEHUB_BASE_URL}/notes`, note, {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Помилка створення:', error);
//       throw error;
//     }
//   },

//   // Видалення нотатки
//   deleteNote: async (id: string): Promise<Note> => {
//     try {
//       const response = await axios.delete<Note>(`${NOTEHUB_BASE_URL}/notes/${id}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Помилка видалення:', error);
//       throw error;
//     }
//   },

//   // Приклад виклику вашого API (не Notehub)
//   getUserProfile: async (): Promise<any> => {
//     const response = await api.get('/profile');
//     return response.data;
//   },

//   updateUserProfile: async (data: any): Promise<any> => {
//     const response = await api.put('/profile', data);
//     return response.data;
//   }
// };





// lib/api/clientApi.ts


import axios from 'axios';
import { Note, NewNote } from '@/types/note';



import { SignUpData, User } from '@/types/user';



import { api } from './api';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface ProfileData {
  // Додайте конкретні поля профілю, які очікуєте
  id: string;
  email: string;
  username?: string;
  // додайте інші поля за потребою
}

const NOTEHUB_BASE_URL = 'https://notehub-public.goit.study/api';

// Захисник від подвійних запитів
let lastRequestTime = 0;
const REQUEST_DELAY = 500;

export const clientApi = {
  // Отримання нотаток (для клієнтських компонентів)
  fetchNotes: async (
    page = 1,
    perPage = 12,
    search = '',
    tag?: string
  ): Promise<NotesResponse> => {
    const now = Date.now();
    if (now - lastRequestTime < REQUEST_DELAY) {
      console.log('Запит відхилено: занадто швидко після попереднього');
      throw new Error('Request too fast');
    }
    lastRequestTime = now;

    try {
      const params: Record<string, string | number> = {
        page,
        perPage,
        search
      };
      
      if (tag && tag !== 'All') {
        params.tag = tag;
      }
      
      const response = await axios.get<NotesResponse>(`${NOTEHUB_BASE_URL}/notes`, {
        params,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Помилка запиту:', error);
      throw error;
    }
  },

  // Отримання нотатки по ID
  fetchNoteById: async (id: string): Promise<Note> => {
    const now = Date.now();
    if (now - lastRequestTime < REQUEST_DELAY) {
      console.log('Запит відхилено: занадто швидко після попереднього');
      throw new Error('Request too fast');
    }
    lastRequestTime = now;

    try {
      const response = await axios.get<Note>(`${NOTEHUB_BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Note with ID "${id}" not found`);
        }
        if (error.response?.status === 401) {
          throw new Error('Authorization error. Please check access token');
        }
      }
      throw new Error('Failed to fetch note');
    }
  },

  // Створення нотатки
  createNote: async (note: NewNote): Promise<Note> => {
    try {
      const response = await axios.post<Note>(`${NOTEHUB_BASE_URL}/notes`, note, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Помилка створення:', error);
      throw error;
    }
  },

  // Видалення нотатки
  deleteNote: async (id: string): Promise<Note> => {
    try {
      const response = await axios.delete<Note>(`${NOTEHUB_BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Помилка видалення:', error);
      throw error;
    }
  },

  // Реєстрація нового користувача
  signUp: async (userData: SignUpData): Promise<User> => {
    try {
      const response = await api.post<User>('/auth/signup', userData);
      return response.data;
    } catch (error: unknown) {
      console.error('Помилка реєстрації:', error);
      
      const apiError = error as ApiError;
      throw new Error(apiError.response?.data?.message || 'Помилка реєстрації');
    }
  },

  // Отримання профілю користувача
  getUserProfile: async (): Promise<ProfileData> => {
    const response = await api.get<ProfileData>('/profile');
    return response.data;
  },

  // Оновлення профілю користувача
  updateUserProfile: async (data: Partial<ProfileData>): Promise<ProfileData> => {
    const response = await api.put<ProfileData>('/profile', data);
    return response.data;
  }
};

// Окремі експорти для зручності імпорту
export const fetchNotes = clientApi.fetchNotes;
export const fetchNoteById = clientApi.fetchNoteById;
export const createNote = clientApi.createNote;
export const deleteNote = clientApi.deleteNote;
export const signUp = clientApi.signUp;
export const getUserProfile = clientApi.getUserProfile;
export const updateUserProfile = clientApi.updateUserProfile;