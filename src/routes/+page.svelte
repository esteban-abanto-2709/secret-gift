<script lang="ts">
	import { onMount } from 'svelte';

	import LoveModal from '$lib/components/love-modal/LoveModal.svelte';
	import { modalOpen, modalConfig, closeModal, openModal } from '$lib/stores/modal';

	import Universe1 from '$lib/components/univers/Universe1.svelte';
	import Universe2 from '$lib/components/univers/Universe2.svelte';
	import Universe3 from '$lib/components/univers/Universe3.svelte';
	import Universe1Test from '$lib/components/univers/Universe1Test.svelte';

	let currentIndex = $state(0);
	let slideCount = $state(0);

	let sliderRef: HTMLDivElement;

	onMount(() => {
		if (sliderRef) {
			slideCount = sliderRef.children.length;
		}
	});

	function next() {
		if (currentIndex < slideCount - 1) currentIndex += 1;
	}

	function previous() {
		if (currentIndex > 0) currentIndex -= 1;
	}

	function TestModal() {
		openModal({
			title: 'Test',
			message: 'This is a test message.'
		});
	}
</script>

<main class="relative h-screen w-screen overflow-hidden bg-black text-white">
	<!-- Slider -->
	<div
		bind:this={sliderRef}
		class="flex h-full w-full transition-transform duration-500"
		style="transform: translateX({-currentIndex * 100}%);"
	>
		<!-- Pantalla de introducción -->
		<section class="flex min-w-full items-center justify-center bg-[#1a1a1a] text-center">
			<h1 class="text-4xl font-bold text-pink-400">Nosotros en otros universos</h1>
		</section>

		<section class="flex min-w-full items-center justify-center text-center">
			<Universe1 />
		</section>

		<section class="flex min-w-full items-center justify-center text-center">
			<Universe2 />
		</section>

		<section class="flex min-w-full items-center justify-center text-center">
			<Universe3 />
		</section>

		<section class="flex min-w-full items-center justify-center bg-[#111122] text-center">
			<h2 class="text-4xl font-bold">Universo 3: Donde vivimos en una casa flotante.</h2>
		</section>

		<section class="flex min-w-full items-center justify-center text-center">
			<Universe1Test />
		</section>

		<!-- Pantalla final -->
		<section class="flex min-w-full items-center justify-center bg-black text-center">
			<h1 class="text-4xl font-bold text-green-400">
				Fin del viaje. Te amo en todos los universos 💚
			</h1>
		</section>
	</div>

	<!-- Botones de control -->
	<div class="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-4">
		<button
			onclick={previous}
			class="bg-opacity-10 hover:bg-opacity-20 rounded bg-white px-4 py-2 text-black disabled:opacity-30"
			disabled={currentIndex === 0}
		>
			⟵
		</button>
		<button
			onclick={next}
			class="bg-opacity-10 hover:bg-opacity-20 rounded bg-white px-4 py-2 text-black disabled:opacity-30"
			disabled={currentIndex === slideCount - 1}
		>
			⟶
		</button>
	</div>

	<LoveModal open={$modalOpen} onClose={closeModal} config={$modalConfig} />
</main>

<style>
	:global(body) {
		margin: 0;
		overflow: hidden;
	}
</style>
