import { _ as __nuxt_component_0 } from "./nuxt-link-CF8KgvdM.js";
import { ref, watch, nextTick, mergeProps, withCtx, createBlock, openBlock, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useApi } from "./useApi-90H3qg-m.js";
import { u as useAuth, b as useSocket } from "../server.mjs";
import { useToast } from "vue-toastification";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/ufo/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/klona/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "ofetch";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/hookable/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/unctx/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/h3/dist/index.mjs";
import "C:/Users/anton/WebstormProjects/mecanogame/MecanoGame/frontend/node_modules/radix3/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "socket.io-client";
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const route = useRoute();
    useToast();
    const { user } = useAuth();
    const userId = ref((_a = user.value) == null ? void 0 : _a._id);
    watch(() => user.value, (newUser) => {
      if (newUser && newUser._id) {
        console.log("User updated, setting userId to:", newUser._id);
        userId.value = newUser._id;
      }
    });
    const {
      getProfilePictureUrl
    } = useApi();
    const {
      onlineFriends,
      messages: socketMessages
    } = useSocket();
    const friendId = ref(route.params.id);
    const friend = ref(null);
    const chatMessages = ref([]);
    const newMessage = ref("");
    const loading = ref(true);
    const messagesContainer = ref(null);
    const isScrolledToBottom = ref(true);
    console.log("Current user ID:", userId.value);
    watch(() => socketMessages.value.get(friendId.value), (newMessages) => {
      if (newMessages) {
        chatMessages.value = [...newMessages];
        scrollToBottomIfNeeded();
      }
    }, { deep: true });
    function formatTime(timestamp) {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    function formatLastSeen(timestamp) {
      if (!timestamp) return "a while ago";
      const date = new Date(timestamp);
      const now = /* @__PURE__ */ new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 6e4);
      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
      return date.toLocaleDateString();
    }
    function scrollToBottom() {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    }
    function scrollToBottomIfNeeded() {
      if (isScrolledToBottom.value) {
        nextTick(() => {
          scrollToBottom();
        });
      }
    }
    function isCurrentUserSender(message) {
      const userIdStr = String(userId.value);
      const senderStr = String(message.sender);
      return userIdStr === senderStr;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl shadow-glass overflow-hidden"><div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/friends",
        class: "mr-4 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (friend.value) {
        _push(`<div class="flex items-center"><div class="relative"><img${ssrRenderAttr("src", unref(getProfilePictureUrl)(friend.value))} alt="Profile" class="w-10 h-10 rounded-full object-cover"><span class="${ssrRenderClass([{
          "bg-green-500": unref(onlineFriends).get(friend.value._id) === "online",
          "bg-yellow-500": unref(onlineFriends).get(friend.value._id) === "away",
          "bg-gray-500": !unref(onlineFriends).get(friend.value._id) || unref(onlineFriends).get(friend.value._id) === "offline"
        }, "absolute bottom-0 right-0 w-3 h-3 rounded-full"])}"></span></div><div class="ml-3"><h2 class="text-lg font-semibold text-gray-800 dark:text-white">${ssrInterpolate(friend.value.username)}</h2><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(onlineFriends).get(friend.value._id) === "online" ? "Online" : unref(onlineFriends).get(friend.value._id) === "away" ? "Away" : "Last seen " + formatLastSeen(friend.value.lastSeen))}</p></div></div>`);
      } else {
        _push(`<div class="flex items-center"><div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div><div class="ml-3"><div class="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div><div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mt-1 animate-pulse"></div></div></div>`);
      }
      _push(`</div></div><div class="p-4 h-[calc(100vh-250px)] sm:h-[calc(100vh-220px)] md:h-[calc(100vh-200px)] overflow-y-auto">`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-4"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>`);
      } else if (chatMessages.value.length === 0) {
        _push(`<div class="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><p>No messages yet. Start the conversation!</p></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(chatMessages.value, (message, index) => {
          _push(`<div class="${ssrRenderClass([
            "max-w-[90%] sm:max-w-[75%] rounded-lg p-2 sm:p-3 text-sm sm:text-base",
            isCurrentUserSender(message) ? "ml-auto bg-primary-600 text-white rounded-br-none" : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
          ])}"><p>${ssrInterpolate(message.content)}</p><p class="${ssrRenderClass([
            "text-xs mt-1",
            isCurrentUserSender(message) ? "text-primary-200" : "text-gray-500 dark:text-gray-400"
          ])}">${ssrInterpolate(formatTime(message.createdAt))} `);
          if (isCurrentUserSender(message)) {
            _push(`<span class="ml-1">${ssrInterpolate(message.read ? "• Read" : "")}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="p-4 border-t border-gray-200 dark:border-gray-700"><form class="flex items-center"><input${ssrRenderAttr("value", newMessage.value)} type="text" placeholder="Type a message..." class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500"${ssrIncludeBooleanAttr(!friend.value) ? " disabled" : ""}><button type="submit" class="ml-2 px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm sm:text-base"${ssrIncludeBooleanAttr(!newMessage.value.trim() || !friend.value) ? " disabled" : ""}> Send </button></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-ftFgoA3O.js.map
