<template>

    <div class="register">

        <div class="container">
            <h2>Register</h2>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="username">Kullanici Adi</label>
                    <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group">
                    <label htmlFor="password">Şifre</label>
                    <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">Kayit</button>
                    <router-link to="/" class="btn btn-link">Giriş yap</router-link>
                </div>
            </form>
        </div>


    </div>

</template>

<script>
    // @ is an alias to /src
    import axios from 'axios';

    export default {
        name: 'login',
        components: {
        },
        data() {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        created () {

        },
        methods: {
            handleSubmit () {
                axios.post(
                    'http://localhost:3000/register', (
                        {
                            username: this.username,
                            password: this.password
                        }
                    ))
                    .then((response) => {
                       const code = response.data.code;
                       const err  = response.data.errmsg;
                       if(code==null){
                           alert('Kullanici Oluşturuldu.') ;
                       }else {
                           alert('Kullanici Oluşturulamadı.Sistem Err: '+err) ;
                       }

                    })
            }
        }
    }
</script>

