<script lang="ts">
	import { onMount } from 'svelte';

	let currentIndex = $state(0);
	let slideCount = $state(0);

	let sliderRef: HTMLDivElement;

	onMount(() => {
		// Contar hijos directos del contenedor de slides
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
</script>

<main class="relative h-screen w-screen overflow-hidden bg-black text-white">
	<!-- Slider -->
	<div
		bind:this={sliderRef}
		class="flex h-full w-full transition-transform duration-500"
		style="transform: translateX({-currentIndex * 100}%);"
	>
		<!-- Pantalla de introducción -->
		<section class="flex min-w-full items-center justify-center bg-black p-8 text-center">
			<h1 class="text-4xl font-bold text-pink-400">Bienvenido a los universos 🌌</h1>
		</section>

		<!-- Slides del universo -->
		<section class="flex min-w-full items-center justify-center bg-[#1a1a1a] p-8 text-center">
			<h2 class="text-4xl font-bold">Universo 1: Donde los dos somos estrellas fugaces.</h2>
		</section>

		<section class="flex min-w-full items-center justify-center bg-[#111122] p-8 text-center">
			<h2 class="text-4xl font-bold">Universo 2: Donde vivimos en una casa flotante.</h2>
		</section>
		<section class="flex min-w-full items-center justify-center bg-[#1a0a2a] p-8 text-center">
			<h2 class="text-4xl font-bold">Universo 3: Donde los lunes son domingos.</h2>
		</section>

		<!-- Pantalla final -->
		<section class="flex min-w-full items-center justify-center bg-black p-8 text-center">
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
</main>

<style>
	:global(body) {
		margin: 0;
		overflow: hidden;
	}
</style>