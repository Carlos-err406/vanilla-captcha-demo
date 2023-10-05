<script lang="ts">
  // import { generateSync } from "vanilla-captcha";
  import { onMount } from "svelte";
  import { generateSync } from "vanilla-captcha/dom";
  import { validate } from "vanilla-captcha/utils";
  let serverCaptcha = "";
  let browserCaptcha = "";
  let browserAnswer = "";
  let userBrowserCaptchaInput = "";
  let userServerCaptchaInput = "";

  onMount(async () => {
    getServerCaptcha();
    getBrowserCaptcha();
  });
  const getServerCaptcha = () => {
    fetch("/captcha", { method: "GET" })
      .then((r) => r.blob())
      .then((img) => {
        serverCaptcha = URL.createObjectURL(img);
      });
  };
  const getBrowserCaptcha = () => {
    const { captcha, answer } = generateSync(4);
    browserAnswer = answer;
    browserCaptcha = captcha;
  };
  const submitBrowserForm = () => {
    const valid = validate(userBrowserCaptchaInput, browserAnswer, {
      caseSensitive: false,
    });
    alert(`Browser captcha answer was: ${valid ? "VALID" : "INVALID"} !!`);
    reloadBrowserCaptcha();
  };

  const submitServerForm = () => {
    fetch("/captcha", {
      method: "POST",
      body: JSON.stringify({ input: userServerCaptchaInput }),
    }).then((response) => {
      if (response.status === 200) {
        alert(`Server captcha answer was: VALID !!`);
      } else if (response.status === 401) {
        alert(`Server captcha answer was: INVALID !!`);
      } else {
        alert(`Something went wrong pleas reload the page !!`);
      }
      reloadServerCaptcha();
    });
  };
  const reloadBrowserCaptcha = () => {
    userBrowserCaptchaInput = "";
    getBrowserCaptcha();
  };
  const reloadServerCaptcha = () => {
    userServerCaptchaInput = "";
    getServerCaptcha();
  };
</script>

<main>
  <form action="" on:submit|preventDefault={submitServerForm}>
    <div class="captcha-wrapper">
      <h1>Generated in server</h1>
      <div>
        <img src={serverCaptcha} alt="" />
      </div>
      <input
        type="text"
        placeholder="captcha"
        bind:value={userServerCaptchaInput}
      />
      <div class="footer">
        <button type="button" on:click={reloadServerCaptcha}>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </div>
  </form>
  <div id="vertical-divider" />
  <form action="" on:submit|preventDefault={submitBrowserForm}>
    <div class="captcha-wrapper">
      <h1>Generated in browser</h1>
      <div>
        <img src={browserCaptcha} alt="" />
      </div>
      <input
        type="text"
        placeholder="captcha"
        bind:value={userBrowserCaptchaInput}
      />
      <div class="footer">
        <button type="button" on:click={reloadBrowserCaptcha}>Reset</button>
        <button type="submit">Submit</button>
      </div>
    </div>
  </form>
</main>
<footer>
  Contributors always appreciated
  <ul>
    <li>
      <a href="https://github.com/Carlos-err406/vanilla-captcha-demo.git">
        This demo
      </a>
    </li>
    <li>
      <a href="https://github.com/Carlos-err406/vanilla-captcha.git">
        Vanilla captcha project
      </a>
    </li>
  </ul>
</footer>

<style>
  main {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  #vertical-divider {
    width: 3px;
    background-color: black;
  }
  footer {
    padding-left: 5px;
    position: fixed;
    bottom: 0;
  }
  form {
    width: 100%;
    display: flex;
  }
  .captcha-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  input {
    border-radius: 8px;
    padding: 10px;
    outline: none;
    border: none;
    box-shadow: 2px 2px 3px black;
  }
  button {
    outline: none;
    border: 1px solid #2364e6;
    background-color: transparent;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  button[type="submit"] {
    background-color: #2364e6;
    color: white;
  }
  button:active {
    transform: scale(90%);
  }
  li {
    list-style-type: none;
  }
</style>
