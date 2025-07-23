import { _ as __nuxt_component_0 } from './nuxt-link-CF8KgvdM.mjs';
import { b as useSocket, u as useAuth, _ as __nuxt_component_1 } from './server.mjs';
import { ref, computed, resolveDirective, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrGetDirectiveProps, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useApi } from './useApi-90H3qg-m.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'socket.io-client';
import 'vue-toastification';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _imports_0 = publicAssetsURL("/TypingRushLogo.png");
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useSocket();
    const isDarkMode = ref(false);
    const showRules = ref(false);
    ref(false);
    const mobileMenuOpen = ref(false);
    ref(false);
    const { user } = useAuth();
    const { getProfilePictureUrl } = useApi();
    computed(() => {
      if (!user.value) return "/default-avatar.png";
      return getProfilePictureUrl(user.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_client_only = __nuxt_component_1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col min-h-screen" }, _attrs))}><header class="bg-glass-light dark:bg-glass-dark backdrop-blur-md border-b border-white/10 dark:border-gray-800/30 shadow-glass z-10 sticky top-0"><div class="container mx-auto px-4 py-3 flex justify-between items-center"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="TypingRush Logo" class="h-10 w-10"${_scopeId}><span class="text-xl font-bold"${_scopeId}>TypingRush</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "TypingRush Logo",
                class: "h-10 w-10"
              }),
              createVNode("span", { class: "text-xl font-bold" }, "TypingRush")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="flex items-center"><button${ssrRenderAttrs(mergeProps({
        class: "md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 mr-2",
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 200 } },
        "data-mobile-menu-button": ""
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
      if (!mobileMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
      }
      _push(`</svg></button><div class="hidden md:flex items-center space-x-1 mr-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "px-3 py-2 rounded-lg bg-primary-600/20 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-600/30 dark:hover:bg-primary-600/30 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Play `);
          } else {
            return [
              createTextVNode(" Play ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/leaderboard",
        class: "px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Leaderboard `);
          } else {
            return [
              createTextVNode(" Leaderboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div><div class="flex items-center space-x-2"><button${ssrRenderAttrs(mergeProps({
        class: "p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300",
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 200 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button><button${ssrRenderAttrs(mergeProps({
        class: "p-2 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-300",
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 200 } }
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>`);
      if (isDarkMode.value) {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: "text-yellow-400",
          initial: { rotate: -180, opacity: 0 },
          enter: { rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
          leave: { rotate: 180, opacity: 0, transition: { duration: 300 } },
          key: "sun-icon"
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></span>`);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: "text-gray-700",
          initial: { rotate: 180, opacity: 0 },
          enter: { rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
          leave: { rotate: -180, opacity: 0, transition: { duration: 300 } },
          key: "moon-icon"
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg></span>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div></nav></div></header>`);
      if (mobileMenuOpen.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "md:hidden fixed inset-x-0 top-[61px] bg-glass-light dark:bg-glass-dark backdrop-blur-md border-b border-white/10 dark:border-gray-800/30 shadow-glass z-10",
          initial: { opacity: 0, y: -20 },
          enter: { opacity: 1, y: 0, transition: { duration: 200 } },
          leave: { opacity: 0, y: -20, transition: { duration: 150 } },
          "data-mobile-menu": ""
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="container mx-auto px-4 py-2"><div class="flex flex-col space-y-1">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "px-4 py-3 rounded-lg bg-primary-600/20 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-600/30 dark:hover:bg-primary-600/30 transition-all duration-300",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Play `);
            } else {
              return [
                createTextVNode(" Play ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/leaderboard",
          class: "px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Leaderboard `);
            } else {
              return [
                createTextVNode(" Leaderboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-grow container mx-auto px-4 py-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-glass-light dark:bg-glass-dark backdrop-blur-md border-t border-white/10 dark:border-gray-800/30 shadow-glass-inner py-6"><div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400"><p>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} TypingRush. All rights reserved.</p></div></footer>`);
      if (showRules.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50",
          initial: { opacity: 0 },
          enter: { opacity: 1, transition: { duration: 300 } },
          leave: { opacity: 0, transition: { duration: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div${ssrRenderAttrs(mergeProps({
          class: "bg-glass-light dark:bg-glass-dark backdrop-blur-lg rounded-2xl shadow-glass-lg border border-white/20 dark:border-gray-700/30 max-w-md w-full p-6 relative overflow-hidden",
          initial: { scale: 0.9, opacity: 0, y: -20 },
          enter: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
          leave: { scale: 0.9, opacity: 0, y: 20, transition: { duration: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="absolute -top-24 -right-24 w-40 h-40 bg-primary-300/20 dark:bg-primary-500/10 rounded-full"></div><div class="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/20 dark:bg-purple-500/10 rounded-full"></div><div${ssrRenderAttrs(mergeProps({
          class: "flex justify-between items-center mb-4 relative",
          initial: { opacity: 0 },
          enter: { opacity: 1, transition: { duration: 300, delay: 100 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h2 class="text-xl font-bold text-gray-900 dark:text-white">Game Rules</h2><button${ssrRenderAttrs(mergeProps({
          class: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-300",
          hover: { rotate: 90, transition: { duration: 300 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div${ssrRenderAttrs(mergeProps({
          class: "text-gray-700 dark:text-gray-300 space-y-3 relative",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 400, delay: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><p>1. Type the displayed phrase as quickly and accurately as possible.</p><p>2. The timer starts automatically when you begin typing.</p><p>3. Your performance is measured by:</p><ul class="list-disc list-inside pl-4"><li>Words Per Minute (WPM)</li><li>Accuracy percentage</li><li>Number of errors</li></ul><p>4. Letters will be color-coded as you type:</p><ul class="list-disc list-inside pl-4"><li><span class="text-green-500">Green</span> for correct letters</li><li><span class="text-red-500">Red</span> for incorrect letters</li><li><span class="text-gray-500">Gray</span> for letters not yet typed</li></ul><p>5. After completing the phrase, you&#39;ll see your results and can try again with a new phrase.</p></div><div${ssrRenderAttrs(mergeProps({
          class: "mt-6 relative",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 400, delay: 300 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><button${ssrRenderAttrs(mergeProps({
          class: "w-full bg-primary-600/90 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-xl backdrop-blur-sm shadow-glass-inner border border-primary-500/30 transition-all duration-300",
          initial: { scale: 1 },
          hover: { scale: 1.05, transition: { duration: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Got it! </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-COrQGBty.mjs.map
