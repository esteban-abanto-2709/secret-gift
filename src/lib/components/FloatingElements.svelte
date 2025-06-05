<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	const { percentage = 1, minScale = 0.5, maxScale = 1, rows = 9, cols = 16, children } = $props<{
		percentage: number;
		minScale: number;
		maxScale: number;
		rows: number;
		cols: number;
		children?: () => any;
	}>();

	onMount(() => {
		console.log(generateElements().length);
	});

	const dispatch = createEventDispatcher();

	const generateElements = () => {
		const elements = [];

		const numRows = rows;
		const numCols = cols;

		const cellWidth = 100 / numCols;
		const cellHeight = 100 / numRows;

		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < numCols; col++) {
				const x = col * cellWidth + Math.random() * cellWidth;
				const y = row * cellHeight + Math.random() * cellHeight;
				const scale = Math.random() * (maxScale - minScale) + minScale;

				elements.push({ id: elements.length, x, y, scale });
			}
		}

		// Remover elementos según el porcentaje
		const keepCount = Math.floor(elements.length * percentage);
		// Barajar los elementos y quedarte con los primeros `keepCount`
		const shuffled = elements.sort(() => Math.random() - 0.5);

		return shuffled.slice(0, keepCount);
	};

	const handleClick = () => dispatch('open');
</script>

{#each generateElements() as el (el.id)}
	<button
		class="absolute flex items-center justify-center"
		style="left: {el.x}%; top: {el.y}%; transform: scale({el.scale});"
		onclick={handleClick}
	>
		{@render children?.()}
	</button>
{/each}
