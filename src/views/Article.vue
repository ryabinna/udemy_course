<template>
    <div class="article-page"> 
        <div class="banner">
            <div class="container" v-if="article">
                <h1>{{article.title}}</h1>
                <div class="article-meta">
                    <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                        <img :src="article.author.image"/>
                    </router-link>
                    <div class="info">
                        <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}">
                        {{article.author.username}}
                    </router-link>
                    <span class="date">{{article.createdAt}}</span>
                    </div>
                <span v-if="isAuthor">
                    <router-link 
                        class="btn btn-outline-secondary btn-sm" 
                        :to="{ name:'editArticle', params: { slug: article.slug}    /* path: `/articles/${article.slug}/edit` */}">
                        <i class="ion-edit"></i>
                        Edit Article
                    </router-link>
                    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
                        <i class="ion-trash-a"></i>
                        Delete Article
                    </button>
                </span>    
                </div>
            </div>
        </div>
        <div class="container page">
            <app-loading v-if="isLoading"/>
            <app-error-message v-if="error"  :message="error"/>
            <div class="row article-content" v-if="article">
                <div class="col-xs-12">
                    <p>{{article.body}}</p>
                    <p>{{article.tagList.join(' ')}}</p>
                </div>
                <app-tag-list :tag-list="article.tagList"/>
            </div>
        </div> 
    </div>
    
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article';
import {getterTypes as authGetterTypes} from '@/store/modules/auth';
import {mapState, mapGetters} from 'vuex';
import appLoading from '@/components/Loading.vue'; 
import appErrorMessage from '@/components/ErrorMessage.vue'; 
import appTagList from '@/components/TagList.vue'; 

export default {
    name:"appArticle",
        components: {
            appLoading,
            appErrorMessage,
            appTagList 
    },
    computed: {
        ...mapState({
            isLoading: state => state.article.isLoading,
            article: state => state.article.data,
            error: state => state.article.error,
        }),
        ...mapGetters({
            currentUser: authGetterTypes.currentUser
        }),
        isAuthor(){
            if (!this.currentUser || !this.article) {
                return false
            }
            return this.currentUser.username === this.article.author.username
        }
    },
    methods:{
        deleteArticle(){
            this.$store
            .dispatch(articleActionTypes.deleteArticle, {
                slug: this.$route.params.slug})
            .then(() => {
                this.$router.push({name:'globalFeed'})
            })
        }
    },
    mounted(){
        this.$store
        .dispatch(articleActionTypes.getArticle, {
            slug: this.$route.params.slug})
    } 
}
</script>