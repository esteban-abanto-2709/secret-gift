<script lang="ts">
	import { onMount } from 'svelte';

	import Universe1 from '$lib/components/univers/Universe1.svelte';
	import Universe1Test from '$lib/components/univers/Universe1Test.svelte';

	import LoveModal from '$lib/components/love-modal/LoveModal.svelte';

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

	let modalOpen = $state(false);
	function cerrarModal() {
		modalOpen = false;
		console.log('Modal cerrado');
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
		<section class="flex min-w-full items-center justify-center bg-black text-center">
			<h1 class="text-4xl font-bold text-pink-400">Bienvenido a los universos 🌌</h1>
		</section>

		<section class="flex min-w-full items-center justify-center text-center">
			<Universe1 />
		</section>

		<!-- Slides del universo -->
		<section class="flex min-w-full items-center justify-center bg-[#1a1a1a] text-center">
			<h2 class="text-4xl font-bold">Universo 1: Donde los dos somos estrellas fugaces.</h2>
			<button class="btn btn-primary m-4" onclick={() => (modalOpen = true)}>
				Probar mi modal
			</button>
			<LoveModal
				open={modalOpen}
				onClose={cerrarModal}
				config={{
					title: '💕 Te quiero mucho 💕',
					imageUrl: '/images/photo.png',
					message: 'Un dibujo de nosotros dos en un universo alternativo.',
					spotifyId: '3n3Ppam7vgaVa1iaRUc9Lp'
				}}
			/>
		</section>

		<section class="flex min-w-full items-center justify-center bg-[#111122] text-center">
			<h2 class="text-4xl font-bold">Universo 2: Donde vivimos en una casa flotante.</h2>
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
</main>

<style>
	:global(body) {
		margin: 0;
		overflow: hidden;
	}
</style>
