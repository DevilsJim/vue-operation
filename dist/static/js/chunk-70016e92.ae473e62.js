(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70016e92"],{3690:function(t,e,a){"use strict";var l=a("3f80"),n=a.n(l);n.a},"3f80":function(t,e,a){},5609:function(t,e,a){"use strict";a.d(e,"a",function(){return l}),a.d(e,"b",function(){return n}),a.d(e,"c",function(){return r});var l={0:"个人",1:"公司",2:"个体工商户"},n={1:"跟进记录",2:"释放到海",3:"转移客户",4:"捡入私海",5:"分配客户",6:"变更客户",7:"创建客户"},r={0:"是",1:"否"}},a0fa:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container customer-detail"},[a("el-container",{attrs:{height:"auto",direction:"horizontal"}},[a("div",{staticStyle:{width:"50%"}},[a("h2",[a("el-popover",{attrs:{placement:"bottom",trigger:"hover",disabled:0==t.gridData.length}},[a("el-table",{attrs:{data:t.gridData}},[a("el-table-column",{attrs:{"min-width":"200",prop:"companyName",label:"公司"}}),t._v(" "),a("el-table-column",{attrs:{width:"50",label:"主显","class-name":"is-primary-display",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.ifParentCompany?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"主显公司",placement:"right-start"}},[a("svg-icon",{staticStyle:{"font-size":"18px"},attrs:{"icon-class":"home","class-name":"home"}})],1):t._e()]}}])})],1),t._v(" "),a("svg-icon",{attrs:{slot:"reference","icon-class":"menu2","class-name":"menu2"},slot:"reference"})],1),t._v("\n        "+t._s(t.companyInfo.companyName)+"\n      ")],1)]),t._v(" "),a("div",{staticClass:"con-right",staticStyle:{width:"50%","text-align":"right","padding-top":"20px"}},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.pickUpPrivate}},[t._v("捡入私海")])],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableData3.listLoading,expression:"tableData3.listLoading"}],attrs:{data:t.tableData3.list,"element-loading-text":"Loading",fit:"",border:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{label:"联系人姓名",prop:"nickname",width:"120","class-name":"user-info",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"职位",prop:"duty",width:"120","class-name":"tags",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"电话",prop:"userMobile",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.userMobile.substr(0,3)+"****"+e.row.userMobile.substr(7,e.row.userMobile.length-6)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"座机号",prop:"telephone",width:"120",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"微信",prop:"wxNumber",width:"180",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"QQ",prop:"qqNumber",width:"120",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"邮箱",prop:"userEmail",width:"200",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.onJobFlag?a("span",[t._v("在职")]):t._e(),1==e.row.onJobFlag?a("span",[t._v("离职")]):t._e()]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.listQuery.start,"page-size":t.listQuery.length,layout:"total, sizes, prev, pager, next, jumper",total:t.tableData3.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("el-container",{staticClass:"list-con",attrs:{direction:"horizontal"}},[a("el-main",[a("el-tabs",{attrs:{type:"border-card"},model:{value:t.activeTabsName,callback:function(e){t.activeTabsName=e},expression:"activeTabsName"}},[a("el-tab-pane",{attrs:{label:"动态记录",name:"first"}},[a("el-table",{attrs:{data:t.gridData1.list,border:""}},[a("el-table-column",{attrs:{width:"150",label:"动态名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-row",[t._v(t._s(t.DYNAMIC_NAME_MAP[e.row.dynamicLogName]))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"160",prop:"dealTime",label:"时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"dealUserName",label:"操作人",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"operationContent",label:"操作内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-row",[t._v("老顾问： "+t._s(e.row.oldCounselorName))]),t._v(" "),a("el-row",[t._v("新顾问： "+t._s(e.row.newCounselorName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"90",prop:"ifFollowLog",label:"是否跟进",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.ifFollowLog?a("el-row",[t._v("是")]):t._e(),t._v(" "),1==e.row.ifFollowLog?a("el-row",[t._v("否")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"dealRemark",label:"跟进/备注"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.listQueryDynamic.start,"page-size":t.listQueryDynamic.length,layout:"total, sizes, prev, pager, next, jumper",total:t.gridData1.total},on:{"size-change":t.handleSizeChange2,"current-change":t.handleCurrentChange2}})],1),t._v(" "),a("el-tab-pane",{staticClass:"business-info",attrs:{label:"工商信息",name:"second"}},[a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("行业类型")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.companyInfo.companyBusinessProfession))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("组织机构代码")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.organizationCode))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("成立日期")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.companyInfo.establishDate))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("核准日期")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.authorizeDate))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("注册号")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.companyInfo.licenseNumber))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("核准机构")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.authorizeAgency))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("注册地址")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.companyInfo.licenseAddress))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("营业期限开始日期")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.licenseBeginTime))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("企业法人")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.companyInfo.companyLegalPerson))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("营业期限结束日期")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.licenseEndTime))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("注册资金")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.companyInfo.registrationAmount))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("公司URL")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.companyUrl))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("实收注册资金")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.companyInfo.actualRegistrationAmount))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("行业平分(总分10000)")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.companyBusinessScore))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("企业类型")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.COMPANY_TYPE_MAP[t.companyInfo.companyType]))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("公司评分(总分10000)")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.companyInfo.companyScore))])],1),t._v(" "),a("el-row",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"}},[a("el-col",{attrs:{span:4}},[t._v("经营范围")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266",background:"#fff"},attrs:{span:20}},[t._v(t._s(t.companyInfo.businessRange))])],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"商标信息",name:"third"}},[a("el-table",{attrs:{data:t.gridData2,border:""}},[a("el-table-column",{attrs:{width:"150",prop:"dynamicName",label:"商标图片"}}),t._v(" "),a("el-table-column",{attrs:{width:"160",prop:"time",label:"商标名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operator",label:"申请号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"operationContent",label:"类别"}}),t._v(" "),a("el-table-column",{attrs:{width:"90",prop:"isFollowUp",label:"代理机构",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"remarks",label:"申请日期"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"remarks",label:"当前状态"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"remarks",label:"专用端"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",label:"操作"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage4,"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"订单信息",name:"fourth"}},[a("el-tabs",{staticClass:"item-tabs",attrs:{"tab-position":"left"},model:{value:t.activeTabsName1,callback:function(e){t.activeTabsName1=e},expression:"activeTabsName1"}},[a("el-tab-pane",{attrs:{label:"商标服务",name:"fourth1"}},[a("el-table",{attrs:{data:t.gridData2,border:""}},[a("el-table-column",{attrs:{width:"100",prop:"dynamicName",label:"订单号"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"time",label:"支付时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operator",label:"流程节点",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operationContent",label:"客户名称"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"isFollowUp",label:"业务类型",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"isFollowUp",label:"金额",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"isFollowUp",label:"联系人",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"isFollowUp",label:"开票状态",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"isFollowUp",label:"保件日期",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",label:"操作",fixed:"right"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage4,"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"版权服务",name:"fourth2"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"专利服务",name:"fourth3"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"其他服务",name:"fourth4"}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"咨询记录",name:"fifth"}},[a("el-table",{attrs:{data:t.gridData2,border:""}},[a("el-table-column",{attrs:{width:"150",prop:"dynamicName",label:"客户状态"}}),t._v(" "),a("el-table-column",{attrs:{width:"160",prop:"time",label:"意向产品",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operator",label:"创建时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"operationContent",label:"关闭原因"}}),t._v(" "),a("el-table-column",{attrs:{width:"90",prop:"isFollowUp",label:"线索来源",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"90",prop:"isFollowUp",label:"联系方式",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",label:"操作"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage4,"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"发票记录",name:"sixth"}},[a("el-table",{attrs:{data:t.gridData2,border:""}},[a("el-table-column",{attrs:{width:"150",prop:"dynamicName",label:"基本信息"}}),t._v(" "),a("el-table-column",{attrs:{width:"160",prop:"time",label:"服务信息",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operator",label:"发票信息",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"operationContent",label:"收件人信息"}}),t._v(" "),a("el-table-column",{attrs:{width:"90",prop:"isFollowUp",label:"发票状态",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",label:"操作"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage4,"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"文件记录",name:"seventh"}},[a("el-tabs",{staticClass:"item-tabs",attrs:{"tab-position":"left"},model:{value:t.activeTabsName1,callback:function(e){t.activeTabsName1=e},expression:"activeTabsName1"}},[a("el-tab-pane",{attrs:{label:"所有文件",name:"fourth1"}},[a("el-table",{attrs:{data:t.gridData2,border:""}},[a("el-table-column",{attrs:{width:"100",prop:"dynamicName",label:"申请人"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"time",label:"商品信息",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operator",label:"分类信息",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operationContent",label:"文件名称"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",label:"操作",fixed:"right"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage4,"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"官文",name:"fourth2"}}),t._v(" "),a("el-tab-pane",{attrs:{label:"所有客户",name:"fourth3"}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"其他顾问订单",name:"eighth"}},[a("el-table",{attrs:{data:t.gridData2,border:""}},[a("el-table-column",{attrs:{width:"150",prop:"dynamicName",label:"顾问"}}),t._v(" "),a("el-table-column",{attrs:{width:"160",prop:"time",label:"商标服务",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"operator",label:"版权服务",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"operationContent",label:"专利服务"}}),t._v(" "),a("el-table-column",{attrs:{width:"90",prop:"isFollowUp",label:"其他",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"remarks",label:"商标交易"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",label:"操作"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"","current-page":t.currentPage4,"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)],1)],1)},n=[],r=a("ad8f"),o=a("5609"),i={name:"OrderDetail",data:function(){return{activeTabsName:"first",activeTabsName1:"fourth1",list:null,postForm:{companyId:""},listQuery:{start:"1",length:"10",companyId:this.companyId},listQueryDynamic:{start:"1",length:"10",companyId:this.companyId},companyId:null,companyInfo:{},COMPANY_TYPE_MAP:o["a"],DYNAMIC_NAME_MAP:o["b"],TRUE_OR_FALSE:o["c"],userPrivate:{createUserName:"",createTime:""},listLoading:!0,tableData3:{list:[],listLoading:!0,total:0},gridData:[],gridData1:{list:[],listLoading:!0,total:0},gridData2:[],temp:{},currentPage4:4,activeNames:["1"],editCustomerDetailVisible:!1,addEditContactsVisible:!1,addFollowUpVisible:!1,releasePrivateCustomerVisible:!1}},created:function(){this.companyId=this.$route.params.currentCompanyId,this.fetchData()},methods:{onSubmit:function(){this.$message("submit!")},handleSelectionChange:function(t){console.log(t)},fetchData:function(){var t=this;this.listLoading=!0,this.tableData&&(this.list=this.tableData,this.listLoading=!1),this.postForm.companyId=this.companyId,Object(r["b"])(this.postForm).then(function(e){t.gridData=e.data.data}),Object(r["a"])(this.postForm).then(function(e){t.companyInfo=e.data.data[0]}),Object(r["d"])(this.postForm).then(function(e){t.userPrivate=Object.assign({},t.userPrivate,{createUserName:e.data.data[0].createUserName,createTime:e.data.data[0].createTime})}),this.fetchUserData(),this.getCrmDynamicLog()},fetchUserData:function(t){var e=this;"undefined"!==typeof t&&(this.listQuery=t),this.listQuery.companyId=this.$route.params.currentCompanyId,this.$set(this.tableData3,"listLoading",!0),Object(r["e"])(this.listQuery).then(function(t){e.tableData3=Object.assign({},e.tableData3,{list:t.data.data,total:t.data.total,listLoading:!1})}).catch(function(t){console.log("err",t)})},getCrmDynamicLog:function(t){var e=this;"undefined"!==typeof t&&(this.listQueryDynamic=t),this.listQueryDynamic.companyId=this.$route.params.currentCompanyId,this.$set(this.gridData1,"listLoading",!0),Object(r["c"])(this.listQueryDynamic).then(function(t){e.gridData1=Object.assign({},e.gridData1,{list:t.data.data,total:t.data.total,listLoading:!1})}).catch(function(t){console.log("err",t)})},pickUpPrivate:function(){var t=this;this.postForm.companyId=this.companyId,Object(r["f"])(this.postForm).then(function(e){t.$router.push({path:"/customerManagement/myCustomer"})}).catch(function(t){console.log("err",t)})},handleSizeChange:function(t){console.log("每页 ".concat(t," 条"))},handleSizeChange2:function(t){console.log("每页 ".concat(t," 条"))},handleCurrentChange:function(t){console.log("当前页: ".concat(t)),this.$set(this.listQuery,"start",t),this.fetchUserData(this.listQuery)},handleCurrentChange2:function(t){console.log("当前页: ".concat(t)),this.$set(this.listQueryDynamic,"start",t),this.getCrmDynamicLog(this.listQueryDynamic)},handleEditCustomerDetail:function(){this.editCustomerDetailVisible=!0},setPrimaryDisplay:function(t){console.log(t)},handleFollowUp:function(){this.followUpVisible=!0},handleChooseOrderWay:function(){this.chooseOrderWayVisible=!0},handleAddEditContacts:function(){this.addEditContactsVisible=!0},handleAddFollowUp:function(){this.addFollowUpVisible=!0},handleReleasePrivateCustomer:function(){this.releasePrivateCustomerVisible=!0}}},s=i,c=(a("3690"),a("2877")),p=Object(c["a"])(s,l,n,!1,null,"69da1500",null);e["default"]=p.exports},ad8f:function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r}),a.d(e,"d",function(){return o}),a.d(e,"e",function(){return i}),a.d(e,"c",function(){return s}),a.d(e,"f",function(){return c});var l=a("b775");function n(t){return Object(l["a"])({url:"/zgCompany/condition",method:"post",params:t})}function r(t){return Object(l["a"])({url:"/zgCompany/releationCondition",method:"post",params:t})}function o(t){return Object(l["a"])({url:"/zgUserPrivate/condition",method:"post",params:t})}function i(t){return Object(l["a"])({url:"/zgLatentUser/condition/pager",method:"post",params:t})}function s(t){return Object(l["a"])({url:"/crmDynamicLog/condition/pager",method:"post",params:t})}function c(t){return Object(l["a"])({url:"/zgCompany/collectCompanyToPrivate",method:"post",params:t})}}}]);