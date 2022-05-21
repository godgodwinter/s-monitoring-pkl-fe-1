<script setup>
import Loading from "../../../components/atoms/Loading1.vue";
import CardStepPendaftaranVue from "../../../components/organismes/pendaftaranpkl/CardStepPendaftaran.vue";
import CardCompany from "../../../components/atoms/CardCompanySatu.vue";
import Button from "../../../components/atoms/ButtonTwo.vue";
import InputCari from "../../../components/atoms/InputCari.vue";
import CardPemberitahuan from "../../../components/moleculars/CardPemberitahuan1.vue";
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

const doStoreData = async () => {
  let dataStore = {
    tempatpkl: stateTempatPKlSelected.value,
  };
  try {
    const response = await Api.post("siswa/pendaftaranpkl/pengajuanpkl/store", dataStore);
    Toast.success("Success", "Data Berhasil ditambahkan!");

    doClearLS();
    router.push({ name: "MenuSiswaPendaftaranPkl" });
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
// clearLocalStorage
const doClearLS = async () => {
  localStorage.setItem("dataTempatPklSelected", JSON.stringify([]));
};

const doSubmit = async () => {
  doStoreData();
  // router.push({ name: "MenuSiswaPendaftaranPklStep2" });
};

let statusPendaftaran = ref(null);
let inputCari = ref("");
let inputTersedia = ref({
  label: "Tersedia",
  id: "Tersedia",
});
let tempatPKLAsli = ref([]);
let tempatPKL = ref([]);

// 1. loadPilihanTempatPKL
const getPilihanTempatPKL = async () => {
  try {
    const response = await Api.get(
      `siswa/pendaftaranpkl/getdatatempatpkl?cari=${inputCari.value}&tersedia=${
        inputTersedia.value ? inputTersedia.value.label : ""
      }`
    );
    // data.value = response.data;
    tempatPKLAsli.value = response.data;
    tempatPKL.value = response.data;
    // console.log(response.data);
  } catch (error) {
    Toast.danger("Warning", "Data gagal dimuat");
    console.error(error);
  }
};
getPilihanTempatPKL();
// 2. load PengajuanTempatPklKu

const getData = async () => {
  try {
    const response = await Api.get("siswa/profile/pendaftaranpkl");
    // console.log(response);
    // data.value = response.data;
    statusPendaftaran.value = response.data;
    if (statusPendaftaran.value == `Proses Pengajuan Tempat PKL`) {
    } else if (statusPendaftaran.value == `Proses Penempatan PKL`) {
    }

    return response;
  } catch (error) {
    Toast.danger("Warning", "Data gagal dimuat");
    console.error(error);
  }
};
getData();
// a.jika sudah ada maka tampikan menu menunggu dan informasi data pengajuan ku
// b. jika belum maka dapat mengisi dan submit pengajuan tempat pkl

const doCari = async () => {
  getPilihanTempatPKL();
};

const stateTempatPKlSelected = computed(function () {
  return store.state.tempatPklSelected;
});
const dataTempatPklSelectedLS = ref([]);
// getDataFromLocalStorage
const getDataFromLocalStorage = async () => {
  let datas = localStorage.getItem("dataTempatPklSelected");
  if (datas) {
    dataTempatPklSelectedLS.value = JSON.parse(datas);
  } else {
    dataTempatPklSelectedLS.value = [];
  }
  store.commit("setTempatPklSelected", dataTempatPklSelectedLS.value);
};
getDataFromLocalStorage();

// setItem Localstorage
const dataPengajuanPKL = ref([]);
// proses waiting penempatanTempatPKL
const getPengajuanPkl = async () => {
  try {
    const response = await Api.get("siswa/pendaftaranpkl/pengajuanpkl/get");
    dataPengajuanPKL.value = response.data
      ? response.data.pendaftaranprakerin_pengajuansiswa
      : [];
    console.log(dataPengajuanPKL.value);
    // data.value = response.data;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data gagal dimuat");
    console.error(error);
  }
};
getPengajuanPkl();
</script>
<template>
  <div class="px-3 py-3" v-if="statusPendaftaran == null">
    <div>
      <Loading />
    </div>
  </div>

  <div class="px-3 py-3" v-else-if="statusPendaftaran == 'Proses Penempatan PKL'">
    <CardPemberitahuan
      title="Anda Sudah Mengisi Data Pengajuan Tempat PKL!"
      ket="Tunggu Proses Penempatan Tempat PKL oleh admin!"
      buttonTitle="Daftar Prakter Kerja Lapangan"
      button-link="MenuSiswaPendaftaranPklStep1"
      :isButtonActive="false"
    />

    <div class="grid grid-cols-1 xl:grid-cols-2">
      <div v-for="(item, index) in dataPengajuanPKL" :key="item.id">
        <CardCompany
          :title="item.tempatpkl.nama"
          :alamat="item.tempatpkl.alamat"
          tersedia="1"
          jmlTersedia="1/1"
          type="previewNoBtn"
        ></CardCompany>
      </div>
      <!-- <CardCompany
        title="Nama Tempat Prakerin 2"
        tersedia="1"
        jmlTersedia="4/5"
        type="preview"
      ></CardCompany> -->
    </div>
  </div>
  <div class="px-3 py-3" v-else-if="statusPendaftaran == 'Proses Pengajuan Tempat PKL'">
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
            <span class="tracking-wide">Form Pengajuan Tempat PKL</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Pilih Tempat Prakerin 1</div>
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
                <div class="px-4 py-2 font-semibold">Pilih Tempat Prakerin 2</div>
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
                    >Belum Daftar</span
                  >
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-2">
              <div v-for="(item, index) in stateTempatPKlSelected" :key="item.id">
                <CardCompany
                  :index="index"
                  :title="item.title"
                  :alamat="item.alamat"
                  :tersedia="item.tersedia"
                  :jmlTersedia="item.jmlTersedia"
                  type="preview"
                ></CardCompany>
              </div>
              <!-- <div v-if="dataTempatPkl.label">
                <CardCompany
                  title="Nama Tempat Prakerin"
                  tersedia="1"
                  jmlTersedia="4/5"
                  type="preview"
                ></CardCompany>
              </div> -->
            </div>

            <div class="flex justify-end py-4 px-4">
              <div class="flex space-x-4 mb-6 text-sm font-medium">
                <div class="flex-auto flex space-x-4">
                  <button
                    class="h-10 px-6 font-semibold rounded-md bg-emerald-500 text-white"
                    type="submit"
                    v-if="stateTempatPKlSelected.length >= 2"
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
              v-model="inputTersedia"
              v-bind:class="{ disabled: false }"
            ></v-select>
            <!-- <InputCari v-model="inputCari"></InputCari> -->
            <div>
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
                    v-model="inputCari"
                    @keyup="doCari()"
                    type="search"
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
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="doCari()"
            >
              Pencarian
            </button>
          </div>
          <div class="text-gray-700">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2 text-sm">
              <!-- <img src="@/assets/img/photo/company-1.jpg" alt="company-1.jpg" /> -->

              <div v-for="(item, index) in tempatPKL" :key="item.id">
                <CardCompany
                  :id="item.id"
                  :title="item.nama"
                  :alamat="item.alamat"
                  :tersedia="item.tersedia"
                  :jmlTersedia="item.terisi + '/' + item.kuota"
                ></CardCompany>
              </div>
              <!-- <div v-for="n in 10">
                <CardCompany
                  title="Nama Tempat Prakerin"
                  :tersedia="randomAngka()"
                  :jmlTersedia="randomAngka()"
                ></CardCompany>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-0 py-4">
      <div class="px-2 py-2 grid grid-cols-1 bg-white w-full rounded-sm shadow-md">
        <div class="py-6 text-gray-600">
          <div class="font-semibold text-md">Catatan :</div>
          <ol class="list-disc px-6">
            <li>Pilihan Tempat PKL di atas belum tentu langsung di terima!</li>
            <li>
              Pilihan Tempat PKL di atas digunakan sebagai referensi untuk menentukan
              proses penempatan tempat PKL!
            </li>
            <li>Proses Penempatan PKL dilakukan Administrator!</li>
          </ol>
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
