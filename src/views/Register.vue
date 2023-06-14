<template>
    <div class="auth-page">
        <div class="container-page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign in</h1>
                    <p class="text-xs-center">
                        <router-link :to="{name: 'login'}">Have an account?</router-link>
                    </p>
                    <app-validation-errors 
                        v-if="validationErrors"
                        :validationErrors ="validationErrors" />
                    <form @submit.prevent = "onSubmit">
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="Username" v-model="username">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary" type="submit" :disabled="isSubmitting" >Sign in</button>   
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appValidationErrors from '@/components/ValidationErrors';
import {actionTypes} from '@/store/modules/auth';
import {mapState} from 'vuex';
export default {
    name: 'appRegister',
    components: {
        appValidationErrors,
    },
    data (){
        return {
            email: '',
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapState({
        isSubmitting: state => state.auth.isSubmitting,
        validationErrors: state => state.auth.validationErrors,
        })
    },
    methods: {
        onSubmit(){
            this.$store.dispatch(actionTypes.register, {
                email: this.email,
                username: this.username,
                password: this.password
            })
            .then(user => {
                console.log(user);
            this.$router.push({name: "globalFeed"});
            });
        }
    }
}
</script>