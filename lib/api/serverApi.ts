// lib/api/serverApi.ts


// import { cookies } from 'next/headers';

// import { Note, NewNote } from '@/types/note';

// import { api } from './api';

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// const NOTEHUB_BASE_URL = 'https://notehub-public.goit.study/api';

// export const serverApi = {
//   // Отримання нотаток (для серверних компонентів)
//   fetchNotes: async (
//     page = 1,
//     perPage = 12,
//     search = '',
//     tag?: string
//   ): Promise<NotesResponse> => {
//     try {
//       const params: Record<string, string | number> = {
//         page,
//         perPage,
//         search
//       };
      
//       if (tag && tag !== 'All') {
//         params.tag = tag;
//       }
      
//       const response = await fetch(`${NOTEHUB_BASE_URL}/notes?${new URLSearchParams(params as any)}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//         next: { revalidate: 60 } // Кешування на 60 секунд
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error('Помилка запиту:', error);
//       throw error;
//     }
//   },

//   // Отримання нотатки по ID
//   fetchNoteById: async (id: string): Promise<Note> => {
//     try {
//       const response = await fetch(`${NOTEHUB_BASE_URL}/notes/${id}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//         next: { revalidate: 60 }
//       });

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error(`Note with ID "${id}" not found`);
//         }
//         if (response.status === 401) {
//           throw new Error('Authorization error. Please check access token');
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error('Error fetching note:', error);
//       throw new Error('Failed to fetch note');
//     }
//   },

//   // Приклад виклику вашого API з cookies для серверних компонентів
//   getUserProfile: async (): Promise<any> => {
//     const cookieStore = await cookies(); // Додано await
//     const authToken = cookieStore.get('authToken')?.value;

//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
//       headers: {
//         'Cookie': `authToken=${authToken}`,
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch user profile');
//     }

//     return response.json();
//   },

//   // Альтернативний варіант з використанням axios (якщо потрібно)
//   getUserProfileWithAxios: async (): Promise<any> => {
//     const cookieStore = await cookies(); // Додано await
//     const authToken = cookieStore.get('authToken')?.value;

//     const response = await api.get('/profile', {
//       headers: {
//         Cookie: `authToken=${authToken}`,
//       },
//     });

//     return response.data;
//   }
// };






// lib/api/serverApi.ts


// import { cookies } from 'next/headers';


// import { Note } from '@/types/note';

// import { api } from '@/lib/api/api';

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// interface ProfileData {
//   id: string;
//   email: string;
//   username?: string;
// }

// export const serverApi = {
//   // Отримання нотаток (для серверних компонентів)
//   fetchNotes: async (
//     page = 1,
//     perPage = 12,
//     search = '',
//     tag?: string
//   ): Promise<NotesResponse> => {
//     try {
//       const params: Record<string, string | number> = {
//         page,
//         perPage,
//         search
//       };
      
//       if (tag && tag !== 'All') {
//         params.tag = tag;
//       }
      
//       const response = await fetch(`${NOTEHUB_BASE_URL}/notes?${new URLSearchParams(params as Record<string, string>)}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//         next: { revalidate: 60 } // Кешування на 60 секунд
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error('Помилка запиту:', error);
//       throw error;
//     }
//   },

//   // Отримання нотатки по ID
//   fetchNoteById: async (id: string): Promise<Note> => {
//     try {
//       const response = await fetch(`${NOTEHUB_BASE_URL}/notes/${id}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//         },
//         next: { revalidate: 60 }
//       });

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error(`Note with ID "${id}" not found`);
//         }
//         if (response.status === 401) {
//           throw new Error('Authorization error. Please check access token');
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error('Error fetching note:', error);
//       throw new Error('Failed to fetch note');
//     }
//   },

//   // Приклад виклику вашого API з cookies для серверних компонентів
//   getUserProfile: async (): Promise<ProfileData> => {
//     const cookieStore = await cookies();
//     const authToken = cookieStore.get('authToken')?.value;

//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
//       headers: {
//         'Cookie': `authToken=${authToken}`,
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch user profile');
//     }

//     return response.json();
//   },

//   // Альтернативний варіант з використанням axios
//   getUserProfileWithAxios: async (): Promise<ProfileData> => {
//     const cookieStore = await cookies();
//     const authToken = cookieStore.get('authToken')?.value;

//     const response = await api.get<ProfileData>('/profile', {
//       headers: {
//         Cookie: `authToken=${authToken}`,
//       },
//     });

//     return response.data;
//   }
// };

// // Окремі експорти для зручності імпорту
// export const fetchNotes = serverApi.fetchNotes;
// export const fetchNoteById = serverApi.fetchNoteById;
// export const getUserProfile = serverApi.getUserProfile;





// lib/api/serverApi.ts
import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import { api } from '@/lib/api/api';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface ProfileData {
  id: string;
  email: string;
  username?: string;
}

// Додаємо константу NOTEHUB_BASE_URL
const NOTEHUB_BASE_URL = 'https://notehub-public.goit.study/api';

export const serverApi = {
  // Отримання нотаток (для серверних компонентів)
  fetchNotes: async (
    page = 1,
    perPage = 12,
    search = '',
    tag?: string
  ): Promise<NotesResponse> => {
    try {
      const params: Record<string, string | number> = {
        page,
        perPage,
        search
      };
      
      if (tag && tag !== 'All') {
        params.tag = tag;
      }
      
      const response = await fetch(`${NOTEHUB_BASE_URL}/notes?${new URLSearchParams(params as Record<string, string>)}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
        next: { revalidate: 60 } // Кешування на 60 секунд
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Помилка запиту:', error);
      throw error;
    }
  },

  // Отримання нотатки по ID
  fetchNoteById: async (id: string): Promise<Note> => {
    try {
      const response = await fetch(`${NOTEHUB_BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        },
        next: { revalidate: 60 }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Note with ID "${id}" not found`);
        }
        if (response.status === 401) {
          throw new Error('Authorization error. Please check access token');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching note:', error);
      throw new Error('Failed to fetch note');
    }
  },

  // Приклад виклику вашого API з cookies для серверних компонентів
  getUserProfile: async (): Promise<ProfileData> => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
      headers: {
        'Cookie': `authToken=${authToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return response.json();
  },

  // Альтернативний варіант з використанням axios
  getUserProfileWithAxios: async (): Promise<ProfileData> => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    const response = await api.get<ProfileData>('/profile', {
      headers: {
        Cookie: `authToken=${authToken}`,
      },
    });

    return response.data;
  }
};

// Окремі експорти для зручності імпорту
export const fetchNotes = serverApi.fetchNotes;
export const fetchNoteById = serverApi.fetchNoteById;
export const getUserProfile = serverApi.getUserProfile;