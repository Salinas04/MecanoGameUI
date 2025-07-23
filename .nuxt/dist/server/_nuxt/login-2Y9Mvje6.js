import { _ as __nuxt_component_0 } from "./nuxt-link-CF8KgvdM.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { a as useRouter, u as useAuth } from "../server.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/klona/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/ufo/dist/index.mjs";
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { loading, error } = useAuth();
    const email = ref("");
    const password = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto" }, _attrs))}><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Login</h1><p class="text-gray-600 dark:text-gray-300">Sign in to access your account</p></div><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"><form>`);
      if (unref(error).login) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">${ssrInterpolate(unref(error).login)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4"><label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Email</label><input${ssrRenderAttr("value", email.value)} type="email" id="email" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter your email" required></div><div class="mb-6"><label for="password" class="block text-gray-700 dark:text-gray-300 mb-2">Password</label><input${ssrRenderAttr("value", password.value)} type="password" id="password" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter your password" required></div><button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Signing in..." : "Sign In")}</button></form></div><div class="text-center"><p class="text-gray-600 dark:text-gray-400"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Register `);
          } else {
            return [
              createTextVNode(" Register ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-2Y9Mvje6.js.map
