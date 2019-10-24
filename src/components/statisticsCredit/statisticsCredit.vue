<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">诚信系统看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row class="w-100">
        <el-col :span="14">
            <div 
							class="disability-chart chart-container maring-right-10" 
							ref="chartdiv1" 
							v-loading="listLoading"
						>
						</div>
						<div style="position: absolute;top: 55px;left: 38%;" v-loading="totalLoading">
							合计: 
							<span style="margin-left:20px;">A级 </span>
							<span style="font-weight:bold; font-style:italic; font-size:25px; line-height:0.9em; vertical-align:bottom">{{totalA}}</span> 
							<span style="margin-left:20px;">B级 </span>
							<span style="font-weight:bold; font-style:italic; font-size:25px; line-height:0.9em; vertical-align:bottom">{{totalB}}</span>
							<span style="margin-left:20px;">C级 </span>
							<span style="font-weight:bold; font-style:italic; font-size:25px; line-height:0.9em; vertical-align:bottom">{{totalC}}</span>
						</div>
        </el-col>
        <el-col :span="10">
            <div 
							class="disability-chart chart-container margin-left-10" 
							ref="chartdiv2" 
							v-loading="listLoading"
							style="padding-left:15px"
						></div>
        </el-col>
    </el-row>
    <el-row class="w-100">
        <el-col :span="14">
            <div class="disability-chart chart-container maring-right-10" ref="chartdiv3" v-loading="listLoading"></div>
        </el-col>
        <el-col :span="10">
            <div class="disability-chart chart-container margin-left-10" ref="chartdiv4" v-loading="listLoading">
							<el-row style="font-size: 20px; font-weight: bold; color: #000000; margin-left:15px; margin-top:10px">红黑名单</el-row>
							<el-row style="margin:30px 10px 30px 15px; border-bottom: solid 1px;">
								<div style="font-size:15px;font-weight: bold;">红名单</div>
								<div style="margin:20px 0 20px 20px; line-height:3em">
									<span style="margin-right:40px;" v-for="item in redData" :key="item.id" :value="item.id">{{ item }}
									</span>
								</div>
							</el-row>
							<el-row style="margin:30px 0 30px 15px">
								<div style="font-size:15px;font-weight: bold;">黑名单</div>
								<div style="margin:20px 0 20px 20px; line-height:3em">
									<span style="margin-right:40px;" v-for="item in blackData" :key="item.id" :value="item.id">{{ item }}
									</span>
								</div>
							</el-row>
						</div>
        </el-col>
    </el-row>
  </div>
</template>


<script>
import Request from "@/services/api/request.js";
import Pagination from "@/components/common/pagination";
import Auth from "@/services/authentication/auth.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import chartData from "./chartData1";
import chartData1 from "./chartData2";
import axios from "axios";
am4core.useTheme(am4themes_animated);

export default {
  name: "statisticsCredit",
  // components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
			listLoading: false,
			totalLoading: true,
      toYear: null,
      toMonth: null,
      // maxCnt: null,
      maxCnt: 45,
			progressColor: "",
			leftTopData: [],
			leftDownData: [],
			rightTopData: [],
			redData: [],
			blackData: [],
			township: [],
			companyProduction: [],
			totalA: 0,
			totalB: 0,
			totalC: 0,
    };
  },
  mounted() {
		this.getTown();
		this.getCompanyProduction();
    // this.makeXYChart();
    // this.makePieChart();
    // this.makeLineChart();
  },
  methods: {
		async getTown() {
			this.listLoading = true;
      Request()
        .get("/api/town/all")
        .then(response => {
					this.township = this.township.concat(response);
					setTimeout(() => {
            this.listLoading = false;
					}, 0.5 * 1000);
					this.getLeftTopData();
					this.getRightTopData();
					this.getLeftDownData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    createGrid(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = this.formatNumber(value);
		},
		createGrid1(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = value;//this.formatNumber(value);
    },
    formatNumber(value) {
      return value / 1000 + "K";
    },
    getLeftTopData() {
      this.listLoading = true;
      Request()
        .get("/api/company_production/getTownCreditStatis")
        .then(response => {
					this.leftTopData = response.data;
					setTimeout(() => {
            this.listLoading = false;
					}, 0.5 * 1000);
					this.makeChartLeftTop();
					setTimeout(() => {
            this.totalLoading = false;
					}, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
		},
		getRightTopData() {
      this.listLoading = true;
      Request()
        .get("/api/company_credit_grade/getCreditStatis")
        .then(response => {
					this.leftTopData = response.data;
					setTimeout(() => {
            this.listLoading = false;
					}, 0.5 * 1000);
					this.makeChartRightTop();
        })
        .catch(error => {
          console.log(error);
        });
		},
		getLeftDownData() {
      this.listLoading = true;
      Request()
        .get("/api/company_credit_grade/getCreditStatis")
        .then(response => {
					this.leftDownData = response.data;
					setTimeout(() => {
            this.listLoading = false;
					}, 0.5 * 1000);
					this.makeChartLeftDown();
        })
        .catch(error => {
          console.log(error);
        });
		},
		getRedData() {
      this.listLoading = true;
      Request()
      .get("/api/company_credit_grade/all", {
					approvalStatus: 2,
					nowGrade: "A"
        })
        .then(response => {
          // this.redData = response.data;
          // this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
					}, 0.5 * 1000);
					let index = 0;
					this.redData = response.data.map(item => {
						return this.filterCompnay(item.creditCode);
					});
        })
        .catch(error => {
          console.log(error);
        });
		},
		getBlackData() {
      this.listLoading = true;
      Request()
      .get("/api/company_credit_grade/all", {
					approvalStatus: 2,
					nowGrade: "C"
        })
        .then(response => {
          // this.blackData = response.data;
          // this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
					}, 0.5 * 1000);
					let index = 0;
					this.blackData = response.data.map(item => {
						return this.filterCompnay(item.creditCode);
					});
        })
        .catch(error => {
          console.log(error);
        });
		},
		getCompanyProduction() {
			this.listLoading = true;
      Request()
        .get("/api/company_production/name")
        .then(response => {
					this.companyProduction = response;
					setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
					this.getRedData();
					this.getBlackData();
        })
        .catch(error => {
          console.log(error);
        });
		},
		filterCompnay(credit) {
			let company = this.companyProduction.find(x => x.creditCode === credit);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
		filterTownName(id) {
      let town = this.township.find(x => x.id === id);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    },
    makeChartLeftTop() {
			let chart = am4core.create(this.$refs.chartdiv1, am4charts.XYChart);
			let data = [];
			this.leftTopData.map(item => {
				data.push({
					"townId": this.filterTownName(item[4]), 
					"A级": item[1],
					"B级": item[2],
					"C级": item[3]
				});
				this.totalA += item[1];
				this.totalB += item[2];
				this.totalC += item[3];
			});
			chart.data = data;
			chart.responsive.enabled = true;
			
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "诚信等级企业数量汇总";
      title.fontSize = 20;
      title.marginBottom = 30;
      title.fontWeight = "bold";
      title.align = "left";
			categoryAxis.dataFields.category = "townId";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 600;
      valueAxis.renderer.minGridDistance = 2;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
			
			// Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "A级";
			series.dataFields.categoryX = "townId";
			series.name = "A级";
			series.tooltipText = "{name}: [bold]{valueY}[/]";
			series.stroke = am4core.color("red").lighten(-0.5);
			var gradient = new am4core.LinearGradient();
			gradient.addColor(am4core.color("red"));
			gradient.addColor(am4core.color("white"));
			gradient.rotation = 90;
			series.fill = gradient;
			let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{A级}";
      valueLabel.label.rotation = -45;
      valueLabel.label.dy = -10;
			
			let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "B级";
			series2.dataFields.categoryX = "townId";
			series2.name = "B级";
			series2.tooltipText = "{name}: [bold]{valueY}[/]";
			series2.stroke = am4core.color("yellow").lighten(-0.5);
			var gradient2 = new am4core.LinearGradient();
			gradient2.addColor(am4core.color("yellow"));
			gradient2.addColor(am4core.color("white"));
			gradient2.rotation = 90;
			series2.fill = gradient2;
			let valueLabel2 = series2.bullets.push(new am4charts.LabelBullet());
      valueLabel2.label.text = "{B级}";
      valueLabel2.label.rotation = -45;
      valueLabel2.label.dy = -10;
			
			let series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.valueY = "C级";
			series3.dataFields.categoryX = "townId";
			series3.name = "C级";
			series3.tooltipText = "{name}: [bold]{valueY}[/]";
			series3.stroke = am4core.color("green").lighten(-0.5);
			var gradient3 = new am4core.LinearGradient();
			gradient3.addColor(am4core.color("green"));
			gradient3.addColor(am4core.color("white"));
			gradient3.rotation = 90;
			series3.fill = gradient3;
			let valueLabel3 = series3.bullets.push(new am4charts.LabelBullet());
      valueLabel3.label.text = "{C级}";
      valueLabel3.label.rotation = -45;
      valueLabel3.label.dy = -10;


			// Add cursor
			chart.cursor = new am4charts.XYCursor();
			console.log(chart.cursor)
			chart.legend = new am4charts.Legend();
			chart.legend.position = "top";
			chart.legend.contentAlign = "left";
			chart.legend.marginTop = -20;
			var legendTitle = chart.legend.createChild(am4core.Label);
			legendTitle.text="诚信等级:";
			legendTitle.fontSize = 15;
			legendTitle.marginRight = 10;
			legendTitle.marginLeft = 40;
			legendTitle.paddingTop = 15;
			

			console.log(chart)

      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      this.createGrid1(0, valueAxis);
      this.createGrid1(200, valueAxis);
      this.createGrid1(400, valueAxis);
      this.createGrid1(600, valueAxis);
    },
    makeChartRightTop() {
			let chart = am4core.create(this.$refs.chartdiv2, am4charts.PieChart);
			let data = [];
			this.leftTopData.map(item => {
				data.push({
					"cnt": item[0],
					"townId": this.filterTownName(item[1]), 
				});
			});
      chart.data = data;
      chart.responsive.enabled = true;
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      let title = chart.titles.create();
      title.text = "各站点诚信等级上传数据的比例分布";
      title.fontSize = 20;
      title.marginBottom = -20;
      title.marginTop = 10;
			title.fontWeight = "bold";
			title.align = "left";
      // pieSeries.radius = 100;
      pieSeries.dataFields.value = "cnt";
      pieSeries.dataFields.category = "townId";
      pieSeries.dataFields.radiusValue = "cnt";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

			// Add cursor
			chart.cursor = new am4charts.XYCursor();
			// chart.legend = new am4charts.Legend()

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    },
    makeChartLeftDown() {
      let chart = am4core.create(this.$refs.chartdiv3, am4charts.XYChart);
			let data = [];
			this.leftDownData.map(item => {
				data.push({
					"townId": this.filterTownName(item[1]), 
					"cnt": item[0]
				});
			});
			chart.data = data;
			chart.responsive.enabled = true;
			
			// Add legend
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "各站点上传数据统计";
      title.fontSize = 20;
      title.marginBottom = 30;
      title.fontWeight = "bold";
      title.align = "left";
			categoryAxis.dataFields.category = "townId";
			categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
			valueAxis.max = 15000;
      valueAxis.renderer.minGridDistance = 5;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;

			// Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cnt";
			series.dataFields.categoryX = "townId";
			series.name = "cnt";
			series.tooltipText = "{name}: [bold]{valueY}[/]";
			series.stroke = am4core.color("lightblue").lighten(-0.5);
			var gradient = new am4core.LinearGradient();
			gradient.addColor(am4core.color("lightblue"));
			gradient.addColor(am4core.color("blue"));
			gradient.rotation = 90;
			series.fill = gradient;

			let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{cnt}";
      valueLabel.label.rotation = -45;
      valueLabel.label.dy = -10;
			// Add cursor
			chart.cursor = new am4charts.XYCursor();
			// chart.legend = new am4charts.Legend();
			
      // valueLabel.label.dy = -10;
      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      this.createGrid(0, valueAxis);
      this.createGrid(5000, valueAxis);
      this.createGrid(10000, valueAxis);
      this.createGrid(15000, valueAxis);
		},
    getPercent(cnt1, cnt2, type) {
      if (!cnt1 || !cnt2) return 0;
      if (type === 2) {
        this.progressColor =
          parseInt((cnt1 / cnt2) * 100) < 100 ? "warning" : "success";
      }
      return parseInt((cnt1 / cnt2) * 100);
		},
  }
};
</script>