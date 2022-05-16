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
import VuePdfEmbed from "vue-pdf-embed";
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
const doSubmit = () => {
  Toast.success("Info", "Data berhasil disimpan!");
};
let embedSrc = ref();
function handleChange() {
  embedSrc.value = URL.createObjectURL(event.target.files[0]);
}
let pdfSource =
  "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";
</script>
<template>
  <div class="px-3 py-3">
    <CardStepPendaftaranVue step="3" />

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
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Status</div>
                <div class="px-4 py-2">
                  <span
                    class="bg-orange-400 py-2 px-2 rounded-lg text-white font-bold text-sm"
                    >Menunggu Acc</span
                  >
                </div>
              </div>

              <div v-if="dataTempatPkl.label">
                <CardCompany
                  title="Nama Tempat Prakerin"
                  tersedia="1"
                  jmlTersedia="4/5"
                  type="preview"
                ></CardCompany>
              </div>

              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Download Lembar Pengantar PKL</div>
                <div class="px-4 py-2">
                  <Popper content="Download Lembar Ijin PKL">
                    <template #content>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-slate-500 hover:text-slate-800 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        /></svg
                    ></template>
                  </Popper>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Download Lembar Ijin PKL</div>
                <div class="px-4 py-2">
                  <Popper content="Download Lembar Ijin PKL">
                    <template #content>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-slate-500 hover:text-slate-800 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        /></svg
                    ></template>
                  </Popper>
                </div>
              </div>

              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">
                  Download Balasan dari Tempat PKL
                </div>
                <div class="px-4 py-2">
                  <Popper content="Download Lembar Ijin PKL">
                    <template #content>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-slate-500 hover:text-slate-800 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        /></svg
                    ></template>
                  </Popper>
                </div>
              </div>
              <div class="grid grid-cols-1">
                <div class="px-4 py-2 font-semibold">Preview PDF</div>
                <vue-pdf-embed :source="embedSrc" v-if="embedSrc" />
                <div class="shadow shadow-lg h-48" id="previewpdf" v-else />
              </div>
            </div>

            <div class="flex justify-end py-4 px-4">
              <div class="flex space-x-4 mb-6 text-sm font-medium">
                <div class="flex-auto flex space-x-4">
                  <button
                    class="h-10 px-6 font-semibold rounded-md bg-emerald-500 text-white"
                    type="submit"
                    v-if="dataTempatPkl.label"
                    @click="doSubmit()"
                  >
                    Simpan dan Lanjutkan Proses
                  </button>

                  <button
                    class="h-10 px-6 font-semibold rounded-md bg-gray-400 text-gray-200"
                    type="submit"
                    v-else
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
