<script lang="ts">
	import { onMount } from 'svelte';

	const { trackId } = $props<{ trackId: string }>();
	let isLoading = $state(true);

	onMount(() => {
		isLoading = true;
	});

	const handleLoad = () => {
		isLoading = false;
	};
</script>

<div class="w-full">
	{#if isLoading}
		<div class="flex h-20 w-full items-center justify-center rounded bg-gray-100">
			<div class="flex items-center space-x-2">
				<div class="h-3 w-3 animate-bounce rounded-full bg-green-500"></div>
				<div
					class="h-3 w-3 animate-bounce rounded-full bg-green-500"
					style="animation-delay: 0.1s"
				></div>
				<div
					class="h-3 w-3 animate-bounce rounded-full bg-green-500"
					style="animation-delay: 0.2s"
				></div>
			</div>
		</div>
	{/if}

	<iframe
		title="Spotify"
		src={`https://open.spotify.com/embed/track/${trackId}`}
		width="100%"
		height="80"
		frameBorder="0"
		allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
		loading="lazy"
		style={isLoading ? 'height: 0; width: 0; opacity: 0;' : ''}
		onload={handleLoad}
	></iframe>
</div>
