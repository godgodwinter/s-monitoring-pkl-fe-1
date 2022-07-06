<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();

const isSideBarActive = computed(() => store.state.isSideBarActive);
const getDataSettings = computed(() => store.state.dataSettings);
const getDataAuth = computed(() => store.state.dataAuth);
// console.log(isSideBarActive.value);
async function goLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
  router.go();
}
</script>
<template>
  <aside
    :class="{ hidden: !isSideBarActive }"
    id="sidebar"
    class="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 lg:w-96 transition-width duration-75"
    aria-label="Sidebar"
  >
    <div
      class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0"
    >
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-1 px-3 bg-white divide-y space-y-1">
          <ul
            class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-2 justify-center"
          >
            <li class="bg-white lg:w-full">
              <div class="flex gap-2 items-center justify-center">
                <img
                  src="@/assets/img/avatar/baemon-ava-2.jpg"
                  alt=""
                  class="rounded-full w-20 h-20 object-cover"
                />
                <div>
                  <p class="text-gray-500 text-md font-semibold">
                    {{ getDataAuth.nama }}
                  </p>
                  <p class="text-gray-500 text-sm font-medium">
                    {{ getDataAuth.nomeridentitas }}
                  </p>
                  <p class="text-gray-500 text-xs font-medium mt-2">
                    {{ getDataAuth.kelas }}
                  </p>
                  <p class="text-gray-500 text-xs font-light mt-2">
                    {{ getDataAuth.hakakses }}
                  </p>
                </div>
              </div>
            </li>
            <li class="bg-white lg:w-1/2">
              <button
                @click="goLogout()"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group border border-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-sm">Logout </span>
              </button>
            </li>
          </ul>
          <ul
            class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between"
          >
            <li class="bg-white lg:w-1/2 py-2">
              <router-link
                :to="{ name: 'MenuSiswaDashboard' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                <span class="ml-3">Dashboard </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2 py-0">
              <router-link
                :to="{ name: 'MenuSiswaProfile' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Profile </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'MenuSiswaPendaftaranPkl' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path
                    d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
                  />
                </svg>
                <span class="ml-3">Daftar PKL </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'MenuSiswaDashboard' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">PKL </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'MenuSiswaAbsensi' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Absensi </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'MenuSiswaJurnal' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Jurnal </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'MenuSiswaDashboard' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Pemberitahuan </span>
              </router-link>
            </li>
          </ul>
          <div class="space-y-2 pt-10">
            <Link
              to="/about"
              class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M1.999 1v7.269l-2 1.456v13.275h24.001v-13.275l-2.001-1.453v-7.272h-20zm1 11.234v-10.234h18v10.233l-9 5.766-9-5.765zm19 .54v-3.17l1.001.764v11.632h-22.001v-11.641l1-.707.063 3.134 9.937 6.413 10-6.425zm-14.305-6.752l-2.694.496 1.888 1.986-.361 2.716 2.472-1.182 2.473 1.182-.361-2.716 1.888-1.986-2.695-.496-1.305-2.41-1.305 2.41zm.248 2.139l-.945-.994 1.349-.249.653-1.206.654 1.206 1.349.249-.945.994.18 1.36-1.238-.591-1.238.591.181-1.36zm6.058-3.078h4.999v-1h-4.999v1zm0 2h4.999v-1h-4.999v1zm0 2h4.999v-1h-4.999v1zm0 2h3v-1h-3v1z"
                />
              </svg>
              <span class="ml-3">Documentation</span>
            </Link>
            <a
              href="#"
              class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
            >
              <svg
                class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                />
              </svg>
              <span class="ml-3">Components</span>
            </a>
            <a
              href="#"
              class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
            >
              <svg
                class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ml-3">Help</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
