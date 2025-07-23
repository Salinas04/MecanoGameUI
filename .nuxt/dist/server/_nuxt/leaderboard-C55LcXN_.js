import { _ as __nuxt_component_0 } from "./nuxt-link-CF8KgvdM.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { u as useApi } from "./useApi-90H3qg-m.js";
import { u as useAuth } from "../server.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/ufo/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/klona/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "ofetch";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/radix3/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "socket.io-client";
import "vue-toastification";
const _sfc_main = {
  __name: "leaderboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { loading, error, getProfilePictureUrl } = useApi();
    const { user, isAuthenticated } = useAuth();
    const scores = ref([]);
    function isCurrentUser(score) {
      if (!isAuthenticated.value || !user.value || !score.user) {
        return false;
      }
      return score.user === user.value._id;
    }
    function formatDate(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto" }, _attrs))}><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2 relative inline-block"> Leaderboard <span class="absolute -top-2 -right-8 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-md animate-pulse"> #1 </span></h1><p class="text-gray-600 dark:text-gray-300">Top typing speeds with our community&#39;s best typists</p></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div><p class="mt-2 text-gray-600 dark:text-gray-400">Loading scores...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-8"><p class="text-red-500">${ssrInterpolate(unref(error))}</p><button class="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"> Try Again </button></div>`);
      } else if (scores.value.length === 0) {
        _push(`<div class="text-center py-8"><p class="text-gray-600 dark:text-gray-400">No scores yet. Be the first to submit your score!</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mt-4 inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Play Now `);
            } else {
              return [
                createTextVNode(" Play Now ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Rank</th><th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Photo</th><th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Name</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">WPM</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Accuracy</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Errors</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Date</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(scores.value, (score, index) => {
          _push(`<tr class="${ssrRenderClass([{
            "bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30": index === 0,
            "bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50": index === 1,
            "bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30": index === 2,
            "hover:bg-gray-50 dark:hover:bg-gray-750": index > 2
          }, "border-b border-gray-100 dark:border-gray-800 transition-all duration-300 cursor-pointer"])}"><td class="px-4 py-3 text-gray-800 dark:text-gray-200">${ssrInterpolate(index + 1)}</td><td class="px-4 py-3"><div class="relative group"><img${ssrRenderAttr("src", unref(getProfilePictureUrl)(score.user))}${ssrRenderAttr("alt", `${score.name}'s profile picture`)} class="${ssrRenderClass([isCurrentUser(score) ? "border-primary-500" : "border-gray-200 dark:border-gray-700", "w-10 h-10 rounded-full object-cover border-2 transition-transform duration-300 transform group-hover:scale-110"])}">`);
          if (index < 3) {
            _push(`<div class="${ssrRenderClass([{
              "bg-yellow-500": index === 0,
              "bg-gray-400": index === 1,
              "bg-amber-600": index === 2
            }, "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"])}">${ssrInterpolate(index + 1)}</div>`);
          } else if (isCurrentUser(score)) {
            _push(`<div class="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border border-white dark:border-gray-800"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center"><div class="font-bold text-gray-800 dark:text-white">${ssrInterpolate(score.name)}</div><div class="text-sm text-gray-600 dark:text-gray-300"><div class="flex justify-between mt-1"><span>WPM:</span><span class="font-semibold text-primary-600">${ssrInterpolate(score.wpm)}</span></div><div class="flex justify-between"><span>Accuracy:</span><span>${ssrInterpolate(score.accuracy)}%</span></div></div><div class="absolute left-1/2 -bottom-1 w-2 h-2 bg-white dark:bg-gray-800 transform rotate-45 -translate-x-1/2"></div></div></div></td><td class="px-4 py-3 font-medium"><span class="${ssrRenderClass({
            "text-primary-600 dark:text-primary-400 font-bold": isCurrentUser(score),
            "text-gray-800 dark:text-gray-200": !isCurrentUser(score)
          })}">${ssrInterpolate(score.name)} `);
          if (isCurrentUser(score)) {
            _push(`<span class="ml-2 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 py-1 px-2 rounded-full">You</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span></td><td class="px-4 py-3 text-right"><span class="${ssrRenderClass([{
            "text-primary-600 dark:text-primary-400 transform scale-110": score.highlight,
            "text-primary-600 dark:text-primary-400": !score.highlight
          }, "inline-block font-bold transition-all duration-300"])}">${ssrInterpolate(score.wpm)}</span></td><td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">${ssrInterpolate(score.accuracy)}%</td><td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">${ssrInterpolate(score.errors)}</td><td class="px-4 py-3 text-right text-gray-600 dark:text-gray-400 text-sm">${ssrInterpolate(formatDate(score.date))}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="mt-6 text-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Play Again `);
            } else {
              return [
                createTextVNode(" Play Again ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/leaderboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=leaderboard-C55LcXN_.js.map
