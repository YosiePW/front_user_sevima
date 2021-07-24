<template>
    <div>
        <header id="header" class="ex-header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Data Rumah Sakit</h1>
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </header> <!-- end of ex-header -->
        <!-- end of header -->

        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Rumah Sakit</b></p>
              <div class="table-responsive">
                <b-table striped hover :items="rsakit" :fields="fields">
                  <template v-slot:cell(jumlah_kamar)="data">
                    <b-badge variant="info">{{ data.item.jumlah_kamar}}</b-badge>
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
     search: "",
       id_rumahsakit: "",
      provinsi: "",
      kota: "",
      nama_rs: "",
      alamat: "",
      jumlah_kamar: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      rsakit: [],
      fields: ["id_rumahsakit", "provinsi", "kota", "nama_rs", "alamat", "jumlah_kamar"],
    };
  },
  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/rsakit/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.rsakit = response.data.data.rsakit;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data rsakit."
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