import { writable } from 'svelte/store';
import type { LoveModalConfig } from '$lib/types/LoveModalConfig';

export const modalConfig = writable<LoveModalConfig | null>(null);
export const modalOpen = writable(false);

export function openModal(config: LoveModalConfig) {
	modalConfig.set(config);
	modalOpen.set(true);
}

export function closeModal() {
	modalOpen.set(false);
}