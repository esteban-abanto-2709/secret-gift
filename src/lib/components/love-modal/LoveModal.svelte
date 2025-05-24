<script lang="ts">
	import Modal from '$lib/components/shared/Modal.svelte';
	import SpotifyFrame from '$lib/components/shared/SpotifyFrame.svelte';
	import type { LoveModalConfig } from '$lib/types/LoveModalConfig';

	const { open, onClose, config } = $props<{
		open: boolean;
		onClose: () => void;
		config: LoveModalConfig | null;
	}>();

	let currentTrackId = $state('stop');

	$effect(() => {
		if (open) {
			currentTrackId = config.spotifyId;
		}
	});

	function handleClose() {
		currentTrackId = 'stop';
		onClose();
	}
</script>

<Modal {open} onClose={handleClose}>
	{#if config}
		{#if config.title}
			<h2 class="mb-3 text-center text-xl font-semibold text-gray-900">{config.title}</h2>
		{/if}

		{#if config.imageUrl}
			<img src={config.imageUrl} alt="Imagen" class="mb-3 w-full rounded-xl object-cover" />
		{/if}

		{#if config.message}
			<div class="mb-3">
				<p class="text-neutral text-md mb-1">{config.message}</p>
			</div>
		{/if}

		{#if config.spotifyId}
			{#key currentTrackId}
				<SpotifyFrame trackId={currentTrackId} />
			{/key}
		{/if}
	{/if}
</Modal>
