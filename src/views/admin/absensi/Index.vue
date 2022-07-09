<script setup>
import ApiAbsensi from "@/services/api/apiAbsensi.js";
import fnValidasi from "@/components/lib/babengValidasi";
import Loading from "@/components/atoms/Loading1.vue";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Api from "@/axios/axios.js";
import { Field, Form } from "vee-validate";
import Button from "@/components/atoms/ButtonTwo.vue";
import { ref } from "vue";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
moment.updateLocale("id", localization);
const router = useRouter();
const route = useRoute();
const formatter = new Intl.DateTimeFormat("id", { month: "long" });
let dt = new Date();
let dateNow = dt.getDate();
let month = dt.getMonth();
let year = dt.getFullYear();
let monthLong = formatter.format(new Date(year, month));

const today = moment().format("DD MMMM YYYY");
// let daysInMonth = new Date(2022, 2, 0).getDate();
let daysInMonth = new Date(year, month, 0).getDate();
// console.log(dt, month, year, daysInMonth);
// hari libur
// https://api-harilibur.vercel.app/api?month=5&year=2022
//modal

// table
const data = ref([]);
// for (let i = 0; i < daysInMonth; i++) {
//   let tempData = {
//     id: i + 1,
//     libur: "ya",
//     tanggal: `${i + 1} ${monthLong} ${year}`,
//     kehadiran: "Hadir",
//     kehadiranCatatan: "-",
//     jurnal: "Ada",
//     jurnalCatatan: "-",
//     status: "Diverifikasi",
//     statusCatatan: "-",
//   };
//   if (i + 1 > parseInt(moment().format("Do"))) {
//     tempData.kehadiran = "-";
//     tempData.kehadiranCatatan = "Belum Absen";
//     tempData.jurnal = "-";
//     tempData.jurnalCatatan = "-";
//     tempData.status = "-";
//     tempData.statusCatatan = "-";
//   }
//   data.value.push(tempData);
// }
// console.log(data.value);
const dataDetail = ref({
  monthyear: {
    month: month,
    year: year,
  },
});

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

const dataForm = ref({
  label: "Hadir",
  bukti: null,
  alasan: "",
});

const dataFormJurnal = ref({
  label: "",
  file: null,
  alasan: "",
});

const onSubmitAbsensi = async (values) => {
  let formData = new FormData();
  // console.log(values);
  if (values.label == "Hadir") {
    formData.append("label", "Hadir");
  } else {
    formData.append("bukti", values.bukti ? values.bukti[0] : null);
    formData.append("alasan", values.alasan);
    formData.append("label", values.label);
  }
  let resSubmitAbsensi = await ApiAbsensi.doAbsenStore(formData);
  // console.log(resSubmitAbsensi);
  // Toast.babeng("Info", "Submit absensi");
  if (resSubmitAbsensi) {
    getDataAbsensi();
  }
};
const onSubmitJurnal = async (values) => {
  let formDataJurnal = new FormData();
  // console.log(values);
  formDataJurnal.append("label", "Hadir");
  formDataJurnal.append("file", values.file ? values.file[0] : null);
  formDataJurnal.append("alasan", values.alasan);
  formDataJurnal.append("label", values.label);
  let resSubmitAbsensi = await ApiAbsensi.doJurnalStore(formDataJurnal);
  // console.log(resSubmitAbsensi);
  // Toast.babeng("Info", "Submit absensi");
  if (resSubmitAbsensi) {
    getDataAbsensi();
  }
  // console.log(values);
  // dataFormJurnal
  // label
  // file
  // alasan

  // Toast.babeng("Info", "Submit Jurnal");
};

const onBatalkan = async () => {
  let resBatalkan = await ApiAbsensi.doBatalkan();
  if (resBatalkan) {
    getDataAbsensi();
  }
  // Toast.babeng("Info", "Submit Batalkan ");
};
const dataAbsensi = ref([]);
const getDataAbsensi = async (blnthn) => {
  // console.log(blnthn);
  dataAbsensi.value = await ApiAbsensi.getData(blnthn);
  data.value = dataAbsensi.value;
  // console.log(dataAbsensi.value);
  // console.log("get Data absensi");
};
getDataAbsensi();

const onChangeMonth = async () => {
  let month = "01";
  if (parseInt(dataDetail.value.monthyear.month) < 10) {
    month = "0" + (parseInt(dataDetail.value.monthyear.month) + 1);
  }
  let dateTerpilih = dataDetail.value.monthyear.year + "-" + month;
  let res = await getDataAbsensi(dateTerpilih);
  // console.log("====================================");
  console.log(dataDetail.value.monthyear);
  // console.log("====================================");
};
</script>
<template>
  <div v-if="statusPendaftaran == null">
    <Loading />
  </div>
  <div
    v-else-if="statusPendaftaran == 'Belum Daftar'"
    class="w-full bg-white py-4 px-4 rounded-lg shadow-sm flex justify-center text-gray700"
  >
    <div>
      <h3 class="font-bold text-md text-center">Anda Belum Daftar!</h3>
      <p class="text-center">Lakukan pendaftaran terlebih dahulu!</p>
      <router-link :to="{ name: 'MenuSiswaPendaftaranPkl' }">
        <div class="py-3">
          <Button title="Daftar Praktek Kerja Lapangan"></Button></div
      ></router-link>
    </div>
  </div>
  <div v-else-if="statusPendaftaran == 'Disetujui'">
    <div class="py-2 px-2">
      <div
        class="w-full bg-white shadow-sm py-4 rounded-sm px-4 flex justify-center"
      >
        <div class="py-2">
          <h1
            class="font-bold underline italic text-md text-gray-700 text-center"
          >
            Hari ini : {{ today }}
          </h1>
          <div class="flex justify-center">
            <div>
              <div class="py-2 flex gap-2">
                <Datepicker
                  format="yyyy/MM"
                  value-format="yyyy-MM"
                  v-model="dataDetail.monthyear"
                  monthPicker
                  required
                >
                  <template #calendar-header="{ index, day }">
                    <div :class="index === 5 || index === 6 ? 'red-color' : ''">
                      {{ day }}
                    </div>
                  </template>
                </Datepicker>
                <button class="btn btn-primary" @click="onChangeMonth">
                  PILIH
                </button>
              </div>
              <div class="space-x-2 space-y-2 flex justify-center flex-wrap">
                <div class="pt-2">
                  <!-- The button to open modal -->
                  <label
                    for="my-modal-absen"
                    class="btn btn-primary modal-button font-medium rounded-lg text-sm"
                    ><svg
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
                    Absen</label
                  >

                  <!-- Put this part before </body> tag -->
                  <input
                    type="checkbox"
                    id="my-modal-absen"
                    class="modal-toggle"
                  />
                  <label for="my-modal-absen" class="modal cursor-pointer">
                    <label class="modal-box w-11/12 max-w-5xl relative" for="">
                      <h3 class="text-lg font-bold text-center">
                        Kehadiran tanggal {{ today }}
                      </h3>

                      <Form v-slot="{ errors }" @submit="onSubmitAbsensi">
                        <div class="px-10">
                          <div
                            class="py-4 space-x-2 space-y-2 flex flex-wrap w-full justify-center"
                          >
                            <div class="w-1/3 py-2">
                              <Field
                                :rules="fnValidasi.validateData2"
                                v-model="dataForm.label"
                                name="label"
                                class="select select-bordered w-11/12"
                                as="select"
                              >
                                <option disabled selected>Pilih ?</option>
                                <option value="Hadir">Hadir</option>
                                <option value="Ijin">Ijin</option>
                                <option value="Sakit">Sakit</option>
                              </Field>

                              <div class="text-xs text-red-600 mt-1">
                                {{ errors.label }}
                              </div>
                            </div>
                            <div
                              class="w-1/3"
                              v-if="dataForm.label && dataForm.label != 'Hadir'"
                            >
                              <label for="file" class
                                >Bukti :
                                <code class="text-red-600 text-sm">
                                  *) .jpg/.pdf/.doc/.docx
                                </code></label
                              >
                              <Field
                                v-model="dataForm.bukti"
                                name="bukti"
                                v-slot="{ handleChange, handleBlur }"
                              >
                                <input
                                  :rules="fnValidasi.validateData2"
                                  type="file"
                                  @change="handleChange"
                                  @blur="handleBlur"
                                />
                              </Field>
                              <div class="text-xs text-red-600 mt-1">
                                {{ errors.bukti }}
                              </div>
                            </div>
                            <div
                              class="w-2/3"
                              v-if="dataForm.label && dataForm.label != 'Hadir'"
                            >
                              <label for="file" class>Catatan : </label>

                              <Field
                                :rules="fnValidasi.validateData2"
                                v-model="dataForm.alasan"
                                v-slot="{ field }"
                                name="alasan"
                                type="text"
                                class="input input-bordered w-11/12"
                              >
                                <textarea
                                  v-bind="field"
                                  class="textarea textarea-bordered w-11/12 h-24"
                                  placeholder="Catatan"
                                ></textarea>
                              </Field>
                              <div class="text-xs text-red-600 mt-1">
                                {{ errors.alasan }}
                              </div>
                            </div>
                          </div>
                          <div class="w-full flex justify-end">
                            <button class="btn btn-primary">Simpan</button>
                          </div>
                        </div>
                      </Form>
                    </label>
                  </label>
                </div>
                <div>
                  <!-- The button to open modal -->
                  <label
                    for="my-modal-jurnal"
                    class="btn btn-success modal-button font-medium rounded-lg text-sm"
                    ><svg
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
                    Isi Jurnal</label
                  >

                  <!-- Put this part before </body> tag -->
                  <input
                    type="checkbox"
                    id="my-modal-jurnal"
                    class="modal-toggle"
                  />
                  <label for="my-modal-jurnal" class="modal cursor-pointer">
                    <label class="modal-box w-11/12 max-w-5xl relative" for="">
                      <h3 class="text-lg font-bold text-center">
                        Jurnal tanggal {{ today }}
                      </h3>
                      <Form v-slot="{ errors }" @submit="onSubmitJurnal">
                        <div class="px-10">
                          <div
                            class="py-4 space-x-2 space-y-2 flex flex-wrap w-full justify-center"
                          >
                            <div class="w-1/3 py-2">
                              <label for="file" class>Judul : </label>
                              <Field
                                :rules="fnValidasi.validateData2"
                                v-model="dataFormJurnal.label"
                                name="label"
                                type="text"
                                class="input input-bordered w-11/12"
                              />

                              <div class="text-xs text-red-600 mt-1">
                                {{ errors.label }}
                              </div>
                            </div>
                            <div class="w-1/3">
                              <label for="file" class
                                >File :
                                <code class="text-red-600 text-sm">
                                  *) .jpg/.pdf/.doc/.docx
                                </code></label
                              >
                              <Field
                                v-model="dataFormJurnal.file"
                                name="file"
                                v-slot="{ handleChange, handleBlur }"
                              >
                                <input
                                  :rules="fnValidasi.validateData2"
                                  type="file"
                                  @change="handleChange"
                                  @blur="handleBlur"
                                />
                              </Field>
                              <div class="text-xs text-red-600 mt-1">
                                {{ errors.file }}
                              </div>
                            </div>
                            <div class="w-2/3">
                              <label for="file" class>Catatan : </label>
                              <Field
                                :rules="fnValidasi.validateData2"
                                v-model="dataFormJurnal.alasan"
                                v-slot="{ field }"
                                name="alasan"
                                type="text"
                                class="input input-bordered w-11/12"
                              >
                                <textarea
                                  v-bind="field"
                                  class="textarea textarea-bordered w-11/12 h-24"
                                  placeholder="Catatan"
                                ></textarea>
                              </Field>
                              <div class="text-xs text-red-600 mt-1">
                                {{ errors.alasan }}
                              </div>
                            </div>
                          </div>
                          <div class="w-full flex justify-end">
                            <button class="btn btn-primary">Simpan</button>
                          </div>
                        </div>
                      </Form>
                    </label>
                  </label>
                </div>
                <button
                  type="button"
                  data-modal-toggle="delete-user-modal"
                  class="btn btn-danger modal-button font-medium rounded-lg text-sm"
                  @click="onBatalkan()"
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
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1">
      <div class="flex flex-col py-4 md:py-1">
        <div class="overflow-x-auto">
          <div class="align-middle inline-block min-w-full">
            <div class="shadow overflow-hidden">
              <table
                class="table table-compact min-w-full divide-y divide-gray-200"
              >
                <thead class="bg-gray-100">
                  <tr>
                    <!-- <th scope="col" class="p-4">
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
                    </th> -->
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Kehadiran
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Jurnal
                    </th>

                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th scope="col" class="p-4"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    class="hover:bg-gray-100"
                    v-for="(item, index) in data"
                    :key="data.id"
                  >
                    <!-- <td class="p-4 w-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-1"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                        />
                        <label for="checkbox-1" class="sr-only">checkbox</label>
                      </div>
                    </td> -->
                    <td class="p-4 w-4">
                      {{ index + 1 }}
                    </td>
                    <td
                      class="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0"
                    >
                      <div class="text-sm font-normal text-gray-500">
                        <div class="text-base font-semibold text-gray-800">
                          {{ moment(item.tanggal).format("DD MMMM YYYY") }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-base font-medium text-gray-900"
                    >
                      <div class="w-full flex gap-1">
                        <div class="text-teal-600 pt-1">
                          <!-- The button to open modal -->
                          <label
                            :for="item.id"
                            class="shadow border-2 rounded-lg font-medium text-sm capitalize"
                          >
                            {{ item.kehadiran }} -
                            {{ item.kehadiranStatus }}</label
                          >
                        </div>
                      </div>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-base font-medium text-gray-900"
                    >
                      <div class="w-full flex gap-1">
                        <div class="text-teal-600 pt-1">
                          <label
                            :for="'jurnal-' + item.id"
                            class="shadow border-2 rounded-lg font-medium text-sm capitalize"
                          >
                            {{ item.jurnal }} - {{ item.jurnalStatus }}</label
                          >
                        </div>
                        <!-- <img
                          src="@/assets/img/flat/check-mark_2.png"
                          alt=""
                          class="h-8 w-8"
                        /> -->
                      </div>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-base font-medium text-gray-900"
                    >
                      <div class="w-full flex gap-1">
                        <div class="text-teal-600 pt-1">
                          {{ item.status }}
                        </div>

                        <!-- <img
                          src="@/assets/img/flat/cancel.png"
                          alt=""
                          class="h-8 w-8"
                        /> -->
                      </div>
                    </td>

                    <td class="p-4 whitespace-nowrap space-x-2">
                      <div v-if="item.id == dateNow" class="space-x-2"></div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-for="(item, index) in data" :key="data.id">
                <!-- Put this part before </body> tag -->
                <input type="checkbox" :id="item.id" class="modal-toggle" />
                <label :for="item.id" class="modal cursor-pointer">
                  <label class="modal-box relative" for="">
                    <h3 class="text-lg font-bold">
                      CATATAN :
                      <a
                        :href="item.kehadiranBukti"
                        target="_blank"
                        v-if="
                          item.kehadiran != 'Hadir' && item.kehadiran != null
                        "
                      >
                        <span class="btn btn-primary">Download </span></a
                      >
                    </h3>
                    <p class="py-4">
                      {{ item.kehadiranCatatan }}
                    </p>
                  </label>
                </label>

                <input
                  type="checkbox"
                  :id="'jurnal-' + item.id"
                  class="modal-toggle"
                />
                <label :for="'jurnal-' + item.id" class="modal cursor-pointer">
                  <label class="modal-box relative" for="">
                    <h3 class="text-lg font-bold">
                      DETAIL JURNAL :
                      <a :href="item.jurnalFile" target="_blank">
                        <span class="btn btn-primary">Download </span></a
                      >
                    </h3>
                    <p class="py-4">
                      {{ item.jurnalCatatan }}
                    </p>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
