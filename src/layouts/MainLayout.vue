<template>
  <q-layout view="hHh lpR fff">
    <Header />
    <q-page-container>
      <div class="container">
        <router-view />
      </div>
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Header from 'src/widgets/header/index';
import Footer from 'src/widgets/footer/index';

defineComponent({
  name: 'App',
});
</script>
