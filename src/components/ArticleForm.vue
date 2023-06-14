<template>
    <div class="editor page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <app-validation-errors v-if="errors" :validationErrors="errors"/>
                    <form @submit.prevent="onSubmit()">
                        <fieldset>
                            <fieldset class="form-group">
                                <input 
                                class="form-control form-control-lg" type="text" placeholder="Article Title" v-model="title"
                                >
                            </fieldset>
                            <fieldset class="form-group">
                                <input 
                                class="form-control" type="text" placeholder="What's this article about?" v-model="description"
                                >
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea rows="8"
                                class="form-control"  placeholder="Write your article (in markdown)" v-model="body"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input 
                                class="form-control" type="text" placeholder="Enter tags" v-model="tagList"
                                >
                            </fieldset>
                            <div class="tag-list">Tag List</div>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" type="submit" :disable="isSubmitting">
                            Publish Article
                        </button> 
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import appValidationErrors from '@/components/ValidationErrors';
export default {
    name:'appArticleForm',
    components: {
        appValidationErrors,
    },
    props: {
        initialValues:{
            type: Object,
            required: true
        },
        errors:{
            type: Object,
            required: false
        },
        isSubmitting:{
            type: Boolean,
            required: true
        },

    },
    data(){
        return{
                title: this.initialValues.title,
                description: this.initialValues.description,
                body: this.initialValues.body,
                tagList: this.initialValues.tagList
            }
        },
        methods: {
            onSubmit(){
                const form = {
                    title: this.title,
                    description: this.description,
                    body: this.body,
                    tagList: this.tagList.split(' ')
                }
                this.$emit('articleSubmit', form)
            },
        },
}
</script>