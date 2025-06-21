<script lang="ts">
	import { onMount } from 'svelte';

	import { openModal } from '$lib/stores/modal';

	import FloatingElements from '../FloatingElements.svelte';
	import type { LoveModalConfig } from '$lib/types/LoveModalConfig';
	import { loadMessages } from '$lib/utils/MessageLoader';

	let messages = $state<LoveModalConfig[] | null>(null);
	let currentMessageIndex = $state(0);

	onMount(async () => {
		const messageJsonPath = 'data/at-the-bottom-of-the-sea.json';
		messages = await loadMessages(messageJsonPath);
	});

	const showModalWithMessage = () => {
		if (!messages) return;

		openModal(messages[currentMessageIndex]);
		currentMessageIndex = (currentMessageIndex + 1) % messages.length;
	};
</script>

<div class="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#2bcbdb] to-[#0065ea]">
	<FloatingElements
		percentage={0.9}
		minScale={0.4}
		maxScale={1.1}
		rows={9}
		cols={16}
		on:open={showModalWithMessage}
	>
		<div class="h-5 w-5">
			<img
				src="design/at-the-bottom-of-the-sea/bubble.png"
				alt="star"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</FloatingElements>

	<div
		class="font-snoopy pointer-events-none relative z-50 mt-25 w-full text-center text-4xl text-white"
	>
		<p class="text-sm text-white italic">I love you</p>

		<h1 class="mx-auto max-w-3xs font-bold md:max-w-md" style="text-shadow: 2px 2px 4px #232020;">
			At the bottom of the sea
		</h1>
		<p class="mt-8 text-sm text-white italic opacity-80">Toca las burbujas</p>
	</div>

	<div
		class="pointer-events-none absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2"
	>
		<div class="relative mx-auto translate-x-30 translate-y-20 scale-[0.7]">
			<img
				src="design/at-the-bottom-of-the-sea/patricio.png"
				alt="Esteban"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</div>

	<div
		class="pointer-events-none absolute top-[50%] left-[50%] z-30 -translate-x-1/2 -translate-y-1/2"
	>
		<div class="relative mx-auto -translate-x-30 -translate-y-20 scale-[0.7]">
			<img
				src="design/at-the-bottom-of-the-sea/bob-sponja.png"
				alt="Alejandra"
				class="h-auto w-full max-w-xs object-contain"
			/>
		</div>
	</div>

	<div class="pointer-events-none absolute bottom-0 left-[20%] z-5 -translate-x-1/2">
		<div class="relative mx-auto -translate-y-25 scale-[1]">
			<img
				src="design/at-the-bottom-of-the-sea/Casa Patricio.png"
				alt="Casa Patricio"
				class="h-auto w-full max-w-[100px] object-contain"
			/>
		</div>
	</div>

	<div class="pointer-events-none absolute bottom-0 left-[50%] z-5 -translate-x-1/2">
		<div class="relative mx-auto -translate-y-22 scale-[0.9]">
			<img
				src="design/at-the-bottom-of-the-sea/Casa Calamarado.png"
				alt="Casa Calamarado"
				class="h-auto w-full max-w-[100px] object-contain"
			/>
		</div>
	</div>

	<div class="pointer-events-none absolute bottom-0 left-[80%] z-5 -translate-x-1/2">
		<div class="relative mx-auto -translate-y-25 scale-[1]">
			<img
				src="design/at-the-bottom-of-the-sea/Casa Bob Sponja.png"
				alt="Casa Bob Sponja"
				class="h-auto w-full max-w-[100px] object-contain"
			/>
		</div>
	</div>

	<div class="absolute -bottom-[10px] left-1/2 z-2 w-full -translate-x-1/2">
		<img
			src="/design/at-the-bottom-of-the-sea/floor.png"
			alt="Piso del mar"
			class="h-[150px] w-full object-cover"
		/>
	</div>
</div>
