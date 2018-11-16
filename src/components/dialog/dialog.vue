<template>
    <div class="mask" v-if="showDialog">
        <div class="mask-content wt">
            <div>
            <p class="tl">称重正确步骤</p>
            <ul>
                <li>先从体重秤上下来。</li>
                <li>重新平稳上称，双脚各踩称面的左右50%。</li>
                <li>待显示屏稳定后，重新扫码。</li>
            </ul>
            <div class="btn-area mini">
                <button class="btn mini-btn circle" @click="hideDialog()">知道了</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      //showDialog:false
    };
  },
  props:['showDialog'],
  methods: {
    hideDialog(){
        this.$emit('update:showDialog',false)
    }
  }
};
</script>
