<script setup>
import Button from "../../../components/atoms/ButtonTwo.vue";
let dt = new Date();
let month = dt.getMonth();
let year = dt.getFullYear();
// let daysInMonth = new Date(2022, 2, 0).getDate();
let daysInMonth = new Date(year, month, 0).getDate();
console.log(dt, month, year, daysInMonth);
// hari libur
// https://api-harilibur.vercel.app/api?month=5&year=2022
</script>
<template>
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
                      <div class="text-base font-semibold text-gray-900">Neil Sims</div>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-2 px-2">
    <div class="bg-white p-3 shadow-sm rounded-sm">
      <div class="grid grid-cols-2">
        <div>
          <div
            class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
          >
            <span clas="text-green-500">
              <svg
                class="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            <span class="tracking-wide">Kehadiran</span>
          </div>
          <ul class="list-inside space-y-2">
            <li>
              <div class="w-full flex gap-1">
                <div class="text-teal-600 pt-1">Hadir</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
                <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
              </div>
              <div class="text-gray-500 text-xs">05 Januari 2022</div>
            </li>
            <li>
              <div class="w-full flex gap-1">
                <div class="text-teal-600 pt-1">Hadir</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
                <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                <img src="@/assets/img/flat/cancel.png" alt="" class="h-8 w-8" />
              </div>
              <div class="text-gray-500 text-xs">04 Januari 2022</div>
            </li>
            <li>
              <div class="w-full flex gap-1">
                <div class="text-teal-600 pt-1">Hadir</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
                <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
              </div>
              <div class="text-gray-500 text-xs">03 Januari 2022</div>
            </li>
          </ul>
        </div>
        <div>
          <div
            class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
          >
            <span clas="text-green-500">
              <svg
                class="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                  fill="#fff"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </span>
            <span class="tracking-wide">Jurnal</span>
          </div>
          <ul class="list-inside space-y-2">
            <li>
              <div class="w-full flex gap-1">
                <div class="text-teal-600 pt-1">Lihat Detail</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
                <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
              </div>
              <div class="text-gray-500 text-xs">05 Januari 2022</div>
            </li>
            <li>
              <div class="w-full flex gap-1">
                <div class="text-teal-600 pt-1">Lihat Detail</div>
                <img src="@/assets/img/flat/cancel.png" alt="" class="h-8 w-8" />
                <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                <img src="@/assets/img/flat/cancel.png" alt="" class="h-8 w-8" />
              </div>
              <div class="text-gray-500 text-xs">04 Januari 2022</div>
            </li>
            <li>
              <div class="w-full flex gap-1">
                <div class="text-teal-600 pt-1">Lihat Detail</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
                <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
              </div>
              <div class="text-gray-500 text-xs">03 Januari 2022</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
