<script setup>
import { jsPDF } from "jspdf";
import { ref, onMounted, watch, computed } from "vue";
import Api from "@/axios/axios";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";

moment.updateLocale("id", localization);

import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();

const store = useStore();
const router = useRouter();

const id = route.params.id;
const id2 = route.params.id2;

const getDataAuth = computed(() => store.state.dataAuth);

const siswa_id = getDataAuth.value.id;
const data = ref([]);
const dataTempatPkl = ref([]);
const dataSiswa = ref([]);
const dataAnggota = ref();
const dataCek = ref(false);
const getData = async () => {
  try {
    const response = await Api.get(`siswa/profile/pendaftaranpkl`);
    dataTempatPkl.value = response.tempatpkl;
    data.value = response.anggota;
    // console.log(dataSiswa.value);
    dataCek.value = true;
    return response;
  } catch (error) {
    console.error(error);
  }
};
getData();
// import html2canvas from "html2canvas";
let doc = new jsPDF("p", "pt", "A4", "potrait");
let margins = {
  top: 40,
  bottom: 60,
  left: 40,
  width: 522,
};
const testHtml = ref();

margins.left, // x coord
  margins.top,
  {
    // y coord
    width: margins.width, // max width of content on PDF
  },
  watch(dataCek, (newVal) => {
    doc.html(testHtml.value, {
      margin: [
        30, //left x coord
        10, //top y coord
        30, //right x coord
        10, //bottom y coord
      ],
      callback: function (doc) {
        // doc.save();
        //   doc.output("save", "filename.pdf"); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
        // doc.output("datauristring"); //returns the data uri string
        // doc.output("datauri"); //opens the data uri in current window
        // doc.output("dataurlnewwindow"); //opens the data uri in new window
        // let iframe = document.createElement("iframe");
        // iframe.setAttribute(
        //   "style",
        //   "position:absolute;right:0; top:0; bottom:0; height:100%; width:700px"
        // );
        // document.body.appendChild(iframe);
        // iframe.src = doc.output("datauristring");
      },
      x: 15,
      y: 15,
    });
  });
</script>
<template>
  <div v-if="data" class="flex justify-center">
    <div ref="testHtml" data-theme="light" class="">
      <div class="max-w-xl bg-white text-sm">
        <div class="px-4 py-4">
          <img src="@/assets/img/cetak/kop_mentah.png" alt="" />
        </div>

        <div class="flex px-6 text-xs">
          <div class="w-full text-center font-bold uppercase">
            <p class>Surat Persetujuan</p>
          </div>
        </div>

        <div class="px-6">
          <div class="text-xs">
            <p class="indent-0">Surat persetujuan ini menyatakan bahwa :</p>
          </div>
        </div>
        <div class="bg-white rounded-lg px-8 py-4">
          <div>
            <table class="table table-compact w-full">
              <tr>
                <td>DU/DI</td>
                <td>:</td>
                <td>{{ dataTempatPkl.nama }}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>{{ dataTempatPkl.alamat }}</td>
              </tr>
            </table>
          </div>
        </div>

        <p class="indent-6 text-justify leading-6 px-6">
          Menyetujui siswa-siswi SMK Dharma Wanita Kromengan Malang untuk
          melaksanakan Praktek Kerja Industri(Prakerin) atau Magang di
          DU/DI/Instansi kami dengan ketentuan sebagai berikut :
        </p>

        <div class="bg-white rounded-lg px-8 py-4">
          <div>
            <table class="table table-compact w-full">
              <tr>
                <td class="whitespace-nowrap w-1/100">Waktu Pelaksanaan</td>
                <td class="whitespace-nowrap w-1/100">:</td>
                <td>
                  {{
                    moment(dataTempatPkl.tgl_mulai, "YYYY-MM-DD").format(
                      "MMM Do YY"
                    )
                  }}
                  {{
                    moment(dataTempatPkl.tgl_selesai, "YYYY-MM-DD").format(
                      "MMM Do YY"
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td>Jumlah Peserta</td>
                <td>:</td>
                <td>{{ data.length }}</td>
              </tr>
              <tr>
                <td>Yang Bernama</td>
                <td>:</td>
                <td>
                  <ul>
                    <li v-for="(item, index) in data">
                      {{ index + 1 }}. {{ item.nama }}
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Ketentuan Lain *</td>
                <td>:</td>
                <td></td>
              </tr>
              <tr>
                <td>Yang Menyetujui **</td>
                <td>:</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="flex px-6 text-xs">
          <div class="w-3/5"></div>
          <div class="w-2/5 text-center">
            <p>Kromengan, {{ moment().format("Do MMMM  YYYY") }}</p>
            <p>Kepala DU/DI</p>
            <!-- <p>Pimpinan {{ dataTempatPkl.nama }}</p> -->
            <br v-for="i in 5" />

            <p class="font-bold text-md underline">.........................</p>
          </div>
        </div>
        <div class="px-6 py-4">
          <div class="text-xs">
            <p class="indent-0 text-justify leading-6">Keterangan :</p>
            <p class="indent-0 leading-6">
              * Diisi dengan jumlah seragam, jam kerja dan ketentuan lainnya.
            </p>
            <p class="indent-0 leading-6">
              ** Diisi tanda tangan dan nama terang Pemilik/Pimpinan serta
              stempel DU/DI / Instansi/ Perusahaan / toko.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
