<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import MovieList from "@/components/MovieList.vue";

</script>

<template>
  <div id=container class="text-white text-sm bg-primary-300 min-h-screen pb-4">
    <!--    header-->
    <Header/>
    <!--    main-->
    <MovieList/>

    <!--footer-->
    <Footer/>
  </div>
</template>
