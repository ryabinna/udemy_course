<template>
    <ul class="tag-list">
        <li
            class="tag-pill tag-default tag-outline" 
            v-for="(tag, index) in tagList" 
            :key="index" 
               > {{tag}}</li>
    </ul>
</template>

<script>
export default {
    name:'appTagList',
    props: {
        tagList: {
            type: Array,
            required: false,
        }
    }
}
</script>