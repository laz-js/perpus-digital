<template>
  <div class="container bg-info bg-opacity-75 p-5 rounded-5">
    <h1>Isi Kunjungan</h1>
    <form @submit.prevent="masukkanData">
      <div class="mb-3">
        <label for="nama" class="form-label">Nama</label>
        <input type="text" class="form-control" id="nama" placeholder="Nama" v-model="nama" />
      </div>

      <div class="mb-3">
        <label for="kategori" class="form-label">Kategori Pengunjung: {{ kategori }}</label>
        <select id="kategori" class="form-select" v-model="kategori">
          <option disabled value="">Siapa yang mengisi?</option>
          <option>Siswa</option>
          <option>Guru</option>
          <option>Staf</option>
          <option>Umum</option>
        </select>
      </div>

      <div v-if="kategori == 'Siswa'" class="kelas mb-3">
        <div>Kelas: {{ tingkat }} {{ jurusan }} {{ kelas }}</div>
        <label for="tingkat" class="form-label me-2">Tingkat</label>
        <select id="tingkat" class="form-select me-2" @change="resetKelas" v-model="tingkat">
          <option>X</option>
          <option>XI</option>
          <option>XII</option>
        </select>
        <label for="jurusan" class="form-label me-2">Jurusan</label>
        <select id="jurusan" class="form-select me-2" @change="resetKelas" :disabled="!(tingkat)" v-model="jurusan">
          <option>TJKT</option>
          <option>PPLG</option>
          <option>TSM</option>
          <option v-if="!(tingkat=='XII')">DKV</option>
          <option v-if="!(tingkat=='XII')">TOI</option>
        </select>
        <label for="kelas" class="form-label me-2">Kelas</label>
        <select id="kelas" class="form-select" :disabled="!(jurusan) || jurusan=='TOI'" v-model="kelas">
          <option>1</option>
          <option>2</option>
          <option v-if="!(jurusan=='DKV')">3</option>
          <option v-if="!(jurusan=='DKV') && !(tingkat=='XII')">4</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="keperluan" class="form-label">Keperluan</label>
        <input type="text" class="form-control" v-model="keperluan" placeholder="Keperluan..." />
      </div>

      <input type="submit" class="btn btn-primary" :disabled="disableButton" value="Done">
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const nama = ref('')
const kategori = ref('')
const tingkat = ref('')
const jurusan = ref('')
const kelas = ref('')
const kelasLengkap = ref('')
const keperluan = ref('')

const resetKelas = e => {
  if (e.target.value === 'XII') {
    if (['DKV', 'TOI'].includes(jurusan.value)) {
      jurusan.value = ''
      kelas.value = ''
    } else {
      if (kelas.value === '4') kelas.value = ''
    }
  }
  if (['DKV', 'TOI'].includes(e.target.value)) {
    if (!(['1', '2'].includes(kelas.value)) || e.target.value === 'TOI') kelas.value = ''
  }
}

const disableButton = computed(() => {
  const isSiswa = kategori.value === 'Siswa';
  return !nama.value.trim() || (!isSiswa ? !kategori.value : !kelas.value) || !keperluan.value.trim();
})

async function masukkanData() {
  kelasLengkap.value = `${tingkat.value} ${jurusan.value} ${kelas.value}`
  const { data, error } = await supabase.from("kunjungan").insert({
    nama: nama.value,
    kelas: kelasLengkap.value,
    kategori_pengunjung: kategori.value.toLowerCase(),
    keperluan: keperluan.value,
  }).select()
  if (error) throw error
  if (data) {
    console.log(data)
    navigateTo('/')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}
.kelas select {
  display: inline-block;
  max-width: 100px;
}
</style>