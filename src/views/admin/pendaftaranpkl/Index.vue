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
const store = useStore();
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import Popper from "../../../components/atoms/Popper.vue";
import ButtonDataOne from "../../../components/atoms/ButtonDataOne.vue";
const router = useRouter();
const route = useRoute();

const statusPendaftaran = ref(null);
const dataTempatPkl = ref([]);
const dataAnggota = ref([]);
const getData = async () => {
  try {
    const response = await Api.get("siswa/profile/pendaftaranpkl");
    // console.log(response);
    // data.value = response.data;
    statusPendaftaran.value = response.data;
    dataTempatPkl.value = response.tempatpkl;
    dataAnggota.value = response.anggota;
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
      <CardPemberitahuan
        title="Anda Belum mendaftar PKL!"
        ket="Lakukan pendaftaran Terlebih dahulu!"
        buttonTitle="Daftar Prakter Kerja Lapangan"
        button-link="MenuSiswaPendaftaranPklStep1"
        isButtonActive="false"
      >
        <template #body>
          <div class="py-3">
            <Button
              title="Daftar Praktek Kerja Lapangan"
              @click="doDaftar()"
            ></Button>
          </div>
        </template>
      </CardPemberitahuan>
    </div>

    <div
      v-else-if="
        statusPendaftaran == 'Proses Pemberkasan' ||
        statusPendaftaran == 'Proses Persetujuan'
      "
    >
      <CardProsesPemberkasan></CardProsesPemberkasan>
    </div>

    <div v-else-if="statusPendaftaran == 'Disetujui'">
      <CardPemberitahuan
        title="Proses Pendaftaran PKL Selesai!"
        ket="Jangan lupa untuk selalu mengisi Absensi dan jurnal!"
        buttonTitle="Pergi ke Menu Praktek Kerja Lapangan"
        button-link="MenuSiswaAbsensi"
      />

      <div class="grid grid-cols-1 xl:grid-cols-2">
        <CardCompany
          :title="dataTempatPkl.nama"
          tersedia="1"
          :jmlTersedia="dataAnggota.length"
          type="previewNoBtn"
        ></CardCompany>

        <div class="grid grid-cols-1">
          <DataTable>
            <template #body>
              <tr
                class="hover:bg-gray-100"
                v-for="(item, index) in dataAnggota"
              >
                <td class="p-4 w-4">
                  <div class="flex items-center">
                    <label>{{ index + 1 }}</label>
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
                      {{ item.nama }}
                    </div>
                    <div class="text-sm font-normal text-gray-500">
                      <p>{{ item.nomeridentitas }}</p>
                    </div>
                  </div>
                </td>
                <td
                  class="p-4 whitespace-nowrap text-base font-medium text-gray-900"
                >
                  {{ item.kelas }}
                </td>
                <td
                  class="p-4 whitespace-nowrap text-base font-medium text-gray-900"
                >
                  {{ item.jurusan }}
                </td>
              </tr></template
            ></DataTable
          >
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
