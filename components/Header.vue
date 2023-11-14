<template>
  <div class="container d-flex-column text-center p-3 mb-5">
    <img src="~/assets/img/logo_smk4.png" alt="logo" class="mt-4 float-start">
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
img {
  width: 100px;
}
h1 {
  font-family: LeckerliOne;
  font-size: 4em;
  color: var(--color-2);
}
p {
  padding-left: 2.5em;
  font-family: monospace;
  font-size: 1.2em;
  color: var(--color-3);
}
.navigasi a {
  display: inline-block;
  width: 180px;
  height: 50px;
  margin: 5px;
  text-decoration: none;
  background-color: #D9D9D9AA;
  color: var(--color-1);
  padding: 10px;
  border-radius: 10px;
}
.navigasi a:hover {
  background-color: #D9D9D977;
}
</style>