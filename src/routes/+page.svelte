<script lang="ts">
  import {
    getDefaultExtra,
    triggerInvalidToast,
    triggerValidToast,
    type ExtraOptions,
  } from "$lib";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { generateImageSync, generateSync } from "vanilla-captcha/dom";
  import {
    getImageSyncGenerationOptions,
    validate,
    type CaptchaSyncOptions,
  } from "vanilla-captcha/utils";
  import OptionsPanel from "../components/OptionsPanel.svelte";
  import CaptchaForm from "./../components/CaptchaForm.svelte";

  let captcha = "";
  let answer = "";
  let options = getImageSyncGenerationOptions();
  let extra: ExtraOptions = getDefaultExtra();
  const toast = getToastStore();
  onMount(async () => {
    getCaptcha(extra.characterAmount);
  });

  const getCaptcha = (
    characterAmount: number,
    options?: Partial<CaptchaSyncOptions>
  ) => {
    const { captcha: c, answer: a } = generateSync(characterAmount, options);
    answer = a;
    captcha = c;
  };

  const submitForm = ({ detail: input }: CustomEvent) => {
    const valid = validate(input ?? "", answer, {
      caseSensitive: extra.caseSensitive,
    });
    valid ? triggerValidToast(toast) : triggerInvalidToast(toast);
  };

  const reloadCaptcha = () => {
    captcha = "";
    getCaptcha(extra.characterAmount, options);
  };

  const resetCaptchaOptions = async () => {
    extra = {
      characterAmount: 4,
      caseSensitive: false,
    };
    options = getImageSyncGenerationOptions();
    if (answer.length !== extra.characterAmount) {
      getCaptcha(extra.characterAmount, options);
    } else captcha = generateImageSync(answer, options);
  };

  const handleRgenerateImages = async ({ detail }: CustomEvent) => {
    const { extra, options } = detail;
    if (extra.characterAmount != answer.length) {
      getCaptcha(extra.characterAmount, options);
    } else captcha = generateImageSync(answer, options);
  };
</script>

<div>
  <CaptchaForm
    type="browser"
    src={captcha}
    on:reload={reloadCaptcha}
    on:submit={submitForm}
  />
</div>
<div class="flex w-full justify-center">
  <div class="w-10/12 sm:w-4/5 md:w-2/3 lg:w-1/2">
    <OptionsPanel
      type="browser"
      bind:options
      bind:extra
      on:reset-options={resetCaptchaOptions}
      on:regenerate-image={handleRgenerateImages}
    />
  </div>
</div>
