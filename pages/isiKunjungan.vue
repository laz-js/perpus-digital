<template>
  <div class="container p-5 rounded-5">
    <h2 class="text-center">Isi Kunjungan</h2>
    <form autocomplete="off" @submit.prevent="masukkanData">
      <div class="row mb-3">
        <div class="col">
          <label for="nama" class="form-label">Nama</label>
          <input type="text" class="form-control" id="nama" placeholder="Nama" v-model="nama" />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <label for="kategori" class="form-label">Kategori Pengunjung: {{ kategori }}</label>
          <select id="kategori" @change="resetKelas" class="form-select" v-model="kategori">
            <option disabled value="">Siapa yang mengisi?</option>
            <option>Siswa</option>
            <option>Guru</option>
            <option>Staf</option>
            <option>Umum</option>
          </select>
        </div>
      </div>

      <div v-if="kategori == 'Siswa'" class="kelas row mb-3">
        <div class="col">
          <div class="row mb-1">
            <div class="col">
              <label for="tingkat">Kelas: {{ tingkat }} {{ jurusan }} {{ kelas }}</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col-lg-4"><label for="tingkat" class="form-label me-2">Tingkat</label></div>
                <div class="col-lg-8">
                  <select id="tingkat" class="form-select" @change="resetKelas" v-model="tingkat">
                    <option>X</option>
                    <option>XI</option>
                    <option>XII</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <div class="col-lg-4"><label for="jurusan" class="form-label me-2">Jurusan</label></div>
                <div class="col-lg-8">
                  <select id="jurusan" class="form-select" @change="resetKelas" :disabled="!(tingkat)" v-model="jurusan">
                    <option>TJKT</option>
                    <option>PPLG</option>
                    <option>TSM</option>
                    <option v-if="tingkat != 'XII'">DKV</option>
                    <option v-if="tingkat != 'XII'">TOI</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <div class="col-lg-4"><label for="kelas" class="form-label me-2">Kelas</label></div>
                <div class="col-lg-8">
                  <select id="kelas" class="form-select" :disabled="!(jurusan) || jurusan == 'TOI'" v-model="kelas">
                    <option>1</option>
                    <option>2</option>
                    <option v-if="jurusan != 'DKV'">3</option>
                    <option v-if="jurusan != 'DKV' && tingkat != 'XII'">4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <label for="keperluan" class="form-label">Keperluan: {{ keperluan == 'Lainnya' ? keperluanLain : keperluan }}</label>
          <select id="keperluan" class="form-select" v-model="keperluan">
            <option disabled value="">Ada keperluan apa?</option>
            <option>Berkunjung</option>
            <option>Membaca buku</option>
            <option>Meminjam buku</option>
            <option>Mengembalikan buku</option>
            <option>Lainnya</option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <input type="text" class="form-control" v-if="keperluan == 'Lainnya'" v-model="keperluanLain" placeholder="Keperluan..." />
        </div>
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
const keperluanLain = ref('')

const resetKelas = e => {
  // Jika memilih kelas 12
  if (e.target.value === 'XII') {
    // jika memilih DKV atau TOI
    if (['DKV', 'TOI'].includes(jurusan.value)) {
      // reset jurusan dan kelas
      jurusan.value = ''
      kelas.value = ''
    } else {
      // reset kelas kalau kelas = 4
      if (kelas.value === '4') kelas.value = ''
    }
  }
  // Jika memilih DKV atau TOI
  if (['DKV', 'TOI'].includes(e.target.value)) {
    // reset kelas
    if (!(['1', '2'].includes(kelas.value)) || e.target.value === 'TOI') kelas.value = ''
  }
  // Jika ganti Kategori
  if (['Guru', 'Staf', 'Umum'].includes(e.target.value)) {
    // reset semua
    tingkat.value = ''
    jurusan.value = ''
    kelas.value = ''
  }
}

const disableButton = computed(() => {
  const isSiswa = kategori.value === 'Siswa';
  const isKeperluanLain = keperluan.value === 'Lainnya';
  return !nama.value.trim() || (!isSiswa ? !kategori.value : !kelas.value) || (!isKeperluanLain ? !keperluan.value : !keperluanLain.value.trim());
})

async function masukkanData() {
  kelasLengkap.value = `${tingkat.value} ${jurusan.value} ${kelas.value}`
  const { data, error } = await supabase.from("kunjungan").insert({
    nama: nama.value,
    kelas: kelasLengkap.value,
    kategori_pengunjung: kategori.value.toLowerCase(),
    keperluan: keperluan.value == 'Lainnya' ? keperluanLain.value : keperluan.value,
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
  max-width: 700px;
  font-family: Magra;
  background: linear-gradient(rgba(var(--color-2), var(--alpha)), rgb(var(--color-1)));
  color: rgb(var(--color-3));
}

input,
select {
  max-height: 7vh;
}

.kelas select {
  display: inline-block;
}
</style>