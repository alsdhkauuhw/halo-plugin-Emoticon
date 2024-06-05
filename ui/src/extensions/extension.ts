//import type { Editor } from "@tiptap/core";
import type { ExtensionOptions } from "@/type/ToolbarItem";
import { markRaw } from "vue";
import { showEmojiPicker } from "./showEmojiPicker";
import MdiEmoticonHappyOutline from "~icons/mdi/emoticon-happy-outline";
import {
  ToolbarItem,
  Node,
  type Editor,
  type Range,
} from "@halo-dev/richtext-editor";
const emoticon = Node.create<ExtensionOptions>({
  name: "emoticon",

  inline() {
    return true;
  },

  group() {
    return "inline";
  },

  addOptions() {
    return {
      ...this.parent?.(),
      getToolbarItems({ editor }: { editor: Editor }) {
        return [
          {
            priority: 50,
            component: markRaw(ToolbarItem),
            props: {
              editor,
              isActive: editor.isActive("emoticon"),
              icon: markRaw(MdiEmoticonHappyOutline),
              title: "表情包",
              action: () => {
                const { from, to } = editor.view.state.selection;
                const isBar = true
                showEmojiPicker(editor.view, from, to, isBar);
              },
            },
          },
        ];
      },
    };
  },
});
export default emoticon;
