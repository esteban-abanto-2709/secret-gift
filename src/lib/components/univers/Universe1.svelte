<script lang="ts">
	import { onMount } from 'svelte';

	import { openModal } from '$lib/stores/modal';

	import FloatingElements from '../FloatingElements.svelte';
	import type { LoveModalConfig } from '$lib/types/LoveModalConfig';
	import { loadMessages } from '$lib/utils/MessageLoader';

	let messages = $state<LoveModalConfig[] | null>(null);
	let currentMessageIndex = $state(0);

	onMount(async () => {
		messages = await loadMessages('universes/between-space-and-time/messages.json');
	});

	const showModalWithMessage = () => {
		if (!messages) return;

		openModal(messages[currentMessageIndex]);
		currentMessageIndex = (currentMessageIndex + 1) % messages.length;
	};
</script>

<div class="relative h-full w-full overflow-hidden bg-radial from-[#242424] to-[#101010]">
	<FloatingElements
		percentage={0.9}
		minScale={0.2}
		maxScale={0.9}
		rows={9}
		cols={16}
		on:open={showModalWithMessage}
	>
		<div class="h-5 w-5 animate-pulse">
			<img
				src="design/between-space-and-time/star.png"
				alt="star"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</FloatingElements>

	<div class="font-snoopy z-30 mt-25 w-full text-center text-4xl text-white">
		<h1 class="mx-auto max-w-3xs font-bold md:max-w-md" style="text-shadow: 2px 2px 4px #232020;">
			Between Space and Time
		</h1>
		<p class="mt-4 text-sm text-white italic opacity-80">Toca las estrellas</p>
	</div>

	<div class="absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
		<div class="relative mx-auto translate-x-25 translate-y-25 scale-[0.5]">
			<img
				src="design/between-space-and-time/me.png"
				alt="Esteban"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</div>

	<div class="absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
		<div class="relative mx-auto -translate-x-25 -translate-y-25 scale-[0.5]">
			<img
				src="design/between-space-and-time/you.png"
				alt="Alejandra"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</div>

	<div class="absolute top-[75%] left-[25%] z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
		<div class="relative mx-auto -translate-x-25 scale-[2.8]">
			<img
				src="design/between-space-and-time/planet 1.png"
				alt="Planeta 2"
				class="h-auto w-full max-w-[100px] object-contain"
			/>
		</div>
	</div>

	<div class="absolute top-[25%] left-[75%] z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
		<div class="relative mx-auto translate-x-20 translate-y-20 scale-[1.1]">
			<img
				src="design/between-space-and-time/planet 2.png"
				alt="Planeta 1"
				class="h-auto w-full max-w-[100px] object-contain"
			/>
		</div>
	</div>
</div>
