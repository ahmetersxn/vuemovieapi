<template>
    <div class="container">
        <div class="login-bg">
            <div class="loginColumns">
                <div class="row white-bg2 p-md">
                    <div class="col-sm-6 hidden-xs">
                        <h2>Login</h2>
                    </div>
                    <div class="col-sm-6">
                        <div class="ibox-content">
                            <form @submit.prevent="login">
                                <div class="form-group">
                                    <label for="username">Kullanici Adi</label>
                                    <input type="text" v-model="username" name="username" class="form-control"
                                           :class="{ 'is-invalid': submitted && !username }"/>
                                    <div v-show="submitted && !username" class="invalid-feedback">Username is required
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label htmlFor="password">Şifre</label>
                                    <input type="password" v-model="password" name="password" class="form-control"
                                           :class="{ 'is-invalid': submitted && !password }"/>
                                    <div v-show="submitted && !password" class="invalid-feedback">Password is required
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary">Giriş</button>
                                    <router-link to="/register" class="btn btn-link">Üye Ol</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    // @ is an alias to /src


    export default {
        name: 'login',
        components: {},
        data() {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        created() {

        },
        methods: {
            login() {
                this.$http
                    .post(
                        'http://localhost:3000/authenticate', (
                            {
                                username: this.username,
                                password: this.password
                            }
                        ))
                    .then(request => this.loginSuccessful(request))
                    .catch(err => this.loginFailed(err));
            },
            loginSuccessful(req) {
                if (!req.data.token) {
                    this.loginFailed();
                    return;
                }
                localStorage.setItem("token", req.data.token);
                if (req.data.token) {
                    this.$message.warning("Welcome");
                    this.$router.push({path: '/movie'});
                }
            },
            loginFailed(err) {
                try {
                    const statusCode = err.data.status;
                    if (statusCode == true) {
                        localStorage.removeItem("token");
                    }
                } catch (e) {
                    localStorage.removeItem("token");
                }
            }
        }
    }
</script>


<style src="@/assets/css/login.css"></style>
