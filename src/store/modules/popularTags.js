import popularTagsApi from '@/api/PopularTags'

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getTagStart: '[tag] Get tag start',
    getTagSuccess: '[tag] Get tag success',
    getTagFailure: '[tag] Get tag failure',

}

export const actionTypes = {
    getTag: '[tag] Get tag'  
}

const mutations = {
    [mutationTypes.getTagStart](state) {
        state.isLoading = true;
        state.data = null
    },
    [mutationTypes.getTagSuccess](state, payload) {
        state.isLoading = false;
        state.data = payload
    },
    [mutationTypes.getTagFailure](state) {
        state.isLoading = false;
    },
}

const actions = {
    [actionTypes.getTag](context){
        
      return new Promise(resolve => {
            context.commit(mutationTypes.getTagStart)
            popularTagsApi.getPopularTags()
            .then(tags => {context.commit(mutationTypes.getTagSuccess, tags);
            resolve(tags)
        })
        .catch(()=> {
            context.commit(mutationTypes.getTagFailure)
        })
        }) 
    }
}

export default {
    state,
    mutations,
    actions
}