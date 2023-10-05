<script lang="ts">
  export let type: "submit" | "button" = "submit";
</script>

<button {type} class="btn btn-md variant-outline-primary" on:click>
  <slot />
</button>
