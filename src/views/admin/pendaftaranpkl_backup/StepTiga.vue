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

              <CardCompany
                title="Nama Tempat Prakerin"
                tersedia="1"
                jmlTersedia="4/5"
                type="preview"
              ></CardCompany>

              <div class="grid grid-cols-1">
                <div class="flex flex-col py-4 md:py-1">
                  <div class="overflow-x-auto">
                    <div class="align-middle inline-block min-w-full">
                      <div class="shadow overflow-hidden">
                        <table class="table-fixed min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-100">
                            <tr>
                              <th scope="col" class="p-4">
                                <div class="flex items-center">
                                  <input
                                    id="checkbox-all"
                                    aria-describedby="checkbox-1"
                                    type="checkbox"
                                    class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                                  />
                                  <label for="checkbox-all" class="sr-only"
                                    >checkbox</label
                                  >
                                </div>
                              </th>
                              <th
                                scope="col"
                                class="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                              >
                                Nama
                              </th>
                              <th
                                scope="col"
                                class="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                              >
                                JURUSAN
                              </th>

                              <th scope="col" class="p-4"></th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr class="hover:bg-gray-100">
                              <td class="p-4 w-4">
                                <div class="flex items-center">
                                  <input
                                    id="checkbox-1"
                                    aria-describedby="checkbox-1"
                                    type="checkbox"
                                    class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                                  />
                                  <label for="checkbox-1" class="sr-only">checkbox</label>
                                </div>
                              </td>
                              <td
                                class="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0"
                              >
                                <img
                                  class="h-10 w-10 rounded-full"
                                  src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
                                  alt="Neil Sims avatar"
                                />
                                <div class="text-sm font-normal text-gray-500">
                                  <div class="text-base font-semibold text-gray-900">
                                    Neil Sims
                                  </div>
                                  <div class="text-sm font-normal text-gray-500">
                                    <a
                                      href="/cdn-cgi/l/email-protection"
                                      class="__cf_email__"
                                      data-cfemail="5c32393530722f35312f1c2b3532382f28392e723f3331"
                                      >[email&#160;protected]</a
                                    >
                                  </div>
                                </div>
                              </td>
                              <td
                                class="p-4 whitespace-nowrap text-base font-medium text-gray-900"
                              >
                                X TSM 1
                              </td>

                              <td class="p-4 whitespace-nowrap space-x-2">
                                <button
                                  type="button"
                                  data-modal-toggle="user-modal"
                                  class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                                >
                                  <svg
                                    class="mr-2 h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                                    ></path>
                                    <path
                                      fill-rule="evenodd"
                                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                  Edit user
                                </button>
                                <button
                                  type="button"
                                  data-modal-toggle="delete-user-modal"
                                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                                >
                                  <svg
                                    class="mr-2 h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                  Delete user
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
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
