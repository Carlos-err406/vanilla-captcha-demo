<script lang="ts">
  import {
    getDefaultExtra,
    getParams,
    getServerCaptcha,
    getServerOptionsWithParsedFont,
    triggerInternalErrorToast,
    triggerInvalidToast,
    triggerValidToast,
    type ExtraOptions,
  } from "$lib";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import {
    getImageGenerationOptions,
    type CaptchaOptions,
  } from "vanilla-captcha/utils";
  import OptionsPanel from "../../components/OptionsPanel.svelte";
  import CaptchaForm from "./../../components/CaptchaForm.svelte";

  let captcha = "";
  let options = getImageGenerationOptions();
  let extra: ExtraOptions = getDefaultExtra();
  const toast = getToastStore();

  onMount(async () => {
    await getCaptcha(extra.characterAmount, options);
  });

  const getCaptcha = async (
    characterAmount: number,
    options?: Partial<CaptchaOptions>
  ) => {
    const captchaOptions = {
      ...getImageGenerationOptions(),
      ...options,
    };
    captcha = await getServerCaptcha(characterAmount, captchaOptions);
  };

  const submitForm = async ({ detail: input }: CustomEvent) => {
    const response = await fetch("/captcha", {
      method: "POST",
      body: JSON.stringify({ input, caseSensitive: extra.caseSensitive }),
    });
    if (response.status === 401) triggerInvalidToast(toast);
    else if (response.status === 500) triggerInternalErrorToast(toast);
    else if (response.status === 200) triggerValidToast(toast);
    reloadCaptcha();
  };

  const reloadCaptcha = () => {
    captcha = "";
    getCaptcha(extra.characterAmount, options);
  };

  const getSame = async (params: URLSearchParams) => {
    captcha = "";
    const response = await fetch("/captcha/get-again?" + params.toString(), {
      method: "GET",
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    captcha = url;
  };

  const resetCaptchaOptions = async () => {
    extra = {
      characterAmount: 4,
      caseSensitive: false,
    };
    options = getImageGenerationOptions();
    const reGetOoptions = {
      ...options,
      ...extra,
    };
    const params = getParams(reGetOoptions);
    await getSame(params);
  };

  const handleRegenerateCaptcha = async ({ detail }: CustomEvent) => {
    const { extra, options } = detail;
    const reGetOoptions = {
      ...options,
      ...extra,
    };
    const params = getParams(reGetOoptions);
    await getSame(params);
  };
</script>

<div>
  <CaptchaForm
    type="server"
    src={captcha}
    on:reload={reloadCaptcha}
    on:submit={submitForm}
  />
</div>
<div class="flex w-full justify-center">
  <div class="w-10/12 sm:w-4/5 md:w-2/3 lg:w-1/2">
    <OptionsPanel
      type="server"
      bind:options
      bind:extra
      on:reset-options={resetCaptchaOptions}
      on:regenerate-image={handleRegenerateCaptcha}
    />
  </div>
</div>
