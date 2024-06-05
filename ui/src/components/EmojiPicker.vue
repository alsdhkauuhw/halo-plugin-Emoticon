<template>
  <div class="emoji-picker">
    <div class="emoji-groups">
      <button
        v-for="group in groupedEmojis"
        :key="group.name"
        @click="currentGroup = group.name"
        :class="{ active: currentGroup === group.name }"
      >
        {{ group.name }}
      </button>
      <!-- <button @click="addGroup" class="add-group">+</button> -->
    </div>
    <div class="emoji-list">
      <div class="emoji-items">
        <div
          v-for="emoji in currentEmojis"
          :key="emoji.key"
          @click="selectEmoji(emoji)"
          @contextmenu.prevent="removeEmoji(emoji)"
          class="emoji-item"
        >
          <!-- <img :src="emoji.icon" alt="emoji" /> -->
          {{ emoji.icon }}
          <input type="checkbox" v-model="selectedEmojis" :value="emoji.key" />
        </div>
      </div>
    </div>
    <div class="emoji-settings">
      <button @click="openSettings">设置</button>
    </div>
  </div>
</template>

<script>
/* import { formKit } from "@formkit/vue";
import { add } from "@formkit/icons"; */
export default {
  props: {
    emojis: Array,
    onSelect: Function,
    onRemove: Function,
    onAddGroup: Function,
    onOpenSettings: Function,
  },
  data() {
    return {
      currentGroup: "Emoji",
    };
  },
  computed: {
    groupedEmojis() {
      const emojiGroups = {
        Emoji: [],
        Custom: [],
      };
      this.emojis.forEach((emoji) => {
        if (emoji.group === "Custom") {
          emojiGroups.Custom.push(emoji);
        } else {
          emojiGroups.Emoji.push(emoji);
        }
      });
      return [
        { name: "Emoji", emojis: emojiGroups.Emoji },
        { name: "Custom", emojis: emojiGroups.Custom },
      ];
    },
    currentEmojis() {
      return this.groupedEmojis.find(
        (group) => group.name === this.currentGroup
      ).emojis;
    },
  },
  methods: {
    selectEmoji(emoji) {
      this.onSelect(emoji);
    },
    removeEmoji(emoji) {
      this.onRemove(emoji);
    },
    addGroup() {
      this.onAddGroup();
    },
    openSettings() {
      this.onOpenSettings();
    },
    importEmojis() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.extractEmojisFromZip(file);
      }
    },
    async extractEmojisFromZip(file) {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);
      const newEmojis = [];
      const currentGroup = this.currentGroup;
      
      zipContent.forEach(async (relativePath, file) => {
        if (!file.dir) {
          const fileData = await file.async('base64');
          const imageUrl = `data:image/png;base64,${fileData}`;
          const emojiKey = relativePath.split('/').pop().split('.')[0];
          newEmojis.push({ key: emojiKey, icon: imageUrl, group: currentGroup });
        }
      });
      
      this.$emit('addEmojis', newEmojis);
    },
    async exportEmojis() {
      const zip = new JSZip();
      const folder = zip.folder("emojis");

      this.emojis.forEach(emoji => {
        const base64Data = emoji.icon.split(',')[1]; // Extract base64 data
        folder.file(`${emoji.key}.png`, base64Data, { base64: true });
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "emojis.zip");
    },
  },
};
  },
};
</script>

<style>
.emoji-picker {
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.emoji-groups {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.emoji-groups button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #f0f0f0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.emoji-groups button.active {
  background-color: #d0d0d0;
  font-weight: bold;
  text-decoration: underline;
}

.emoji-groups .add-group {
  background-color: #d0d0d0;
  font-weight: bold;
  color: #fff;
}

.emoji-list {
  max-height: 200px;
  overflow-y: auto;
}

.emoji-items {
  display: flex;
  flex-wrap: wrap;
}

.emoji-item {
  margin: 5px;
  cursor: pointer;
}

.emoji-settings {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.emoji-settings button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #d0d0d0;
  border-radius: 5px;
}
</style>
