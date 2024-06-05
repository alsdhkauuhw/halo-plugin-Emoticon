import { createApp, defineComponent, h, markRaw } from "vue";
import EmojiPicker from "@/components/EmojiPicker.vue";

export function showEmojiPicker(view: any, from: any, to: any, isBar: boolean) {
  const emojiPicker = markRaw(EmojiPicker);

  const pickerInstance = document.createElement("div");
  pickerInstance.style.position = "absolute";
  const { left, top } = view.coordsAtPos(from);
  pickerInstance.style.left = `${left}px`;
  pickerInstance.style.top = `${top}px`;
  pickerInstance.style.zIndex = "1000"; // Ensure picker is on top

  document.body.appendChild(pickerInstance);

  const pickerApp = createApp({
    render() {
      return h(emojiPicker, {
        emojis: [
          { key: "smile", icon: "😀", group: "emoji" },
          { key: "laugh", icon: "😂", group: "emoji" },
          { key: "heart_eyes", icon: "😍", group: "emoji" },
          { key: "cool", icon: "😎", group: "emoji" },
          { key: "cry", icon: "😭", group: "emoji" },
          { key: "angry", icon: "😡", group: "emoji" },
        ],
        onSelect: (emoji) => {
          const { tr } = view.state;
          if (isBar) {
            console.log(111);
            const pos = Math.min(from, view.state.doc.content.size);
            tr.insertText(emoji.icon, pos);
          } else {
            console.log(222);
            to = to + 1;
            tr.replaceRangeWith(from, to, view.state.schema.text(emoji.icon));
          }
          view.dispatch(tr);
          view.focus();
          destroyPicker();
        },
        onRemove: (emoji) => {
          // 移除表情的逻辑
          console.log("3333")
        },
      });
    },
  });
  pickerApp.mount(pickerInstance);

  function handleOutsideClick(event: any) {
    if (!pickerInstance.contains(event.target)) {
      destroyPicker();
    }
  }

  function handleCursorMove() {
    destroyPicker();
  }

  document.addEventListener("mousedown", handleOutsideClick);
  view.dom.addEventListener("mousedown", handleOutsideClick);
  view.dom.addEventListener("keydown", handleCursorMove);

  function destroyPicker() {
    pickerApp.unmount();
    document.body.removeChild(pickerInstance);
    document.removeEventListener("mousedown", handleOutsideClick);
    view.dom.removeEventListener("mousedown", handleOutsideClick);
    view.dom.removeEventListener("keydown", handleCursorMove);
  }
  return destroyPicker;
}
