<script setup>
import CardStepPendaftaranVue from "../../../components/organismes/pendaftaranpkl/CardStepPendaftaran.vue";
import CardProsesPemberkasan from "../../../components/organismes/pendaftaranpkl/CardProsesPemberkasan.vue";
import CardCompany from "../../../components/atoms/CardCompanySatu.vue";
import Loading from "../../../components/atoms/Loading1.vue";
import Button from "../../../components/atoms/ButtonTwo.vue";
import CardPemberitahuan from "../../../components/moleculars/CardPemberitahuanSlot1.vue";
import DataTable from "../../../components/moleculars/DataTable1.vue";
import Api from "@/axios/axios.js";
import { useStore } from "vuex";
import { computed } from "vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import Popper from "../../../components/atoms/Popper.vue";
import ButtonDataOne from "../../../components/atoms/ButtonDataOne.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const store = useStore();
const router = useRouter();
const route = useRoute();

const statusPendaftaran = ref(null);
const dataTempatPkl = ref([]);
const dataAnggota = ref([]);
const pembimbinglapangan = ref([]);
const pembimbingsekolah = ref([]);
const getData = async () => {
  try {
    const response = await Api.get("siswa/profile/pendaftaranpkl");
    // console.log(response);
    // data.value = response.data;
    statusPendaftaran.value = response.data;
    dataTempatPkl.value = response.tempatpkl;
    dataAnggota.value = response.anggota;
    pembimbingsekolah.value = response.pembimbingsekolah;
    pembimbinglapangan.value = response.pembimbinglapangan;
    if (
      statusPendaftaran.value == `Proses Pengajuan Tempat PKL` ||
      statusPendaftaran.value == `Proses Penempatan PKL`
    ) {
      router.push({ name: "MenuSiswaPendaftaranPklStep1" });
    }

    return response;
  } catch (error) {
    Toast.danger("Warning", "Data gagal dimuat");
    console.error(error);
  }
};

getData();

// const dataSiswa = ref([]);
// const dataAsli = ref([]);
// const tempatpkl = ref([]);
// const anggota = ref([]);
// const status = ref([]);
// const id = ref(0);
// const getDataId = async () => {
//   try {
//     const response = await Api.get(`guru/datasiswa/profile/${id.value}`);
//     // console.log(response.data);
//     dataSiswa.value = response.data.siswa;
//     tempatpkl.value = response.data.tempatpkl;
//     anggota.value = response.data.anggota;
//     status.value = response.data.status;
//     dataAsli.value = response.data;
//     // console.log(dataSiswa.value, tempatpkl.value, anggota.value, status.value);
//     // dataDetail.value.siswa.label = ` ${dataAsli.value.nama} `;
//     // dataSiswa.value.kelas = ` ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix} `;
//     return response;
//   } catch (error) {
//     Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
//     console.error(error);
//   }
// };
// getDataId();

const doDaftar = async () => {
  try {
    const response = await Api.post(`siswa/pendaftaranpkl/daftar`, {
      // nama: d.nama,
    });
    Toast.success("Info", response.data);
    router.push({ name: "MenuSiswaPendaftaranPklStep1" });
  } catch (error) {
    Toast.danger("Warning", "Data gagal dimuat");
    console.error(error);
  }
};
</script>
<template>
  <div class="px-3 py-3">
    <div v-if="statusPendaftaran == null">
      <Loading />
    </div>

    <div v-else-if="statusPendaftaran == 'Belum Daftar'">
      <CardPemberitahuan title="Anda Belum mendaftar PKL!" ket="Lakukan pendaftaran Terlebih dahulu!"
        buttonTitle="Daftar Prakter Kerja Lapangan" button-link="MenuSiswaPendaftaranPklStep1" isButtonActive="false">
        <template #body>
          <div class="py-3">
            <Button title="Daftar Praktek Kerja Lapangan" @click="doDaftar()"></Button>
          </div>
        </template>
      </CardPemberitahuan>
    </div>

    <div v-else-if="
      statusPendaftaran == 'Proses Pemberkasan' ||
      statusPendaftaran == 'Proses Persetujuan'
    ">
      <CardProsesPemberkasan></CardProsesPemberkasan>
    </div>

    <div v-else-if="statusPendaftaran == 'Disetujui'">
      <CardPemberitahuan title="Proses Pendaftaran PKL Selesai!"
        ket="Jangan lupa untuk selalu mengisi Absensi dan jurnal!" buttonTitle="Pergi ke Menu Praktek Kerja Lapangan"
        button-link="MenuSiswaAbsensi" />

      <div class="bg-base-100 p-4 m-4">
        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span clas="text-green-500">
            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          <span class="tracking-wide">Prakerin</span>
        </div>
        <div class="text-gray-700">
          <div class="grid md:grid-cols-2 text-sm">
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Tempat PKL</div>
              <div class="px-4 py-2">{{ dataTempatPkl.nama }}</div>
            </div>
            <div class="grid grid-cols-2">
              <!-- <div class="px-4 py-2 font-semibold">Tempat PKL</div> -->
              <!-- <div class="px-4 py-2">{{ dataTempatPkl.nama }}</div> -->
            </div>
            <!-- <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Status Prakerin</div>
            <div class="px-4 py-2">
              {{ status }}
            </div>
          </div> -->
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Tanggal Mulai</div>
              <div class="px-4 py-2">{{ moment(dataTempatPkl.tgl_mulai).format("DD MMMM YYYY") }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Tanggal Selesai</div>
              <div class="px-4 py-2">{{ moment(dataTempatPkl.tgl_selesai).format("DD MMMM YYYY") }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pembimbing Lapangan</div>
              <div class="px-4 py-2">{{ pembimbinglapangan?.nama }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pembimbing Lapangan Telp</div>
              <div class="px-4 py-2"> {{ pembimbinglapangan.telp }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pembimbing Sekolah</div>
              <div class="px-4 py-2">{{ pembimbingsekolah?.nama }}</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pembimbing Sekolah Telp</div>
              <div class="px-4 py-2"> {{ pembimbingsekolah.telp }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-1">
        <!-- <CardCompany :title="dataTempatPkl.nama" tersedia="1" :jmlTersedia="dataAnggota.length" type="previewNoBtn">
        </CardCompany> -->
        <!-- <div class="card w-96 bg-base-100 shadow-xl">
          <figure><img src="http://127.0.0.1:3000/img/photo/company-2.jpg" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ dataTempatPkl.nama }}
              <div class="badge badge-secondary">NEW</div>
            </h2>
            <div class="divider"></div>
            <p>{{ dataTempatPkl.desc }}</p>
            <p>{{ dataTempatPkl.alamat }}</p>
            <div class="card-actions justify-end">
              <div class="badge badge-outline">Anggota : {{ dataAnggota.length }}</div>
              <div class="badge badge-outline">Products</div>
            </div>
            <div class="divider"></div>
            Pembimbing
            {{ pembimbingsekolah }}
          </div>
        </div> -->


        <div class="grid grid-cols-1">
          <DataTable>
            <template #body>
              <tr class="hover:bg-gray-100" v-for="(item, index) in     dataAnggota">
                <td class="p-4 w-4">
                  <div class="flex items-center">
                    <label>{{ index + 1 }}</label>
                  </div>
                </td>
                <td class="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                  <img class="h-10 w-10 rounded-full"
                    src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil Sims avatar" />
                  <div class="text-sm font-normal text-gray-500">
                    <div class="text-base font-semibold text-gray-900">
                      {{ item.nama }}
                    </div>
                    <div class="text-sm font-normal text-gray-500">
                      <p>{{ item.nomeridentitas }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {{ item.kelas }}
                </td>
                <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {{ item.jurusan }}
                </td>
              </tr>
            </template>
          </DataTable>
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
