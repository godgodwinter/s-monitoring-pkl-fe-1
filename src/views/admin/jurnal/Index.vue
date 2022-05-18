<script setup>
// import { useRoute } from "vue-router";
// const route = useRoute();
</script>
<template>
  <div class="px-3 py-3">
    <div class="w-full bg-white py-4 px-4 rounded-lg shadow-sm">
      <h3 class="font-bold text-lg">Memeriksa Data . . .</h3>
    </div>
  </div>
  <div class="py-2 px-2">
    <div class="w-full bg-white shadow-sm py-4 rounded-sm px-4 flex justify-center">
      <div>
        <h1 class="font-semibold text-xl text-gray-700 text-center">Jurnal</h1>
        <router-link :to="{ name: 'MenuSiswaCetakTesting' }">
          <button class="py-2 px-2 bg-slate-400 text-slate-50 rounded-lg">
            Cetak Testing
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>
