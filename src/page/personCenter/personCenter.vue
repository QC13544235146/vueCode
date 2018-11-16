<template>
      <div class="container">
    <div class="report-hd myCenter">
      <img :src="data.pic" alt="">
      <p>{{data.nickname}}</p>
    </div>
    <div class="weight-infor p-infor">
      <div class="item" v-for="(item, index) in data.list" :key="index">
        <div>
          <span><i :class="['iconfont', item.icon]"></i></span>
          <p>{{item.name}}</p>
          <div class="ft">{{item.value}}</div>
        </div>
      </div>
    </div>
    <div class="btn-area">
      <button class="btn" id="edit">编辑资料</button>
    </div>
  </div>
</template>
<script>

export default {
  name: "center",
  data() {
    return {
      data: {
        nickname: "",
        pic: "",
        list: [
          {
            name: "性别",
            value: "保密",
            icon: "icon-nanren"
          },
          {
            name: "年龄",
            value: "",
            icon: "icon-rili"
          },
          {
            name: "身高（cm）",
            value: "",
            icon: "icon-shengao1"
          },
          {
            name: "体重（kg）",
            value: "",
            icon: "icon-tizhong"
          }
        ],
        editData:{
          agedata:[],
          heightdata:[]
        }
      }
    };
  },
   created:function(){
    this.getCustomInfo();
  },
  mounted: function() {
    this.run();
    this.edit();
  },
  methods: {
    edit() {
      var _this=this; 
      var pickerExtend = new PickerExtend({
        trigger: "#edit",
        title: "编辑",
        wheels: [
          {
            data: [{ value: "男" }, { value: "女" }],
            cusParam: false
          },
          {
            data: this.data.editData.agedata,
            cusParam: false
          },
          {
            data:this.data.editData.heightdata,
            cusParam: false
          }
        ],
        position: [0, 1],
        callback: function(indexArr, data) {
          console.log(data); //返回选中的json数据
           var age = data[1].value.replace(/[^0-9]/gi, "");
           var height = data[2].value.replace(/[^0-9]/gi, "");
           var gender = data[0].value;
           _this.$set(_this.data.list[0],'value',age)
           _this.$set(_this.data.list[1],'value',gender)
           _this.$set(_this.data.list[2],'value',height)
          // if (gender == "男") {
          //   gender = 1;
          // } else if (gender == "女") {
          //   gender = 2;
          // }
          //addInfor(gender, age, height);
        }
      });
    },
    run() {
      var agedata=[];
      var heightdata=[];
      for (var i = 18; i <= 60; i++) {
        agedata.push({ value: i + "岁" });
      }
      for (var j = 140; j < 250; j++) {
        heightdata.push({ value: j + "cm" });
      }
      this.$set(this.data.editData,'agedata',agedata)
      this.$set(this.data.editData,'heightdata',heightdata)
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
              this.$set(this.data.list[0], "value", data.gender==1?'男':'女');
              this.$set(this.data.list[1], "value", data.age);
              this.$set(this.data.list[2], "value", data.height);
              this.$set(this.data.list[3], "value", data.weight);

              //获取身体指标
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