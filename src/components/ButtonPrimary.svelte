<script lang="ts">
  export let type: "submit" | "button" = "submit";
</script>

<button {type} class="btn variant-filled-primary" on:click>
  <slot />
</button>
