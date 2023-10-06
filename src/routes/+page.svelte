<script lang="ts">
  import {
    getDefaultExtra,
    getServerCaptcha,
    reGenerateServerCaptcha,
    triggerInternalErrorToast,
    triggerInvalidToast,
    triggerValidToast,
    type DispatchedBrowserOptionsChange,
    type ExtraOptions,
  } from "$lib";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { generateImageSync, generateSync } from "vanilla-captcha/dom";
  import {
    getImageGenerationOptions,
    getImageSyncGenerationOptions,
    validate,
    type CaptchaOptions,
    type CaptchaSyncOptions,
  } from "vanilla-captcha/utils";
  import OptionsPanel from "../components/OptionsPanel.svelte";
  import CaptchaForm from "./../components/CaptchaForm.svelte";

  let serverCaptcha = "";
  let browserCaptcha = "";
  let browserAnswer = "";
  let captchaOptions = getImageSyncGenerationOptions();
  let captchaExtra: ExtraOptions = getDefaultExtra();
  let serverCaptchaOptions = getImageGenerationOptions();
  const toast = getToastStore();
  onMount(async () => {
    getBrowserCaptcha(captchaExtra.characterAmount);
    serverCaptcha = await getServerCaptcha(captchaExtra.characterAmount);
  });
  const submitServerForm = ({ detail }: CustomEvent) => {
    fetch("/captcha", {
      method: "POST",
      body: JSON.stringify({ input: detail }),
    }).then((response) => {
      if (response.status === 200) triggerValidToast(toast);
      else if (response.status === 401) triggerInvalidToast(toast);
      else triggerInternalErrorToast(toast);
    });
  };

  const getBrowserCaptcha = (
    characterAmount: number,
    options?: Partial<CaptchaSyncOptions>
  ) => {
    const { captcha, answer } = generateSync(characterAmount, options);
    browserAnswer = answer;
    browserCaptcha = captcha;
  };

  const submitBrowserForm = ({ detail: input }: CustomEvent) => {
    const valid = validate(input ?? "", browserAnswer, {
      caseSensitive: captchaExtra.caseSensitive,
    });
    valid ? triggerValidToast(toast) : triggerInvalidToast(toast);
  };

  const reloadBrowserCaptcha = () => {
    browserCaptcha = "";
    getBrowserCaptcha(captchaExtra.characterAmount, captchaOptions);
  };

  const reloadServerCaptcha = async () => {
    serverCaptcha = "";
    serverCaptcha = await getServerCaptcha(
      captchaExtra.characterAmount,
      serverCaptchaOptions
    );
  };

  const resetCaptchaOptions = async () => {
    captchaExtra.characterAmount = 4;
    captchaExtra.caseSensitive = false;
    captchaOptions = getImageSyncGenerationOptions();
    browserCaptcha = generateImageSync(browserAnswer, captchaOptions);
    serverCaptchaOptions = getImageGenerationOptions();
    serverCaptcha = await reGenerateServerCaptcha(serverCaptchaOptions);
  };

  const handleRgenerateImages = async ({
    detail,
  }: CustomEvent<DispatchedBrowserOptionsChange>) => {
    handleRegenerateBrowserCaptcha(detail);
    handleRegenerateServerCaptcha(detail);
  };

  const handleRegenerateBrowserCaptcha = ({
    options,
    extra,
  }: DispatchedBrowserOptionsChange) => {
    if (extra.characterAmount != browserAnswer.length) {
      getBrowserCaptcha(extra.characterAmount, options);
    } else browserCaptcha = generateImageSync(browserAnswer, options);
  };

  const handleRegenerateServerCaptcha = async ({
    options,
    extra,
  }: DispatchedBrowserOptionsChange) => {
    const fullFont = options.font;
    let [weight, size, font] = fullFont.split(" ");
    size = size.slice(0, -2);
    const serverOptions: CaptchaOptions & { characterAmount: number } = {
      ...options,
      characterAmount: extra.characterAmount,
      fontSize: parseInt(size),
      fontWeight: weight,
      font,
    };
    serverCaptcha = "";
    serverCaptcha = await reGenerateServerCaptcha(serverOptions);
  };
</script>

<div
  class="w-full h-full grid grid-cols-1 md:grid-cols-2 max-w-[100vw] max-h-[100vh] gap-y-2 overflow-auto"
>
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
  <div class="col-span-1 md:col-span-2 flex w-full justify-center">
    <div>
      <OptionsPanel
        options={captchaOptions}
        extra={captchaExtra}
        on:reset-options={resetCaptchaOptions}
        on:regenerate-image={handleRgenerateImages}
      />
    </div>
  </div>
</div>
