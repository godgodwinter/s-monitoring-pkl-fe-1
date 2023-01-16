import { createRouter, createWebHistory } from "vue-router";
// layouts
import LandingLayout from "../layouts/LandingLayout.vue";
import AdminLayout from "../layouts/AdminLayoutTwo.vue";
// pages
import NotFound from "../views/NotFound.vue";
import LandingIndex from "../views/landing/LandingIndex.vue";
import LandingSiswa from "../views/landing/LandingSiswa.vue";
import LandingSiswaLogin from "../views/landing/LandingSiswaLogin.vue";
import LandingPengawasLapangan from "../views/landing/LandingPengawasLapangan.vue";
import LandingPengawasSekolah from "../views/landing/LandingPengawasSekolah.vue";

//admin
import SiswaDashboard from "../views/admin/Dashboard.vue";
//profile
import MenuSiswaProfileIndex from "../views/admin/profile/Index.vue";
//pendaftaranPkl
import MenuSiswaPendaftaranPklIndex from "../views/admin/pendaftaranpkl/Index.vue";
import MenuSiswaPendaftaranPklCetakPermohonan from "../views/admin/pendaftaranpkl/CetakSuratPermohonan.vue";
import MenuSiswaPendaftaranPklCetakPersetujuan from "../views/admin/pendaftaranpkl/CetakSuratPersetujuan.vue";
import MenuSiswaPendaftaranPklStepSatu from "../views/admin/pendaftaranpkl/StepSatu.vue";
import MenuSiswaPendaftaranPklStepDua from "../views/admin/pendaftaranpkl/StepDua.vue";
import MenuSiswaPendaftaranPklStepTiga from "../views/admin/pendaftaranpkl/StepTiga.vue";
//absensi
import MenuSiswaAbsensiIndex from "../views/admin/absensi/Index.vue";
//jurnal
import MenuSiswaJurnalIndex from "../views/admin/jurnal/Index.vue";

//cetak
import MenuSiswaCetakTesting from "../views/admin/cetak/Testing.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingLayout,
    redirect: "/siswa/login",
    children: [
      {
        path: "/",
        name: "LandingIndex",
        component: LandingIndex,
        redirect: "/siswa/login",
      },
      {
        path: "/siswa",
        name: "LandingSiswa",
        component: LandingSiswa,
        redirect: "/siswa/login",
      },
      {
        path: "/siswa/login",
        name: "LandingSiswaLogin",
        component: LandingSiswaLogin,
      },
      {
        path: "/pengawaslapangan",
        name: "LandingPengawasLapangan",
        component: LandingPengawasLapangan,
      },
      {
        path: "/pengawassekolah",
        name: "LandingPengawasSekolah",
        component: LandingPengawasSekolah,
      },
      {
        path: "/404",
        name: "NotFound",
        component: NotFound,
      },
    ],
  },
  {
    path: "/siswapages",
    name: "PagesSiswa",
    component: AdminLayout,
    redirect: "/",
    meta: {
      requireAuth: true,
      title: "Admin",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/pages/admin/home",
        goto: "AdminLayout",
      },
    },
    children: [
      {
        path: `admin/home`,
        name: `admin-dashboard`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Beranda",
            path: `admin/home`,
            goto: `admin-dashboard`,
          },
        },
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
      },
      {
        path: `admin/pengumuman/detail/:id`,
        name: `admin-pengumuman-detail`,
        meta: {
          title: "Pengumuman",
          icon: "mdi-home",
          breadcrumb: {
            name: "Pengumuman",
            path: `admin/pengumuman/detail/:id`,
            goto: `admin-pengumuman-detail`,
          },
        },
        component: () => import("@/views/admin/dashboard/PengumumanDetail.vue"),
      },
      {
        path: `admin/hasilpkl`,
        name: `admin-hasilpkl-index`,
        meta: {
          title: "Hasil PKL",
          icon: "mdi-home",
          breadcrumb: {
            name: "Hasil PKL",
            path: `admin/hasilpkl`,
            goto: `admin-hasilpkl-index`,
          },
        },
        component: () => import("@/views/admin/hasilpkl/HasilpklIndex.vue"),
      },
      // {
      //   path: "/pages/siswa",
      //   name: "PagesSiswaIndex",
      //   component: SiswaDashboard,
      // },

      {
        path: "/pages/siswa",
        name: `PagesSiswaIndex`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Beranda",
            path: `pages/siswa`,
            goto: `PagesSiswaIndex`,
          },
        },
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
      },
      {
        path: `pages/siswa`,
        name: `SiswaDashboard`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Beranda",
            path: `pages/siswa`,
            goto: `SiswaDashboard`,
          },
        },
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
      },
      {
        path: `pages/siswa`,
        name: `MenuSiswaDashboard`,
        meta: {
          title: "Profile",
          icon: "mdi-home",
          breadcrumb: {
            name: "Beranda",
            path: `pages/siswa`,
            goto: `MenuSiswaDashboard`,
          },
        },
        component: () => import("@/views/admin/dashboard/DashboardIndex.vue"),
      },
      // {
      //   path: "/pages/siswa",
      //   name: "AdminDashboard",
      //   component: SiswaDashboard,
      // },
      // {
      //   path: "/pages/siswa",
      //   name: "MenuSiswaDashboard",
      //   component: SiswaDashboard,
      // },
      {
        path: "/pages/siswa/profile",
        name: "MenuSiswaProfile",
        component: MenuSiswaProfileIndex,
      },
      {
        path: "/pages/siswa/pendaftaranpkl",
        name: "MenuSiswaPendaftaranPkl",
        component: MenuSiswaPendaftaranPklIndex,
      },
      {
        path: "/pages/siswa/datapendaftaranpkl/cetak/suratpermohonan",
        name: "MenuSiswaPendaftaranPklCetakPermohonan",
        component: MenuSiswaPendaftaranPklCetakPermohonan,
      },
      {
        path: "/pages/siswa/datapendaftaranpkl/cetak/suratpersetujuan",
        name: "MenuSiswaPendaftaranPklCetakPersetujuan",
        component: MenuSiswaPendaftaranPklCetakPersetujuan,
      },
      {
        path: "/pages/siswa/pendaftaranpkl/step1",
        name: "MenuSiswaPendaftaranPklStep1",
        component: MenuSiswaPendaftaranPklStepSatu,
      },
      {
        path: "/pages/siswa/pendaftaranpkl/step2",
        name: "MenuSiswaPendaftaranPklStep2",
        component: MenuSiswaPendaftaranPklStepDua,
      },
      {
        path: "/pages/siswa/pendaftaranpkl/step3",
        name: "MenuSiswaPendaftaranPklStep3",
        component: MenuSiswaPendaftaranPklStepTiga,
      },
      {
        path: "/pages/siswa/absensi",
        name: "MenuSiswaAbsensi",
        component: MenuSiswaAbsensiIndex,
      },
      {
        path: "/pages/siswa/jurnal",
        name: "MenuSiswaJurnal",
        component: MenuSiswaJurnalIndex,
      },
    ],
  },
  {
    path: "/cetak/testing",
    name: "MenuSiswaCetakTesting",
    component: MenuSiswaCetakTesting,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
