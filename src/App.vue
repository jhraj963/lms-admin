<template>
  <div id="app">
    <div>
      <Sidebar></Sidebar>
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header></Header>
        <div class="container-fluid py-4">
          <!-- <router-view /> -->
          <router-view></router-view>
          <Footer></Footer>
        </div>
      </main>


      <!-- load all other page/component -->

    </div>

  </div>
</template>

<script>
import Header from './components/Include/Header.vue'
import Footer from './components/Include/Footer.vue'
import Sidebar from './components/Include/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Header, Footer, Sidebar
  }
}
</script>
