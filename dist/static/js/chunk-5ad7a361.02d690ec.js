(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ad7a361"],{"06d7":function(t,e,a){},"2b6d":function(t,e,a){"use strict";a.d(e,"d",function(){return r}),a.d(e,"e",function(){return s}),a.d(e,"c",function(){return o}),a.d(e,"b",function(){return l}),a.d(e,"a",function(){return i});var n=a("b775");function r(t){return Object(n["a"])({url:"/zgBusiness/condition/pager/vo",method:"post",params:t})}function s(t){return Object(n["a"])({url:"/zgCompany/detail",method:"post",params:t})}function o(t){return Object(n["a"])({url:"/zgBusinessFollow/condition/pager",method:"post",params:t})}function l(t){return Object(n["a"])({url:"/zgBusinessLog/condition/pager",method:"post",params:t})}function i(t){return Object(n["a"])({url:"/zgBusiness/deal",method:"post",params:t})}},"47ed":function(t,e,a){},5609:function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r}),a.d(e,"c",function(){return s});var n={0:"个人",1:"公司",2:"个体工商户"},r={1:"跟进记录",2:"释放到海",3:"转移客户",4:"捡入私海",5:"分配客户",6:"变更客户",7:"创建客户"},s={0:"是",1:"否"}},"90a8":function(t,e,a){"use strict";a.d(e,"i",function(){return r}),a.d(e,"h",function(){return s}),a.d(e,"k",function(){return o}),a.d(e,"g",function(){return l}),a.d(e,"d",function(){return i}),a.d(e,"b",function(){return c}),a.d(e,"c",function(){return d}),a.d(e,"l",function(){return u}),a.d(e,"m",function(){return m}),a.d(e,"a",function(){return p}),a.d(e,"o",function(){return g}),a.d(e,"e",function(){return f}),a.d(e,"j",function(){return b}),a.d(e,"n",function(){return h}),a.d(e,"f",function(){return v});var n=a("b775");function r(t){return Object(n["a"])({url:"/zgCompany/all/condition/pager",method:"post",params:t})}function s(){return Object(n["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysDept/getDeptTreeListBySysId",method:"get"})}function o(t){return Object(n["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysUser/getSysUserListByDeptIds",method:"post",data:t})}function l(){return Object(n["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysUser/getCurrentUserDeptUsers",method:"get"})}function i(t){return Object(n["a"])({url:"/zgCompany/collectCompanyToOther",method:"post",params:t})}function c(t){return Object(n["a"])({url:"/zgCompany/changeCompanyToOther",method:"post",params:t})}function d(t){return Object(n["a"])({url:"/zgCompany/checkCompany",method:"post",params:t})}function u(t){return Object(n["a"])({url:"/zgUserPrivate/condition",method:"post",params:t})}function m(t){return Object(n["a"])({url:"/tag/all/list",method:"post",params:t})}function p(t){return Object(n["a"])({url:"/tag/save",method:"post",params:t})}function g(t){return Object(n["a"])({url:"/tag/update",method:"post",params:t})}function f(t){return Object(n["a"])({url:"/tag/delete",method:"post",params:t})}function b(t){return Object(n["a"])({baseURL:"http://data.zhiguoguo.net/parent/info",method:"post",params:t})}function h(t){return Object(n["a"])({baseURL:"http://data.zhiguoguo.net/trade/mark/info",method:"post",params:t})}function v(t){return Object(n["a"])({baseURL:"http://data.zhiguoguo.net/commerce/info",method:"post",params:t})}},9605:function(t,e,a){"use strict";var n=a("06d7"),r=a.n(n);r.a},a6a8:function(t,e,a){"use strict";var n=a("47ed"),r=a.n(n);r.a},ad8f:function(t,e,a){"use strict";a.d(e,"a",function(){return r}),a.d(e,"b",function(){return s}),a.d(e,"d",function(){return o}),a.d(e,"e",function(){return l}),a.d(e,"c",function(){return i}),a.d(e,"f",function(){return c});var n=a("b775");function r(t){return Object(n["a"])({url:"/zgCompany/condition",method:"post",params:t})}function s(t){return Object(n["a"])({url:"/zgCompany/releationCondition",method:"post",params:t})}function o(t){return Object(n["a"])({url:"/zgUserPrivate/condition",method:"post",params:t})}function l(t){return Object(n["a"])({url:"/zgLatentUser/condition/pager",method:"post",params:t})}function i(t){return Object(n["a"])({url:"/crmDynamicLog/condition/pager",method:"post",params:t})}function c(t){return Object(n["a"])({url:"/zgCompany/collectCompanyToPrivate",method:"post",params:t})}},f3ce:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container customer-detail"},[a("el-container",{attrs:{height:"auto",direction:"horizontal"}},[a("div",{staticStyle:{width:"50%"}},[a("h2",[a("el-popover",{attrs:{placement:"bottom",trigger:"hover",disabled:0==t.gridData.length}},[a("el-table",{attrs:{data:t.gridData}},[a("el-table-column",{attrs:{"min-width":"200",prop:"companyName",label:"公司"}}),t._v(" "),a("el-table-column",{attrs:{width:"50",label:"主显","class-name":"is-primary-display",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.ifParentCompany?a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"主显公司",placement:"right-start"}},[a("svg-icon",{staticStyle:{"font-size":"18px"},attrs:{"icon-class":"home","class-name":"home"}})],1):t._e()]}}])})],1),t._v(" "),a("svg-icon",{attrs:{slot:"reference","icon-class":"menu2","class-name":"menu2"},slot:"reference"})],1),t._v("\n        "+t._s(t.companyInfo.companyName)+"\n      ")],1),t._v(" "),a("div",{staticClass:"tags"},[t._l(t.companyInfo.tags,function(e){return t._l(e.listTag,function(e){return a("el-tag",{key:e.tagId,attrs:{"disable-transitions":!1,size:"small"}},[t._v(t._s(e.tagName))])})}),t._v(" "),a("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:function(e){t.addTagsVisible=!0}}},[t._v("+ 标签")])],2)])]),t._v(" "),a("div",{staticClass:"container-sub"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("h3",[t._v("联系人")])]),t._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}})],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.gridDataLatent.listLoading,expression:"gridDataLatent.listLoading"}],attrs:{data:t.gridDataLatent.list,"element-loading-text":"Loading",fit:"",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"姓名",prop:"nickname","min-width":"120","class-name":"user-info",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"职位",prop:"duty","min-width":"120","class-name":"tags",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"电话",prop:"userMobile","min-width":"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.userMobile.substr(0,3)+"****"+e.row.userMobile.substr(7,e.row.userMobile.length-6)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"座机号",prop:"telephone","min-width":"120",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"微信",prop:"wxNumber","min-width":"180",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"QQ",prop:"qqNumber","min-width":"120",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"邮箱",prop:"userEmail","min-width":"200",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.onJobFlag?a("span",[t._v("在职")]):t._e(),1===e.row.onJobFlag?a("span",[t._v("离职")]):t._e()]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":t.listQuery.start,"page-size":t.listQuery.length,total:t.gridDataLatent.total},on:{"size-change":t.handleLatentSizeChange,"current-change":t.handleLatentCurrentChange}})],1),t._v(" "),a("div",{staticClass:"container-sub"},[a("el-row",[a("el-col",{attrs:{span:12}},[a("h3",[t._v("相关商机")])])],1),t._v(" "),a("el-table",{staticClass:"company-info-table",attrs:{data:t.businessData.list,"element-loading-text":"Loading",fit:"",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:"商机编号",prop:"businessId",width:"250","class-name":"user-info",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"商机名称",width:"220","class-name":"company-name","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{path:"/businessManagement/businessDetail/"+e.row.businessId}}},[a("div",{staticClass:"name"},[t._v(t._s(e.row.bussinessName))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"联系人",prop:"userName",width:"120",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"意向业务",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("businessPurposeFilter")(e.row.businessPurpose)))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"商机进度",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("businessProgressFilter")(e.row.businessProgress)))]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"成交几率",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.dealPercent)+"%")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"下次跟进时间",prop:"nextFollowTime",width:"200",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"商机创建时间",prop:"createTime",width:"200",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{path:"/businessManagement/businessDetail/"+e.row.businessId}}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("查看详情")])],1)]}}])})],1),t._v(" "),a("el-pagination",{staticClass:"pagination-table",attrs:{background:"","current-page":t.businessData.start,"page-size":t.businessData.length,layout:"total, sizes, prev, pager, next, jumper",total:t.businessData.total},on:{"size-change":t.handleBusinessSizeChange,"current-change":t.handleBusinessCurrentChange}})],1),t._v(" "),a("div",{staticClass:"container-sub list-con"},[a("el-main",[a("el-tabs",{attrs:{type:"border-card"},model:{value:t.activeTabsName,callback:function(e){t.activeTabsName=e},expression:"activeTabsName"}},[a("el-tab-pane",{attrs:{label:"动态记录",name:"first"}},[a("el-table",{attrs:{data:t.dynamicsInfo.list,border:""}},[a("el-table-column",{attrs:{width:"150",label:"动态名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-row",[t._v(t._s(t.DYNAMIC_NAME_MAP[e.row.dynamicLogName]))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"160",prop:"dealTime",label:"时间",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"dealUserName",label:"操作人",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"operationContent",label:"操作内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-row",[t._v("老顾问： "+t._s(e.row.oldCounselorName))]),t._v(" "),a("el-row",[t._v("新顾问： "+t._s(e.row.newCounselorName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"90",prop:"ifFollowLog",label:"是否跟进",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.ifFollowLog?a("el-row",[t._v("是")]):t._e(),t._v(" "),1===e.row.ifFollowLog?a("el-row",[t._v("否")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"dealRemark",label:"跟进/备注"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":t.dynamicsInfo.start,"page-size":t.dynamicsInfo.length,total:t.dynamicsInfo.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-tab-pane",{staticClass:"business-info",attrs:{label:"工商信息",name:"second"}},[a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("行业类型")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.commerceInfo.ntType))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("核准日期")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.commerceInfo.apprDate))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("成立日期")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.commerceInfo.esDate))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("核准机构")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.commerceInfo.regOrg))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("注册号")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.commerceInfo.regNo))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("营业期限制开始时间")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.commerceInfo.opFrom))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("注册地址")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.commerceInfo.dom))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("营业期限制结束时间")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.commerceInfo.opTo))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("企业法人")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.commerceInfo.frName))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("公司URL")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.commerceInfo.companyUrl))])],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("注册资本")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s(t.commerceInfo.regCap))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("行业评分(总分10000)")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}})],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("实收注册资金")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}}),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("公司评分(总分10000)")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}})],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:4}},[t._v("企业类型")]),t._v(" "),a("el-col",{staticStyle:{"border-right":"1px solid #dfe6ec","border-left":"1px solid #dfe6ec"},attrs:{span:8}},[t._v(t._s("N/A"!=t.commerceInfo.ntType?t.commerceInfo.ntType:""))]),t._v(" "),a("el-col",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"},attrs:{span:5}},[t._v("经营范围")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266"},attrs:{span:7}},[t._v(t._s(t.commerceInfo.opScope))])],1),t._v(" "),a("el-row",{staticStyle:{background:"rgba(240, 247, 252, 0.6)"}},[a("el-col",{attrs:{span:4}},[t._v("组织机构代码")]),t._v(" "),a("el-col",{staticStyle:{"border-left":"1px solid #dfe6ec","font-size":"14px",color:"#606266",background:"#fff"},attrs:{span:20}},[t._v(t._s(t.commerceInfo.shxydm))])],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"商标信息",name:"third"}},[a("el-table",{attrs:{data:t.trademarkInfo.list,border:""}},[a("el-table-column",{attrs:{width:"200",prop:"markName",label:"商标名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"unionTypeCode",label:"国际分类",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"typeDetailDesc",label:"商品服务列表"}}),t._v(" "),a("el-table-column",{attrs:{width:"100",prop:"beginDate",label:"专用期起",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100",prop:"endDate",label:"专用期止"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100",prop:"appDate",label:"申请日期"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":t.trademarkInfo.start,"page-size":t.trademarkInfo.pagerSize,total:t.trademarkInfo.total},on:{"size-change":t.handleTrademarkSizeChange,"current-change":t.handleTrademarkCurrentChange}})],1),t._v(" "),a("el-tab-pane",{attrs:{label:"专利信息",name:"fourth"}},[a("el-table",{attrs:{data:t.parentInfo.list,border:""}},[a("el-table-column",{attrs:{"min-width":"200",prop:"fzlMc",label:"专利名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{width:"200",prop:"fsqSqh",label:"申请号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"fzlZllx",label:"专利类型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fzlZflh2",label:"IPC/IDC分类",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"endDate",label:"法律状态"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"100",prop:"fzlSqr",label:"申请日期"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":t.parentInfo.start,"page-size":t.parentInfo.pagerSize,total:t.parentInfo.total},on:{"size-change":t.handleParentSizeChange,"current-change":t.handleParentCurrentChange}})],1)],1)],1)],1),t._v(" "),a("add-tags-dialog",{attrs:{visible:t.addTagsVisible,"existing-tags":t.companyInfo.tags,"company-id":t.currentCompanyId},on:{"update:visible":function(e){t.addTagsVisible=e},"update:companyId":function(e){t.currentCompanyId=e},"update:company-id":function(e){t.currentCompanyId=e}}})],1)},r=[],s=a("5609"),o=a("ad8f"),l=a("2b6d"),i=a("90a8"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:"选择标签","close-on-click-modal":t.flag,visible:t.templateDialog,width:"700px"},on:{"update:visible":function(e){t.templateDialog=e},close:t.closeDia}},[a("el-form",{attrs:{model:t.temp,"label-width":"90px"}},t._l(t.tagsList,function(e){return a("el-form-item",{key:e.tagId,attrs:{label:e.tagName}},[a("el-checkbox-group",{model:{value:t.temp.tagIds,callback:function(e){t.$set(t.temp,"tagIds",e)},expression:"temp.tagIds"}},t._l(e.listTag,function(e){return a("el-checkbox",{key:e.tagId,attrs:{label:e.tagId}},[t._v(t._s(e.tagName))])}),1)],1)}),1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:t.closeDia}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.save}},[t._v("保存")])],1)],1)},d=[],u=(a("6b54"),a("ac6a"),{inject:["reload"],name:"AddTagsDialog",props:{visible:{type:Boolean,default:!1},companyId:{type:String,default:null},existingTags:{type:Array,default:null}},data:function(){return{flag:!1,templateDialog:this.visible,tagsList:[],temp:{tagIds:[]}}},watch:{visible:function(t,e){this.templateDialog=t},companyId:{handler:function(t,e){this.temp.companyId=t},deep:!0,immediate:!0},existingTags:{handler:function(t,e){var a=this;t.forEach(function(t){t.listTag.forEach(function(t){a.temp.tagIds.push(t.tagId)})})},deep:!0,immediate:!0}},created:function(){this.getTagsList()},methods:{getTagsList:function(){var t=this,e=this;Object(i["m"])({}).then(function(a){1e4===a.data.code?(e.tagsList=[],a.data.data.forEach(function(t){t.listTag&&t.listTag.length>0&&e.tagsList.push(t)})):t.$message.error(a.data.message)}).catch(function(t){console.log("err",t)})},closeDia:function(){this.temp={tagIds:[]},this.$emit("update:visible",!1)},save:function(){var t=this;if(0===t.temp.tagIds.length)return t.$message.warning("请选择要添加的标签！"),!1;t.$set(t.temp,"tagIds",t.temp.tagIds.toString()),Object(i["a"])(t.temp).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.closeDia(),t.reload()):t.$message.error(e.data.message)}).catch(function(t){console.log("err",t)})}}}),m=u,p=(a("9605"),a("2877")),g=Object(p["a"])(m,c,d,!1,null,"b00da6cc",null),f=g.exports,b={inject:["closeSelectedTag"],name:"CustomerDetail",components:{AddTagsDialog:f},props:{tagsList:{type:Array,default:null}},data:function(){return{activeTabsName:"first",activeTabsName1:"fourth1",postForm:{companyId:""},listQuery:{start:1,length:10,companyId:this.companyId},listQueryDynamic:{start:1,length:10,companyId:this.companyId},currentCompanyId:null,currentCompanyName:null,companyInfo:{tags:[]},COMPANY_TYPE_MAP:s["a"],DYNAMIC_NAME_MAP:s["b"],TRUE_OR_FALSE:s["c"],userPrivate:{createUserName:"",createTime:""},listLoading:!0,gridDataLatent:{list:[],listLoading:!0,total:0},gridData:[],dynamicsInfo:{list:[],listLoading:!0,total:0,pagerSize:10,start:1},gridData2:[],businessInfoParams:{start:"1",length:"10",selectType:"0",businessType:"-1",dealType:"-1",businessPurpose:"-1",businessProgress:"-1",releasingFlage:"-1"},businessData:{list:[],listLoading:!0,total:0},addTagsVisible:!1,parentInfoParams:{start:1,length:10},parentInfo:{list:[],listLoading:!0,total:0},trademarkInfoParams:{start:1,length:10},trademarkInfo:{list:[],listLoading:!0,total:0},commerceInfo:{list:[],listLoading:!0,total:0}}},watch:{currentCompanyName:{handler:function(t,e){t&&(this.getParentInfo(),this.getTrademarkInfo(),this.getCommerceInfo())},immediate:!0,deep:!0}},created:function(){this.currentCompanyId=this.$route.params.currentCompanyId,this.fetchData(),this.getBusinessPagerInfo()},methods:{fetchData:function(){var t=this;t.listLoading=!0,t.tableData&&(t.list=t.tableData,t.listLoading=!1),t.postForm.companyId=t.currentCompanyId,Object(o["b"])(t.postForm).then(function(e){1e4===e.data.code?e.data.data.lenght>0&&(t.gridData=e.data.data):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e)}),Object(o["a"])(t.postForm).then(function(e){1e4===e.data.code?e.data.data.length>0&&(t.companyInfo=e.data.data[0],t.currentCompanyName=e.data.data[0].companyName):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e)}),Object(o["d"])(t.postForm).then(function(e){1e4===e.data.code?e.data.data.length>0&&(t.userPrivate=Object.assign({},t.userPrivate,{createUserName:e.data.data[0].createUserName,createTime:e.data.data[0].createTime})):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e)}),t.getLatentInfo(),t.getCrmDynamicLog()},getLatentInfo:function(t){var e=this;"undefined"!==typeof t&&(this.listQuery=t),this.listQuery.companyId=this.$route.params.currentCompanyId,this.$set(this.gridDataLatent,"listLoading",!0),Object(o["e"])(this.listQuery).then(function(t){e.gridDataLatent=Object.assign({},e.gridDataLatent,{list:t.data.data,total:t.data.total,listLoading:!1})}).catch(function(t){console.log("err",t)})},getBusinessPagerInfo:function(){var t=this;this.$set(this.businessData,"listLoading",!0),this.$set(this.businessInfoParams,"companyId",this.currentCompanyId),Object(l["d"])(this.businessInfoParams).then(function(e){1e4===e.data.code?t.businessData=Object.assign({},t.businessData,{list:e.data.data,total:e.data.total,start:e.data.start,length:e.data.length,listLoading:!1}):(t.$message.error(e.data.message),t.$set(t.businessData,"listLoading",!1))}).catch(function(t){console.log("err",t)})},getCrmDynamicLog:function(t){var e=this;"undefined"!==typeof t&&(e.listQueryDynamic=t),e.listQueryDynamic.companyId=e.$route.params.currentCompanyId,e.$set(e.dynamicsInfo,"listLoading",!0),Object(o["c"])(e.listQueryDynamic).then(function(t){1e4===t.data.code?t.data.data.length>0&&(e.dynamicsInfo=Object.assign({},e.dynamicsInfo,{list:t.data.data,total:t.data.total,start:t.data.start,length:t.data.length,listLoading:!1})):e.$message.error(t.data.message)}).catch(function(t){e.$message.error(t)})},pickUpPrivate:function(){var t=this;t.postForm.companyId=this.currentCompanyId,Object(o["f"])(t.postForm).then(function(e){t.closeSelectedTag(),t.$router.push({path:"/customerManagement/myCustomer"})}).catch(function(t){console.log("err",t)})},handleLatentCurrentChange:function(t){this.gridDataLatent.userParams.start=t,this.getLatentInfo()},handleLatentSizeChange:function(t){this.gridDataLatent.userParams.length=t,this.getLatentInfo()},handleBusinessCurrentChange:function(t){this.$set(this.businessInfoParams,"start",t),this.getBusinessPagerInfo()},handleBusinessSizeChange:function(t){this.$set(this.businessInfoParams,"length",t),this.getBusinessPagerInfo()},handleDynamicSizeChange:function(t){this.dynamicsInfoParams.length=t,this.getCrmDynamicLog()},handleDynamicCurrentChange:function(t){this.dynamicsInfoParams.start=t,this.getCrmDynamicLog()},handleSizeChange:function(t){console.log("每页 ".concat(t," 条"))},handleCurrentChange:function(t){console.log("当前页: ".concat(t))},getParentInfo:function(){var t=this;t.$set(t.parentInfo,"listLoading",!0),t.$set(t.parentInfoParams,"companyName",t.currentCompanyName),Object(i["j"])(t.parentInfoParams).then(function(e){1e4===e.data.code?(t.parentInfo=Object.assign({},t.parentInfo,{list:e.data.data,total:e.data.total,start:e.data.start,pagerSize:e.data.pagerSize,listLoading:!1}),console.log(t.parentInfo)):t.$message.error(e.data.message)}).catch(function(t){console.log(t)})},handleParentCurrentChange:function(t){this.$set(this.parentInfoParams,"start",t),this.getParentInfo()},handleParentSizeChange:function(t){this.$set(this.parentInfoParams,"length",t),this.getParentInfo()},getTrademarkInfo:function(){var t=this;t.$set(t.trademarkInfo,"listLoading",!0),t.$set(t.trademarkInfoParams,"companyName",t.currentCompanyName),Object(i["n"])(t.trademarkInfoParams).then(function(e){1e4===e.data.code?(t.trademarkInfo=Object.assign({},t.trademarkInfo,{list:e.data.data,total:e.data.total,start:e.data.start,pagerSize:e.data.pagerSize,listLoading:!1}),console.log(t.trademarkInfo)):t.$message.error(e.data.message)}).catch(function(t){console.log(t)})},handleTrademarkCurrentChange:function(t){this.$set(this.trademarkInfoParams,"start",t),this.getTrademarkInfo()},handleTrademarkSizeChange:function(t){this.$set(this.trademarkInfoParams,"length",t),this.getTrademarkInfo()},getCommerceInfo:function(){var t=this;Object(i["f"])({companyName:t.currentCompanyName}).then(function(e){1e4===e.data.code?(1===e.data.data.length&&(t.commerceInfo=e.data.data[0]),console.log("commerceInfo",t.commerceInfo)):t.$message.error(e.data.message)}).catch(function(t){console.log("err",t)})}}},h=b,v=(a("a6a8"),Object(p["a"])(h,n,r,!1,null,"5071434e",null));e["default"]=v.exports}}]);