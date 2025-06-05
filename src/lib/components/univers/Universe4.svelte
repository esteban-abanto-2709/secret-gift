<script lang="ts">
	import { onMount } from 'svelte';

	import { openModal } from '$lib/stores/modal';

	import FloatingElements from '../FloatingElements.svelte';
	import type { LoveModalConfig } from '$lib/types/LoveModalConfig';
	import { loadMessages } from '$lib/utils/MessageLoader';

	let messages = $state<LoveModalConfig[] | null>(null);
	let currentMessageIndex = $state(0);

	onMount(async () => {
		const messageJsonPath = 'data/curiosity-was-just-the-beginning.json';
		messages = await loadMessages(messageJsonPath);
	});

	const showModalWithMessage = () => {
		if (!messages) return;

		openModal(messages[currentMessageIndex]);
		currentMessageIndex = (currentMessageIndex + 1) % messages.length;
	};
</script>

<div class="relative h-full w-full overflow-hidden bg-[#bfc0db]">
	<FloatingElements
		percentage={0.7}
		minScale={1.2}
		maxScale={1.7}
		rows={9}
		cols={16}
		on:open={showModalWithMessage}
	>
		<div class="h-5 w-5">
			<img
				src="design/curiosity-was-just-the-beginning/heart.png"
				alt="heart"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</FloatingElements>

	<div
		class="font-snoopy pointer-events-none relative z-50 mt-25 w-full text-center text-4xl text-white"
	>
		<p class="text-sm text-white italic">I love you</p>

		<h1 class="mx-auto max-w-3xs font-bold md:max-w-md" style="text-shadow: 2px 2px 4px #232020;">
			curiosity was just the beginning
		</h1>

		<p class="mt-8 text-sm text-white italic opacity-80">Toca los corazones</p>
	</div>

	<div
		class="pointer-events-none absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2 scale-[1.2]"
	>
		<div class="relative mx-auto translate-y-15">
			<img
				src="design/curiosity-was-just-the-beginning/overlay-cats.png"
				alt="Nosotros"
				class="h-auto w-[400px] object-contain"
			/>
		</div>
	</div>
</div>
