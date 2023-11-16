<template>
  <div class="container-sm d-flex-column position-relative text-center p-3 mb-3">
    <img src="~/assets/img/logo_smk4.png" alt="logo" class="position-absolute top-50 start-0 translate-middle-y">
    <h1>Perpustakaan Digital</h1>
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
  width: 7vmax;
}
h1 {
  font-family: LeckerliOne;
  font-size: 4.5vmax;
  color: rgb(var(--color-3));
}
p {
  padding-left: 2.5em;
  font-family: monospace;
  font-size: 1.8vmax;
  color: rgb(var(--color-4));
}
.navigasi a {
  display: inline-block;
  width: 20vw;
  margin: 0 20px;
  font-size: 1.8vmax;
  text-decoration: none;
  background-color: rgba(var(--color-5), var(--alpha));
  color: rgb(var(--color-3));
  padding: 1.5vmax 0.5vmax;
  border-radius: 2.5vmax;
}
.navigasi a:hover {
  background-color: rgba(var(--color-5), 0.46);
}
</style>