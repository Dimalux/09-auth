// components/NoteList/NoteList.tsx


import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Note } from "@/types/note";
import styles from "@/components/NoteList/NoteList.module.css";
import { clientApi } from "@/lib/api/clientApi";
import { useState } from "react";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Ви впевнені, що хочете видалити цю нотатку?")) {
      // Додаємо ID до множини видалення (для disabled стану)
      setDeletingIds(prev => new Set(prev).add(id));
      
      try {
        // Оптимістично оновлюємо UI - видаляємо нотатку
        queryClient.setQueryData<{ notes: Note[]; totalPages: number }>(["notes"], (old) => {
          if (!old) return old;
          return {
            ...old,
            notes: old.notes.filter(note => note.id !== id)
          };
        });
        
        // Викликаємо API для фактичного видалення
        await clientApi.deleteNote(id);
        
        // Після успішного видалення інвалідуємо запит для оновлення даних
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        
      } catch (error) {
        console.error("Помилка при видаленні:", error);
        
        // У разі помилки - інвалідуємо запити для відновлення даних
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        
      } finally {
        // Видаляємо ID з множини видалення
        setDeletingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    }
  };

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <div className={styles.cardContent}>
            <h2 className={styles.title}>{note.title}</h2>
            <p className={styles.content}>{note.content}</p>
          </div>

          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <div className={styles.actions}>
             
              <Link 
                href={`/notes/${note.id}`} 
                className={styles.link}
                scroll={false} 
              >
                View details
              </Link>
              <button
                className={styles.button}
                onClick={(e) => handleDelete(note.id, e)}
                disabled={deletingIds.has(note.id)} 
              >
                Delete 
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}