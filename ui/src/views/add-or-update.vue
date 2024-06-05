<template>
  <div>
    <FormKitSchema :schema="formSchema" @submit="handleSubmit" />
    <table border="1">
      <thead>
        <tr>
          <th>表情包Key值</th>
          <th>表情包图像</th>
          <th>表情包地址</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emoji in emojis" :key="emoji.key">
          <td>{{ emoji.key }}</td>
          <td>
            <img :src="emoji.image" :alt="emoji.key" width="50" height="50" />
          </td>
          <td><a :href="emoji.action" target="_blank">下载</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { FormKitSchema } from "@formkit/vue";

export default defineComponent({
  components: {
    FormKitSchema,
  },
  setup() {
    const emojis = ref([]);

    const formSchema = [
      {
        $formkit: "form",
        props: {
          submitLabel: "添加表情包",
        },
        children: [
          {
            $formkit: "text",
            name: "key",
            label: "表情包Key值",
            validation: "required",
          },
          {
            $formkit: "text",
            name: "image",
            label: "表情包图像地址",
            validation: "required|url",
          },
          {
            $formkit: "text",
            name: "action",
            label: "表情包地址",
            validation: "required|url",
          },
          {
            $formkit: "submit",
            value: "提交",
          },
        ],
      },
    ];

    const handleSubmit = (formData) => {
      emojis.value.push(formData);
    };

    return {
      emojis,
      formSchema,
      handleSubmit,
    };
  },
});
</script>

<style>
/* 在此添加自定义样式 */
</style>
