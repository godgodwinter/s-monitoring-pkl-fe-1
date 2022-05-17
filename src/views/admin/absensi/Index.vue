<script setup>
import Button from "../../../components/atoms/ButtonTwo.vue";
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const formatter = new Intl.DateTimeFormat("id", { month: "long" });
let dt = new Date();
let dateNow = dt.getDate();
let month = dt.getMonth();
let year = dt.getFullYear();
let monthLong = formatter.format(new Date(year, month));
// let daysInMonth = new Date(2022, 2, 0).getDate();
let daysInMonth = new Date(year, month, 0).getDate();
console.log(dt, month, year, daysInMonth);
// hari libur
// https://api-harilibur.vercel.app/api?month=5&year=2022
//modal
const isOpen = ref(false);
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
// table
const data = ref([]);
for (let i = 0; i < daysInMonth; i++) {
  data.value.push({
    id: i + 1,
    tanggal: `${i + 1} ${monthLong} ${year}`,
    kehadiran: "Hadir",
    jurnal: "Ada",
    status: "Diverifikasi",
  });
}
console.log(data.value);
</script>
<template>
  <!-- Modal -->

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-20">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Payment successful
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you an email
                  with all of the details of your order.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <!--  Modal-->
  <div class="px-3 py-3">
    <div class="w-full bg-white py-4 px-4 rounded-lg shadow-sm">
      <h3 class="font-bold text-lg">Memeriksa Data . . .</h3>
    </div>
  </div>
  <div
    class="w-full bg-white py-4 px-4 rounded-lg shadow-sm flex justify-center text-gray700"
  >
    <div>
      <h3 class="font-bold text-md text-center">Anda Belum Daftar!</h3>
      <p class="text-center">Lakukan pendaftaran terlebih dahulu!</p>
      <router-link :to="{ name: 'MenuSiswaPendaftaranPklStep1' }">
        <div class="py-3">
          <Button title="Daftar Praktek Kerja Lapangan"></Button></div
      ></router-link>
    </div>
  </div>
  <div class="py-2 px-2">
    <div class="w-full bg-white shadow-sm py-4 rounded-sm px-4 flex justify-center">
      <h1 class="font-semibold text-xl text-gray-700">Absensi</h1>
    </div>
  </div>

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
                      <label for="checkbox-all" class="sr-only">checkbox</label>
                    </div>
                  </th>
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
                    Nama
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
                  <td class="p-4 w-4">
                    {{ index + 1 }}
                  </td>
                  <td
                    class="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0"
                  >
                    <img
                      class="h-10 w-10 rounded-full"
                      src="@/assets/img/avatar/baemon-ava-2.jpg"
                      alt="Avatar 1"
                    />
                    <div class="text-sm font-normal text-gray-500">
                      <div class="text-base font-semibold text-gray-800">
                        {{ item.tanggal }}
                      </div>
                      <!-- <div class="text-sm font-normal text-gray-500">
                        <p>Keterangan</p>
                      </div> -->
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                    <div class="w-full flex gap-1">
                      <div class="text-teal-600 pt-1">Hadir</div>
                      <img
                        src="@/assets/img/flat/check-mark_2.png"
                        alt=""
                        class="h-8 w-8"
                      />
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                    <div class="w-full flex gap-1">
                      <div class="text-teal-600 pt-1">Ada</div>
                      <img
                        src="@/assets/img/flat/check-mark_2.png"
                        alt=""
                        class="h-8 w-8"
                      />
                    </div>
                  </td>
                  <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                    <div class="w-full flex gap-1">
                      <div class="text-teal-600 pt-1">Diverifikasi / Ditolak</div>

                      <img src="@/assets/img/flat/cancel.png" alt="" class="h-8 w-8" />
                    </div>
                  </td>

                  <td class="p-4 whitespace-nowrap space-x-2">
                    <div v-if="item.id == dateNow" class="space-x-2">
                      <button
                        @click="openModal"
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
                        Absen
                      </button>

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
                        Isi Jurnal
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
                        Batalkan
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
