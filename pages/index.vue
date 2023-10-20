<template>
  <div class="container">
    <h1>Catatan</h1>
    <div class="table-responsive rounded-4">
      <table class="table table-sm table-info table-bordered border-dark table-hover">
        <thead>
          <tr class="table-warning">
            <th width="2%">No</th>
            <th width="10%">Tanggal</th>
            <th width="30%">Nama</th>
            <th width="10%">Kelas</th>
            <th width="1%">Siswa</th>
            <th width="1%">Guru</th>
            <th width="1%">Umum</th>
            <th width="1%">Staf</th>
            <th width="32%">Keperluan</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-if="loading">
            <td class="text-center" colspan="9">Sabar ya lagi loading...</td>
          </tr>
          <tr v-else v-for="(k, index) in kunjungan" :key="k.id">
            <th>{{ index + 1 }}</th>
            <td>{{ k.tanggal }}</td>
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
})
</script>

<style scoped>

</style>