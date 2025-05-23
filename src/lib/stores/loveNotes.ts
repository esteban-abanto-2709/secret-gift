import { get, writable } from 'svelte/store';
import type { LoveNote } from '../types/loveNotes';

const createLoveNotesStore = () => {
    const store = writable<LoveNote[]>([]);
    const { subscribe, set } = store;

    let index = 0;

    return {
        subscribe,
        getNextNote: () => {
            const notes = get(store);
            const nextNote = notes[index];
            index = (index + 1) % notes.length;
            return nextNote;
        },
        peekNextNote: () => {
            const notes = get(store);
            return notes[index];
        },
        setNotes: (notes: LoveNote[]) => {
            // Shuffle the notes
            const shuffledNotes = [...notes].sort(() => Math.random() - 0.5);
            set(shuffledNotes);
        }
    };
};

export const loveNotesStore = createLoveNotesStore();

