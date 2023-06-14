import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage'


const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoginIn: null,
    isloading: true,

}
export const  mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    updateCurrentUserStart: '[auth] updateCurrentUserStart',
    updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
    updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

    logout: '[auth] logout',
}
export const  actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    updateCurrentUser: '[auth] updateCurrentUser',
    logout: '[auth] logout',
}
const mutations = {
    [mutationTypes.registerStart](state){
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.registerSuccess](state, payload){
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoginIn = true;
    },
    [mutationTypes.registerFailure](state, payload){
        state.isSubmitting = false;
        state.validationErrors = payload
    },
    [mutationTypes.loginStart](state){
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    [mutationTypes.loginSuccess](state, payload){
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoginIn = true;
    },
    [mutationTypes.loginFailure](state, payload){
        state.isSubmitting = false;
        state.validationErrors = payload
    },
    [mutationTypes.getCurrentUserStart](state){
        state.isLoading = true;
    },
    [mutationTypes.getCurrentUserSuccess](state, payload){
        state.isLoading = false;
        state.currentUser = payload;
        state.isLoginIn = true;
    },
    [mutationTypes.getCurrentUserFailure](state){
        state.isLoading = false;
        state.isLoginIn = false;
        state.currentUser = null;
    },
    [mutationTypes.updateCurrentUserStart](){},
    [mutationTypes.updateCurrentUserSuccess](state, payload){
        state.currentUser = payload;
    },
    [mutationTypes.updateCurrentUserFailure](){},

    [mutationTypes.logout](state){
        state.currentUser = null;
        state.isLoginIn = false
    }
}
export const getterTypes = {
    isAnonymous: '[auth] isAnonymous',
    currentUser: '[auth] currentUser',
    isLoginIn: '[auth] isLoginIn',
}
const getters = {
    [getterTypes.isAnonymous]: state => {
        return state.isLoginIn === false
    },
    [getterTypes.currentUser]: state => {
        return state.currentUser
    },
    [getterTypes.isLoginIn]: state => {
        return Boolean(state.isLoginIn)
    }
}



const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise(resolve=> {
            context.commit(mutationTypes.registerStart);
            authApi.register(credentials)
            .then(response => {
                context.commit(mutationTypes.registerSuccess, response.data.user);
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            })
            .catch(result => {
                context.commit(mutationTypes.registerFailure, result.response.data.errors)
            })
        })
    },
    [actionTypes.login](context, credentials) {
        return new Promise(resolve=> {
            context.commit(mutationTypes.loginStart);
            authApi.login(credentials)
            .then(response => {
                context.commit(mutationTypes.loginSuccess, response.data.user);
                setItem('accessToken', response.data.user.token)
                resolve(response.data.user)
            })
            .catch(result => {
                context.commit(mutationTypes.loginFailure, result.response.data.errors)
            })
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise(resolve=> {
            context.commit(mutationTypes.getCurrentUserStart);
            authApi.getCurrentUser()
            .then(response => {
                context.commit(mutationTypes.getCurrentUserSuccess, response.data.user);
                resolve(response.data.user)
            })
            .catch(() => {
                context.commit(mutationTypes.getCurrentUserFailure)
            })
        })
    },
    [actionTypes.updateCurrentUser](context, {currentUserInput}) {
        return new Promise(resolve=> {
            context.commit(mutationTypes.updateCurrentUserStart);
            authApi.updateCurrentUser(currentUserInput)
            .then(user => {
                context.commit(mutationTypes.updateCurrentUserSuccess, user);
                resolve(user)
            })
            .catch((result) => {
                context.commit(mutationTypes.updateCurrentUserFailure, result.response.data.errors)
            })
        })
    },
    [actionTypes.logout](context){
        return new Promise( resolve => {
            setItem('accessToken', '');
            context.commit(mutationTypes.logout)
            resolve()
        }

        )
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}