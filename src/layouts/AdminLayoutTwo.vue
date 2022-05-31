<script setup>
// library
import Api from "@/axios/axios.js";
import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
// component
import NavBar from "../components/template/NavBarTwo.vue";
import SideBar from "../components/template/SideBarTwo.vue";
import Footer from "../components/template/Footer.vue";
import Toast from "@/components/lib/Toast.js";

const store = useStore();
const router = useRouter();

const dataToken = computed(() => store.state.token);

const dataIsLogin = computed(() => store.state.isLogin);

function isLogin() {
  if (dataIsLogin.value) {
    // console.log('Anda sudah login!');
  } else {
    router.push({ name: "LandingSiswaLogin" });
    // console.log('Anda belum login!');
  }
}
// console.log(dataToken.value,dataIsLogin.value);

isLogin();

const data = ref("");
const dataAuth = ref({
  id: "0",
  name: "Nama User",
  nomeridentitas: "1",
  hakakses: "User",
});
const getData = async () => {
  try {
    const response = await Api.get("siswa/settings/get");
    // console.log(response);
    // data.value = response.data;
    data.value = response.data;
    let dk = "Kelas tidak ditemukan";

    if (response.dataAuth.kelasdetail) {
      dk = `${response.dataAuth.kelasdetail.kelas.tingkatan} ${response.dataAuth.kelasdetail.kelas.jurusan} ${response.dataAuth.kelasdetail.kelas.suffix}`;
    }
    dataAuth.value = {
      id: response.dataAuth.id,
      nama: response.dataAuth.nama,
      nomeridentitas: response.dataAuth.nomeridentitas,
      kelas: dk,
      hakakses: "Siswa",
    };
    // console.log(data.value);
    store.commit("setDataSettings", data.value);
    store.commit("setDataAuth", dataAuth.value);
    // console.log(getDataSettings.value);

    return response;
  } catch (error) {
    // Toast.danger("Warning", "Gagal memuat data settings Aplikasi");
    console.error(error);
  }
};

getData();
// periksa token asli/tidaknya(token expired) jika token tidak valid maka redirect ke landing page
</script>
<template>
  <!-- <div class="font-serif">
    <AdminHeader />
  </div> -->
  <div class="font-serif">
    <NavBar />
    <SideBar />

    <div class="flex overflow-hidden pt-16">
      <div
        class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      />
      <div
        id="main-content"
        class="w-full bg-base-200 min-h-screen relative overflow-y-auto lg:ml-96"
      >
        <main>
          <router-view />
          <!-- <Footer /> -->
        </main>
      </div>
    </div>
  </div>
  -
  <!-- <main class="container mx-w-6xl mx-auto font-serif">
    <router-view />
  </main> -->
</template>
