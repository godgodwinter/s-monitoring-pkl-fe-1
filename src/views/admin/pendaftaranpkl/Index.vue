<script setup>
import CardStepPendaftaranVue from "../../../components/organismes/pendaftaranpkl/CardStepPendaftaran.vue";
import CardCompany from "../../../components/atoms/CardCompanySatu.vue";
import Api from "@/axios/axios.js";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import Popper from "../../../components/atoms/Popper.vue";
const router = useRouter();
const route = useRoute();
let statusPerusahaan = [
  {
    label: "Semua Data",
    id: "Semua Data",
  },
  {
    label: "Tersedia",
    id: "Tersedia",
  },
  {
    label: "Tidak Tersedia",
    id: "Tidak Tersedia",
  },
];
const PencarianSettings = ref({
  statusPerusahaan: { label: "Tersedia", id: "Tersedia" },
});
let randomAngka = () => {
  return Math.floor(Math.random() * 4);
};
const dataTempatPkl = computed(() => {
  return store.state.tempatPklSelected;
});

const doPilihTempatPkl = (label = "", id = "") => {
  dataTempatPkl.value.label = label;
  dataTempatPkl.value.id = id;
};

let dataTempatPklSelected = { id: "", label: "" };
const doBatal = () => {
  dataTempatPklSelected.id = "";
  dataTempatPklSelected.label = "";
  store.commit("seTempatPklSelected", dataTempatPklSelected);
};
</script>
<template>
  <div class="px-3 py-3">
    <CardStepPendaftaranVue />

    <div class="pt-2">
      <div class="bg-white p-3 shadow-sm rounded-sm">
        <!-- About Section -->
        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </span>
            <span class="tracking-wide">Form Data PKL dan Pembimbing</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Pilih Tempat Prakerin</div>
                <div class="px-4 py-2">
                  <p class="text-gray-400 font-bold">
                    {{ dataTempatPkl.label ? dataTempatPkl.label : "Belum memilih" }}
                    <span
                      class="text-gray-200 bg-gray-400 py-1 px-1 rounded-lg ml-2"
                      v-if="dataTempatPkl.label"
                      @click="doBatal()"
                      >X</span
                    >
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Status</div>
                <div class="px-4 py-2">
                  <span
                    class="bg-orange-400 py-2 px-2 rounded-lg text-white font-bold text-sm"
                    >Menunggu</span
                  >
                </div>
              </div>
            </div>
            <div class="flex justify-end py-4 px-4">
              <div class="flex space-x-4 mb-6 text-sm font-medium">
                <div class="flex-auto flex space-x-4">
                  <button
                    class="h-10 px-6 font-semibold rounded-md bg-black text-white"
                    type="submit"
                  >
                    Simpan dan Lanjutkan Proses
                  </button>
                  <!-- <button
                    class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                    type="button"
                  >
                    Reset
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-2">
      <div class="bg-white p-3 shadow-sm rounded-sm">
        <!-- About Section -->
        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </span>
            <span class="tracking-wide">Cari Tempat Prakerin</span>
          </div>
          <div class="flex flex-col md:flex-row justify-center gap-2">
            <v-select
              class="py-2 px-3 w-72 mx-auto md:mx-0"
              :options="statusPerusahaan"
              v-model="PencarianSettings.statusPerusahaan"
              v-bind:class="{ disabled: false }"
            ></v-select>
            <div class="w-full md:w-72 pt-4 md:pt-2 mx-auto md:mx-0">
              <div class="relative">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari ..."
                  required
                />
                <!-- <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Pencarian
                </button> -->
              </div>
            </div>
          </div>
          <div class="text-gray-700">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2 text-sm">
              <!-- <img src="@/assets/img/photo/company-1.jpg" alt="company-1.jpg" /> -->

              <div v-for="n in 10">
                <CardCompany
                  title="Nama Tempat Prakerin"
                  :tersedia="randomAngka()"
                  :jmlTersedia="randomAngka()"
                ></CardCompany>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.disabled {
  pointer-events: none;
  color: #bfcbd9;
  cursor: not-allowed;
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
</style>
