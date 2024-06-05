import { showEmojiPicker } from "@/extensions/showEmojiPicker";
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { createApp, defineComponent, h, markRaw } from "vue";
import EmojiPicker from "@/components/EmojiPicker.vue";
let destroyPicker: (() => void) | null = null;
const EventHandler = Extension.create({
  name: "eventHandler",
  priority: 30,
  addProseMirrorPlugins() {
    const plugin = new Plugin({
      key: new PluginKey("eventHandler"),
      props: {
        handleTextInput: (view, from, to, text) => {
          if (text === "/") {
            const isBar = false
            destroyPicker = showEmojiPicker(view, from, to, isBar);
            //return true; // Prevent default text input behavior
          }
          return false;
        },
      },
    });

    return [plugin];
  },
});

export default EventHandler;
