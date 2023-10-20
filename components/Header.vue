<template>
  <div class="container d-flex-column text-center p-3 mb-5">
    <h1>Perpus Digital</h1>
    <p>Catatan Kunjungan Perpustakaan SMKN 4 Tasikmalaya</p>
    <div class="navigasi">
      <NuxtLink to="/">Catatan</NuxtLink>
      <NuxtLink to="/isiKunjungan">Masukkan</NuxtLink>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.navigasi a {
  margin: 5px;
  text-decoration: none;
  color: white;
  background-color: #325453;
  padding: 10px;
  border-radius: 10px;
}
.navigasi a:hover {
  background-color: #325453aa;
}
</style>