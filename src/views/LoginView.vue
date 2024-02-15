<script>
export default {
    mounted() {
        var bsErrorcanvas = new bootstrap.Offcanvas(document.getElementById('errorCanvas'));
        bsErrorcanvas.show();
    }
}
</script>

<template>
<div class="offcanvas offcanvas-end" tabindex="-1" id="errorCanvas" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-body p-0 overflow-hidden">
    <div data-simplebar style="height: calc(100vh - 112px);">
      <div class="text-center">
          <img src="https://img.themesbrand.com/velzon/images/auth-offline.gif" alt="" height="210">
          <h3 class="mt-4 fw-semibold">Tidak dapat mengakses server!</h3>
          <p class="text-muted mb-4 fs-14">Autentikasi tidak ditemukan. Anda tidak dapat mengakses halaman ini. Silahkan refresh atau tutup halaman ini dan coba buka kembali</p>
          <button class="btn btn-success btn-border" onclick="window.location.href=window.location.href"><i class="ri-refresh-line align-bottom"></i> Refresh</button>
      </div>
    </div>
  </div>
</div>
</template>