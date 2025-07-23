import { _ as __nuxt_component_0 } from "./nuxt-link-CF8KgvdM.js";
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { u as useAuth } from "../server.mjs";
import { useRouter } from "vue-router";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/radix3/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/defu/dist/defu.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "socket.io-client";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/klona/dist/index.mjs";
import "vue-toastification";
const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { loading, error } = useAuth();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const passwordMismatch = computed(() => {
      return password.value && confirmPassword.value && password.value !== confirmPassword.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-md mx-auto" }, _attrs))}><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Register</h1><p class="text-gray-600 dark:text-gray-300">Create a new account</p></div><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6"><form>`);
      if (unref(error).register) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">${ssrInterpolate(unref(error).register)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-4"><label for="username" class="block text-gray-700 dark:text-gray-300 mb-2">Username</label><input${ssrRenderAttr("value", username.value)} type="text" id="username" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Choose a username" required minlength="3" maxlength="30"></div><div class="mb-4"><label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Email</label><input${ssrRenderAttr("value", email.value)} type="email" id="email" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter your email" required></div><div class="mb-4"><label for="password" class="block text-gray-700 dark:text-gray-300 mb-2">Password</label><input${ssrRenderAttr("value", password.value)} type="password" id="password" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 relative z-10" placeholder="Create a password" required minlength="6"></div><div class="mb-6"><label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label><input${ssrRenderAttr("value", confirmPassword.value)} type="password" id="confirmPassword" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 relative z-10" placeholder="Confirm your password" required>`);
      if (passwordMismatch.value) {
        _push(`<p class="text-red-500 text-sm mt-1">Passwords do not match</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"${ssrIncludeBooleanAttr(unref(loading) || passwordMismatch.value) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Creating Account..." : "Create Account")}</button></form></div><div class="text-center"><p class="text-gray-600 dark:text-gray-400"> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=register-D0x_AQxb.js.map
