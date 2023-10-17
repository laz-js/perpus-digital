<template>
    <div>
        <h1>Catatan</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Siswa</th>
                    <th>Guru</th>
                    <th>Umum</th>
                    <th>TU</th>
                    <th>Keperluan</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(k, index) in kunjungan" :key="k.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ k.nama }}</td>
                    <td>{{ k.kelas }}</td>
                    <td><div v-if="k.kategori_pengunjung == 'siswa'">Ya</div></td>
                    <td><div v-if="k.kategori_pengunjung == 'guru'">Ya</div></td>
                    <td><div v-if="k.kategori_pengunjung == 'umum'">Ya</div></td>
                    <td><div v-if="k.kategori_pengunjung == 'tu'">Ya</div></td>
                    <td>{{ k.keperluan }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const kunjungan = ref([])

async function getData() {
    const { data, error } = await supabase.from("kunjungan").select()
    if (error) throw error
    if (data) kunjungan.value = data
}

onMounted(() => {
    getData()
})
</script> 