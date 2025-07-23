import { _ as __nuxt_component_0 } from "./nuxt-link-CF8KgvdM.js";
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { a as useRouter, u as useAuth } from "../server.mjs";
import { u as useApi } from "./useApi-90H3qg-m.js";
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { user } = useAuth();
    const { loading, getProfilePictureUrl } = useApi();
    const error = ref(null);
    const profileUpdateError = ref(null);
    const pictureUpdateError = ref(null);
    const passwordChangeError = ref(null);
    const username = ref("");
    const email = ref("");
    const profilePicture = ref("");
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const selectedFile = ref(null);
    ref(null);
    const profileUpdateSuccess = ref(false);
    const pictureUpdateSuccess = ref(false);
    const passwordChangeSuccess = ref(false);
    const imageError = ref(false);
    const isProfileChanged = computed(() => {
      var _a, _b;
      return username.value !== ((_a = user.value) == null ? void 0 : _a.username) || email.value !== ((_b = user.value) == null ? void 0 : _b.email);
    });
    const passwordMismatch = computed(() => {
      return newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value;
    });
    const isPasswordValid = computed(() => {
      return currentPassword.value && newPassword.value && confirmPassword.value && newPassword.value === confirmPassword.value && newPassword.value.length >= 6;
    });
    const profilePictureUrl = computed(() => {
      var _a, _b;
      if (!profilePicture.value) return "/default-avatar.png";
      if (typeof profilePicture.value === "object" && profilePicture.value.data && typeof profilePicture.value.data === "string" && profilePicture.value.data.startsWith("data:")) {
        return profilePicture.value.data;
      }
      if (typeof profilePicture.value === "object" && profilePicture.value.fileId) {
        const tempUser = {
          _id: (_a = user.value) == null ? void 0 : _a._id,
          profilePicture: {
            fileId: profilePicture.value.fileId
          }
        };
        return getProfilePictureUrl(tempUser);
      }
      if ((_b = user.value) == null ? void 0 : _b._id) {
        return getProfilePictureUrl(user.value._id);
      }
      if (typeof profilePicture.value === "string") {
        return profilePicture.value;
      }
      return "/default-avatar.png";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto" }, _attrs))}><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Profile</h1><p class="text-gray-600 dark:text-gray-300">Manage your account settings</p></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div><p class="mt-2 text-gray-600 dark:text-gray-400">Loading your profile...</p></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:col-span-1"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Profile Picture</h2><div class="flex flex-col items-center"><div class="h-32 w-32 rounded-full overflow-hidden border-2 border-primary-500 mb-4 flex items-center justify-center bg-gray-200 dark:bg-gray-700">`);
        if (profilePictureUrl.value !== "/default-avatar.png" && !imageError.value) {
          _push(`<img${ssrRenderAttr("src", profilePictureUrl.value)} alt="Profile" class="h-full w-full object-cover">`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-12 w-12 text-gray-500 dark:text-gray-400"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path></svg>`);
        }
        _push(`</div><div class="w-full">`);
        if (pictureUpdateError.value) {
          _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">${ssrInterpolate(pictureUpdateError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (pictureUpdateSuccess.value) {
          _push(`<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"> Profile picture updated successfully! </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-4"><label for="profilePictureFile" class="block text-gray-700 dark:text-gray-300 mb-2">Upload Image</label><div class="relative"><input type="file" id="profilePictureFile" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"><div class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">`);
        if (selectedFile.value) {
          _push(`<span class="truncate">${ssrInterpolate(selectedFile.value.name)}</span>`);
        } else {
          _push(`<span class="text-gray-500 dark:text-gray-400">Choose a file...</span>`);
        }
        _push(`<button type="button" class="ml-auto bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg text-sm"> Browse </button></div></div><p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Supported formats: JPG, PNG, GIF</p></div><button class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"${ssrIncludeBooleanAttr(!selectedFile.value) ? " disabled" : ""}> Update Picture </button></div></div></div><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:col-span-2"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Profile Information</h2><form>`);
        if (profileUpdateSuccess.value) {
          _push(`<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"> Profile updated successfully! </div>`);
        } else {
          _push(`<!---->`);
        }
        if (profileUpdateError.value) {
          _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">${ssrInterpolate(profileUpdateError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-4"><label for="username" class="block text-gray-700 dark:text-gray-300 mb-2">Username</label><input${ssrRenderAttr("value", username.value)} type="text" id="username" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Your username" required minlength="3" maxlength="30"></div><div class="mb-6"><label for="email" class="block text-gray-700 dark:text-gray-300 mb-2">Email</label><input${ssrRenderAttr("value", email.value)} type="email" id="email" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Your email" required></div><button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors mb-4"${ssrIncludeBooleanAttr(!isProfileChanged.value) ? " disabled" : ""}> Save Changes </button></form></div><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:col-span-3"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Change Password</h2><form>`);
        if (passwordChangeSuccess.value) {
          _push(`<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"> Password changed successfully! </div>`);
        } else {
          _push(`<!---->`);
        }
        if (passwordChangeError.value) {
          _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">${ssrInterpolate(passwordChangeError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-4"><label for="currentPassword" class="block text-gray-700 dark:text-gray-300 mb-2">Current Password</label><input${ssrRenderAttr("value", currentPassword.value)} type="password" id="currentPassword" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter your current password" required></div><div class="mb-4"><label for="newPassword" class="block text-gray-700 dark:text-gray-300 mb-2">New Password</label><input${ssrRenderAttr("value", newPassword.value)} type="password" id="newPassword" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter your new password" required minlength="6"></div><div class="mb-6"><label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label><input${ssrRenderAttr("value", confirmPassword.value)} type="password" id="confirmPassword" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Confirm your new password" required>`);
        if (passwordMismatch.value) {
          _push(`<p class="text-red-500 text-sm mt-1">Passwords do not match</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"${ssrIncludeBooleanAttr(!isPasswordValid.value) ? " disabled" : ""}> Change Password </button></form></div><div class="md:col-span-3 text-center mt-4 flex justify-center space-x-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-6 rounded-xl transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Dashboard `);
            } else {
              return [
                createTextVNode(" Back to Dashboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"> Logout </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=profile-Du_2plnX.js.map
