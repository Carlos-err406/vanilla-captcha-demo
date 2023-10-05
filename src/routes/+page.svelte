<script lang="ts">
  import { getToastStore } from "@skeletonlabs/skeleton";
  import CaptchaForm from "./../components/CaptchaForm.svelte";
  import { onMount } from "svelte";
  import { generateSync } from "vanilla-captcha/dom";
  import {
    validate,
    getImageSyncGenerationOptions,
    getImageGenerationOptions,
    type CaptchaOptions,
    type CaptchaSyncOptions,
  } from "vanilla-captcha/utils";
  import OptionsPanel from "../components/OptionsPanel.svelte";
  import type { ExtraOptions } from "$lib";
  let serverCaptcha = "";
  let browserCaptcha = "";
  let browserAnswer = "";
  let toast = getToastStore();
  let browserCaptchaOptions = getImageSyncGenerationOptions();
  let browserCaptchaExtra: ExtraOptions;
  let serverCaptchaOptions = getImageGenerationOptions();
  onMount(async () => {
    getServerCaptcha();
    getBrowserCaptcha(browserCaptchaOptions, browserCaptchaExtra);
  });

  const getParams = (options: object | null) => {
    if (!options) return "";
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) =>
      params.append(key, value)
    );
    return "?" + params.toString();
  };
  const getServerCaptcha = (options?: CaptchaOptions) => {
    fetch(`/captcha${getParams(options ?? null)}`, { method: "GET" })
      .then((r) => r.blob())
      .then((img) => {
        serverCaptcha = URL.createObjectURL(img);
      });
  };
  const getBrowserCaptcha = (options?: any, extra?: any) => {
    const { captcha, answer } = generateSync(extra.characterAmount, options);
    browserAnswer = answer;
    browserCaptcha = captcha;
  };

  const submitBrowserForm = ({ detail: value }: CustomEvent) => {
    const valid = validate(value ?? "", browserAnswer, {
      caseSensitive: browserCaptchaExtra.caseSensitive,
    });
    toast.trigger({
      timeout: 3000,
      message: valid ? "VALID" : "INVALID",
      background: valid ? "variant-filled-success" : "variant-filled-error",
    });
  };

  const submitServerForm = ({ detail: value }: CustomEvent) => {
    fetch("/captcha", {
      method: "POST",
      body: JSON.stringify({ input: value }),
    }).then((response) => {
      if (response.status === 200) {
        toast.trigger({
          timeout: 3000,
          message: "VALID",
          background: "variant-filled-success",
        });
      } else if (response.status === 401) {
        toast.trigger({
          timeout: 3000,
          message: "INVALID",
          background: "variant-filled-error",
        });
      } else {
        toast.trigger({
          timeout: 4000,
          message:
            "something went wrong please<br/>reload the page or try again",
          background: "variant-filled-error",
        });
      }
    });
  };
  const reloadBrowserCaptcha = () => {
    browserCaptcha = "";
    getBrowserCaptcha(browserCaptchaOptions, browserCaptchaExtra);
  };
  const reloadServerCaptcha = () => {
    serverCaptcha = "";
    getServerCaptcha(serverCaptchaOptions);
  };

  const resetBrowserCaptchaOptions = () => {
    browserCaptchaExtra.characterAmount = 4;
    browserCaptchaExtra.caseSensitive = false;
    browserCaptchaOptions = getImageSyncGenerationOptions();
    getBrowserCaptcha(browserCaptchaOptions, browserCaptchaExtra);
  };
  const handleBrowserOptionsChange = ({ detail }: CustomEvent) => {
    const { options, extra } = detail;
    getBrowserCaptcha(options, extra);
  };
  const handleServerOptionsChange = ({ detail }: CustomEvent) => {
    getServerCaptcha(detail);
  };
</script>

<div class="w-full h-full grid grid-cols-2">
  <CaptchaForm
    type="browser"
    src={browserCaptcha}
    on:reload={reloadBrowserCaptcha}
    on:submit={submitBrowserForm}
  />
  <CaptchaForm
    type="server"
    src={serverCaptcha}
    on:reload={reloadServerCaptcha}
    on:submit={submitServerForm}
  />
  <OptionsPanel
    bind:options={browserCaptchaOptions}
    bind:extra={browserCaptchaExtra}
    on:options-change={handleBrowserOptionsChange}
    on:reset-options={resetBrowserCaptchaOptions}
  />
  <!-- <OptionsPanel
    bind:options={serverCaptchaOptions}
    on:options-change={handleServerOptionsChange}
    on:reset-options={reloadServerCaptcha}
  /> -->
</div>
