<script lang="ts">
	import { loveNotesStore } from '$lib/stores/loveNotes';
	import type { LoveNote } from '$lib/types/loveNotes';
	import { onMount } from 'svelte';

	const generateNonOverlappingStars = () => {
		const stars = [];
		const numRows = 6;
		const numCols = 12;
		const cellWidth = 100 / numCols;
		const cellHeight = 80 / numRows;
		const margin = 2;

		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < numCols; col++) {
				if (Math.random() > 0.7) continue;
				const x = col * cellWidth + margin + Math.random() * (cellWidth - 2 * margin);
				const y = row * cellHeight + margin + Math.random() * (cellHeight - 2 * margin);
				stars.push({
					id: stars.length,
					x,
					y,
					size: Math.random() * 0.5 + 0.5,
					delay: Math.random() * 5
				});
			}
		}
		return stars;
	};

	let currentMessage = $state<LoveNote | null>(null);
	let isSpotifyLoading = $state(true);
	let isLoading = $state(true);

	onMount(async () => {
		try {
			const response = await fetch('/love-notes.json');
			const data: LoveNote[] = await response.json();
			loveNotesStore.setNotes(data);
			isLoading = false;
		} catch (error) {
			console.error('Error al cargar love-notes.json:', error);
		}
	});

	const showModalWithMessage = () => {
		if (isLoading) return;
		isSpotifyLoading = true;
		currentMessage = loveNotesStore.getNextNote();
		const modal = document.getElementById('my_modal_1');
		if (modal instanceof HTMLDialogElement) {
			modal.showModal();
		}
	};

	const handleIframeLoad = () => {
		isSpotifyLoading = false;
	};

	const handleDialogClose = () => {
		setTimeout(() => {
			const nextNote = loveNotesStore.peekNextNote();
			if (nextNote?.spotifyId) {
				const preloadLink = document.createElement('link');
				preloadLink.rel = 'preload';
				preloadLink.href = `https://open.spotify.com/embed/track/${nextNote.spotifyId}`;
				preloadLink.as = 'iframe';
				document.head.appendChild(preloadLink);
			}
		}, 500);
	};
</script>

<div
	class="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#011b58] via-[#03358c] to-[#02449f]"
>
	{#each generateNonOverlappingStars() as star}
		<button
			type="button"
			tabindex="-1"
			class="absolute flex h-3 w-3 items-center justify-center outline-none"
			aria-label="Pulsa para ver el mensaje"
			style="left: {star.x}%; top: {star.y}%;"
			onclick={showModalWithMessage}
		>
			<div class="relative h-1 w-1 animate-pulse rounded-full bg-white"></div>
		</button>
	{/each}

	<div class="font-snoopy mt-30 w-full text-center text-4xl">
		<h1 class="mx-auto max-w-3xs font-bold text-white md:max-w-md">
			PULSA LAS ESTRELLAS, FELIZ PRIMER MES ❤️
		</h1>
	</div>

	<div class="absolute bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2">
		<div class="relative mx-auto mb-4 h-64 w-56">
			<img
				src="/snoopy.png"
				alt="Snoopy en su casa"
				class="h-auto w-full object-contain"
				style="filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));"
			/>
		</div>
	</div>

	<div class="absolute bottom-0 h-30 w-full bg-gradient-to-t from-green-600 to-green-700"></div>

	<dialog id="my_modal_1" class="modal" onclose={handleDialogClose}>
		<div class="modal-box max-w-md bg-white">
			<div class="mb-3">
				<p class="text-neutral text-md mb-1">{currentMessage?.message}</p>
				<p class="text-sm text-gray-600 italic">
					{currentMessage?.song} - {currentMessage?.author}
				</p>
			</div>
			<div class="w-full">
				{#if isSpotifyLoading}
					<div class="flex h-20 w-full items-center justify-center rounded bg-gray-100">
						<div class="flex items-center space-x-2">
							<div class="h-3 w-3 animate-bounce rounded-full bg-green-500"></div>
							<div
								class="h-3 w-3 animate-bounce rounded-full bg-green-500"
								style="animation-delay: 0.1s;"
							></div>
							<div
								class="h-3 w-3 animate-bounce rounded-full bg-green-500"
								style="animation-delay: 0.2s;"
							></div>
						</div>
					</div>
				{/if}
				<iframe
					title="Spotify"
					src={`https://open.spotify.com/embed/track/${currentMessage?.spotifyId}`}
					width="100%"
					height="80"
					frameBorder="0"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
					style={isSpotifyLoading ? 'height: 0; width: 0; opacity: 0;' : ''}
					onload={handleIframeLoad}
				></iframe>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</div>
