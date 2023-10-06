<script lang="ts">
  export let type: "submit" | "button" = "submit";
  export let classes = ""
</script>

<button {type} class="btn variant-filled-primary {classes}" on:click>
  <slot />
</button>
