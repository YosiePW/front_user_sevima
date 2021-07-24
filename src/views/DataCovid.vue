<template>
    <div>
        <header id="header" class="ex-header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Data Covid</h1>
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </header> <!-- end of ex-header -->
        <!-- end of header -->

        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Covid</b></p>
              <div class="table-responsive">
                <b-form-input type="text" v-on:keyup.enter="searching" v-model="search" placeholder="Pencarian Kota ..."></b-form-input>  
                <b-table striped hover :items="statistika" :fields="fields">
                  <template v-slot:cell(positif)="data">
                    <b-badge variant="info">{{ data.item.positif}}</b-badge>
                 </template>
                 <template v-slot:cell(sembuh)="data">
                    <b-badge variant="success">{{ data.item.sembuh}}</b-badge>
                 </template>
                 <template v-slot:cell(meninggal)="data">
                    <b-badge variant="danger">{{ data.item.meninggal}}</b-badge>
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
       id_statistik: "",
      provinsi: "",
      kota: "",
      positif: "",
      sembuh: "",
      meninggal: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      statistika: [],
      fields: ["id_statistik", "provinsi","kota","positif","sembuh","meninggal"],
    };
  },
  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/statistika/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.statistika = response.data.data.statistika;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    searching : function(){
    let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
    let offset = (this.currentPage - 1) * this.perPage;
          this.$bvToast.show("loadingToast");
          let form = new FormData();
          form.append("find", this.search);
          this.axios.post("/statistika/find/" + this.perPage + "/" + offset, form, conf)
          .then(response => {
            if(response.data.success == true){
              this.$bvToast.hide("loadingToast");
              this.statistika = response.data.data.statistika;
              // this.rows = response.data.data.count;
            } else {
              this.message = "Gagal menampilkan report data"
            }
          })
          .catch(error => {
              console.log(error);
          });
          // console.log('abc')
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