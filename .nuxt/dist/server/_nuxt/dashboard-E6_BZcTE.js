import { _ as __nuxt_component_0 } from "./nuxt-link-CF8KgvdM.js";
import { a as useRouter, u as useAuth, _ as __nuxt_component_1 } from "../server.mjs";
import { computed, ref, watch, resolveDirective, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
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
const levelThresholds = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 500 },
  { level: 5, xp: 1e3 },
  { level: 6, xp: 1750 },
  { level: 7, xp: 2750 },
  { level: 8, xp: 4e3 },
  { level: 9, xp: 5500 },
  { level: 10, xp: 7500 }
];
function calculateLevel(experience) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (experience >= levelThresholds[i].xp) {
      return levelThresholds[i].level;
    }
  }
  return 1;
}
function getNextLevelInfo(experience) {
  const currentLevel = calculateLevel(experience);
  if (currentLevel === levelThresholds.length) {
    return {
      currentLevel,
      nextLevel: currentLevel,
      currentXP: experience,
      nextLevelXP: levelThresholds[currentLevel - 1].xp,
      xpNeeded: 0,
      progress: 100
    };
  }
  const nextLevel = currentLevel + 1;
  const nextLevelXP = levelThresholds[nextLevel - 1].xp;
  const currentLevelXP = levelThresholds[currentLevel - 1].xp;
  const xpForCurrentLevel = experience - currentLevelXP;
  const xpRequiredForNextLevel = nextLevelXP - currentLevelXP;
  const progress = Math.floor(xpForCurrentLevel / xpRequiredForNextLevel * 100);
  return {
    currentLevel,
    nextLevel,
    currentXP: experience,
    nextLevelXP,
    xpNeeded: nextLevelXP - experience,
    progress
  };
}
function hasPlayedToday(lastActiveDate) {
  if (!lastActiveDate) return false;
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const lastActive = new Date(lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);
  return today.getTime() === lastActive.getTime();
}
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const isDarkMode = computed(() => {
      return false;
    });
    useRouter();
    const { user } = useAuth();
    const { loading, error, getProfilePictureUrl } = useApi();
    const stats = ref(null);
    const userScores = ref([]);
    const imageError = ref(false);
    const showCharts = ref(false);
    const selectedPeriod = ref("all");
    const chartTypes = ref({
      wpm: "line",
      accuracy: "line"
    });
    computed(() => ({
      chart: {
        type: chartTypes.value.wpm,
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800
        },
        fontFamily: "inherit",
        foreColor: isDarkMode.value ? "#CBD5E1" : "#475569"
      },
      colors: ["#6366F1"],
      title: {
        text: "WPM Progress Over Time",
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: isDarkMode.value ? "#F1F5F9" : "#1E293B"
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
          format: "dd MMM"
        },
        title: {
          text: "Date"
        }
      },
      yaxis: {
        title: {
          text: "Words Per Minute"
        },
        min: function(min) {
          return min > 20 ? min - 20 : 0;
        }
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        },
        theme: isDarkMode.value ? "dark" : "light"
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      grid: {
        borderColor: isDarkMode.value ? "#334155" : "#E2E8F0"
      },
      theme: {
        mode: isDarkMode.value ? "dark" : "light"
      }
    }));
    computed(() => ({
      chart: {
        type: chartTypes.value.accuracy,
        height: 350,
        toolbar: {
          show: true
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800
        },
        fontFamily: "inherit",
        foreColor: isDarkMode.value ? "#CBD5E1" : "#475569"
      },
      colors: ["#10B981"],
      title: {
        text: "Accuracy Trend",
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: isDarkMode.value ? "#F1F5F9" : "#1E293B"
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
          format: "dd MMM"
        },
        title: {
          text: "Date"
        }
      },
      yaxis: {
        title: {
          text: "Accuracy (%)"
        },
        min: function(min) {
          return min > 20 ? min - 20 : 0;
        },
        max: 100
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        },
        theme: isDarkMode.value ? "dark" : "light"
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      markers: {
        size: 4,
        hover: {
          size: 6
        }
      },
      grid: {
        borderColor: isDarkMode.value ? "#334155" : "#E2E8F0"
      },
      theme: {
        mode: isDarkMode.value ? "dark" : "light"
      }
    }));
    computed(() => ({
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: {
          show: true
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800
        },
        fontFamily: "inherit",
        foreColor: isDarkMode.value ? "#CBD5E1" : "#475569"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5
        }
      },
      colors: ["#6366F1", "#10B981", "#F43F5E"],
      title: {
        text: "Performance Metrics",
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: isDarkMode.value ? "#F1F5F9" : "#1E293B"
        }
      },
      xaxis: {
        categories: ["Average", "Best", "Recent"]
      },
      yaxis: [
        {
          title: {
            text: "WPM"
          }
        },
        {
          opposite: true,
          title: {
            text: "Accuracy (%)"
          },
          min: 0,
          max: 100
        }
      ],
      tooltip: {
        shared: true,
        intersect: false,
        theme: isDarkMode.value ? "dark" : "light"
      },
      legend: {
        position: "top"
      },
      grid: {
        borderColor: isDarkMode.value ? "#334155" : "#E2E8F0"
      },
      theme: {
        mode: isDarkMode.value ? "dark" : "light"
      }
    }));
    computed(() => {
      if (!userScores.value || userScores.value.length === 0) {
        return [{ name: "WPM", data: [] }];
      }
      const filteredScores = filterScoresByPeriod(userScores.value);
      const data = filteredScores.map((score) => ({
        x: new Date(score.date).getTime(),
        y: score.wpm
      }));
      return [{ name: "WPM", data }];
    });
    computed(() => {
      if (!userScores.value || userScores.value.length === 0) {
        return [{ name: "Accuracy", data: [] }];
      }
      const filteredScores = filterScoresByPeriod(userScores.value);
      const data = filteredScores.map((score) => ({
        x: new Date(score.date).getTime(),
        y: score.accuracy
      }));
      return [{ name: "Accuracy", data }];
    });
    computed(() => {
      if (!stats.value) {
        return [];
      }
      const recentWpm = userScores.value.length > 0 ? userScores.value[0].wpm : 0;
      const recentAccuracy = userScores.value.length > 0 ? userScores.value[0].accuracy : 0;
      return [
        {
          name: "WPM",
          data: [stats.value.averageWpm || 0, stats.value.bestWpm || 0, recentWpm]
        },
        {
          name: "Accuracy",
          data: [
            stats.value.averageAccuracy || 0,
            userScores.value.reduce((max, score) => Math.max(max, score.accuracy), 0) || 0,
            recentAccuracy
          ],
          yAxisIndex: 1
        }
      ];
    });
    function formatDate(dateString) {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    function filterScoresByPeriod(scores) {
      if (!scores || scores.length === 0 || selectedPeriod.value === "all") {
        return scores;
      }
      const now = /* @__PURE__ */ new Date();
      let cutoffDate;
      if (selectedPeriod.value === "week") {
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
      } else if (selectedPeriod.value === "month") {
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      }
      return scores.filter((score) => new Date(score.date) >= cutoffDate);
    }
    const formattedDate = computed(() => {
      const now = /* @__PURE__ */ new Date();
      return now.toLocaleDateString(void 0, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    });
    const levelInfo = computed(() => {
      if (!user.value) return { currentLevel: 1, nextLevel: 2, currentXP: 0, nextLevelXP: 100, xpNeeded: 100, progress: 0 };
      return getNextLevelInfo(user.value.experience || 0);
    });
    const hasPlayedTodayValue = computed(() => {
      if (!user.value || !user.value.lastActiveDate) return false;
      return hasPlayedToday(user.value.lastActiveDate);
    });
    const profilePictureUrl = computed(() => {
      if (!user.value) return "/default-avatar.png";
      return getProfilePictureUrl(user.value);
    });
    watch(isDarkMode, () => {
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto" }, _attrs))}><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1><p class="text-gray-600 dark:text-gray-300">View your typing statistics and progress</p></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div><p class="mt-2 text-gray-600 dark:text-gray-400">Loading your data...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<div><div${ssrRenderAttrs(mergeProps({
          class: "bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6",
          initial: { opacity: 0, y: -20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="flex items-center"><div${ssrRenderAttrs(mergeProps({
          class: "flex-shrink-0",
          initial: { opacity: 0, scale: 0.8 },
          enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="h-16 w-16 rounded-full overflow-hidden border-2 border-primary-500 flex items-center justify-center bg-gray-200 dark:bg-gray-700">`);
        if (profilePictureUrl.value !== "/default-avatar.png" && !imageError.value) {
          _push(`<img${ssrRenderAttr("src", profilePictureUrl.value)} alt="Profile" class="h-full w-full object-cover">`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-8 w-8 text-gray-500 dark:text-gray-400"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path></svg>`);
        }
        _push(`</div></div><div${ssrRenderAttrs(mergeProps({
          class: "ml-4",
          initial: { opacity: 0, x: -20 },
          enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 300 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h2 class="text-xl font-bold text-gray-800 dark:text-white">Welcome, ${ssrInterpolate(((_a = unref(user)) == null ? void 0 : _a.username) || "User")}!</h2><p class="text-gray-600 dark:text-gray-400">${ssrInterpolate(formattedDate.value)}</p></div><div${ssrRenderAttrs(mergeProps({
          class: "ml-auto",
          initial: { opacity: 0, x: 20 },
          enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 400 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>`);
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          to: "/profile",
          class: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-xl transition-colors",
          initial: { scale: 1 },
          hover: { scale: 1.05, transition: { duration: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Profile `);
            } else {
              return [
                createTextVNode(" Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="flex flex-col md:flex-row gap-6"><div class="flex-1"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg> Daily Streak </h2><div class="flex items-center justify-between mb-4"><div class="text-center flex-1"><div class="text-3xl font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(((_b = unref(user)) == null ? void 0 : _b.currentStreak) || 0)}</div><div class="text-sm text-gray-600 dark:text-gray-400">Current Streak</div></div><div class="text-center flex-1"><div class="text-3xl font-bold text-primary-600 dark:text-primary-400">${ssrInterpolate(((_c = unref(user)) == null ? void 0 : _c.maxStreak) || 0)}</div><div class="text-sm text-gray-600 dark:text-gray-400">Best Streak</div></div></div>`);
        if (!hasPlayedTodayValue.value) {
          _push(`<div class="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-lg mt-2"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><p class="font-medium text-yellow-700 dark:text-yellow-300">Don&#39;t break your streak!</p><p class="text-sm text-yellow-600 dark:text-yellow-400">Play a game today to keep your streak going.</p></div></div><div class="mt-3 text-center">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/",
            class: "inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
          _push(`</div></div>`);
        } else {
          _push(`<div class="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-lg mt-2"><div class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><div><p class="font-medium text-green-700 dark:text-green-300">Great job!</p><p class="text-sm text-green-600 dark:text-green-400">You&#39;ve already played today. Your streak is safe.</p></div></div></div>`);
        }
        _push(`</div><div class="flex-1"><h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> Level &amp; Experience </h2><div class="flex items-center mb-2"><div class="bg-purple-100 dark:bg-purple-900 rounded-full h-16 w-16 flex items-center justify-center mr-4"><span class="text-2xl font-bold text-purple-600 dark:text-purple-400">${ssrInterpolate(levelInfo.value.currentLevel)}</span></div><div><div class="font-semibold text-gray-800 dark:text-white">Level ${ssrInterpolate(levelInfo.value.currentLevel)}</div><div class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(levelInfo.value.currentXP)} / ${ssrInterpolate(levelInfo.value.nextLevelXP)} XP </div></div></div><div class="mb-4"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4"><div class="bg-purple-600 dark:bg-purple-500 h-4 rounded-full transition-all duration-1000 ease-out" style="${ssrRenderStyle({ width: `${levelInfo.value.progress}%` })}"></div></div><div class="flex justify-between text-xs mt-1"><span class="text-gray-600 dark:text-gray-400">${ssrInterpolate(levelInfo.value.progress)}% complete</span><span class="text-gray-600 dark:text-gray-400">${ssrInterpolate(levelInfo.value.xpNeeded)} XP to level ${ssrInterpolate(levelInfo.value.nextLevel)}</span></div></div><div class="text-center mt-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Earn More XP `);
            } else {
              return [
                createTextVNode(" Earn More XP ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 300 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h2${ssrRenderAttrs(mergeProps({
          class: "text-xl font-bold text-gray-800 dark:text-white mb-4",
          initial: { opacity: 0, x: -20 },
          enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 400 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Statistics</h2><div class="grid grid-cols-2 md:grid-cols-5 gap-4"><div${ssrRenderAttrs(mergeProps({
          class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
          initial: { opacity: 0, scale: 0.8 },
          enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 500 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div${ssrRenderAttrs(mergeProps({
          class: "text-3xl font-bold text-primary-600 dark:text-primary-400",
          initial: { scale: 1 },
          enter: { scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 900 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>${ssrInterpolate(((_d = stats.value) == null ? void 0 : _d.totalGames) || 0)}</div><div class="text-sm text-gray-600 dark:text-gray-400">Games Played</div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
          initial: { opacity: 0, scale: 0.8 },
          enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 600 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div${ssrRenderAttrs(mergeProps({
          class: "text-3xl font-bold text-primary-600 dark:text-primary-400",
          initial: { scale: 1 },
          enter: { scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1e3 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>${ssrInterpolate(((_e = stats.value) == null ? void 0 : _e.averageWpm) || 0)}</div><div class="text-sm text-gray-600 dark:text-gray-400">Average WPM</div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
          initial: { opacity: 0, scale: 0.8 },
          enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 700 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div${ssrRenderAttrs(mergeProps({
          class: "text-3xl font-bold text-primary-600 dark:text-primary-400",
          initial: { scale: 1 },
          enter: { scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1100 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>${ssrInterpolate(((_f = stats.value) == null ? void 0 : _f.bestWpm) || 0)}</div><div class="text-sm text-gray-600 dark:text-gray-400">Best WPM</div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
          initial: { opacity: 0, scale: 0.8 },
          enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 750 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div${ssrRenderAttrs(mergeProps({
          class: "text-3xl font-bold text-primary-600 dark:text-primary-400",
          initial: { scale: 1 },
          enter: { scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1150 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>${ssrInterpolate(((_g = stats.value) == null ? void 0 : _g.bestCompletedPhrases) || 0)}</div><div class="text-sm text-gray-600 dark:text-gray-400">Best Phrases</div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 text-center",
          initial: { opacity: 0, scale: 0.8 },
          enter: { opacity: 1, scale: 1, transition: { duration: 500, delay: 800 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div${ssrRenderAttrs(mergeProps({
          class: "text-3xl font-bold text-primary-600 dark:text-primary-400",
          initial: { scale: 1 },
          enter: { scale: [1, 1.1, 1], transition: { repeat: 0, duration: 600, delay: 1200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>${ssrInterpolate(((_h = stats.value) == null ? void 0 : _h.averageAccuracy) || 0)}%</div><div class="text-sm text-gray-600 dark:text-gray-400">Average Accuracy</div></div></div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 600 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div${ssrRenderAttrs(mergeProps({
          class: ["flex justify-between items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 group", { "bg-gray-50 dark:bg-gray-750": showCharts.value }],
          initial: { scale: 1 },
          enter: { scale: [1, 1.02, 1], transition: { repeat: 2, duration: 1e3, delay: 1500 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h2${ssrRenderAttrs(mergeProps({
          class: "text-xl font-bold text-gray-800 dark:text-white flex items-center",
          initial: { opacity: 0, x: -20 },
          enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 700 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg><span>Additional Information</span><span class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">${ssrInterpolate(showCharts.value ? "Click to hide" : "Click to show")}</span></h2><div class="flex items-center"><span class="mr-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">${ssrInterpolate(showCharts.value ? "Hide charts" : "Show charts")}</span><div class="bg-gray-200 dark:bg-gray-600 rounded-full p-1 group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors duration-300 relative" title="Click to toggle charts visibility"><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass(["h-6 w-6 transition-transform duration-300 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400", showCharts.value ? "transform rotate-180" : ""])}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`);
        if (!showCharts.value) {
          _push(`<span class="absolute -top-1 -right-1 h-3 w-3 bg-primary-500 rounded-full animate-ping opacity-75"></span>`);
        } else {
          _push(`<!---->`);
        }
        if (!showCharts.value) {
          _push(`<span class="absolute -top-1 -right-1 h-3 w-3 bg-primary-500 rounded-full"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="transition-all duration-500 ease-in-out overflow-hidden" style="${ssrRenderStyle({
          maxHeight: showCharts.value ? "3000px" : "0px",
          opacity: showCharts.value ? 1 : 0,
          transform: showCharts.value ? "translateY(0)" : "translateY(-10px)",
          marginTop: showCharts.value ? "16px" : "0px"
        })}"><div class="mt-4 mb-4 border-t border-gray-200 dark:border-gray-700 pt-4"></div><div class="flex justify-between items-center mb-4"><h3${ssrRenderAttrs(mergeProps({
          class: "text-lg font-semibold text-gray-700 dark:text-gray-300",
          initial: { opacity: 0, x: -20 },
          enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 700 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Performance Charts</h3><div${ssrRenderAttrs(mergeProps({
          class: "flex space-x-2",
          initial: { opacity: 0, x: 20 },
          enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 700 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="inline-flex rounded-md shadow-sm" role="group"><button class="${ssrRenderClass([
          "px-3 py-1 text-sm font-medium rounded-l-lg border",
          selectedPeriod.value === "week" ? "bg-primary-600 text-white border-primary-600" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
        ])}"> Week </button><button class="${ssrRenderClass([
          "px-3 py-1 text-sm font-medium border-y",
          selectedPeriod.value === "month" ? "bg-primary-600 text-white border-primary-600" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
        ])}"> Month </button><button class="${ssrRenderClass([
          "px-3 py-1 text-sm font-medium rounded-r-lg border",
          selectedPeriod.value === "all" ? "bg-primary-600 text-white border-primary-600" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
        ])}"> All Time </button></div></div></div><div${ssrRenderAttrs(mergeProps({
          class: "mb-8",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 800 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="flex justify-between items-center mb-2"><h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">WPM Progress</h3><button class="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"> Switch to ${ssrInterpolate(chartTypes.value.wpm === "line" ? "Bar" : "Line")}</button></div>`);
        if (userScores.value.length === 0) {
          _push(`<div class="text-center py-8 text-gray-500 dark:text-gray-400"> No data available. Play more games to see your progress! </div>`);
        } else {
          _push(`<div class="h-80">`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {
            fallback: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>Loading chart...</p></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg" }, [
                    createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Loading chart...")
                  ])
                ];
              }
            })
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div><div${ssrRenderAttrs(mergeProps({
          class: "mb-8",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 900 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="flex justify-between items-center mb-2"><h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Accuracy Trend</h3><button class="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-300"> Switch to ${ssrInterpolate(chartTypes.value.accuracy === "line" ? "Bar" : "Line")}</button></div>`);
        if (userScores.value.length === 0) {
          _push(`<div class="text-center py-8 text-gray-500 dark:text-gray-400"> No data available. Play more games to see your accuracy trend! </div>`);
        } else {
          _push(`<div class="h-80">`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {
            fallback: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>Loading chart...</p></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg" }, [
                    createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Loading chart...")
                  ])
                ];
              }
            })
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div><div${ssrRenderAttrs(mergeProps({
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 1e3 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance Comparison</h3>`);
        if (!stats.value) {
          _push(`<div class="text-center py-8 text-gray-500 dark:text-gray-400"> No data available. Play more games to see your performance comparison! </div>`);
        } else {
          _push(`<div class="h-80">`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {
            fallback: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg"${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>Loading chart...</p></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg" }, [
                    createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Loading chart...")
                  ])
                ];
              }
            })
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div></div><div${ssrRenderAttrs(mergeProps({
          class: "bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-6",
          initial: { opacity: 0, y: 20 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 1100 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h2${ssrRenderAttrs(mergeProps({
          class: "text-xl font-bold text-gray-800 dark:text-white mb-4",
          initial: { opacity: 0, x: -20 },
          enter: { opacity: 1, x: 0, transition: { duration: 500, delay: 1e3 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Recent Scores</h2>`);
        if (((_j = (_i = stats.value) == null ? void 0 : _i.recentScores) == null ? void 0 : _j.length) === 0) {
          _push(`<div${ssrRenderAttrs(mergeProps({
            class: "text-center py-4 text-gray-600 dark:text-gray-400",
            initial: { opacity: 0 },
            enter: { opacity: 1, transition: { duration: 500, delay: 1100 } }
          }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> No scores yet. Start playing to see your results! </div>`);
        } else {
          _push(`<div${ssrRenderAttrs(mergeProps({
            class: "overflow-x-auto",
            initial: { opacity: 0 },
            enter: { opacity: 1, transition: { duration: 500, delay: 1100 } }
          }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><table class="w-full"><thead><tr class="border-b border-gray-200 dark:border-gray-700"><th class="px-4 py-3 text-left text-gray-700 dark:text-gray-300">Date</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">WPM</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Accuracy</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Errors</th><th class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">Phrases</th></tr></thead><tbody><!--[-->`);
          ssrRenderList((_k = stats.value) == null ? void 0 : _k.recentScores, (score, index) => {
            _push(`<tr${ssrRenderAttrs(mergeProps({
              key: index,
              class: "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750",
              initial: { opacity: 0, y: 10 },
              enter: { opacity: 1, y: 0, transition: { duration: 300, delay: 1200 + index * 100 } }
            }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><td class="px-4 py-3 text-gray-800 dark:text-gray-200">${ssrInterpolate(formatDate(score.date))}</td><td class="px-4 py-3 text-right text-primary-600 dark:text-primary-400 font-bold">${ssrInterpolate(score.wpm)}</td><td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">${ssrInterpolate(score.accuracy)}%</td><td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">${ssrInterpolate(score.errors)}</td><td class="px-4 py-3 text-right text-gray-800 dark:text-gray-200">${ssrInterpolate(score.completedPhrases || 0)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "mt-4 text-center",
          initial: { opacity: 0, y: 10 },
          enter: { opacity: 1, y: 0, transition: { duration: 500, delay: 1500 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>`);
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          to: "/",
          class: "bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-xl transition-colors",
          initial: { scale: 1 },
          hover: { scale: 1.05, transition: { duration: 200 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Start Typing `);
            } else {
              return [
                createTextVNode(" Start Typing ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=dashboard-E6_BZcTE.js.map
