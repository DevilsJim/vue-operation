(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62e7625e"],{"16d4":function(e,t,a){},"2dac":function(e,t,a){},"35fa":function(e,t,a){"use strict";var n=a("2dac"),s=a.n(n);s.a},3767:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleTabs},model:{value:e.activeTabsName,callback:function(t){e.activeTabsName=t},expression:"activeTabsName"}},[a("el-tab-pane",{attrs:{label:"组内客户",name:"0"}},[a("customer-list-table",{attrs:{"list-data":e.listData,"search-data":e.searchData,"tab-type":e.activeTabsName,"dialog-visible":e.dialogVisible,"dept-ids-visible":e.deptIds,"need-approve":e.formInline.needApprove},on:{"update:deptIdsVisible":function(t){e.deptIds=t},"update:dept-ids-visible":function(t){e.deptIds=t},fetchData:e.fetchData,getCurCompanyId:e.getCurCompanyId}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"公海客户",name:"1"}},[a("customer-list-table",{attrs:{"list-data":e.listData,"search-data":e.searchData,"tab-type":e.activeTabsName,"dialog-visible":e.dialogVisible,"dept-ids-visible":e.deptIds,"need-approve":e.formInline.needApprove},on:{"update:deptIdsVisible":function(t){e.deptIds=t},"update:dept-ids-visible":function(t){e.deptIds=t},fetchData:e.fetchData,getCurCompanyId:e.getCurCompanyId}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"无效客户",name:"2"}},[a("customer-list-table",{attrs:{"list-data":e.listData,"search-data":e.searchData,"tab-type":e.activeTabsName,"dialog-visible":e.dialogVisible,"dept-ids-visible":e.deptIds,"need-approve":e.formInline.needApprove},on:{"update:deptIdsVisible":function(t){e.deptIds=t},"update:dept-ids-visible":function(t){e.deptIds=t},fetchData:e.fetchData,getCurCompanyId:e.getCurCompanyId}})],1)],1)],1)},s=[],i=(a("ac6a"),a("6b54"),a("90a8")),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"customer-list-table"},[a("el-form",{attrs:{inline:!0,model:e.formInline,size:"small"}},["0"===e.tabType?[a("el-form-item",[a("el-cascader",{attrs:{props:e.propsDeptId,options:e.searchData.deptTreeList,"show-all-levels":!1,clearable:"",placeholder:"请选择部门"},on:{change:e.handleDeptTree},model:{value:e.selectDeptId,callback:function(t){e.selectDeptId=t},expression:"selectDeptId"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{value:"",filterable:"",placeholder:"请选择的顾问",clearable:""},model:{value:e.formInline.currentUserId,callback:function(t){e.$set(e.formInline,"currentUserId",t)},expression:"formInline.currentUserId"}},e._l(e.userList,function(e){return a("el-option",{key:e.pkSid,attrs:{label:e.nickname,value:e.pkSid}})}),1)],1)]:e._e(),e._v(" "),a("el-form-item",[a("el-select",{attrs:{value:"",multiple:"",clearable:"",placeholder:"请选择客户标签"},model:{value:e.formInline.tagsIdList,callback:function(t){e.$set(e.formInline,"tagsIdList",t)},expression:"formInline.tagsIdList"}},e._l(e.searchData.tagsList,function(t){return a("el-option-group",{key:t.tagId,attrs:{label:t.tagName}},e._l(t.listTag,function(e){return a("el-option",{key:e.tagId,attrs:{value:e.tagId,label:e.tagName}})}),1)}),1)],1),e._v(" "),"1"===e.tabType?a("el-form-item",[a("el-select",{attrs:{value:"",clearable:"",placeholder:"请选择审批状态"},model:{value:e.formInline.needApprove,callback:function(t){e.$set(e.formInline,"needApprove",t)},expression:"formInline.needApprove"}},[a("el-option",{attrs:{label:"待审批",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"不需审批",value:"0"}})],1)],1):e._e(),e._v(" "),a("el-form-item",{staticClass:"created-time"},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始创建时间","end-placeholder":"结束创建时间",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"]},on:{change:e.handleCreatedTime},model:{value:e.createdTime,callback:function(t){e.createdTime=t},expression:"createdTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:e.onSubmit}},[e._v("搜索")]),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-refresh",size:"small"},on:{click:e.onReset}},[e._v("重置")])],1)],2),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listData.listLoading,expression:"listData.listLoading"}],attrs:{data:e.listData.list,"element-loading-text":"Loading",fit:"",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"序号",type:"index",width:"60",align:"center"}}),e._v(" "),"0"===e.tabType?[a("el-table-column",{attrs:{label:"所在部门",width:"195",prop:"sysGroupoName","class-name":"user-info","header-align":"center",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"负责人",width:"195",prop:"sysUserName","class-name":"user-info","header-align":"center",align:"center"}})]:e._e(),e._v(" "),a("el-table-column",{attrs:{label:"公司名称",width:"220","class-name":"company-name","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{attrs:{to:{path:"/resourceManagement/resourceCustomerDetail/"+t.row.companyId}}},[a("div",{staticClass:"name"},[e._v(e._s(t.row.companyName))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"联系人",width:"195","class-name":"user-info","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"user-name"},[e._v("姓名: "+e._s(t.row.latentNickName))]),e._v(" "),a("span",{staticClass:"user-phone"},[e._v("电话: "+e._s(t.row.latentUserMobile?t.row.latentUserMobile.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"):""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"最后跟进时间",prop:"lastDynamicLogTime",sortable:"",width:"155",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"客户标签",width:"195",prop:"sysGroupoName","class-name":"user-info","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._l(t.row.tags,function(t){return e._l(t.listTag,function(t){return a("el-tag",{key:t.tagId},[e._v(e._s(t.tagName))])})})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"来源",width:"195",prop:"businessPurpose","class-name":"user-info","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("businessPurposeFilter")(t.row.businessPurpose)))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"最新动态","min-width":"160","class-name":"dynamic",align:"center",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.lastDynamicLogOperator)+"："+e._s(e._f("lastDynamicLogNameFilter")(t.row.lastDynamicLogName)))]),e._v(" "),a("span",[e._v(e._s(t.row.lastDynamicLogTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",width:"195",prop:"createTime","class-name":"user-info","header-align":"center",align:"center",sortable:""}}),e._v(" "),e.tabType<"2"?a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"operation",fixed:"right",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"===e.tabType&&1===t.row.contactType?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.handleChangeCustomer(t.row.companyId)}}},[e._v("变更")]):"1"===e.tabType&&0===t.row.needApprove?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.handleAssignAdviser(t.row.companyId)}}},[e._v("分配")]):e._e(),e._v(" "),"1"===e.tabType&&1===t.row.needApprove?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.handleAuditCustomer(t.row.companyId)}}},[e._v("审核")]):e._e()]}}],null,!1,2563342035)}):e._e()],2),e._v(" "),a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":e.listData.start,"page-size":e.listData.length,total:e.listData.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),a("change-customer-dialog",{attrs:{visible:e.changeCustomerVisible,"sys-user-page-list":e.searchData.sysUserPageList,"current-company-id":e.currentCompanyId},on:{"update:visible":function(t){e.changeCustomerVisible=t},fetchData:e.fetchData}}),e._v(" "),a("assign-consultants-dialog",{attrs:{visible:e.assignAdviserVisible,"sys-user-page-list":e.searchData.sysUserPageList,"search-data":e.searchData,"current-company-id":e.currentCompanyId},on:{"update:visible":function(t){e.assignAdviserVisible=t},fetchData:e.fetchData}}),e._v(" "),a("audit-customer-dialog",{attrs:{visible:e.auditCustomerVisible,"current-company-id":e.currentCompanyId},on:{"update:visible":function(t){e.auditCustomerVisible=t},fetchData:e.fetchData}})],1)},l=[],o=a("5f87"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"分配顾问","close-on-click-modal":e.flag,visible:e.templateDialog,width:"600px"},on:{"update:visible":function(t){e.templateDialog=t},close:function(t){return e.closeDia("ruleForm")}}},[a("el-form",{ref:"ruleForm",attrs:{rules:e.rules,size:"mini",model:e.temp,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"将客户变更给:"}},[a("el-select",{staticStyle:{width:"45%"},attrs:{value:"",filterable:"",placeholder:"请选择顾问",clearable:""},model:{value:e.temp.userId,callback:function(t){e.$set(e.temp,"userId",t)},expression:"temp.userId"}},e._l(e.sysUserPageList,function(e){return a("el-option",{key:e.pkSid,attrs:{label:e.nickname,value:e.pkSid}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"分配备注:"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.temp.remark,callback:function(t){e.$set(e.temp,"remark",t)},expression:"temp.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.templateDialog=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保存")])],1)],1)},u=[],d={inject:["reload"],name:"AssignConsultantsDialog",props:{visible:{type:Boolean,default:!1},currentCompanyId:{type:String,default:""},sysUserPageList:{type:Array,default:null}},data:function(){return{flag:!1,templateDialog:!1,temp:{userId:null},rules:{userId:[{required:!0,message:"请选则顾问",trigger:"change"}]},selectDeptId:[],propsDeptId:{label:"deptName",value:"pkSid",children:"children",checkStrictly:!0},userList:[]}},watch:{visible:{handler:function(e,t){this.templateDialog=e},deep:!0,immediate:!0},"searchData.sysUserPageList":{handler:function(e,t){this.userList=e},deep:!0,immediate:!0}},methods:{handleDeptTree:function(e){e.length>0?(this.getSysUserPage(e.slice(e.length-1)),this.temp.deptIds=e.slice(e.length-1).toString()):(this.userList=this.searchData.sysUserPageList,this.temp.userId=null)},getSysUserPage:function(e){var t=this;Object(i["k"])({deptList:e}).then(function(e){t.userList=e.data.data,t.temp.userId=null}).catch(function(e){console.log("err",e)})},closeDia:function(e){this.temp={},this.$refs[e].resetFields(),this.$emit("update:visible",!1)},save:function(e){this.temp.companyId=this.currentCompanyId;var t=this;t.$refs[e].validate(function(e){e&&Object(i["d"])(t.temp).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.closeDia("ruleForm"),t.reload()):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e.toString())})})}}},p=d,m=(a("dc1c"),a("2877")),h=Object(m["a"])(p,c,u,!1,null,"a9a84bae",null),f=h.exports,g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"变更客户","close-on-click-modal":e.flag,visible:e.templateDialog,width:"600px"},on:{"update:visible":function(t){e.templateDialog=t},close:function(t){return e.closeDia("ruleForm")}}},[a("el-form",{ref:"ruleForm",attrs:{rules:e.rules,size:"mini",model:e.temp,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"当前顾问:"}},[e._v(e._s(e.now))]),e._v(" "),a("el-form-item",{attrs:{label:"将客户变更给:",prop:"userId"}},[a("el-select",{staticStyle:{width:"45%"},attrs:{value:"",filterable:"",placeholder:"请选择顾问",clearable:""},model:{value:e.temp.userId,callback:function(t){e.$set(e.temp,"userId",t)},expression:"temp.userId"}},e._l(e.sysUserPageList,function(e){return a("el-option",{key:e.pkSid,attrs:{label:e.nickname,value:e.pkSid}})}),1)],1),e._v(" "),a("el-form-item",[a("el-checkbox",{model:{value:e.temp.checked,callback:function(t){e.$set(e.temp,"checked",t)},expression:"temp.checked"}},[e._v("短信通知客户")])],1),e._v(" "),a("p",[e._v("尊敬的客户您好：您办理的知识产权业务，原顾问["+e._s(e.now)+"]因工作调整，\n\n      将不能再继续服务。平台为您分配了新的知产顾问：[顾问名]，电话[顾问电话]，\n\n      新的知产顾问将在3个工作日内和您联系，您也可以直接和新顾问取得联系。\n\n      如果您对新顾问不满意，可以联系客服电话，我们会为您更换顾问")])],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.templateDialog=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保存")])],1)],1)},b=[],v={inject:["reload"],name:"ChangeCustomerDialog",props:{visible:{type:Boolean,default:!1},currentCompanyId:{type:String,default:""},sysUserPageList:{type:Array,default:null}},data:function(){return{flag:!1,templateDialog:!1,temp:{},rules:{userId:[{required:!0,message:"请选则顾问",trigger:"change"}]},checked:!1,now:"扁桃",new:""}},watch:{visible:{handler:function(e,t){this.templateDialog=e},deep:!0,immediate:!0},"temp.userId":{handler:function(e,t){},deep:!0,immediate:!0}},methods:{closeDia:function(e){this.temp={},this.$refs[e].resetFields(),this.$emit("update:visible",!1)},save:function(e){var t=this;t.temp.companyId=t.currentCompanyId,t.$refs[e].validate(function(e){e?Object(i["b"])(t.temp).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.closeDia("ruleForm"),t.reload()):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e.toString())}):t.$message.error("请填写跟进信息")})},selectChange:function(e){console.log(e)}}},y=v,I=(a("bb22"),Object(m["a"])(y,g,b,!1,null,"38726fe4",null)),D=I.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"审核无效客户","close-on-click-modal":e.flag,visible:e.templateDialog,width:"650px"},on:{"update:visible":function(t){e.templateDialog=t},close:function(t){return e.closeDia("ruleForm")}}},[a("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.temp,"label-width":"90px"}},[a("el-form-item",{attrs:{label:"审核结果:",prop:"checkType"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.temp.checkType,callback:function(t){e.$set(e.temp,"checkType",t)},expression:"temp.checkType"}},[e._v("通过")]),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.temp.checkType,callback:function(t){e.$set(e.temp,"checkType",t)},expression:"temp.checkType"}},[e._v("不通过")])],1),e._v(" "),a("el-form-item",{attrs:{label:"审核意见:",prop:"remark"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入内容"},model:{value:e.temp.remark,callback:function(t){e.$set(e.temp,"remark",t)},expression:"temp.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.templateDialog=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保存")])],1)],1)},k=[],C={inject:["reload"],name:"AuditCustomerDialog",props:{visible:{type:Boolean,default:!1},currentCompanyId:{type:String,default:null}},data:function(){return{flag:!1,templateDialog:!1,temp:{logName:"8"},rules:{checkType:[{required:!0,message:"请选择审核结果",trigger:"change"}],remark:[{required:!0,message:"请填写备注",trigger:"blur"}]}}},watch:{visible:function(){this.templateDialog=this.visible},currentCompanyId:{handler:function(e,t){this.temp.companyId=e},deep:!0,immediate:!0}},methods:{closeDia:function(e){this.temp={},this.$refs[e].resetFields(),this.$emit("update:visible",!1)},save:function(e){var t=this,a=this;0===this.temp.checkType&&(this.temp.remark="通过无效客户审核 <br/> "+a.temp.remark),1===this.temp.checkType&&(this.temp.remark="未通过无效客户审核 <br/> "+a.temp.remark),console.log(this.temp.remark),a.$refs[e].validate(function(e){e&&Object(i["c"])(t.temp).then(function(e){1e4===e.data.code?(a.$message.success(e.data.message),t.closeDia("ruleForm"),t.reload()):a.$message.error("操作失败")}).catch(function(e){a.$message.error(e)})})}}},T=C,L=(a("35fa"),Object(m["a"])(T,_,k,!1,null,"1b6ae6fa",null)),w=L.exports,$={name:"CustomerListTable",components:{AuditCustomerDialog:w,ChangeCustomerDialog:D,AssignConsultantsDialog:f},filters:{companySignFilter:function(e){var t={0:"新客户",1:"渠道用户"};return t[e]},intentionLevelFilter:function(e){var t={0:"",1:"无意向",2:"有意向",3:"高意向"};return t[e]},worthLevelFilter:function(e){var t={0:"",1:"低价值",2:"中价值",3:"高价值"};return t[e]},memberLevelFilter:function(e){var t={0:"红苹果",1:"青苹果"};return t[e]},businessPurposeFilter:function(e){var t={1:"商标服务",2:"专利",3:"版权",4:"财税",5:"其他"};return t[e]},companyTypeFilter:function(e){var t={0:"个人",1:"公司",2:"个体工商户"};return t[e]},lastDynamicLogNameFilter:function(e){var t={1:"跟进记录",2:"释放到公海",3:"转移客户",4:"捡入私海",5:"分配客户",6:"变更客户",7:"创建客户"};return t[e]}},props:{listData:{type:Object,default:null},searchData:{type:Object,default:null},dialogVisible:{type:Object,default:null},deptIdsVisible:{type:String,default:null},needApprove:{type:String,default:null},tabType:{type:String,default:""}},data:function(){return{pickerOptions:{disabledDate:function(e){return e.getTime()<Date.now()}},createdTime:null,selectDeptId:[],roleIds:[],propsDeptId:{label:"deptName",value:"pkSid",children:"children",checkStrictly:!0},formInline:{start:"1",length:"10",deleteStatus:"0",currentUserId:null,deptIds:"",contactType:"1",needApprove:"-1"},userList:[],currentCompanyId:null,assignAdviserVisible:!1,changeCustomerVisible:!1,auditCustomerVisible:!1}},watch:{listData:{handler:function(e,t){this.list=e.list},deep:!0,immediate:!0},"searchData.sysUserPageList":{handler:function(e,t){this.userList=e},deep:!0,immediate:!0},deptIdsVisible:{handler:function(e,t){this.formInline.deptIds=e}},needApprove:{handler:function(e,t){this.formInline.needApprove=e+""}}},created:function(){var e=Object(o["a"])();this.roleIds=e},methods:{handleDeptTree:function(e){e.length>0?(this.getSysUserPage(e.slice(e.length-1)),this.formInline.deptIds=e.slice(e.length-1).toString()):(this.userList=this.searchData.sysUserPageList,this.formInline.currentUserId=null)},getSysUserPage:function(e){var t=this;Object(i["k"])({deptList:e}).then(function(e){t.userList=e.data.data,t.formInline.currentUserId=null}).catch(function(e){console.log("err",e)})},fetchData:function(){},handleCreatedTime:function(e){null!==e?(this.$set(this.formInline,"startCreatedTime",e[0]),this.$set(this.formInline,"endCreatedTime",e[1])):(this.$set(this.formInline,"startCreatedTime",""),this.$set(this.formInline,"endCreatedTime",""))},onSubmit:function(){this.formInline.deptIds=this.deptIdsVisible,this.$message.success("搜索成功!"),this.$emit("fetchData",this.formInline)},onReset:function(){"2"!==this.needApprove?this.formInline={start:"1",length:"10",deleteStatus:"0",contactType:"3",deptIds:this.deptIdsVisible,needApprove:"-1"}:this.formInline={start:"1",length:"10",deleteStatus:"0",contactType:"3",deptIds:this.deptIdsVisible,needApprove:"2"},this.selectDeptId=[],this.createdTime=null,this.$message("重置搜索项!")},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.$set(this.formInline,"length",e),this.$emit("fetchData",this.formInline)},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.$set(this.formInline,"start",e),this.$emit("fetchData",this.formInline)},handleAssignAdviser:function(e){this.assignAdviserVisible=!0,this.currentCompanyId=e},handleChangeCustomer:function(e){this.changeCustomerVisible=!0,this.currentCompanyId=e},handleAuditCustomer:function(e){this.auditCustomerVisible=!0,this.currentCompanyId=e}}},S=$,j=(a("a00b"),Object(m["a"])(S,r,l,!1,null,"5be061de",null)),O=j.exports,U={name:"CustomerList",components:{CustomerListTable:O},data:function(){return{activeTabsName:"0",formInline:{start:"1",length:"10",deleteStatus:"0",needApprove:"-1",contactType:"3"},listData:{list:[],listLoading:!0,total:0},searchData:{deptTreeList:[],sysUserPageList:[],tagsList:[]},currentCompanyId:null,dialogVisible:{assignAdviserVisible:!1,changeCustomerVisible:!1,auditCustomerVisible:!1},endNodeDeptIds:[],deptIds:""}},watch:{activeTabsName:{handler:function(e,t){switch(e){case"0":this.formInline=Object.assign({},this.formInline,{needApprove:"-1",contactType:"3"});break;case"1":this.formInline=Object.assign({},this.formInline,{needApprove:"-1",contactType:"0"});break;case"2":this.formInline=Object.assign({},this.formInline,{needApprove:"2",contactType:"3"});break}},deep:!0,immediate:!0}},created:function(){this.init()},methods:{init:function(){this.getDeptTree(),this.getCurUserPage(),this.getTagsList()},getDeptTree:function(e){var t=this;Object(i["h"])().then(function(e){1e4===e.data.code?(null!==e.data.data&&t.$set(t.searchData,"deptTreeList",e.data.data),t.runAsync(e.data.data).then(function(e){return console.log("部门ID列表",e),e.length>0&&(t.formInline.deptIds=e.toString(),t.deptIds=e.toString()),console.log(t.deptIds),t.handleTabs()})):t.$message.warning(e.data.message)}).catch(function(e){console.log("err",e)})},forEachDeptTree:function(e){e=e||[];var t=this;e.length>0&&e.forEach(function(e,a){t.endNodeDeptIds.push(e.pkSid),null!=e.children&&t.forEachDeptTree(e.children)})},runAsync:function(e){var t=this;return new Promise(function(a,n){setTimeout(function(){t.forEachDeptTree(e),a(t.endNodeDeptIds)})})},getCurUserPage:function(e){var t=this,a=this;Object(i["g"])().then(function(e){1e4===e.data.code&&null!==e.data.data?t.$set(t.searchData,"sysUserPageList",e.data.data):a.$message.warning(e.data.message)}).catch(function(e){console.log("err",e)})},fetchData:function(e){var t=this;"undefined"!==typeof e&&(this.formInline=e),this.$set(this.listData,"listLoading",!0),Object(i["i"])(this.formInline).then(function(e){t.listData=Object.assign({},t.listData,{list:e.data.data,total:e.data.total,start:e.data.start,length:e.data.length,listLoading:!1})}).catch(function(e){console.log("err",e)})},getCurCompanyId:function(e){this.currentCompanyId=e},handleTabs:function(e){this.fetchData()},getTagsList:function(){var e=this,t=this;Object(i["m"])({}).then(function(a){if(1e4===a.data.code){var n=[];a.data.data.forEach(function(e){e.listTag&&e.listTag.length>0&&n.push(e)}),t.$set(t.searchData,"tagsList",n)}else e.$message.error(a.data.message)}).catch(function(e){console.log("err",e)})}}},A=U,x=Object(m["a"])(A,n,s,!1,null,"3b993eda",null);t["default"]=x.exports},"57dc":function(e,t,a){},"90a8":function(e,t,a){"use strict";a.d(t,"i",function(){return s}),a.d(t,"h",function(){return i}),a.d(t,"k",function(){return r}),a.d(t,"g",function(){return l}),a.d(t,"d",function(){return o}),a.d(t,"b",function(){return c}),a.d(t,"c",function(){return u}),a.d(t,"l",function(){return d}),a.d(t,"m",function(){return p}),a.d(t,"a",function(){return m}),a.d(t,"o",function(){return h}),a.d(t,"e",function(){return f}),a.d(t,"j",function(){return g}),a.d(t,"n",function(){return b}),a.d(t,"f",function(){return v});var n=a("b775");function s(e){return Object(n["a"])({url:"/zgCompany/all/condition/pager",method:"post",params:e})}function i(){return Object(n["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysDept/getDeptTreeListBySysId",method:"get"})}function r(e){return Object(n["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysUser/getSysUserListByDeptIds",method:"post",data:e})}function l(){return Object(n["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysUser/getCurrentUserDeptUsers",method:"get"})}function o(e){return Object(n["a"])({url:"/zgCompany/collectCompanyToOther",method:"post",params:e})}function c(e){return Object(n["a"])({url:"/zgCompany/changeCompanyToOther",method:"post",params:e})}function u(e){return Object(n["a"])({url:"/zgCompany/checkCompany",method:"post",params:e})}function d(e){return Object(n["a"])({url:"/zgUserPrivate/condition",method:"post",params:e})}function p(e){return Object(n["a"])({url:"/tag/all/list",method:"post",params:e})}function m(e){return Object(n["a"])({url:"/tag/save",method:"post",params:e})}function h(e){return Object(n["a"])({url:"/tag/update",method:"post",params:e})}function f(e){return Object(n["a"])({url:"/tag/delete",method:"post",params:e})}function g(e){return Object(n["a"])({baseURL:"http://data.zhiguoguo.net/parent/info",method:"post",params:e})}function b(e){return Object(n["a"])({baseURL:"http://data.zhiguoguo.net/trade/mark/info",method:"post",params:e})}function v(e){return Object(n["a"])({baseURL:"http://data.zhiguoguo.net/commerce/info",method:"post",params:e})}},a00b:function(e,t,a){"use strict";var n=a("16d4"),s=a.n(n);s.a},bb22:function(e,t,a){"use strict";var n=a("57dc"),s=a.n(n);s.a},dba2:function(e,t,a){},dc1c:function(e,t,a){"use strict";var n=a("dba2"),s=a.n(n);s.a}}]);