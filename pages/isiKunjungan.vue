<template>
  <div>
    <h1>Isi Kunjungan</h1>
    <form @submit.prevent="masukkanData">
      <input type="text" placeholder="Nama" v-model="nama" />

      <input v-if="kategori == 'siswa'" type="text" placeholder="Kelas" v-model="kelas">

      <div>Kategori Pengunjung: {{ kategori }}</div>
      <input type="radio" id="siswa" value="siswa" v-model="kategori" />
      <label for="siswa">Siswa</label>
      
      <input type="radio" id="guru" value="guru" v-model="kategori" />
      <label for="guru">Guru</label>

      <input type="radio" id="umum" value="umum" v-model="kategori" />
      <label for="umum">Umum</label>

      <input type="radio" id="tu" value="tu" v-model="kategori" />
      <label for="tu">TU</label>

      <span>Keperluan:</span>
      <input type="text" v-model="keperluan" placeholder="Keperluan...">

      <input type="submit" value="Masukkan">
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const nama = ref('')
const kelas = ref('')
const kategori = ref()
const keperluan = ref('')

async function masukkanData() {
  const { data, error } = await supabase.from("kunjungan").insert({
    nama: nama.value,
    kelas: kelas.value,
    kategori_pengunjung: kategori.value,
    keperluan: keperluan.value,
  }).select()
  if (error) throw error
  if (data) {
    console.log(data)
    navigateTo('/')
  }
}
</script>