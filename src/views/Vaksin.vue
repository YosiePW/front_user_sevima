<template>
    <div>
        <!-- Header -->
    <header id="header" class="ex-header">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1>Vaksin</h1>
                </div> <!-- end of col -->
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </header> <!-- end of ex-header -->
    <!-- end of header -->



    <!-- Contact -->
    <div id="contact" class="form-2">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2>Masukkan Data</h2>
                </div> <!-- end of col -->
            </div> <!-- end of row -->
            <div class="row">
                <div class="col-lg-12">
                    
                    <!-- Contact Form -->
                    <form v-on:submit.prevent="Save" id="contactForm" data-toggle="validator" data-focus="false">
                        <!-- <div class="form-group">
                            <label for="nama_kategori" class="col-form-label">Kategori</label>
                            <b-form-select id="id_kategori" v-model="id_kategori" required>
                                <option v-for="item in kategori" :value="item.id_kategori" :key="item.id_kategori">
                                    {{item.nama_kategori}}
                                </option>
                            </b-form-select>
                        </div> -->
                        <!-- <div class="form-group">
                            <label for="id_kategori" class="col-form-label">Kategori</label>
                            <b-form-select id="id_kategori" v-model="id_kategori" :options="kategori"></b-form-select>
                      </div> -->
                    
                        <div class="form-group">
                            <label for="nik" class="col-form-label">Nik</label>
                            <b-form-input type="text" v-model="nik" placeholder="Nik"></b-form-input>
                        </div>
                        <div class="form-group">
                            <label for="no_telp" class="col-form-label">No Telp</label>
                            <b-form-input type="text" v-model="no_telp" placeholder="No Telp"></b-form-input>
                        </div>
                        <div class="form-group">
                            <label for="tgl_lahir" class="col-form-label">Tgl Lahir</label>
                            <b-form-input type="date" v-model="tgl_lahir"></b-form-input>
                        </div>
                        <div class="form-group">
                            <label for="alamat" class="col-form-label">Alamat</label>
                            <b-form-input type="text" v-model="alamat" placeholder="Alamat"></b-form-input>
                        </div>
                        <br>
                        <div class="form-group">
                            <button type="submit" class="form-control-submit-button">SUBMIT MESSAGE</button>
                        </div>
                    </form>
                    </div>
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of form-2 -->
    <!-- end of contact -->
    </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id_vaksin: "",
      id_user: "",
      nik: "",
      tgl_lahir: "",
      no_telp: "",
      alamat: "",
      status: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
    }
  },

  methods: {

    Add : function(){
      this.action = "insert";
      this.nik = "";
      this.no_telp = "";
      this.tgl_lahir = "";
      this.alamat = "";
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
        let form = new FormData();
        form.append("tgl_lahir", this.tgl_lahir);
        form.append("nik", this.nik);
        form.append("no_telp", this.no_telp);
        form.append("alamat", this.alamat);


        this.axios.post("/masyarakat/vaksin/", form, conf)
        .then(() => this.$router.push("/getvaksin"))
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
  }
}
</script>
