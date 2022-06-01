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
        doc.save();
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
          <div class="w-3/5">
            <p>Nomor : 3337/SMK.DW/E.24/IX/2021</p>
            <p>Perihal : Permohonan Penempatan Siswa Prakerin</p>
          </div>
          <div class="w-2/5">
            <p>Kromengan, {{ moment().format("Do MMMM  YYYY") }}</p>
            <p>Kepada Yth</p>
            <p>Pimpinan {{ dataTempatPkl.nama }}</p>
            <p>Di Tempat.</p>
          </div>
        </div>

        <div class="px-6">
          <div class="text-xs">
            <p class="indent-6 italic leading-6">
              Assalamualaikum Warohmatullahi Wabarokatuh
            </p>
            <p class="indent-6 text-justify leading-6">
              Yang bertanda tangan di bawah ini kepala Sekolah SMK Dharma Wanita
              Kromengan memohon kepada Bapak/Ibu Pimpinan
              {{ dataTempatPkl.nama }} agar diperkenankan menempatkan Siswa /
              Siswi kami dalam kegiatan Praktek Kerja Industri (Prakerin) di
              tempat yang Bapak/Ibu pimpin sejak tanggal
              {{
                moment(dataTempatPkl.tgl_mulai, "YYYY-MM-DD").format(
                  "MMM Do YY"
                )
              }}
              s/d
              {{
                moment(dataTempatPkl.tgl_selesai, "YYYY-MM-DD").format(
                  "MMM Do YY"
                )
              }}
              . Data siswa sebagai berikut
            </p>
          </div>
        </div>
        <div class="bg-white shadow rounded-lg px-8 py-4">
          <div>
            <table
              class="table table-compact w-full border-collapse border border-slate-500"
            >
              <tr class="border-collapse border border-slate-500">
                <td
                  class="whitespace-nowrap w-1/100 border-collapse border border-slate-500"
                >
                  No
                </td>
                <td class="border-collapse border border-slate-500">NIS</td>
                <td class="border-collapse border border-slate-500">Nama</td>
                <td
                  class="whitespace-nowrap w-1/100 border-collapse border border-slate-500"
                >
                  L/P
                </td>
                <td
                  class="whitespace-nowrap w-1/100 border-collapse border border-slate-500"
                >
                  Jurusan
                </td>
                <td>Alamat</td>
              </tr>
              <tbody>
                <tr
                  v-for="(item, index) in data"
                  class="border-collapse border border-slate-500"
                >
                  <td
                    class="whitespace-nowrap w-1/100 border-collapse border border-slate-500"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    class="whitespace-pre-wrap w-5/12 border-collapse border border-slate-500"
                  >
                    {{ item.nomeridentitas }}
                  </td>
                  <td
                    class="whitespace-nowrap w-5/12 border-collapse border border-slate-500"
                  >
                    {{ item.nama }}
                  </td>
                  <td
                    class="whitespace-nowrap w-5/12 border-collapse border border-slate-500"
                  >
                    {{ item.jk.substr(0, 1) }}
                  </td>
                  <td
                    class="whitespace-nowrap w-5/12 border-collapse border border-slate-500"
                  >
                    {{ item.jurusan }}
                  </td>
                  <td
                    class="whitespace-pre-wrap w-5/12 border-collapse border border-slate-500"
                  >
                    {{ item.alamat }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="px-6 py-4">
          <div class="text-xs">
            <p class="indent-6 text-justify leading-6">
              Besar harapan Kami sekiranya Bapak/Ibu Pimpinan bersedia menerima
              permohonan kami.Atas Perhatian dan kerjasamanya kami mengucapkan
              terima kasih.
            </p>
            <p class="indent-6 italic leading-6">
              Wassalamualaikum Warohmatullahi Wabarokatuh.
            </p>
          </div>
        </div>

        <div class="flex px-6 text-xs">
          <div class="w-3/5"></div>
          <div class="w-2/5 text-center">
            <p>Kromengan, {{ moment().format("Do MMMM  YYYY") }}</p>
            <p>Kepala Sekolah</p>
            <!-- <p>Pimpinan {{ dataTempatPkl.nama }}</p> -->
            <br v-for="i in 5" />

            <p class="font-bold text-md underline">Drs. H. ISMAIL, M.Pd</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
