// eslint-disable-next-line vue/multi-word-component-names
<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import extension from "@/extensions/extension";

const editor = useEditor({
  content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  extensions: [StarterKit, extension],
});
</script>
