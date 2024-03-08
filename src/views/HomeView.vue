<script>

import PageHeader from '@/layouts/pageHeader.vue';
import axios from 'axios'
import Cookies from 'js-cookie';
import moment from 'moment'
import { getCurrentInstance } from 'vue'
bootstrap.Offcanvas.prototype._initializeFocusTrap = () => ({ activate: () => { }, deactivate: () => { } });

const token = Cookies.get('token');

let config = {
  headers: {
    'x-key': import.meta.env.VITE_XKEY,
    'x-access-key': token,
    'Content-Type': 'application/json'
  }
};

export default {
    data() {
        return {
            posts: [],
            tasks: [],
        };
    },
    methods: {
        detail: function detail(postdata,index) {
          console.log(postdata.kerja_id);
          event.stopPropagation();

          let kerja = postdata.kerja[index];

          console.log(index);

          var bsOffcanvas = new bootstrap.Modal(document.getElementById('appModal'));
          bsOffcanvas.show();
          document.getElementById('taskDetailTitle').innerHTML = postdata.deskripsi;
          document.getElementById('taskDetailUraian').innerHTML = kerja.uraian_teks;
          document.getElementById('taskid').ariaValueNow = kerja.kerja_id;
          document.getElementById('imgthumb').src = "https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/get_image/"+kerja.evidence_filename;

        },
        decline: function decline() {

            if (confirm("Laporan ditolak?") == true) {
            let taskid = parseInt(document.getElementById("taskid").ariaValueNow);
            console.log(taskid);

            let data = JSON.stringify({
              "kerja": [taskid],
              "is_approve": false,
            });

            axios
                .post('https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/approve_kerja',data,config)
                .then((response) => {
                  console.log(response);
            })
                .catch(function (error) {
                Toastify({
                  text: error.response.data.message,
                  className: "danger",
                  duration: 1000
                  }).showToast();
            })
                .finally(function () {
                const appmodal = document.querySelector('#appModal');
                const modal = bootstrap.Modal.getInstance(appmodal);
                modal.hide();

                location.reload();
            });
          }
        },
        accept: function accept(id) {
            if (confirm("Laporan diterima?") == true) {

              let taskid = parseInt(document.getElementById("taskid").ariaValueNow);

              let data = JSON.stringify({
                "kerja": [taskid],
                "is_approve": true,
              });

              axios
                  .post('https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/approve_kerja',data,config)
                  .then((response) => {
                  Toastify({
                    text: "Pekerjaan sukses diterima.",
                    duration: 1000
                    }).showToast();

                  var bsOffcanvas = new bootstrap.Modal(document.getElementById('appModal'));
                  bsOffcanvas.hide();
              })
                  .catch(function (error) {
                  Toastify({
                    text: error.response.data.message,
                    className: "danger",
                    duration: 1000
                    }).showToast();
              })
                  .finally(function () {

                  const appmodal = document.querySelector('#appModal');
                  const modal = bootstrap.Modal.getInstance(appmodal);
                  modal.hide();

                  location.reload();
              });
            }
        },
        tasklist: function tasklist(pekerjaan){
          event.stopPropagation();
          var detailModal = new bootstrap.Modal(document.getElementById('modaldetail'));
          detailModal.show();

          this.tasks = pekerjaan
        },
    },
    mounted() {
        let data = JSON.stringify({
          "tanggal_kerja": moment(new Date()).format('YYYY-MM-DD'),
          "status_kerja": "STK-1"
        });

        axios
            .post('https://haji.kemenag.go.id/ptgsapi/dev/petugashaji/penkin/getlist_pekerjaan_byparent',data,config)
            .then((response) => {
            document.getElementById('taskplaceholder').style.display = 'none';
            this.posts = response.data.data;

            console.log(response.data);
            if(response.data.message != 'Sukses'){
              document.getElementById('errormessage').innerHTML = response.data.message;
              var bsErrorcanvas = new bootstrap.Offcanvas(document.getElementById('errorCanvas'));
              bsErrorcanvas.show();
            }
        })
            .catch(function (error) {
            if (error.response) {
                console.log('a', error.response.data);
                console.log('b', error.response.status);
                console.log('c', error.response.headers);
                document.getElementById('errormessage').innerHTML = error.response.data;
                var bsErrorcanvas = new bootstrap.Offcanvas(document.getElementById('errorCanvas'));
                bsErrorcanvas.show();
            }
            else if (error.request) {
                //error here
                document.getElementById('errormessage').innerHTML = "Kami tidak dapat menampilkan data dikarenakan koneksi Anda terganggu. Periksa kembali koneksi Anda. Saat sudah kembali, silahkan klik refresh.";
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
                          <span @click="tasklist(post.pekerjaan)">{{ post.nama_lengkap }}</span>
                        </h5>
                        <p class="born timestamp text-muted mb-0">Petugas ID: {{ post.petugas }}</p>
                      </div>

                      <div class="flex-shrink-0 ms-2">
                        <div>
                          <span class="badge rounded-pill border border-success text-success">{{ post.pekerjaan.length }}</span>
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

<div class="modal fade" id="modaldetail" tabindex="-1" aria-labelledby="modaldetailLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modaldetailLabel">Daftar Pekerjaan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="listtask">
            <div>
                <div class="list-group">
                <div v-for="(row) in tasks">
                  <div class="list-group-item list-group-item-action" v-for="(kerja,index) in row.kerja">
                    <a @click="detail(row,index)">
                      <div class="d-flex mb-2 align-items-center">
                          <div class="flex-grow-1">
                              <h5 class="list-title fs-15 mb-1">{{row.uraian}}</h5>
                              <p class="list-text mb-0 fs-12">{{kerja.fase}}</p>
                          </div>
                      </div>
                      <p class="list-text mb-0">Waktu Pekerjaan: {{kerja.waktu_mulai}}</p>
                      </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
    </div>
</div>

<div id="appModal" class="modal fade" tabindex="-1" aria-labelledby="appModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="appModalLabel">Laporan Pekerjaan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
            </div>
            <div class="modal-body">
                <h5 class="fs-15" id="taskDetailTitle"></h5>
                <p class="text-muted" id="taskDetailUraian">...</p>
                <img class="img-thumbnail" id="imgthumb" src="">
            </div>
            <div class="modal-footer bg-light p-3 justify-content-center">
                <input type="hidden" name="id" id="taskid">
                <button type="button" class="btn btn-danger" @click="decline(id)">Tolak</button>
                <button type="button" class="btn btn-success " @click="accept(id)">Terima</button>
            </div>

        </div>
    </div>
</div>

<div class="offcanvas offcanvas-end" tabindex="-1" id="errorCanvas" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-body p-0 overflow-hidden">
    <div data-simplebar style="height: calc(100vh - 112px);">
      <div class="text-center">
          <img src="https://img.themesbrand.com/velzon/images/auth-offline.gif" alt="" height="210">
          <h3 class="mt-4 fw-semibold">Maaf, terjadi kesalahan!</h3>
          <p class="text-muted mb-4 fs-14" id="errormessage"></p>
          <button class="btn btn-success btn-border" onclick="window.location.href=window.location.href"><i class="ri-refresh-line align-bottom"></i> Refresh</button>
      </div>
    </div>
  </div>
</div>
</template>
