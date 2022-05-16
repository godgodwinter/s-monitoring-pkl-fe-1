<template>
  <div>
    <div class="py-6">
      <div class="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          class="w-1/3 bg-cover"
          style="background-image: url('http://127.0.0.1:3000/img/photo/company-2.jpg')"
        ></div>
        <div class="w-2/3 p-4">
          <h1 class="text-gray-900 font-bold text-2xl">PT ABC Indonesia</h1>
          <p class="mt-2 text-gray-600 text-sm">
            Jl. Raya No 19 Kota Bandung - Jawa Barat - Indonesia - Telp: 08512313
          </p>
          <div class="flex item-center mt-2">
            <svg class="w-5 h-5 fill-current text-sky-700" viewBox="0 0 24 24">
              <path
                d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
              />
            </svg>
            <p class="text-sky-600">Tersedia</p>
            <svg class="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
              <path
                d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
              />
            </svg>
            <p>Tidak Tersedia</p>
          </div>
          <div class="flex item-center justify-between mt-3">
            <h1 class="text-gray-700 font-bold text-xl">1/5</h1>
            <button
              class="px-3 py-2 bg-sky-600 text-white text-xs font-bold uppercase rounded"
            >
              Pilih
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
