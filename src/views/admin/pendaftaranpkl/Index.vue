<script setup>
import CardStepPendaftaranVue from "../../../components/organismes/pendaftaranpkl/CardStepPendaftaran.vue";
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
const getData = async () => {
  try {
    const response = await Api.get("siswa/profile/pendaftaranpkl");
    // console.log(response);
    // data.value = response.data;
    statusPendaftaran.value = response.data;
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
            <Button title="Daftar Praktek Kerja Lapangan" @click="doDaftar()"></Button>
          </div>
        </template>
      </CardPemberitahuan>
    </div>

    <div v-else-if="statusPendaftaran == 'Disetujui'">
      <CardPemberitahuan
        title="Proses Pendaftaran PKL Selesai!"
        ket="Jangan lupa untuk selalu mengisi Absensi dan jurnal!"
        buttonTitle="Pergi ke Menu Praktek Kerja Lapangan"
        button-link="MenuSiswaPendaftaranPklStep1"
      />

      <div class="grid grid-cols-1 xl:grid-cols-2">
        <CardCompany
          title="Nama Tempat Prakerin 1"
          tersedia="1"
          jmlTersedia="4/5"
          type="preview"
        ></CardCompany>

        <div class="grid grid-cols-1">
          <DataTable>
            <template #body>
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
                    <div class="text-base font-semibold text-gray-900">Neil Sims</div>
                    <div class="text-sm font-normal text-gray-500">
                      <p>1234</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">
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
