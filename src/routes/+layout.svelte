<script>
  import "../app.postcss";
  import Contributors from "../components/Contributors.svelte";
  import { LightSwitch, Toast, initializeStores } from "@skeletonlabs/skeleton";

  initializeStores();
</script>

<Toast />
<main class="relative flex w-full h-full">
  <slot />
</main>
<!-- <Contributors /> -->
<div class="fixed bottom-3 right-3">
  <LightSwitch />
</div>
