import { u as useAuth, _ as __nuxt_component_1 } from "../server.mjs";
import { ref, computed, watch, resolveDirective, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/hookable/dist/index.mjs";
import { u as useApi } from "./useApi-90H3qg-m.js";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/radix3/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/defu/dist/defu.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/ufo/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "socket.io-client";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/klona/dist/index.mjs";
import "vue-toastification";
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
function useTypingGame() {
  const phrase = ref("");
  const userInput = ref("");
  const isGameActive = ref(false);
  const isGameComplete = ref(false);
  const startTime = ref(null);
  const endTime = ref(null);
  const errors = ref(0);
  const bestScore = ref(null);
  const completedPhrases = ref(0);
  const totalCharactersTyped = ref(0);
  const totalErrors = ref(0);
  const timeRemaining = ref(120);
  const timerInterval = ref(null);
  const onPhraseCompleted = ref(null);
  function setPhrase(newPhrase) {
    phrase.value = newPhrase;
    userInput.value = "";
  }
  function resetGame() {
    userInput.value = "";
    isGameActive.value = false;
    isGameComplete.value = false;
    startTime.value = null;
    endTime.value = null;
    errors.value = 0;
    completedPhrases.value = 0;
    totalCharactersTyped.value = 0;
    totalErrors.value = 0;
    timeRemaining.value = 120;
    if (timerInterval.value) {
      clearInterval(timerInterval.value);
      timerInterval.value = null;
    }
  }
  function startTimer2() {
    if (!isGameActive.value && !isGameComplete.value) {
      startTime.value = /* @__PURE__ */ new Date();
      isGameActive.value = true;
      timerInterval.value = setInterval();
    }
  }
  function endGame() {
    if (isGameActive.value) {
      endTime.value = /* @__PURE__ */ new Date();
      isGameActive.value = false;
      isGameComplete.value = true;
      if (timerInterval.value) {
        clearInterval(timerInterval.value);
        timerInterval.value = null;
      }
    }
  }
  function completePhrase() {
    completedPhrases.value++;
    totalCharactersTyped.value += phrase.value.length;
    totalErrors.value += errors.value;
    errors.value = 0;
    userInput.value = "";
    if (onPhraseCompleted.value && typeof onPhraseCompleted.value === "function") {
      onPhraseCompleted.value();
    }
  }
  const wpm = computed(() => {
    if (!startTime.value || !endTime.value && !isGameActive.value) {
      return 0;
    }
    const timeElapsed = endTime.value ? (endTime.value - startTime.value) / 1e3 / 60 : (/* @__PURE__ */ new Date() - startTime.value) / 1e3 / 60;
    const wordCount = totalCharactersTyped.value / 5;
    return Math.round(wordCount / timeElapsed);
  });
  const accuracy = computed(() => {
    if (totalCharactersTyped.value === 0) {
      return 100;
    }
    const correctChars = totalCharactersTyped.value - totalErrors.value;
    return Math.round(correctChars / totalCharactersTyped.value * 100);
  });
  const formattedTimeRemaining = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  });
  const charStatus = computed(() => {
    return phrase.value.split("").map((char, index) => {
      if (index >= userInput.value.length) {
        return "pending";
      } else if (char === userInput.value[index]) {
        return "correct";
      } else {
        return "incorrect";
      }
    });
  });
  watch(userInput, (newValue, oldValue) => {
    if (newValue.length === 1 && oldValue.length === 0 && !isGameActive.value) {
      startTimer2();
    }
    if (newValue.length > oldValue.length) {
      const lastCharIndex = newValue.length - 1;
      if (lastCharIndex < phrase.value.length && newValue[lastCharIndex] !== phrase.value[lastCharIndex]) {
        errors.value++;
      }
    }
    if (newValue.length === phrase.value.length) {
      completePhrase();
    }
  });
  return {
    phrase,
    userInput,
    isGameActive,
    isGameComplete,
    errors,
    wpm,
    accuracy,
    charStatus,
    bestScore,
    completedPhrases,
    totalErrors,
    timeRemaining,
    formattedTimeRemaining,
    setPhrase,
    resetGame,
    startTimer: startTimer2,
    endGame,
    completePhrase,
    onPhraseCompleted
  };
}
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      phrase,
      userInput,
      isGameActive,
      isGameComplete,
      wpm,
      accuracy,
      charStatus,
      completedPhrases,
      totalErrors,
      timeRemaining,
      formattedTimeRemaining,
      setPhrase,
      resetGame,
      onPhraseCompleted
    } = useTypingGame();
    const { getRandomPhrase, saveScore } = useApi();
    const { user, isAuthenticated } = useAuth();
    const playerName = ref("");
    const usedPhrases = ref([]);
    watch(userInput, async (newValue, oldValue) => {
      if (newValue.length === 1 && oldValue.length === 0 && !isGameActive.value) {
        startTimer();
      }
    });
    watch(isGameComplete, async (newValue, oldValue) => {
      if (newValue === true && !oldValue) {
        if (isAuthenticated.value) {
          await saveAuthenticatedScore();
        } else if (playerName.value.trim()) {
          await saveAnonymousScore();
        }
      }
    });
    async function getNewPhrase() {
      try {
        if (isGameComplete.value) {
          resetGame();
        }
        if (phrase.value && phrase.value.trim() !== "") {
          if (!usedPhrases.value.includes(phrase.value)) {
            usedPhrases.value.push(phrase.value);
          }
        }
        const MAX_HISTORY = 20;
        if (usedPhrases.value.length > MAX_HISTORY) {
          usedPhrases.value = usedPhrases.value.slice(-MAX_HISTORY);
        }
        let data = await getRandomPhrase();
        if (data && data.text) {
          let attempts = 0;
          const maxAttempts = 15;
          while (usedPhrases.value.includes(data.text) && attempts < maxAttempts) {
            attempts++;
            data = await getRandomPhrase();
            if (attempts >= maxAttempts - 1) {
              usedPhrases.value = [];
              break;
            }
          }
          setPhrase(data.text);
        }
      } catch (err) {
      }
    }
    async function saveAuthenticatedScore() {
      try {
        await saveScore({
          name: user.value.username,
          wpm: wpm.value,
          accuracy: accuracy.value,
          errors: totalErrors.value,
          completedPhrases: completedPhrases.value
        });
        resetGame();
        usedPhrases.value = [];
        getNewPhrase();
      } catch (err) {
      }
    }
    async function saveAnonymousScore() {
      if (!playerName.value.trim()) {
        alert("Please enter your name");
        return;
      }
      try {
        await saveScore({
          name: playerName.value.trim(),
          wpm: wpm.value,
          accuracy: accuracy.value,
          errors: totalErrors.value,
          completedPhrases: completedPhrases.value
        });
        resetGame();
        usedPhrases.value = [];
        getNewPhrase();
      } catch (err) {
      }
    }
    onPhraseCompleted.value = async () => {
      await getNewPhrase();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto" }, _attrs))}><div${ssrRenderAttrs(mergeProps({
        class: "text-center mb-8",
        initial: { opacity: 0, y: -20 },
        enter: { opacity: 1, y: 0, transition: { duration: 500 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">TypingRush</h1><p class="text-gray-600 dark:text-gray-300">Improve your typing speed and accuracy</p></div><div${ssrRenderAttrs(mergeProps({
        class: "bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6 relative overflow-hidden",
        initial: { opacity: 0, scale: 0.9 },
        enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 200 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 mono text-lg leading-relaxed"><!--[-->`);
      ssrRenderList(unref(phrase).split(""), (char, index) => {
        _push(`<span class="${ssrRenderClass({
          "text-green-500": unref(charStatus)[index] === "correct",
          "text-red-500": unref(charStatus)[index] === "incorrect",
          "text-gray-500 dark:text-gray-400": unref(charStatus)[index] === "pending"
        })}">${ssrInterpolate(char)}</span>`);
      });
      _push(`<!--]--></div><div class="mb-6"><input${ssrRenderAttr("value", unref(userInput))} type="text"${ssrIncludeBooleanAttr(unref(isGameComplete)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50": unref(isGameComplete) }, "w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white mono focus:outline-none focus:ring-2 focus:ring-primary-500"])}" placeholder="Start typing here..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" onpaste="return false"></div><div${ssrRenderAttrs(mergeProps({
        class: "mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
        initial: { opacity: 0, y: -20 },
        enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="${ssrRenderClass([unref(timeRemaining) < 30 ? "text-red-500" : "text-primary-600 dark:text-primary-400", "text-3xl font-bold"])}">${ssrInterpolate(unref(formattedTimeRemaining))}</div><div class="text-sm text-gray-600 dark:text-gray-400">Time Remaining</div></div><div class="grid grid-cols-4 gap-4 mb-6"><div${ssrRenderAttrs(mergeProps({
        class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
        initial: { opacity: 0, x: -20 },
        enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 300 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="text-2xl font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(unref(wpm))}</div><div class="text-sm text-gray-600 dark:text-gray-400">WPM</div></div><div${ssrRenderAttrs(mergeProps({
        class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="text-2xl font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(unref(accuracy))}%</div><div class="text-sm text-gray-600 dark:text-gray-400">Accuracy</div></div><div${ssrRenderAttrs(mergeProps({
        class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
        initial: { opacity: 0, x: 20 },
        enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 500 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="text-2xl font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(unref(totalErrors))}</div><div class="text-sm text-gray-600 dark:text-gray-400">Errors</div></div><div${ssrRenderAttrs(mergeProps({
        class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
        initial: { opacity: 0, x: 20 },
        enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 600 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="text-2xl font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(unref(completedPhrases))}</div><div class="text-sm text-gray-600 dark:text-gray-400">Phrases</div></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CxE1Z2Up.js.map
