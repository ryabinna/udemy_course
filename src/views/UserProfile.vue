<template>
    <div class="profile-page" v-if="userProfile">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img class="user-img" :src="userProfile.image" />
                        <h4> {{ userProfile.username }}</h4>
                        <p>{{userProfile.bio}}</p>
                        <div> FOLLOW USER BUTTON</div>
                        <router-link 
                        v-if="isCurrentUserProfile" 
                        class="btn btn-sm btn-outline-secondary action-btn" 
                        :to="{name:'settings'}">
                        Edit Profile Settings
                    </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="article-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <router-link 
                                    :to="{path:`/profiles/${userProfile.username}`}" 
                                    class="nav-link"
                                    :class="{active:!isFavoritesPage}">
                                    My Articles
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link 
                                    :to="{path:`/profiles/${userProfile.username}/favorites`}" 
                                    class="nav-link"
                                    :class="{active:isFavoritesPage}">
                                    Favorite Articles
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <app-feed :api-url="apiUrl"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script> 
import {mapState, mapGetters} from 'vuex';
import appFeed from '@/components/Feed.vue';
import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile';
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
export default {
    name: "appUserProfile",
    components: {
        appFeed,
    },
    computed: {
        ... mapState({
            isLoading: state => state.userProfile.isLoading,
            error: state => state.userProfile.error,
            userProfile: state => state.userProfile.data,
        }),
        ...mapGetters({
            currentUser: authGetterTypes.currentUser
        }),
        isCurrentUserProfile(){
            if (!this.currentUser || !this.userProfile){
                return false
            }
            return this.userProfile.username === this.currentUser.username
        },
        userProfileSlug(){
            return this.$route.params.slug
        },
        isFavoritesPage(){
            return this.$route.path.includes('favorites');
        },
        apiUrl(){
            return this.isFavoritesPage ? `articles?favorited=${this.userProfileSlug}` : `articles?author=${this.userProfileSlug}`
        }
    },
    watch: {
        userProfileSlug(){
            this.getUserProfile()
        }
    },
    methods: {
        getUserProfile(){
            this.$store.dispatch(userProfileActionTypes.getUserProfile, {slug: this.userProfileSlug})
        }
    },
    mounted(){
        this.getUserProfile();
    }
}
</script>