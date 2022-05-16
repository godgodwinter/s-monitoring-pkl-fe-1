import { createRouter, createWebHistory } from 'vue-router';
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
import AdminLayout from '../layouts/AdminLayoutTwo.vue';
// pages
import NotFound from '../views/NotFound.vue';
import LandingIndex from '../views/landing/LandingIndex.vue';
import LandingSiswa from '../views/landing/LandingSiswa.vue';
import LandingSiswaLogin from '../views/landing/LandingSiswaLogin.vue';
import LandingPengawasLapangan from '../views/landing/LandingPengawasLapangan.vue';
import LandingPengawasSekolah from '../views/landing/LandingPengawasSekolah.vue';

//admin
import SiswaDashboard from '../views/admin/Dashboard.vue'
//profile
import MenuSiswaProfileIndex from '../views/admin/profile/Index.vue'
//pendaftaranPkl
import MenuSiswaPendaftaranPklIndex from '../views/admin/pendaftaranpkl/Index.vue'
import MenuSiswaPendaftaranPklStepDua from '../views/admin/pendaftaranpkl/StepDua.vue'
import MenuSiswaPendaftaranPklStepTiga from '../views/admin/pendaftaranpkl/StepTiga.vue'
//absensi
import MenuSiswaAbsensiIndex from '../views/admin/absensi/Index.vue'
//jurnal
import MenuSiswaJurnalIndex from '../views/admin/jurnal/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingLayout,
    redirect: '/',
    children: [
      {
        path: '/', 
        name: 'LandingIndex',
        component: LandingIndex,
      },
      {
        path: '/siswa', 
        name: 'LandingSiswa',
        component: LandingSiswa,
      },
      {
        path: '/siswa/login', 
        name: 'LandingSiswaLogin',
        component: LandingSiswaLogin,
      },
      {
        path: '/pengawaslapangan', 
        name: 'LandingPengawasLapangan',
        component: LandingPengawasLapangan,
      },
      {
        path: '/pengawassekolah', 
        name: 'LandingPengawasSekolah',
        component: LandingPengawasSekolah,
      },
      {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
  {
    path: '/siswapages',
    name: 'PagesSiswa',
    component: AdminLayout,
    redirect: '/',
    children: [
      {
        path: '/pages/siswa', 
        name: 'PagesSiswaIndex',
        component: SiswaDashboard,
      }, {
        path: '/pages/siswa', 
        name: 'AdminDashboard',
        component: SiswaDashboard,
      }, {
        path: '/pages/siswa', 
        name: 'MenuSiswaDashboard',
        component: SiswaDashboard,
      }, {
        path: '/pages/siswa/profile',
        name: 'MenuSiswaProfile',
        component: MenuSiswaProfileIndex,
      },{
        path: '/pages/siswa/pendaftaranpkl',
        name: 'MenuSiswaPendaftaranPkl',
        component: MenuSiswaPendaftaranPklIndex,
      },{
        path: '/pages/siswa/pendaftaranpkl/step2',
        name: 'MenuSiswaPendaftaranPklStep2',
        component: MenuSiswaPendaftaranPklStepDua,
      },{
        path: '/pages/siswa/pendaftaranpkl/step3',
        name: 'MenuSiswaPendaftaranPklStep3',
        component: MenuSiswaPendaftaranPklStepTiga,
      },{
        path: '/pages/siswa/absensi',
        name: 'MenuSiswaAbsensi',
        component: MenuSiswaAbsensiIndex,
      },{
        path: '/pages/siswa/jurnal',
        name: 'MenuSiswaJurnal',
        component: MenuSiswaJurnalIndex,
      },
    ],
  },
  {
    path: '/:catchAll(.*)', redirect: '/404',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
