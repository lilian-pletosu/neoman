<template>
    <div class="container border">
        <QuillEditor v-model:content="value" :content-type="'html'"
                     :content="value" theme="snow"/>
    </div>
</template>

<script setup>
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const value = defineModel();

</script>
<!--<template>-->
<!--    <div class="">-->
<!--        <Editor v-model="value" :pt="value" :pt-options="value" editorStyle="height: 320px"/>-->
<!--    </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import Editor from 'primevue/editor';-->

<!--const value = defineModel();-->
<!--const props = defineProps({-->
<!--    modelValue: "paralel"-->
<!--})-->

<!--</script>-->
