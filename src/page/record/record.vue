<template>
    <div>
        <div class="report-hd">
            <div class="txt" @click="showDialog()">体重不准？</div> 
        </div>
        <div class="person-info">
            <div class="info-main">
                <div class="record-male">
                    <i class="iconfont icon-nanxingtubiao"></i>
                </div>
                <div class="person-data">
                    <strong>{{list.weight}}</strong><span>斤</span>
                    <p><span>{{list.ctime}}</span>称重结果</p>
                </div>
            </div>
        </div>
        <div class="record">
            <div>
                <p>历史体重记录</p>
                <div id="myChart" style="height:300px"></div>
            </div>
        </div>
        <show-dialog v-bind:showDialog.sync="data.showDialog"></show-dialog>
    </div>
</template>
<script>
import ShowDialog from "../../components/dialog/dialog";
import echarts from "echarts/lib/echarts";
// 引入柱状图组件
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "report",
  data() {
    return {
      data: {
        showDialog: false
      },
      list: {
        weight: 198,
        ctime: "2018-10-11",
        chartData: {
          x_data: ["9.01", "9.02", "9.03", "9.04", "9.05", "9.06"],
          s_data: [5, 20, 36, 10, 10, 20]
        }
      }
    };
  },
  components: {
    ShowDialog
  },
  created: function() {
    this.getDdata();
  },
  mounted: function() {},
  methods: {
    drawLine() {
      var _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        xAxis: {
          axisLabel: {
            margin: 8,
            interval: 0, //解决代码
          },
          data: _this.list.chartData.x_data
        },
        yAxis: {},
        series: [
          {
            name: "体重",
            type: "line",
            smooth: true,
            data: _this.list.chartData.s_data
          }
        ]
      });
    },
    showDialog() {
      this.$set(this.data, "showDialog", true);
    },
    getDdata() {
      this.$api.get("/lineChart", {}, response => {
        if (response.status >= 200 && response.status < 300) {
          //console.log(response.data); //请求成功，response为成功信息参数
         
          if (response.data.success) {
            var data = response.data.data;
            var w_data = [];
            var t_data = [];
            if (data) {
              for (let i = 0; i < data.length; i++) {
                w_data.push(data[i].weight);
                t_data.push(data[i].ctime);
              }
              this.$set(this.list.chartData, "x_data", t_data);
              this.$set(this.list.chartData, "s_data", w_data);
            }
          }
          this.drawLine();
        } else {
          console.log(response.message); //请求失败，response为失败信息
        }
      });
    }
  }
};
</script>