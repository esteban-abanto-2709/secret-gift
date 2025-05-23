<script lang="ts">
	const { open, onClose, children } = $props<{
		open: boolean;
		onClose: () => void;
		children?: () => any;
	}>();

	let dialogEl!: HTMLDialogElement;

	$effect(() => {
		if (open && !dialogEl.open) {
			document.body.style.overflow = 'hidden';
			dialogEl.showModal();
		} else if (!open && dialogEl.open) {
			document.body.style.overflow = '';
			dialogEl.close();
		}
	});

	function handleClose() {
		onClose?.();
	}
</script>

<dialog class="modal overflow-hidden" bind:this={dialogEl} onclose={handleClose}>
	<div class="modal-box max-w-md bg-white">
		{@render children?.()}
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
