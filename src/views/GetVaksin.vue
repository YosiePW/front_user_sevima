<template>
    <div>
        <header id="header" class="ex-header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Data Vaksin</h1>
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </header> <!-- end of ex-header -->
        <!-- end of header -->

        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Vaksin</b></p>
              <div class="table-responsive">
                <b-table striped hover :items="vaksin" :fields="fields">
                  <template v-slot:cell(status)="data">
                    <b-badge variant="info" v-if="data.item.status === 'proses'">{{ data.item.status }}</b-badge>
                    <b-badge variant="warning" v-if="data.item.status === 'vaksin1'">{{ data.item.status }}</b-badge>
                    <b-badge variant="success" v-if="data.item.status === 'vaksin2'">{{ data.item.status }}</b-badge>
                 </template>
                  <template v-slot:cell(tanggapan)="data">
                    {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null }}
                  </template>
                  <template v-slot:cell(nama)="data">
                        {{ data.item.user.nama }}
                      </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>

              </div>
            </div>
          </div>
        </div>
                  
    </div>
</template>

<script>
export default {
  data() {
    return {
     search:"",
      id_user: "",
      id_vaksin: "",
      nik: "",
      nama: "",
      no_telp: "",
      email: "",
      alamat: "",
      tgl_lahir: "",
      id_tanggapan: "",
      status: "",
      tanggapan: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      vaksin: [],
      user: [],
      tanggapan: [],
      fields: ["nama", "nik", "tgl_lahir","alamat" , "tanggapan" , "status"],
    };
  },
  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/vaksin/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.vaksin = response.data.data.vaksin;
          this.user = response.data.data.user;
          this.tanggapan = response.data.data.pengaduan.tanggapan;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data Vaksin."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },


  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}

</script>