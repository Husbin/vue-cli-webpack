<template>
    <div>
        <p id="p-text">{{msg}}</p><img style="display: block;width: 100%" :src="img">
    </div>
</template>

<script>
    import img from '../img/night.png'
    export default {
        name: "app",
        data:function () {
            return{
                msg:'hello vue',
                img:img,
            }
        },
        created(){
            console.log(this.msg);
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>