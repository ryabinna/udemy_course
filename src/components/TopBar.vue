<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'globalFeed'}" >Medium Clone</router-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'globalFeed'}" active-class="active">Global Feed</router-link>
                </li>
                <template v-if="isLoginIn">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'createArticle'}" active-class="active">
                            <i class="ion-compose"></i> &nbsp; New Article
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'settings'}" active-class="active">
                            <i class="ion-gear-a"></i> &nbsp; Settings
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{path: `/profiles/${currentUser.username}`}" active-class="active">
                            <img class="user-pic" :src="currentUser.image"/>&nbsp;{{ currentUser.username }}
                        </router-link>
                    </li>
                </template>
                <template v-if="isAnonymous">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'login'}" active-class="active">
                            sing in
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'register'}" active-class="active">
                            sign up
                        </router-link>
                    </li>
                    
                </template>
            </ul>
        </div>    
    </nav>
    
</template>

<script>

 import {mapGetters} from 'vuex';
 import {getterTypes} from '@/store/modules/auth'
 
export default {
    name: "appTopBar",
    computed: {
       ...mapGetters({
            currentUser: getterTypes.currentUser,
            isLoginIn: getterTypes.isLoginIn,
            isAnonymous: getterTypes.isAnonymous,
        })   
        
    }}

</script>