import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useApi } from "./useApi-90H3qg-m.js";
import { b as useSocket } from "../server.mjs";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/klona/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "ofetch";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/radix3/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/ufo/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "socket.io-client";
const _sfc_main = {
  __name: "friends",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useToast();
    const {
      loading: apiLoading,
      getProfilePictureUrl
    } = useApi();
    const {
      onlineFriends
    } = useSocket();
    const friends = ref([]);
    const friendRequests = ref({ received: [], sent: [] });
    const searchQuery = ref("");
    const searchResults = ref([]);
    const searchLoading = ref(false);
    const hasSearched = ref(false);
    const loading = computed(() => apiLoading.value);
    function isFriend(userId) {
      return friends.value.some((friend) => friend._id === userId);
    }
    function hasPendingRequest(userId) {
      return friendRequests.value.sent.some((request) => request.receiver._id === userId) || friendRequests.value.received.some((request) => request.sender._id === userId);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="flex flex-col md:flex-row gap-8"><div class="w-full md:w-1/3 space-y-6"><div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-6 shadow-glass"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><span>Friend Requests</span>`);
      if (friendRequests.value.received.length > 0) {
        _push(`<span class="ml-2 bg-primary-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">${ssrInterpolate(friendRequests.value.received.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h2>`);
      if (friendRequests.value.received.length === 0 && friendRequests.value.sent.length === 0) {
        _push(`<div class="text-gray-500 dark:text-gray-400 text-center py-4"> No pending friend requests </div>`);
      } else {
        _push(`<!---->`);
      }
      if (friendRequests.value.received.length > 0) {
        _push(`<div class="mb-4"><h3 class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Received</h3><ul class="space-y-3"><!--[-->`);
        ssrRenderList(friendRequests.value.received, (request) => {
          _push(`<li class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"><div class="flex items-center"><img${ssrRenderAttr("src", unref(getProfilePictureUrl)(request.sender))} alt="Profile" class="w-10 h-10 rounded-full object-cover mr-3"><span class="font-medium">${ssrInterpolate(request.sender.username)}</span></div><div class="flex space-x-2 mt-2 sm:mt-0 ml-auto"><button class="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors"> Accept </button><button class="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md text-sm transition-colors"> Reject </button></div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (friendRequests.value.sent.length > 0) {
        _push(`<div><h3 class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Sent</h3><ul class="space-y-3"><!--[-->`);
        ssrRenderList(friendRequests.value.sent, (request) => {
          _push(`<li class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"><div class="flex items-center"><img${ssrRenderAttr("src", unref(getProfilePictureUrl)(request.receiver))} alt="Profile" class="w-10 h-10 rounded-full object-cover mr-3"><span class="font-medium">${ssrInterpolate(request.receiver.username)}</span></div><span class="text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">Pending</span></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-6 shadow-glass"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><span>Friends</span>`);
      if (friends.value.length > 0) {
        _push(`<span class="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-medium px-2.5 py-0.5 rounded-full">${ssrInterpolate(friends.value.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h2>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-4"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>`);
      } else if (friends.value.length === 0) {
        _push(`<div class="text-gray-500 dark:text-gray-400 text-center py-4"> No friends yet. Start by adding some! </div>`);
      } else {
        _push(`<ul class="space-y-3"><!--[-->`);
        ssrRenderList(friends.value, (friend) => {
          _push(`<li class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors cursor-pointer"><div class="flex items-center"><div class="relative"><img${ssrRenderAttr("src", unref(getProfilePictureUrl)(friend))} alt="Profile" class="w-10 h-10 rounded-full object-cover mr-3"><span class="${ssrRenderClass([{
            "bg-green-500": unref(onlineFriends).get(friend._id) === "online",
            "bg-yellow-500": unref(onlineFriends).get(friend._id) === "away",
            "bg-gray-500": !unref(onlineFriends).get(friend._id) || unref(onlineFriends).get(friend._id) === "offline"
          }, "absolute bottom-0 right-2 w-3 h-3 rounded-full"])}"></span></div><div><div class="font-medium">${ssrInterpolate(friend.username)}</div><div class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(onlineFriends).get(friend._id) === "online" ? "Online" : unref(onlineFriends).get(friend._id) === "away" ? "Away" : "Offline")}</div></div></div><div class="flex space-x-2 mt-2 sm:mt-0 ml-auto"><button class="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors"> Chat </button><button class="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md text-sm transition-colors"> Remove </button></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</div></div><div class="w-full md:w-2/3"><div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-6 shadow-glass"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Find Friends</h2><div class="mb-6"><div class="relative"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search by username or email" class="w-full px-4 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"><button class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors"> Search </button></div></div>`);
      if (searchLoading.value) {
        _push(`<div class="flex justify-center py-4"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>`);
      } else if (searchResults.value.length === 0 && hasSearched.value) {
        _push(`<div class="text-gray-500 dark:text-gray-400 text-center py-4"> No users found matching your search </div>`);
      } else if (searchResults.value.length > 0) {
        _push(`<ul class="space-y-3"><!--[-->`);
        ssrRenderList(searchResults.value, (user) => {
          _push(`<li class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg"><div class="flex items-center"><img${ssrRenderAttr("src", unref(getProfilePictureUrl)(user))} alt="Profile" class="w-10 h-10 rounded-full object-cover mr-3"><span class="font-medium">${ssrInterpolate(user.username)}</span></div><button${ssrIncludeBooleanAttr(isFriend(user._id) || hasPendingRequest(user._id)) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": isFriend(user._id) || hasPendingRequest(user._id) }, "px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors mt-2 sm:mt-0"])}">${ssrInterpolate(isFriend(user._id) ? "Already Friends" : hasPendingRequest(user._id) ? "Request Pending" : "Add Friend")}</button></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/friends.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=friends-BeUNQ1JU.js.map
