<template>
    <div>  
        <app-loading v-if="isLoading"/>
        <app-error-message v-if="error" />
        <div v-if="popularTags" class="sidebar">
            <p>Popular tags</p>
                <div class="tag-list">
                <router-link 
                    class="tag-pill tag-default" 
                    v-for="(popularTag) in popularTags" 
                    :key="popularTag" 
                    :to="{/* name: 'tag', params: {slug: popularTag} */
                        path:`/tags/${popularTag}`}">
                        {{ popularTag }}
                </router-link>  
            </div>
        </div> 

    </div>
</template>

<script>

import { actionTypes } from '@/store/modules/popularTags'; 
import {mapState} from 'vuex';  
import appLoading from '@/components/Loading.vue'; 
import appErrorMessage from '@/components/ErrorMessage.vue';

export default {
    name: 'appPopularTags',
    components: {
        appLoading,
        appErrorMessage
    },
    computed: {
        ...mapState({
            isLoading: state => state.popularTags.isLoading, 
            popularTags: state => state.popularTags.data,
            error: state => state.popularTags.error,
        }),
    },
    mounted(){
        this.$store.dispatch(actionTypes.getTag) 
    }
} 
</script>  