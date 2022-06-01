<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios";
import VuePdfEmbed from "vue-pdf-embed";
import Toast from "@/components/lib/Toast.js";

const store = useStore();
const router = useRouter();

const isSideBarActive = computed(() => store.state.isSideBarActive);
const getDataSettings = computed(() => store.state.dataSettings);
const getDataAuth = computed(() => store.state.dataAuth);

// console.log(getDataAuth.value.id);
const data = ref([]);
const columns = [
  {
    label: "No",
    field: "no",
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  // {
  //   label: "Actions",
  //   field: "actions",
  //   sortable: false,
  //   width: "50px",
  //   tdClass: "text-center",
  //   thClass: "text-center",
  // },
  {
    label: "Nama",
    field: "nama",
    type: "String",
  },
  {
    label: "NIS",
    field: "nomeridentitas",
    type: "String",
  },
  {
    label: "Kelas",
    field: "kelas",
    type: "String",
  },
];
const siswa_id = getDataAuth.value.id;
const dataTempatPkl = ref([]);
const dataSiswa = ref([]);
const dataAnggota = ref();
const fileBerkas = ref();
// idsekolah
const getData = async () => {
  try {
    const response = await Api.get(`siswa/profile/pendaftaranpkl`);
    dataTempatPkl.value = response.tempatpkl;
    data.value = response.anggota;
    // console.log(dataSiswa.value);
    fileBerkas.value = response.file;
    return response;
  } catch (error) {
    console.error(error);
  }
};
getData();
const doDelSiswa = (index) => {
  data.value.splice(index, 1);
  setSiswa(data.value);
};

let embedSrc = ref();
function handleChange() {
  embedSrc.value = URL.createObjectURL(event.target.files[0]);
}
let pdfSource =
  "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

const file = ref(null);
let formData = new FormData();
const doStoreData = async (d) => {
  // console.log(data);
  try {
    // const response = await Api.post("testing/apiprobk/upload", formData);
    const response = await Api.post(
      `siswa/pendaftaranpkl/uploadberkas`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(response.data);
    Toast.success("Success", "Data Berhasil upload!");
    getData();
    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const doSubmitFile = async () => {
  formData.append("file", file.value.files[0]);
  doStoreData();
};
</script>
<template>
  <div class="py-2">
    <div class="card bg-base-100 py-2 shadow shadow-sm">
      <article class="prose py-4 px-10">
        <h1 v-if="fileBerkas">Proses Persetujuan</h1>
        <h1 v-else>Proses Pemberkasan</h1>
      </article>
      <ul class="steps steps-vertical lg:steps-horizontal py-4">
        <li class="step step-primary">Daftar</li>
        <li class="step step-primary">Pengajuan Tempat PKL</li>
        <li class="step step-primary">Menunggu Penempatan Tempat PKL</li>
        <li
          class="step"
          :class="{
            'step-secondary': fileBerkas == null,
            'step-primary': fileBerkas,
          }"
        >
          <p
            data-tip="Proses Saat ini"
            class="tooltip tooltip-left"
            v-if="fileBerkas == null"
          >
            Pemberkasan
          </p>
          <p v-else>Pemberkasan</p>
        </li>
        <li class="step" :class="{ 'step-secondary': fileBerkas }">
          <p v-if="fileBerkas == null">Menunggu Acc</p>
          <p data-tip="Proses Saat ini" class="tooltip tooltip-left" v-else>
            Menunggu Acc
          </p>
        </li>
      </ul>
    </div>
  </div>

  <div class="card bg-base-100 py-4">
    <div class="flex flex-wrap py-4 w-full">
      <div class="w-full 2xl:w-4/12 py-6 md:px-6">
        <div class="card w-8/12 bg-base-100 shadow-xl mx-auto">
          <figure>
            <img src="@/assets/img/photo/company-1.jpg" alt="Shoes" />
            <!-- <img
              src="https://api.lorem.space/image/shoes?w=400&h=225"
              alt="Shoes"
            /> -->
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ dataTempatPkl.nama }}
              <!-- <div class="badge badge-secondary">NEW</div> -->
            </h2>
            <p>{{ dataTempatPkl.alamat }}</p>
            <!-- <div class="card-actions justify-end">
              <div class="badge badge-outline">Tersedia</div>
              <div class="badge badge-outline">Tidak Tersedia</div>
              <div class="badge badge-outline">cccc</div>
            </div> -->
          </div>
        </div>

        <!-- <CardCompany></CardCompany> -->
      </div>
      <div class="w-full md:w-8/12">
        <div class="card-actions justify-end lg:px-6 py-2">
          <!-- The button to open modal -->
          <label for="my-modal-4" class="btn modal-button">Upload Berkas</label>

          <!-- The button to open modal -->
          <router-link
            :to="{ name: 'MenuSiswaPendaftaranPklCetakPermohonan' }"
            target="_blank"
          >
            <button class="btn btn-primary btn-primary-content">
              Download Surat Permohonan
            </button></router-link
          >
          <router-link
            :to="{ name: 'MenuSiswaPendaftaranPklCetakPersetujuan' }"
            target="_blank"
          >
            <button class="btn btn-primary btn-primary-content">
              Download Surat Persetujuan
            </button>
          </router-link>
        </div>
        <div class="w-full py-2 px-6 mx-auto">
          <div>
            <vue-good-table
              :columns="columns"
              :rows="data"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                perPageDropdown: [10, 20, 50],
              }"
              styleClass="vgt-table striped bordered condensed"
              class="py-0"
            >
              <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                  <div
                    class="text-sm font-medium text-center flex justify-center"
                  >
                    <!-- <ButtonDelete @click="doDelSiswa(index)" /> -->
                  </div>
                </span>

                <span v-else-if="props.column.field == 'no'">
                  <div class="text-center">{{ props.index + 1 }}</div>
                </span>

                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative w-full lg:w-4/12 max-w-5xl" for="">
      <h3 class="text-lg font-bold">Upload Berkas!</h3>
      <p class="text-sm italic">Upload berkas surat balasan dari tempat PKL.</p>
      <p class="text-sm italic">
        Hanya perlu salah 1 siswa untuk mengupload surat balasah dari tempat
        PKL.
      </p>
      <p class="text-sm italic">max 2MB ; ext:.pdf / jpg .</p>
      <div class="flex justify-center flex-wrap">
        <div class="px-4 py-2 font-semibold w-full text-center">
          Preview PDF
        </div>
        <vue-pdf-embed :source="embedSrc" v-if="embedSrc" />
        <div class="shadow shadow-lg h-48" id="previewpdf" v-else></div>
      </div>
      <div class="flex flex-wrap justify-center">
        <div class="card w-96 bg-base-100 shadow-sm">
          <div class="card-body">
            <input
              type="file"
              ref="file"
              @change="handleChange"
              class="input w-full max-w-xs"
            />
            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="doSubmitFile()">
                Upload dan Lanjutkan Proses
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="fileBerkas" class="flex flex-col justify-center">
          <p class="text-red-400 text-sm italic text-center">
            Berkas sudah diupload! Tunggu proses selanjutnya.
          </p>
          <a target="_blank" :href="fileBerkas">
            <button class="btn btn-accent btn-sm btn-accent-content">
              Lihat Berkas
            </button></a
          >
        </div>
        <p class="text-red-400 text-sm italic text-center" v-else>
          Berkas Belum diupload!
        </p>
      </div>
    </label>
  </label>
  <!-- <input type="checkbox" id="my-modal-5" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
      <p class="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
      <div class="modal-action">
        <label for="my-modal-5" class="btn">Yay!</label>
      </div>
    </div>
  </div> -->
</template>
