<script setup>
import Button from "../atoms/ButtonTwo.vue";
const props = defineProps({
  title: { type: String, required: false, default: "Title" },
  ket: { type: String, required: false, default: "Ket" },
  buttonTitle: { type: String, required: false, default: "Button Title" },
  buttonLink: { type: String, required: false, default: null },
  isButtonActive: { type: String, required: false, default: true },
});
</script>
<template>
  <div>
    <div
      class="w-full bg-white py-4 px-4 rounded-lg shadow-sm flex justify-center text-gray700"
    >
      <div>
        <h3 class="font-bold text-md text-center">{{ props.title }}</h3>
        <p class="text-center">{{ props.ket }}</p>
        <div v-if="isButtonActive">
          <router-link :to="{ name: props.buttonLink }" v-if="buttonLink">
            <div class="py-3">
              <Button :title="props.buttonTitle"></Button></div
          ></router-link>

          <div class="py-3" v-else>
            <Button :title="props.buttonTitle"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
