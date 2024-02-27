<script>

import PageHeader from '@/layouts/pageHeader.vue';
import axios from 'axios'
import Cookies from 'js-cookie';
bootstrap.Offcanvas.prototype._initializeFocusTrap = () => ({ activate: () => { }, deactivate: () => { } });
export default {
    data() {
        return {
            posts: []
        };
    },
    methods: {
        detail: function detail(id) {
            event.stopPropagation();
            var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById('detailCanvas'));
            bsOffcanvas.show();
            document.getElementById('taskid').ariaValueNow = id;
        },
        decline: function decline() {
            let taskid = document.getElementById("taskid").ariaValueNow;
            console.log(taskid);
            Swal.fire({
                text: 'Masukan informasi penolakan!',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Tolak Laporan',
                confirmButtonColor: "#f06548",
                showLoaderOnConfirm: true,
                preConfirm: (data) => {
                    return fetch('', {
                        method: "POST",
                        body: JSON.stringify({ keterangan: data, id: taskid }),
                        headers: { "Content-type": "application/json; charset=UTF-8" }
                    })
                        .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                        .catch(error => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    //remove task
                }
            });
        },
        accept: function accept() {
            confirm('Laporan diterima?');
        }
    },
    mounted() {
      /*
      let data = JSON.stringify({
        "tanggal_kerja": "2024-02-13",
        "status_kerja": "STK-3"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/getlist_pekerjaan_byparent',
        headers: {
          'x-key': '!@4n)$*^nGnal123@#5npPKU',
          'x-access-key': token,
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
            if (error.response) {
                console.log('a', error.response.data);
                console.log('b', rror.response.status);
                console.log('c', error.response.headers);
            }
            else if (error.request) {
                //error here
                var bsErrorcanvas = new bootstrap.Offcanvas(document.getElementById('errorCanvas'));
                bsErrorcanvas.show();
            }
            else {
                console.log('Error', error.message);
            }
        })
            .finally(function () {
            new List("pagination-list", {
                valueNames: ["pagi-list"],
                page: 10,
                pagination: !0
            });
        });
      */
        let data = JSON.stringify({
          "status_kerja": "STK-1"
        });

        const token = Cookies.get('token');

        let config = {
          headers: {
            'x-key': import.meta.env.VITE_XKEY,
            'x-access-key': token,
            'Content-Type': 'application/json'
          }
        };


        axios
            .post('https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/getlist_pekerjaan_byparent',data,config)
            .then((response) => {
            document.getElementById('taskplaceholder').style.display = 'none';
            this.posts = response.data.data;

            console.log(response.data.data);
        })
            .catch(function (error) {
            if (error.response) {
                console.log('a', error.response.data);
                console.log('b', rror.response.status);
                console.log('c', error.response.headers);
            }
            else if (error.request) {
                //error here
                var bsErrorcanvas = new bootstrap.Offcanvas(document.getElementById('errorCanvas'));
                bsErrorcanvas.show();
            }
            else {
                console.log('Error', error.message);
            }
        })
            .finally(function () {
            new List("pagination-list", {
                valueNames: ["pagi-list"],
                page: 10,
                pagination: !0
            });
        });

    },
    components: { PageHeader, PageHeader, PageHeader }
}
</script>
<template>
<div class="page-content">
  <div class="container-fluid">

    <PageHeader title="Penkin" pageTitle="Home"></PageHeader>

    <div class="row">
      <div class="col-lg-12">
      <!-- <div class="d-flex flex-wrap gap-2">
      <button type="button" class="btn btn-outline-secondary">
        Pending <span class="badge bg-success ms-1">2</span>
      </button>
      <button type="button" class="btn btn-success">
          Verifikasi <span class="badge bg-danger ms-1">43s</span>
      </button>
      </div>-->
        <div class="card mt-3">
          <div class="card-body">
            <p class="text-muted">Pastikan laporan yang disampaikan sudah sesuai</p>

            <div class="listjs-table" id="pagination-list">
              <div class="mb-2">
                <input class="search form-control" placeholder="Search" />
              </div>

              <div class="mx-n3">
                <ul class="list list-group list-group-flush mb-0">
                  <li class="list-group-item" id="taskplaceholder">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0 me-3">
                        <div>
                          <a href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Christi">
                            <div class="avatar-sm">
                              <div class="avatar-title rounded-circle bg-light text-primary">
                                ...
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>

                      <div class="flex-grow-1 overflow-hidden">
                        <h5 class="card-title placeholder-glow">
                          <span class="placeholder col-6"></span>
                        </h5>
                        <p class="card-text placeholder-glow">
                          <span class="placeholder col-7"></span>
                          <span class="placeholder col-4"></span>
                          <span class="placeholder col-4"></span>
                          <span class="placeholder col-6"></span>
                        </p>
                      </div>

                      <div class="flex-shrink-0 ms-2">
                        <div>
                          <button type="button" class="btn btn-sm btn-light disabled placeholder" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div v-for="post in posts" :key="post.id">
                  <li class="list-group-item">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0 me-3">
                        <div>
                          <img class="image avatar-xs rounded-circle" alt="" src="https://d2mj1s7x3czrue.cloudfront.net/hrms/assets/images/users/avatar-1.jpg">
                        </div>
                      </div>

                      <div class="flex-grow-1 overflow-hidden">
                        <h5 class="fs-13 mb-1">
                          <router-link :to="`/tasks/${post.petugas}`">{{ post.nama_lengkap }}</router-link>
                        </h5>
                        <p class="born timestamp text-muted mb-0">Petugas ID: {{ post.petugas }}</p>
                      </div>

                      <div class="flex-shrink-0 ms-2">
                        <div>
                          <span class="badge rounded-pill border border-success text-success">{{ post.pekerjaan.length }}</span>
                          <!-- <button type="button" class="btn btn-sm btn-light" @click="detail(post.id)"><i class="ri-mail-line align-bottom"></i> Detail</button> -->
                        </div>
                      </div>
                    </div>
                  </li>
                  </div>
                </ul>
                <div class="d-flex justify-content-center mt-3">
                  <div class="pagination-wrap hstack gap-2">
                    <a class="page-item pagination-prev disabled" href="javascript:void(0)">
                      Previous
                    </a>
                    <ul class="pagination listjs-pagination mb-0"></ul>
                    <a class="page-item pagination-next" href="javascript:void(0)">
                      Next
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="offcanvas offcanvas-end" tabindex="-1" id="detailCanvas" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header border-bottom">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Detail Penyelesaian Tugas</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body p-0 overflow-hidden">
    <div data-simplebar style="height: calc(100vh - 112px);">
      <div class="acitivity-timeline p-4">
        <div class="acitivity-item d-flex">
          <div class="flex-shrink-0">
            <img src="https://d2mj1s7x3czrue.cloudfront.net/hrms/assets/images/users/avatar-1.jpg" alt="" class="avatar-xs rounded-circle acitivity-avatar">
          </div>
          <div class="flex-grow-1 ms-3">
            <h6 class="mb-1">Oliver Phillips <span class="badge bg-primary-subtle text-primary align-middle">New</span></h6>
            <p class="text-muted mb-2">We talked about a project on linkedin.</p>
            <small class="mb-0 text-muted">Today</small>

            <div class="row border border-dashed gx-2 p-2 mb-2">
                <div class="col-12">
                    <img src="https://d2mj1s7x3czrue.cloudfront.net/hrms/assets/images/small/img-2.jpg" alt="" class="img-fluid rounded">
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="offcanvas-foorter border p-3 text-center">
    <input type="hidden" name="id" id="taskid">
    <a href="javascript:void(0);" class="btn btn-success" @click="accept(id)">Terima <i class="ri-checkbox-fill align-middle ms-1"></i></a> <a href="javascript:void(0);" class="btn btn-danger" @click="decline(id)">Kembalikan <i class="ri-close-circle-fill align-middle ms-1"></i></a>
  </div>
</div>

<div class="offcanvas offcanvas-end" tabindex="-1" id="errorCanvas" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-body p-0 overflow-hidden">
    <div data-simplebar style="height: calc(100vh - 112px);">
      <div class="text-center">
          <img src="https://img.themesbrand.com/velzon/images/auth-offline.gif" alt="" height="210">
          <h3 class="mt-4 fw-semibold">Tidak dapat mengakses server!</h3>
          <p class="text-muted mb-4 fs-14">Kami tidak dapat menampilkan data dikarenakan koneksi Anda terganggu. Periksa kembali koneksi Anda. Saat sudah kembali, silahkan klik refresh.</p>
          <button class="btn btn-success btn-border" onclick="window.location.href=window.location.href"><i class="ri-refresh-line align-bottom"></i> Refresh</button>
      </div>
    </div>
  </div>
</div>
</template>
