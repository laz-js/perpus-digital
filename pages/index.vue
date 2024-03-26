<template>
  <div class="container position-relative">
    <h2 class="text-white ms-5">Catatan</h2>
    <img src="~/assets/img/notebook.png" alt="noteboook" class="position-absolute top-0 end-0">
    <div class="table-responsive rounded-5">
      <table class="table table-sm table-info table-bordered border-dark table-hover">
        <thead>
          <tr class="table-warning align-middle text-center">
            <th rowspan="2" width="2%">No</th>
            <th rowspan="2" width="10%">Tanggal</th>
            <th rowspan="2" width="10%">Jam</th>
            <th rowspan="2" width="25%">Nama</th>
            <th rowspan="2" width="10%">Kelas</th>
            <th colspan="4">Kategori</th>
            <th colspan="2" rowspan="2">Keperluan</th>
          </tr>
          <tr class="table-warning">
            <th width="1%">Siswa</th>
            <th width="1%">Guru</th>
            <th width="1%">Umum</th>
            <th width="1%">Staf</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-if="loading">
            <td class="text-center" colspan="11">Sabar ya lagi loading...</td>
          </tr>
          <tr v-else v-for="(k, index) in kunjungan" :key="k.id">
            <th>{{ index + 1 }}</th>
            <td>{{ k.created_at.split('T')[0] }}</td>
            <td>{{ k.created_at.split('T')[1].split('.')[0] }}</td>
            <td>{{ k.nama }}</td>
            <td>{{ k.kelas }}</td>
            <td>
              <div v-if="k.kategori_pengunjung == 'siswa'">✔️</div>
            </td>
            <td>
              <div v-if="k.kategori_pengunjung == 'guru'">✔️</div>
            </td>
            <td>
              <div v-if="k.kategori_pengunjung == 'umum'">✔️</div>
            </td>
            <td>
              <div v-if="k.kategori_pengunjung == 'staf'">✔️</div>
            </td>
            <td>{{ k.keperluan }}</td>
            <td><button class="btn btn-link p-0">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const kunjungan = ref([])
const loading = ref(false)

async function getData() {
  try {
    loading.value = true
    const { data, error } = await supabase.from("kunjungan").select().order('id')
    kunjungan.value = data
  } catch (error) {
    if (error instanceof Error) console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getData()
  setTimeout(() => {
    console.log(kunjungan.value[0].created_at.split('T')[0])
    console.log(kunjungan.value[0].created_at.split('T')[1].split('.')[0])
  }, 3000);
})
</script>

<style scoped>
h2 {
  font-family: Magra;
}

img {
  width: 100px;
}

@media screen and (max-width: 768px) {
  img {
    width: 50px;
    translate: 0 20px;
  }
  table {
    font-size: 0.7em;
  }
}

img:hover {
  animation: muter 10s linear infinite;
}

@keyframes muter {
  from {
    rotate: 0deg
  }

  to {
    rotate: -360deg;
  }
}
</style>