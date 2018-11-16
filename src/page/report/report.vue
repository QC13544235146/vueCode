<template>
     <div class="container">
    <div class="report-hd bg-black">
      <div class="head-pic">
        <img :src="data.pic" alt="">
        <span>{{data.nickname}}</span>
      </div>
      <div class="score">
        <div>
           <strong>0</strong>
          <p>健康得分<i class="iconfont icon-wenti"></i></p>
        </div>
      </div>
    </div>
    <div class="result-box">
      <div class="hd">
       <h4>
         <span></span>
         评测结果
        </h4>
      </div>
      <div class="result">
        <div class="accResult">
            <p>评测结果</p>
            <p><span class="lv hide">您的身体属于<span id="lv">肥胖</span>，</span>为了您的健康和身材，可要控制饮食和加强运动哦。</p>
        </div>
        <div class="accSuggess">
          <p>饮食建议</p>
          <p>减少摄入脂肪及炭水化合物（面包、水饺、面条……）的食物，多吃蔬菜、粗粮类食物少吃肉类和甜食，降低身体糖分，促进燃烧脂肪。</p>
          <img src="../../images/list01.jpg" alt="">
          <img src="../../images/list02.jpg" alt="">
        </div>
        <div class="accExercise">
            <p>运动建议</p>
            <p>每天坚持70%有氧运动（跑步、单车等）和30%器械运动，坚持数月，你的好身材就出来了。</p>
            <img src="../../images/list03.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "record",
  data() {
    return {
      data: {
        pic:'',
        nickname:'',
        score: 80
      }
    };
  },
  created:function(){
    this.getCustomInfo();
  },
  mounted: function() {
    this.runScore(this.data.score);
  },
  methods: {
    runScore(score) {
      let _score = 0;
      var timer = window.setInterval(() => {
        // 设置定时器
        if (_score != score) {
          // 到达终点，关闭定时器
          _score++;
        } else {
          // 未到终点，进度自增
          window.clearInterval(timer);
          _score = score;
        }
        if (document.querySelector(".score strong")) {
          document.querySelector(".score strong").innerHTML = _score;
        }
      }, 10);
    },
    getCustomInfo() {
      this.$api.get("/customInfo", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data); //请求成功，response为成功信息参数

          if (response.data.success) {
            var data = response.data.data;
            console.log(data);
            if (data) {
              this.$set(this.data, "pic", data.pic);
              this.$set(this.data, "nickname", data.nickname);
              //this.$set(this.data, "score", data.score);

              //获取身体指标
              //this.getWeightInfo();
            }
          }
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    }
  }
};
</script>