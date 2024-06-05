import { definePlugin } from "@halo-dev/console-shared";
import HomeView from "./views/HomeView.vue";
import { IconPlug } from "@halo-dev/components";
import { markRaw } from "vue";
import emoticon from "./extensions/extension";
import EventHandler from "./extensions/EventHandler";
import "@formkit/themes/genesis";
export default definePlugin({
  components: {},
  routes: [
    {
      parentName: "Root",
      route: {
        path: "/example",
        name: "Example",
        component: HomeView,
        meta: {
          title: "表情包插件",
          searchable: true,
          menu: {
            name: "表情包插件",
            group: "插件",
            icon: markRaw(IconPlug),
            priority: 0,
          },
        },
      },
    },
  ],
  extensionPoints: {
    "default:editor:extension:create": () => {
      return [emoticon, EventHandler];
    },
  },
});
