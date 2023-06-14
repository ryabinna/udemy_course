<template>
    <div>
        <ul class="error-messages">
            <li v-for="item in Object.keys(validationErrors)" :key = "item">
                {{item +' '+ validationErrors[item]}}
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    name: "appValidationErrors",
    props: {
        validationErrors: {
            type: Object,
            required: true
        }
    },
    computed: {
    /*     errorMassages(){
            return this.validationErrors[field]
        } */
    }
}
</script>