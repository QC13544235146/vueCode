<template>
   <div class="container">
        <div class="report-hd">
            <div class="txt" @click="showDialog()">体重不准？</div>
        </div>
        <div class="person-info">
            <div class="info-main">
                <div class="record-male">
                    <i :class="['iconfont',data.gender==1? 'icon-nanxingtubiao':'icon-nvxing' ]"></i>
                </div>
                <router-link to="record" class="fat-history">
                    <i class="iconfont icon-shijian"></i>
                </router-link>
                <!--  -->
                <div class="person-data">
                    <strong>{{data.weight}}</strong><span>斤</span>
                    <p class="time"><span>{{data.wtime}}</span>称重结果</p>
                </div>
            </div>
        </div>
        <div class="btn-area" v-if="data.show">
            <button class="btn">查看健康分析</button>
        </div>
        <div class="weight-infor" v-else>
            <div class="item" v-for="(item,key) in data.bodyIndex.items" :key="key"  :class="{active:item.active}" @click="unfold(key)">
                <div>
                    <span><i :class="['iconfont', item.icon]"></i></span>
                    <p>{{item.name}} <span>{{item.value}}</span></p>
                    <div class="ft">{{item.quota}}<b><i class="iconfont icon-xiala"></i></b></div>
                </div>
                <div class="detail">
                    <div class="circleChart" style="text-align:center; position:relative">
                        <span style="position:absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">{{item.value}}</span>
                        <svg width="150" height="150" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="74" fill="none" stroke="#f1f1f1" stroke-width="12" />
                            <circle cx="100" cy="100" r="74" fill="none" stroke="#FC4D04" stroke-width="12" stroke-dasharray="465" :stroke-dashoffset="item.dashOffsetCircle" stroke-linecap="round" />
                            <circle cx="100" cy="100" r="74" fill="none" stroke="green" stroke-width="12" stroke-dashoffset="464.5" stroke-dasharray="465" stroke-linecap="round" id="circleInner" style="transform:rotate(0rad); transform-origin: 100px 100px;"/>
                        </svg>
                    </div>
                    <div class="progress-box" v-if="item.showPro">
                        <div class="progress" >
                            <span class="prog" v-bind:style="{'left':item.proValue+'%'}"></span>
                        </div>
                        <div class="desc">
                            <span v-for="(target,key) in item.target" :key="key">{{target}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="human-dt">
                <div>
                <p>您的标准体重指标</p>
                <div class="norm">
                    <p>标准体重</p>
                    <p>49.0KG</p>
                </div>
                <div class="norm">
                    <p>标准三围</p>
                    <p>79.5CM</p>
                    <p>79.5CM</p>
                    <p>79.5CM</p>
                </div>
                </div>
                <img src="../../images/man.png" alt="">
                <div class="rt">
                <p>您的健美体重指标</p>
                <div class="norm">
                    <p>健美体重</p>
                    <p>49.0KG</p>
                </div>
                <div class="norm">
                    <p>美体三围</p>
                    <p>79.5CM</p>
                    <p>79.5CM</p>
                    <p>79.5CM</p>
                </div>
                </div>
            </div>
        </div>
        <show-dialog v-bind:showDialog.sync="data.showDialog"></show-dialog>
   </div>
</template>
<script>
import ShowDialog from "../../components/dialog/dialog";
export default {
  name: "home",
  data() {
    return {
      data: {
        msg: "首页",
        showDialog: false,
        show: true,
        weight: "",
        wtime: "",
        gender: 0,
        age: 0,
        bodyIndex: {
          items: [
            {
              name: "体脂",
              value: "0%",
              dashOffsetCircle: 300,
              proValue: 10,
              quota: "",
              showPro:true,
              active: false,
              icon: "icon-jitui",
              target: ["低", "偏低", "标准", "偏高", "高", "极高"]
            },
            {
              name: "BMI",
              value: "0%",
              dashOffsetCircle: 400,
              proValue: 10,
              quota: "",
              showPro:true,
              active: false,
              icon: "icon-nanren",
              target: ["偏瘦", "标准", "肥胖", "极度肥胖"]
            },
            {
              name: "水分率",
              value: "0%",
              dashOffsetCircle: 200,
              proValue: 10,
              quota: "",
              showPro:true,
              active: false,
              icon: "icon-shui",
              target: ["偏低", "标准", "偏高"]
            },
            {
              name: "骨量",
              value: "0%",
              dashOffsetCircle: 150,
              proValue: 10,
              quota: "",
              showPro:true,
              active: false,
              icon: "icon-gutou",
              target: ["偏低", "标准", "偏高"]
            },
            {
              name: "肌肉",
              value: "0KG",
              dashOffsetCircle: 160,
              proValue: 10,
              quota: "",
              showPro:true,
              active: false,
              icon: "icon-jirouliliang",
              target: ["偏低", "标准"]
            },
            {
              name: "蛋白质",
              value: "0%",
              dashOffsetCircle: 423,
              proValue: 0,
              quota: "",
              showPro:true,
              active: false,
              icon: "icon-jidan",
              target: ["偏低", "标准", "偏高"]
            },
            {
              name: "基础代谢",
              value: "0%",
              dashOffsetCircle: 31,
              proValue: 0,
              quota: "",
              showPro:false,
              active: false,
              icon: "icon-jichudaixie",
              target: ["偏低", "优"]
            }
          ]
        }
      }
    };
  },
  components: {
    ShowDialog
  },
  created: function() {
    this.getCustomInfo()
    
  },
  methods: {
    unfold(key) {
      this.data.bodyIndex.items[key].active = !this.data.bodyIndex.items[key]
        .active;
    },
    showDialog() {
      this.$set(this.data, "showDialog", true);
    },

    getCustomInfo() {
      this.$api.get("/customInfo", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data); //请求成功，response为成功信息参数

          if (response.data.success) {
            var data = response.data.data;
            console.log(data);
            if (data) {
              this.$set(this.data, "gender", data.gender);
              this.$set(this.data, "age", data.age);

              //获取身体指标
              this.getWeightInfo()
            }
          }
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      })
     
    },
    getWeightInfo() {
      this.$api.get("/weightInfo", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          //console.log(response.data); //请求成功，response为成功信息参数

          if (response.data.success) {
            var data = response.data.data;
            if (data) {
              let time = `${data.createTime[0]}-${data.createTime[1]}-${
                data.createTime[2]
              }`;
              this.$set(this.data, "weight", data.weight*2);
              this.$set(this.data, "wtime", time);
              if (data.bodyIndex) {
                var bodyIndex = data.bodyIndex;
                var gender=this.data.gender;
                var age=this.data.age;
                var weight=this.data.weight;
                if (bodyIndex.fatRate) {
                  let fatRate = bodyIndex.fatRate.toFixed(2);
                  var lt;
                  var lv;
                  if(gender==1){
                       //5.0-10.0-20.0-25.0-75.0
                       if(fatRate<=5){
                           lt=fatRate/5*100/6;
                           lv='低'
                       }else if(fatRate>5 &&fatRate<=10){
                           lt=100/6+(fatRate-5)/5*100/6;
                           lv='偏低'
                       }else if(fatRate>10 &&fatRate<=20){
                           lt=100/6*2+(fatRate-10)/10*100/6;
                           lv='标准'
                       }else if(fatRate>20 &&fatRate<=25){
                           lt=100/6*3+(fatRate-20)/5*100/6;
                           lv='偏高'
                       }else if(fatRate>25 &&fatRate<=75){
                           lt=100/6*4+(fatRate-25)/50*100/6;
                           lv='高'
                       }else{
                           lt=100/6*5+(fatRate-75)/150*100/6;
                           lv='极高'
                       }
                   }else if(gender==2){
                       //15.0-20.0-30.0-35.0-75.0
                       if(fatRate<=15){
                           lt=fatRate/15*100/6;
                           lv='低'
                       }else if(fatRate>15 &&fatRate<=20){
                           lt=100/6+(fatRate-15)/15*100/6;
                           lv='偏低'
                       }else if(fatRate>20 &&fatRate<=30){
                           lt=100/6*2+(fatRate-20)/10*100/6;
                           lv='标准'
                       }else if(fatRate>30 &&fatRate<=35){
                           lt=100/6*3+(fatRate-30)/5*100/6;
                           lv='偏高'
                       }else if(fatRate>35 &&fatRate<=75){
                           lt=100/6*4+(fatRate-35)/40*100/6;
                           lv='高'
                       }else{
                           lt=100/6+(fatRate-75)/180*100/6;
                           lv='极高'
                       }
                   }
                  this.$set(this.data.bodyIndex.items[0], 'value',fatRate+'%');
                  this.$set(this.data.bodyIndex.items[0], 'proValue',lt);
                  this.$set(this.data.bodyIndex.items[0], 'dashOffsetCircle',465-465*fatRate/100);
                  this.$set(this.data.bodyIndex.items[0], 'quota',lv);
                }
                if(bodyIndex.bmi){
                   var bmi=bodyIndex.bmi.toFixed(2);
                   var lt;
                   var lv;
                   if(bmi<=18.5){
                       lt=(bmi)/18.5*25;
                       lv='偏瘦'
                   }else if(18.5<bmi && bmi<=24){
                       lt=25+(bmi-18.5)/(24-18.5)*25;
                       lv = "标准";
                   }else if(24<bmi && bmi<=28){
                       lt=50+(bmi-24)/(28-24)*25;
                       lv = "轻度肥胖";
                   }else{
                       lt=75+(bmi-28)/(200-28)*25;
                       lv = "重度肥胖";
                   }
                   (lt>10)?lt:'10';
                   (lt<90)?lt:'90';
                   this.$set(this.data.bodyIndex.items[1], 'value',bmi);
                   this.$set(this.data.bodyIndex.items[1], 'proValue',lt);
                   this.$set(this.data.bodyIndex.items[1], 'dashOffsetCircle',465-465*bmi/100);
                   this.$set(this.data.bodyIndex.items[1], 'quota',lv);
               }
               if(bodyIndex.waterRate){
                   var waterRate=bodyIndex.waterRate.toFixed(2);
                   var lt;
                   var lv;
                   if(gender==1){
                       if(age<=15){
                           if(waterRate<=56){
                               lt=waterRate/56*100/3;
                               lv='偏低'
                           }else if(waterRate>56 && waterRate<=66){
                               lt=100/3+(waterRate-56)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-66)/200*100/3;
                               lv='偏高'
                           }
                       }else if(age>15 &&age<=30){
                           if(waterRate<=55){
                               lt=waterRate/55*100/3;
                               lv='偏低'
                           }else if(waterRate>55 && waterRate<=65){
                               lt=100/3+(waterRate-55)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-65)/200*100/3;
                               lv='偏高'
                           }
                       }else if(age>30 &&age<=61){
                           if(waterRate<=54){
                               lt=waterRate/54*100/3;
                               lv='偏低'
                           }else if(waterRate>54 && waterRate<=64){
                               lt=100/3+(waterRate-54)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-64)/200*100/3;
                               lv='偏高'
                           }
                       }else{
                           if(waterRate<=53){
                               lt=waterRate/53*100/3;
                               lv='偏低'
                           }else if(waterRate>53 && waterRate<=63){
                               lt=100/3+(waterRate-53)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-63)/200*100/3;
                               lv='偏高'
                           }
                       }
                   }else{
                       if(age<=15){
                           if(waterRate<=46){
                               lt=waterRate/46*100/3;
                               lv='偏低'
                           }else if(waterRate>46 && waterRate<=61){
                               lt=100/3+(waterRate-46)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-61)/200*100/3;
                               lv='偏高'
                           }
                       }else if(age>15 &&age<=30){
                           if(waterRate<=45){
                               lt=waterRate/45*100/3;
                               lv='偏低'
                           }else if(waterRate>45 && waterRate<=60){
                               lt=100/3+(waterRate-45)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-60)/200*100/3;
                               lv='偏高'
                           }
                       }else if(age>30 &&age<=61){
                           if(waterRate<=44){
                               lt=waterRate/44*100/3;
                               lv='偏低'
                           }else if(waterRate>44 && waterRate<=59){
                               lt=100/3+(waterRate-44)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-59)/200*100/3;
                               lv='偏高'
                           }
                       }else{
                           if(waterRate<=43){
                               lt=waterRate/43*100/3;
                               lv='偏低'
                           }else if(waterRate>43 && waterRate<=58){
                               lt=100/3+(waterRate-43)/10*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(waterRate-58)/200*100/3;
                               lv='偏高'
                           }
                       }
                   }
                   (lt>10)?lt:'10';
                   (lt<90)?lt:'90';
                   this.$set(this.data.bodyIndex.items[2], 'value',waterRate+'%');
                   this.$set(this.data.bodyIndex.items[2], 'proValue',lt);
                   this.$set(this.data.bodyIndex.items[2], 'dashOffsetCircle',465-465*waterRate/100);
                   this.$set(this.data.bodyIndex.items[2], 'quota',lv);

               }
               if(bodyIndex.bone){
                   var bone=bodyIndex.bone.toFixed(2);
                   var lt;
                   var lv;
                   if(gender==1){
                       if(weight<60){
                           if(bone<0.5){
                               lt=bone/0.5*100/3;
                               lv='偏低'
                           }else if(bone>=0.5 &&bone<=4.5){
                               lt=100/3+(bone-0.5)/4*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(bone-4.5)/50*100/3;
                               lv='偏高'
                           }
                       }else if(weight>=60 &&weight<=75){
                           if(bone<0.5){
                               lt=bone/0.5*100/3;
                               lv='偏低'
                           }else if(bone>=0.5 &&bone<=6){
                               lt=100/3+(bone-0.5)/5.5*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(bone-6)/50*100/3;
                               lv='偏高'
                           }
                       }else{
                           if(bone<0.5){
                               lt=bone/0.5*100/3;
                               lv='偏低'
                           }else if(bone>=0.5 &&bone<=7.5){
                               lt=100/3+(bone-0.5)/6*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(bone-7.5)/50*100/3;
                               lv='偏高'
                           }
                       }
                   }else{
                       if(weight<45){
                           if(bone<0.5){
                               lt=bone/0.5*100/3;
                               lv='偏低'
                           }else if(bone>=0.5 &&bone<=3){
                               lt=100/3+(bone-0.5)/2.5*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(bone-3)/50*100/3;
                               lv='偏高'
                           }
                       }else if(weight>=45 &&weight<=60){
                           if(bone<0.5){
                               lt=bone/0.5*100/3;
                               lv='偏低'
                           }else if(bone>=0.5 &&bone<=4.2){
                               lt=100/3+(bone-0.5)/3.7*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(bone-4.2)/50*100/3;
                               lv='偏高'
                           }
                       }else{
                           if(bone<0.5){
                               lt=bone/0.5*100/3;
                               lv='偏低'
                           }else if(bone>=0.5 &&bone<=3){
                               lt=100/3+(bone-0.5)/2.5*100/3;
                               lv='标准'
                           }else{
                               lt=100/3*2+(bone-3)/50*100/3;
                               lv='偏高'
                           }
                       }
                   }
                   (lt>10)?lt:'10';
                   (lt<90)?lt:'90';
                   this.$set(this.data.bodyIndex.items[3], 'value',bone+'KG');
                   this.$set(this.data.bodyIndex.items[3], 'proValue',lt);
                   this.$set(this.data.bodyIndex.items[3], 'dashOffsetCircle',465-465*bone/100);
                   this.$set(this.data.bodyIndex.items[3], 'quota',lv);
               }
               if(bodyIndex.muscle){
                   var muscle=bodyIndex.muscle.toFixed(2);
                   var lt;
                   if(gender==1){
                       if(muscle<36){
                           lt=muscle/36*50;
                           lv='偏低'
                       }else{
                           lt=50+(muscle-36)/100*50;
                           lv='标准'
                       }
                   }else{
                       if(muscle<30){
                           lt=muscle/30*50;
                           lv='偏低'
                       }else{
                           lt=50+(muscle-30)/100*50;
                           lv='标准'
                       }
                   }
                   (lt>10)?lt:'10';
                   (lt<90)?lt:'90';
                   this.$set(this.data.bodyIndex.items[4], 'value',muscle+'KG');
                   this.$set(this.data.bodyIndex.items[4], 'proValue',lt);
                   this.$set(this.data.bodyIndex.items[4], 'dashOffsetCircle',465-465*muscle/100);
                   this.$set(this.data.bodyIndex.items[4], 'quota',lv);
               }
               if(bodyIndex.protein){
                   var protein=bodyIndex.protein.toFixed(2);
                   var lt;
                   var lv;
                   if(protein<16){
                       lt=protein/16*100/3;
                       lv='偏低';
                   }else if(protein>=16 && protein<=20){
                       lt=100/3+(protein-16)/4*100/3;
                       lv='标准';
                   }else{
                       lt=100/3*2+(protein-20)/50*100/3;
                       lv='偏高';
                   }
                   (lt>10)?lt:'10';
                   (lt<90)?lt:'90';
                   this.$set(this.data.bodyIndex.items[5], 'value',protein+'KG');
                   this.$set(this.data.bodyIndex.items[5], 'proValue',lt);
                   this.$set(this.data.bodyIndex.items[5], 'dashOffsetCircle',465-465*protein/100);
                   this.$set(this.data.bodyIndex.items[5], 'quota',lv);
               }
               if(bodyIndex.bmr){
                   var bmr=bodyIndex.bmr.toFixed(2);
                   var lv;
                   if(age<18){
                       lv='优'
                   }else{
                       if(gender==1){
                           if(age>=18 && age<30){
                               if(bmr>1550){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }else if(age>=30 && age<50){
                               if(bmr>1500){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }else if(age>=50 && age<70){
                               if(bmr>1350){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }else{
                               if(bmr>1220){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }
                       }else if(gender==2){
                           if(age>=18 && age<30){
                               if(bmr>1210){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }else if(age>=30 && age<50){
                               if(bmr>1170){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }else if(age>=50 && age<70){
                               if(bmr>1110){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }else{
                               if(bmr>1010){
                                   lv='优'
                               }else{
                                   lv='偏低'
                               }
                           }
                       }
                   }
                   this.$set(this.data.bodyIndex.items[6], 'value',bmr+'CAL');
                   this.$set(this.data.bodyIndex.items[6], 'proValue',lt);
                   this.$set(this.data.bodyIndex.items[6], 'dashOffsetCircle',0);
                   this.$set(this.data.bodyIndex.items[6], 'quota',lv);
               }
               this.$set(this.data,'show',false);
              }
            }
          }else{
              //alert(response.data.message)
          }
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    }
  }
};
</script>