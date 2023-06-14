<template>
    <div>
    <app-article-form v-if="initialValues"
            :initial-values="initialValues"
            :errors="validationErrors"
            :is-submitting="isSubmitting "
            @articleSubmit="onSubmit"
        />
        <app-loading v-if="isLoading" /> 
    </div>
</template>

<script>
import appArticleForm from '@/components/ArticleForm';
import appLoading from '@/components/Loading.vue'
import {actionTypes} from '@/store/modules/editArticle';
import {mapState} from 'vuex'; 
export default {
    name: 'appEditArticle',
    components: {
        appArticleForm,
        appLoading,
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.editArticle.isSubmitting,
            validationErrors: state => state.editArticle.validationErrors,
            isLoading: state => state.editArticle.isLoading,
            article: state => state.editArticle.article,
        }),
        initialValues(){
            if(!this.article){
                return null
            }
            return {
                title: this.article.title,
                description: this.article.description,
                body: this.article.body,
                tagList:this.article.tagList.join(' ')
            }
        }
    },
    methods:{
        onSubmit(articleInput){
            const slug = this.$route.params.slug
            this.$store.dispatch(actionTypes.updateArticle, {slug, articleInput})
            .then(article => {
                this.$router.push({name:"article", params:{slug: article.slug}})
            })
        }
    },
    mounted(){
        this.$store.dispatch(actionTypes.getArticle, this.$route.params.slug)
    } 
}
</script>