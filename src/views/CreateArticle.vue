<template> <div>
    <app-article-form
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting "
        @articleSubmit="onSubmit"/> 
        {{initialValues}}
        </div>
</template>

<script>
import appArticleForm from '@/components/ArticleForm';
import {actionTypes} from '@/store/modules/createArticle'
import {mapState} from 'vuex'; 
export default {
    name: 'appCreateArticle',
    components: {
        appArticleForm
    },
    data(){
        return {
            initialValues:{
                title: '',
                description: '',
                body: '',
                tagList: []
            },
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.createArticle.isSubmitting,
            validationErrors: state => state.createArticle.validationErrors
        })
    },
    methods:{
        onSubmit(articleInput){
            this.$store.dispatch(actionTypes.createArticle, {articleInput})
            .then(article => {
                this.$router.push({/* name:"article", params:{slug: article.slug} */path:article.slug})
            })
        }
    } 
}
</script>