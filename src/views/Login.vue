<template>
    <div class="container">
			<div class="row2 justify-content-center">
				<div class="col-md-7 col-lg-5">
					<div class="login-wrap p-4 p-md-5">
		      	<div class="icon d-flex align-items-center justify-content-center">
		      		<span class="fa fa-user-o"></span>
		      	</div>
		      	<h3 class="text-center mb-4">Sign In</h3>
						<form method="post" action="#" v-on:submit.prevent="Login" class="login-form">
		      		<div class="form-group">
		      			<input v-model="email" type="text" class="form-control rounded-left" placeholder="Email" required>
		      		</div>
	            <div class="form-group d-flex">
	              <input v-model="password" type="password" class="form-control rounded-left" placeholder="Password" required>
	            </div>
	            <div class="form-group">
	            	<button type="submit" name="submit" class="form-control btn btn-primary rounded submit px-3">Login</button>
	            </div>
	            <div class="form-group d-md-flex">
	            	<div class="w-50">
	            		<label class="checkbox-wrap checkbox-primary">Remember Me
									  <input type="checkbox" checked>
									  <span class="checkmark"></span>
									</label>
								</div>
								<div class="w-50 text-md-right">
									<a href="#">Forgot Password</a>
								</div>
	            </div>
	          </form>
	        </div>
				</div>
			</div>
		</div>
</template>

<script>
export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
        Login: function(){
            this.$bvToast.show("loadingToast")
            let email = this.email 
            let password = this.password
            this.$store.dispatch('login', { email, password })
            .then((response) => {
                this.message = response.data.message
                this.$bvToast.hide("loadingToast")
                this.$bvToast.show("message")
                this.$router.push('/').catch(() => {});
            })
            .catch(err => console.log(err))
    }
    }
}
</script>