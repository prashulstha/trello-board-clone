<template>
  <div class="app-container  bg-slate-600">
    <main class="p-10 h-screen">

      <h1 class="text-4xl text-white flex items-center mb-10">
        <img
        width="70"
        class="mr-3"
        src="https://logodix.com/logo/1144077.png"
        alt="Trello"
        />
        Trello Board Example
      </h1>
      <TrelloBoard />
    </main>
    <footer class="footer bg-slate-300 w-full h-10 shadow-sm">
      <div class="text-center pt-2">
        © Only for practice. Not for commerical use.
      </div>
    </footer>
  </div>
</template>
<style scoped>
.app-container {
  overflow: hidden;
}
</style>
