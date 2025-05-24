<script lang="ts">
	import { onMount } from 'svelte';

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

	const generateNonOverlappingStars = () => {
		const stars = [];
		const numRows = 6;
		const numCols = 12;
		const cellWidth = 100 / numCols;
		const cellHeight = 100 / numRows;
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
</script>

<div class="relative h-full w-full overflow-hidden bg-[#232020]">
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

	<div class="font-snoopy mt-25 w-full text-center text-4xl">
		<h1 class="mx-auto max-w-3xs font-bold text-white md:max-w-md">Between Space and Time</h1>
	</div>
	
	<div class="absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2">
		<div class="relative mx-auto translate-x-25 translate-y-25 scale-[0.5]">
			<img
				src="universes/between-space-and-time/design/me.png"
				alt="Nosotros en el espacio"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</div>

	<div class="absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2">
		<div class="relative mx-auto -translate-x-25 -translate-y-25 scale-[0.5]">
			<img
				src="universes/between-space-and-time/design/you.png"
				alt="Nosotros en el espacio"
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
