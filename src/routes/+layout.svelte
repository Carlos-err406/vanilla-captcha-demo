<script>
  import { LightSwitch, Toast, initializeStores } from "@skeletonlabs/skeleton";
  import "../app.postcss";
  import PackageVersion from "./../components/PackageVersion.svelte";

  initializeStores();
</script>

<Toast />
<main class="relative flex w-full h-full">
  <slot />
</main>
<!-- <Contributors /> -->

<div class="fixed bottom-3 left-3 shadow-lg">
  <LightSwitch height="h-8" width="w-16" />
</div>

<div class="fixed bottom-3 right-3">
  <PackageVersion />
</div>
