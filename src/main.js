import Vue from 'vue';
import './styles/main.css'
import App from './component/app'
new Vue({
    el:'#app',
    template: '<App/>',
    components: { App }
})