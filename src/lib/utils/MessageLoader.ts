import type { LoveModalConfig } from '$lib/types/LoveModalConfig';

/**
 * Mezcla un array usando el algoritmo de Fisher-Yates.
 */
function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

/**
 * Carga un archivo JSON desde /static y lo convierte a un array de LoveModalConfig de forma aleatoria.
 * @param relativePath Ruta relativa desde `/static`, por ejemplo: 'universes/between-space-and-time/messages.json'
 */
export async function loadMessages(relativePath: string): Promise<LoveModalConfig[]> {
	try {
		const response = await fetch(`/${relativePath}`);
		if (!response.ok) throw new Error(`Error al cargar ${relativePath}`);
		const rawData = await response.json();

		const parsedData = rawData.map((item: LoveModalConfig) => ({
			title: item.title,
			imageUrl: item.imageUrl,
			message: item.message,
			spotifyId: item.spotifyId
		}));

		return shuffleArray(parsedData);
	} catch (error) {
		console.error('Error cargando LoveModalConfig:', error);
		return [];
	}
}
