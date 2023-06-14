<template>
    <div class="home-page">
        <app-banner/>
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <app-feed-toggler/> 
                    <app-feed :api-url ='apiUrl'></app-feed>
                </div>
                <div class="col-md-3">
                <app-popular-tags></app-popular-tags>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import appFeed from '@/components/Feed.vue';
import appPopularTags from '@/components/PopularTags.vue'; 
import appBanner from '@/components/Banner.vue'; 
import appFeedToggler from '@/components/FeedToggler.vue';


export default {
    name: 'appYourFeed',
    components: {
        appFeed,  
        appPopularTags,  
        appBanner,
        appFeedToggler
    },
    data(){
        return {
            apiUrl:'/articles/feed',          
        }
    }
}
</script>