<template>
  <section id="foot_guide" class="fix-footer">
    <div v-for="(item,key) in tab.name" :key="key" class="item" :class="{active:active[key]}  " @click = "gotoAddress('/'+ tab.router[key],key)">
        <span ><i :class="'iconfont ' +tab.icon[key]"></i></span>
        <p>{{item}}</p>
    </div>
  </section>
</template>
<script>
export default {
    	data(){
            return{
                tab:{
                    name:['首页','体测报告','体重记录','我的'],
                    router:['home','report','record','personCenter'],
                    icon:['icon-shouye','icon-baogao','icon-tizhongxiangqing','icon-yonghu']
                }
            }
        },
        props: {
            active: Array 
        },
        methods: {
        	gotoAddress(path,key){
                this.$router.push(path);
                for(let i=0;i<this.active.length;i++){
                    this.active[i]=false;
                    this.active[key]=true;
                }
                this.$set(this.active, 4, 0);
                
        	}
        }

    }
</script>
<style>

</style>
