<script lang="ts">
	import { onMount } from 'svelte';

	import FloatingElements from '../FloatingElements.svelte';
	import LoveModal from '../love-modal/LoveModal.svelte';
	import type { LoveModalConfig } from '$lib/types/LoveModalConfig';
	import { loadMessages } from '$lib/utils/MessageLoader';

	let messages = $state<LoveModalConfig[] | null>(null);
	let currentMessageIndex = $state(0);
	let currentMessage = $state<LoveModalConfig | null>(null);

	let modalIsOpen = $state(false);

	onMount(async () => {
		messages = await loadMessages('universes/between-space-and-time/messages.json');
		currentMessage = messages[0];
	});

	const showModalWithMessage = () => {
		if (!messages) return;

		currentMessage = messages[currentMessageIndex];
		currentMessageIndex = (currentMessageIndex + 1) % messages.length;
		modalIsOpen = true;
	};

	const handleDialogClose = () => {
		modalIsOpen = false;
	};
</script>

<div class="relative h-full w-full overflow-hidden bg-[#232020]">

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
				src="universes/between-space-and-time/design/star.png"
				alt="star"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</FloatingElements>

	<div class="font-snoopy mt-25 w-full text-center text-4xl text-white z-30">
		<h1 class="mx-auto max-w-3xs font-bold md:max-w-md" style="text-shadow: 2px 2px 4px #232020;">
			Between Space and Time
		</h1>
		<p class="mt-4 text-sm text-white italic opacity-80">Toca las estrellas</p>
	</div>

	<div class="absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2">
		<div class="relative mx-auto translate-x-25 translate-y-25 scale-[0.5]">
			<img
				src="universes/between-space-and-time/design/me.png"
				alt="Teban"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</div>

	<div class="absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2">
		<div class="relative mx-auto -translate-x-25 -translate-y-25 scale-[0.5]">
			<img
				src="universes/between-space-and-time/design/you.png"
				alt="Are"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</div>

	<div class="absolute top-[75%] left-[25%] z-30 -translate-x-1/2 -translate-y-1/2">
		<div class="relative mx-auto -translate-x-25 scale-[2.8]">
			<img
				src="universes/between-space-and-time/design/planet 1.png"
				alt="Planeta 2"
				class="h-auto w-full max-w-[100px] object-contain"
			/>
		</div>
	</div>

	<div class="absolute top-[25%] left-[75%] z-30 -translate-x-1/2 -translate-y-1/2">
		<div class="relative mx-auto translate-x-20 translate-y-20 scale-[1.1]">
			<img
				src="universes/between-space-and-time/design/planet 2.png"
				alt="Planeta 1 juju"
				class="h-auto w-full max-w-[100px] object-contain"
			/>
		</div>
	</div>

	<LoveModal open={modalIsOpen} onClose={handleDialogClose} config={currentMessage} />
</div>
