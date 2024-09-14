<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-12">
          <div
            class="text-sm w-full text-center copyright text-muted"
            :class="$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }} Lumi Ortho System, <span style="font-size: 9pt;">by
              <a href="https://www.violetlabs.com.br" target="_blank" style="font-weight: 500;">Violet Labs</a></span>.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
