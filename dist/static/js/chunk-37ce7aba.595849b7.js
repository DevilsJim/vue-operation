(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37ce7aba"],{"2f48":function(t,e,a){},"84e6":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container customer-detail"},[a("el-container",{attrs:{height:"auto",direction:"horizontal"}},[a("div",{staticStyle:{width:"100%"}},[a("strong",{staticStyle:{float:"left","font-size":"20px","font-weight":"bold"}},[t._v("\n        "+t._s(t.cluesInfo.companyName?t.cluesInfo.companyName:"-")+"\n      ")])])]),t._v(" "),a("el-container",{attrs:{height:"auto",direction:"horizontal"}},[a("div",{staticStyle:{width:"100%","margin-top":"10px"}},[a("span",{staticStyle:{"font-size":"14px"}},[a("span",[t._v("\n          公司地址： "+t._s(t.cluesInfo.companyAddress)+"\n        ")]),t._v(" "),a("span",{staticStyle:{"margin-left":"10%"}},[t._v("\n          初始来源： "+t._s(t.cluesInfo.threadSource)+"\n        ")]),t._v(" "),a("span",{staticStyle:{"margin-left":"10%"}},[t._v("\n          录入时间： "+t._s(t.cluesInfo.createTime)+"\n        ")])])])]),t._v(" "),a("el-container",{attrs:{height:"auto",direction:"horizontal"}},[a("div",{staticStyle:{width:"100%","margin-top":"10px"}},[a("span",{staticStyle:{"font-size":"14px"}},[t._v("\n        线索备注："+t._s(t.cluesInfo.threadRemark)+"\n      ")])])]),t._v(" "),a("el-container",{staticClass:"list-con",attrs:{direction:"horizontal"}},[a("el-aside",{staticStyle:{width:"100%"}},[a("p",{staticClass:"title-p"},[t._v("\n        联系人\n      ")]),t._v(" "),a("el-table",{staticClass:"company-info-table",attrs:{data:t.gridDataLatent.list,"element-loading-text":"Loading",fit:"",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"姓名",prop:"nickname",width:"120","class-name":"user-info",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"职位",prop:"duty",width:"120","class-name":"tags",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"电话",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(e.row.userMobile?e.row.userMobile.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"):"")+"\n          ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"座机号",prop:"telephone",width:"120",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"微信",prop:"wxNumber",width:"180",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"QQ",prop:"qqNumber",width:"120",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"邮箱",prop:"userEmail",width:"200",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.onJobFlag?a("span",[t._v("在职")]):t._e(),0==e.row.onJobFlag?a("span",[t._v("离职")]):t._e()]}}])})],1),t._v(" "),a("el-pagination",{staticClass:"pagination-table",attrs:{background:"","current-page":t.gridDataLatent.userParams.start,"page-size":t.gridDataLatent.userParams.length,layout:"total, sizes, prev, pager, next, jumper",total:t.gridDataLatent.userParams.total},on:{"size-change":t.handleLatentSizeChange,"current-change":t.handleLatentCurrentChange}})],1)],1),t._v(" "),a("br"),t._v(" "),a("el-container",{staticClass:"list-con",attrs:{direction:"horizontal"}},[a("el-tabs",{staticStyle:{width:"100%"},attrs:{type:"border-card"},model:{value:t.activeTabsName,callback:function(e){t.activeTabsName=e},expression:"activeTabsName"}},[a("el-tab-pane",{attrs:{label:"动态记录",name:"first"}},[a("el-table",{attrs:{data:t.gridData3.list,border:""}},[a("el-table-column",{attrs:{width:"200",label:"动态名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(t._f("threadLogTypeToName")(e.row.threadLogType))+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"200",prop:"dealTime",label:"时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"200",prop:"dealUserName",label:"操作人",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"operationContent",label:"操作内容",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n              "+t._s(e.row.dealRemark)+"\n            ")]}}])})],1)],1)],1)],1)],1)},r=[],i=a("e7cd"),s={inject:["closeSelectedTag"],name:"CluesDetail",filters:{threadLogTypeToName:function(t){var e={0:"导入线索",1:"后台创建",2:"关闭",3:"稍后处理",4:"捡入",5:"完善信息",6:"释放线索",7:"转为客户"};return e[t]}},data:function(){return{currentThreadId:null,currentContactId:null,activeTabsName:"first",activeTabsName1:"fourth1",list:null,cluesData:{},formInline:{start:1,length:10,threadId:this.currentThreadId},listLoading:!0,gridData3:{list:[],listLoading:!0,total:0},gridDataLatent:{list:[],listLoading:!0,userParams:{start:1,length:10,companyId:null}},companyChildren:[],activeNames:[],addEditContactsVisible:!1,cluesInfo:{},leader:{},businessList:[]}},watch:{},created:function(){console.log(this.$route.params),this.currentThreadId=this.$route.params.currentThreadId,this.gridDataLatent.userParams.companyId=this.currentCompanyId,this.init()},methods:{init:function(){this.getThreadDetail(),this.getCustomerList()},getThreadDetail:function(){var t=this;Object(i["getCommonCluesDetail"])({threadId:this.currentThreadId}).then(function(e){1e4===e.data.code&&(t.cluesInfo=e.data.data,t.gridData3.list=e.data.data.dynamicLogList),console.log(t.cluesInfo)}).catch(function(t){console.log("err",t)})},getCustomerList:function(){var t=this;this.gridDataLatent.userParams.threadId=this.currentThreadId,Object(i["getCommonCluesCustomerList"])(this.gridDataLatent.userParams).then(function(e){console.log(e.data),1e4===e.data.code&&(t.gridDataLatent.list=e.data.data,t.gridDataLatent.userParams.total=e.data.total,t.gridDataLatent.userParams.start=e.data.start,t.gridDataLatent.userParams.length=e.data.length),console.log(t.cluesInfo)}).catch(function(t){console.log("err",t)})},handleSizeChange:function(t){this.formInline.length=t,this.getCustomerDynamic()},handleCurrentChange:function(t){this.formInline.start=t,this.getCustomerDynamic()},handleLatentCurrentChange:function(t){this.gridDataLatent.userParams.start=t,this.getLatentInfo()},handleLatentSizeChange:function(t){this.gridDataLatent.userParams.length=t,this.getLatentInfo()}}},o=s,l=(a("e8c5"),a("2877")),c=Object(l["a"])(o,n,r,!1,null,"0cebc080",null);e["default"]=c.exports},e7cd:function(t,e,a){"use strict";a.d(e,"c",function(){return r}),a.d(e,"k",function(){return i}),a.d(e,"b",function(){return s}),a.d(e,"j",function(){return o}),a.d(e,"h",function(){return l}),a.d(e,"i",function(){return c}),a.d(e,"a",function(){return d}),a.d(e,"l",function(){return u});var n=a("b775");function r(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/thread/container/set/condition",method:"post",params:t})}function i(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/thread/container/set/update",method:"post",params:t})}function s(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/thread/collection/set/condition",method:"post",params:t})}function o(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/thread/collection/set/update",method:"post",params:t})}function l(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/businessPrivateLimit/detail",method:"post",params:t})}function c(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/businessPrivateLimit/update",method:"post",params:t})}function d(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/businessOvertime/condition",method:"post",params:t})}function u(t){return Object(n["a"])({baseURL:"http://192.168.91.111:8005/api/v1/businessOvertime/update",method:"post",data:t})}},e8c5:function(t,e,a){"use strict";var n=a("2f48"),r=a.n(n);r.a}}]);