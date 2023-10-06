<script>
  import {
    AppShell,
    LightSwitch,
    TabAnchor,
    TabGroup,
    Toast,
    initializeStores,
  } from "@skeletonlabs/skeleton";
  import "../app.postcss";
  import PackageVersion from "./../components/PackageVersion.svelte";
  import { page } from "$app/stores";

  initializeStores();
</script>

<AppShell>
  <svelte:fragment slot="header">
    <TabGroup justify="justify-start">
      <TabAnchor href="/" selected={$page.url.pathname === "/"}>
        <svelte:fragment slot="lead">Browser Captcha</svelte:fragment>
      </TabAnchor>
      <TabAnchor
        href="/server-captcha"
        selected={$page.url.pathname === "/server-captcha"}
      >
        <svelte:fragment slot="lead">Server Captcha</svelte:fragment>
      </TabAnchor>
    </TabGroup>
  </svelte:fragment>
  <div class="flex flex-col w-full h-full gap-5">
    <slot />
  </div>
  <svelte:fragment slot="footer">
    <div class="w-full flex items-center justify-end gap-10 p-2">
      <LightSwitch height="h-8" width="w-16" />
      <PackageVersion />
    </div>
  </svelte:fragment>
</AppShell>
<Toast />
