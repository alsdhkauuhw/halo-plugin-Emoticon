<template>
  <div>
    <FormKit
      type="file"
      label="Documents"
      accept=".pdf,.doc,.docx,.xml,.md,.csv"
      help="Select as many documents as you would like."
      file-item-icon="email"
    />
    <VModal :layer-closable="false">
      <FilterDropdown v-model="value" label="排序" :items="items" />
      <AnnotationsForm
        ref="annotationsFormRef"
        :value="currentAnnotations"
        kind="Post"
        group="content.halo.run"
      />
      <UppyUpload
        endpoint="/apis/api.console.halo.run/v1alpha1/attachments/upload"
        :meta="{
          policyName: policyName,
          groupName: groupName,
        }"
      />
      <VButton v-bind="{default:'Button',type:'default'}">添加</VButton>
      <FormKit v-model="data" type="form">
        <FormKitSchema :schema="formSchema" @submit="handleSubmit" />
      </FormKit>
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
            <td>{{ emoji.action }}</td>
          </tr>
        </tbody>
      </table>
    </VModal>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { FormKitSchema } from "@formkit/vue";
/* import { AnnotationsForm, VButton } from "@halo-dev/components"; */
import "@formkit/themes/genesis"
export default defineComponent({
  components: {
    FormKitSchema,
  },
  setup() {
    const emojis = ref([]);
    const policyName = ref("my-test-policy");
    const groupName = ref("my-test-group");
    const value = ref("");
    const items = [
      {
        label: "最近创建",
        value: "creationTimestamp,desc",
      },
      {
        label: "较晚创建",
        value: "creationTimestamp,asc",
      },
    ];
    const formSchema = {
      $formkit: "form",
      props: {
        submitLabel: "添加表情包",
      },
      children: [
        {
          $formkit: "text",
          name: "key",
          label: "Key",
          validation: "required",
        },
        {
          $formkit: "file",
          name: "image",
          label: "表情包",
          accept: ".png, .jpg, .gif",
          help: "Select as many picture as you would like",
          multiple: "true",
          validation: "required",
        },
        {
          $formkit: "submit",
          value: "提交",
        },
      ],
    };

    async function handleSubmit(formData) {
      annotationsFormRef.value?.handleSubmit();
      await nextTick();
      const {
        customAnnotations,
        annotations,
        customFormInvalid,
        specFormInvalid,
      } = annotationsFormRef.value || {};
      // 表单验证不通过
      if (customFormInvalid || specFormInvalid) {
        return;
      }
      // 合并自定义数据和表单提供的数据
      const newAnnotations = {
        ...annotations,
        ...customAnnotations,
      };
      emojis.value.push(formData);
    }
    return {
      emojis,
      formSchema,
      handleSubmit,
      items,
      value,
      groupName,
      policyName,
    };
  },
});
</script>

<style>
/* 在此添加自定义样式 */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
