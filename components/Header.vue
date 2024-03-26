<template>
  <img src="~/assets/img/logo_smk4.png" alt="logo" class="position-absolute top-0 start-0 m-2">
  <div class="container-sm d-flex-column position-relative text-center p-3 mb-3">
    <div class="position-relative">
      <h1>Perpustakaan Digital</h1>
      <p>Catatan Kunjungan Perpustakaan SMKN 4 Tasikmalaya</p>
      <div class="navigasi">
        <NuxtLink to="/">Catatan</NuxtLink>
        <NuxtLink to="/isiKunjungan">Masukkan</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
img {
  width: 40px;
  z-index: -1;
}

@media screen and (min-width: 768px) {
  img {
    width: 100px;
  }
}

h1 {
  font-family: LeckerliOne;
  color: rgb(var(--color-3));
}

p {
  font-family: monospace;
  color: rgb(var(--color-4));
}

.navigasi a {
  display: inline-block;
  margin: 0 20px;
  padding: 5px 15px;
  text-decoration: none;
  background-color: rgba(var(--color-5), var(--alpha));
  color: rgb(var(--color-3));
  border-radius: 10px;
}
.navigasi a:hover {
  background-color: rgba(var(--color-5), 0.46);
}
</style>