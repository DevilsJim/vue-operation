(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ed121cd"],{"06e2":function(e,t,a){"use strict";var r=a("55aa"),n=a.n(r);n.a},"28e3":function(e,t,a){},"45bf":function(e,t,a){"use strict";var r=a("4e1b"),n=a.n(r);n.a},"4e1b":function(e,t,a){},"55aa":function(e,t,a){},"8b0f":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-container",[a("el-header",{staticClass:"tag-header"},[a("span",[e._v("标签分组")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"success",icon:"el-icon-plus"},on:{click:e.handleAddGroup}},[e._v("添加分组")])],1),e._v(" "),a("el-tabs",{attrs:{"tab-position":"left",type:"card"}},e._l(e.tagsAllList,function(t){return a("el-tab-pane",{key:t.tagId,attrs:{label:t.tagName}},[a("el-header",[a("span",{staticStyle:{"font-weight":"bold",float:"left","font-size":"18px"}},[e._v(e._s(t.tagName))]),e._v(" "),a("span",{staticStyle:{float:"right"}},[a("el-button",{attrs:{type:"primary",plain:"",size:"small"},on:{click:function(a){return e.handleUpdateGroup(t)}}},[e._v("修改分组名")]),e._v(" "),a("el-button",{attrs:{type:"danger",plain:"",size:"small"},on:{click:function(a){return e.handleDeleteGroup(t)}}},[e._v("删除分组")])],1)]),e._v(" "),a("el-header",{staticStyle:{"background-color":"#f2f2f2"}},[a("span",{staticStyle:{float:"left"}},[a("el-button",{attrs:{size:"small",plain:"",type:"primary"},on:{click:function(a){return e.handleAddLabel(t)}}},[e._v("创建标签")])],1),e._v(" "),a("span",{staticStyle:{float:"right"}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.isShow,expression:"!isShow"}],attrs:{type:"success",plain:"",size:"small"},on:{click:function(t){e.isShow=!0}}},[e._v("批量管理")]),e._v(" "),a("el-checkbox",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],attrs:{indeterminate:e.isIndeterminate},on:{change:function(a){return e.handleCheckAllChange(t.listTag)}},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],attrs:{type:"danger",plain:"",size:"small"},on:{click:e.deleteCheckLabel}},[e._v("删除")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],attrs:{plain:"",size:"small"},on:{click:function(t){e.isShow=!1}}},[e._v("取消")])],1)]),e._v(" "),a("el-main",[a("el-checkbox-group",{model:{value:e.selectTags,callback:function(t){e.selectTags=t},expression:"selectTags"}},[e._l(t.listTag,function(r){return a("el-checkbox",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],key:r.tagName,attrs:{label:r.tagId},on:{change:function(a){return e.handleCheckedTagsChange(t.listTag)}}},[a("el-button",{style:{backgroundColor:e.bgColor}},[e._v(e._s(r.tagName))])],1)}),e._v(" "),e._l(t.listTag,function(t){return a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.isShow,expression:"!isShow"}],key:t.tagId,style:{backgroundColor:e.bgColor},attrs:{size:"small"},on:{click:function(a){return e.handleUpdateLabel(t)}}},[e._v(e._s(t.tagName))])})],2),e._v(" "),a("el-checkbox",{staticClass:"checkbox-tags",model:{value:e.checkbox,callback:function(t){e.checkbox=t},expression:"checkbox"}},[e._v("允许这组标签多选")]),e._v(" "),a("div",{staticClass:"color-picker"},[e._v("选择分组颜色"),a("el-color-picker",{attrs:{size:"small","show-alpha":""},model:{value:e.bgColor,callback:function(t){e.bgColor=t},expression:"bgColor"}})],1)],1)],1)}),1)],1),e._v(" "),a("save-or-update-group",{attrs:{"create-or-update-visible":e.createOrUpdate,"create-or-update-title-visible":e.createOrUpdateTitle,"update-group-data":e.updateGroupData},on:{"update:createOrUpdateVisible":function(t){e.createOrUpdate=t},"update:create-or-update-visible":function(t){e.createOrUpdate=t},"update:updateGroupData":function(t){e.updateGroupData=t},"update:update-group-data":function(t){e.updateGroupData=t}}}),e._v(" "),a("save-or-update-label",{attrs:{"create-or-update-visible":e.createOrUpdateLabel,"create-or-update-title-visible":e.createOrUpdateLabelTitle,"label-data":e.labelData},on:{"update:createOrUpdateVisible":function(t){e.createOrUpdateLabel=t},"update:create-or-update-visible":function(t){e.createOrUpdateLabel=t},"update:labelData":function(t){e.labelData=t},"update:label-data":function(t){e.labelData=t}}})],1)},n=[],s=(a("6b54"),a("90a8")),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,"close-on-click-modal":e.flag,visible:e.visible,width:"500px"},on:{"update:visible":function(t){e.visible=t},close:function(t){return e.closeDia("ruleForm")}}},[a("el-form",{ref:"ruleForm",attrs:{rules:e.rules,"label-width":"90px",size:"mini",model:e.labelInfo}},[a("el-form-item",{attrs:{label:"标签名:","label-width":"90px",prop:"tagName"}},[a("el-input",{attrs:{placeholder:"请输入标签名",clearable:""},model:{value:e.labelInfo.tagName,callback:function(t){e.$set(e.labelInfo,"tagName",t)},expression:"labelInfo.tagName"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保存")])],1)],1)},o=[],i={inject:["reload"],name:"SaveOrUpdateLabel",props:{createOrUpdateVisible:{type:Boolean,default:!1},createOrUpdateTitleVisible:{type:Boolean,default:!1},labelData:{type:Object,default:null}},data:function(){return{flag:!1,visible:this.createOrUpdateVisible,labelInfo:{tagName:""},title:"创建标签",rules:{tagName:[{required:!0,message:"请输入标签名！",trigger:"blur"}]}}},watch:{createOrUpdateVisible:function(){this.visible=this.createOrUpdateVisible},createOrUpdateTitleVisible:function(e){this.title=e?"创建标签":"修改标签"},labelData:{handler:function(e,t){this.createOrUpdateTitleVisible?this.labelInfo=Object.assign({},this.labelInfo,{parentTagId:e.tagId}):this.labelInfo=Object.assign({},this.labelInfo,{tagName:e.tagName,tagId:e.tagId})},deep:!0,immediate:!0}},methods:{closeDia:function(e){this.labelInfo={tagName:""},this.$refs[e].resetFields(),this.$emit("update:createOrUpdateVisible",!1)},save:function(e){var t=this,a=this;a.$refs[e].validate(function(e){e&&(t.createOrUpdateTitleVisible?Object(s["a"])(t.labelInfo).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.closeDia("ruleForm"),t.reload()):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e)}):Object(s["o"])(t.labelInfo).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.closeDia("ruleForm"),t.reload()):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e)}))})}}},c=i,u=(a("e675"),a("2877")),d=Object(u["a"])(c,l,o,!1,null,"757d0054",null),p=d.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,"close-on-click-modal":e.flag,visible:e.visible,width:"500px"},on:{"update:visible":function(t){e.visible=t},close:function(t){return e.closeDia("ruleForm")}}},[a("el-form",{ref:"ruleForm",attrs:{rules:e.rules,"label-width":"90px",size:"mini",model:e.groupData}},[a("el-form-item",{attrs:{label:"分组名:",prop:"tagName"}},[a("el-input",{attrs:{placeholder:"请输入分组名",clearable:""},model:{value:e.groupData.tagName,callback:function(t){e.$set(e.groupData,"tagName",t)},expression:"groupData.tagName"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("ruleForm")}}},[e._v("保存")])],1)],1)},f=[],g={inject:["reload"],name:"SaveOrUpdateGroup",props:{createOrUpdateVisible:{type:Boolean,default:!1},createOrUpdateTitleVisible:{type:Boolean,default:!1},updateGroupData:{type:Object,default:null}},data:function(){return{flag:!1,visible:!1,groupData:{},title:"创建分组",rules:{tagName:[{required:!0,message:"请输入分组名！",trigger:"blur"}]}}},watch:{createOrUpdateVisible:function(e,t){this.visible=e},createOrUpdateTitleVisible:function(e){this.title=e?"创建分组":"修改分组"},updateGroupData:function(e){this.groupData=Object.assign({},this.groupData,{tagName:e.tagName,tagId:e.tagId})}},methods:{closeDia:function(e){this.groupData={},this.$refs[e].resetFields(),this.$emit("update:createOrUpdateVisible",!1)},save:function(e){var t=this,a=this;a.$refs[e].validate(function(e){e&&(t.createOrUpdateTitleVisible?Object(s["a"])(t.groupData).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.closeDia("ruleForm"),t.reload()):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e)}):Object(s["o"])(t.groupData).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.closeDia("ruleForm"),t.reload()):t.$message.error(e.data.message)}).catch(function(e){t.$message.error(e)}))})}}},b=g,m=(a("06e2"),Object(u["a"])(b,h,f,!1,null,"55ae60c5",null)),v=m.exports,O={inject:["reload"],name:"CustomerLabel",components:{SaveOrUpdateGroup:v,SaveOrUpdateLabel:p},data:function(){return{bgColor:"#1890ff",color:"#ffffff",isShow:!1,checkAll:!1,selectTags:[],isIndeterminate:!1,createOrUpdate:!1,createOrUpdateTitle:!0,updateGroupData:{},createOrUpdateLabel:!1,createOrUpdateLabelTitle:!0,labelData:{},checkbox:!0,tagsAllList:[],curListTag:[]}},watch:{bgColor:function(e,t){this.bgColor=e}},created:function(){this.getTagsList()},methods:{handleAddGroup:function(){this.createOrUpdate=!0,this.createOrUpdateTitle=!0},handleUpdateGroup:function(e){this.updateGroupData=e,this.createOrUpdate=!0,this.createOrUpdateTitle=!1},handleAddLabel:function(e){this.createOrUpdateLabel=!0,this.createOrUpdateLabelTitle=!0,this.labelData=e},handleUpdateLabel:function(e){this.createOrUpdateLabel=!0,this.createOrUpdateLabelTitle=!1,this.labelData=e},deleteCheckLabel:function(){var e=this,t=this;if(console.log(this.selectTags),0===t.selectTags.length)return t.$message.warning("请选择要删除标签！"),!1;t.$confirm("此操作将永久删除该标签, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.deleteTag(e.selectTags.toString())}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},selectGroup:function(e,t,a){var r={};r.id=e,r.groupname=a.$attrs.title,this.updateGroupData=JSON.stringify(r)},handleDeleteGroup:function(e){var t=this,a=this;a.$confirm("此操作将永久删除该分组, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){if(e.listTag.length>0)return a.$message.error("请先删除完组内标签！"),!1;t.deleteTag(e.tagId)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},deleteTag:function(e){var t=this;Object(s["e"])({tagIds:e}).then(function(e){1e4===e.data.code?(t.$message.success(e.data.message),t.reload()):t.$message.error(e.data.message)}).catch(function(e){console.log("err",e)})},handleCheckAllChange:function(e){this.selectTags=this.checkAll?e.reduce(function(e,t){return e.push(t.tagId),e},[]):[],this.isIndeterminate=!1,console.log(this.selectTags)},handleCheckedTagsChange:function(e){var t=this.selectTags.length;this.checkAll=t===e.length,this.isIndeterminate=t>0&&t<e.length,console.log(this.selectTags)},getTagsList:function(){var e=this,t=this;Object(s["m"])({}).then(function(a){1e4===a.data.code?t.tagsAllList=a.data.data:e.$message.error(a.data.message)}).catch(function(e){console.log("err",e)})}}},U=O,k=(a("45bf"),Object(u["a"])(U,r,n,!1,null,"17001210",null));t["default"]=k.exports},"90a8":function(e,t,a){"use strict";a.d(t,"i",function(){return n}),a.d(t,"h",function(){return s}),a.d(t,"k",function(){return l}),a.d(t,"g",function(){return o}),a.d(t,"d",function(){return i}),a.d(t,"b",function(){return c}),a.d(t,"c",function(){return u}),a.d(t,"l",function(){return d}),a.d(t,"m",function(){return p}),a.d(t,"a",function(){return h}),a.d(t,"o",function(){return f}),a.d(t,"e",function(){return g}),a.d(t,"j",function(){return b}),a.d(t,"n",function(){return m}),a.d(t,"f",function(){return v});var r=a("b775");function n(e){return Object(r["a"])({url:"/zgCompany/all/condition/pager",method:"post",params:e})}function s(){return Object(r["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysDept/getDeptTreeListBySysId",method:"get"})}function l(e){return Object(r["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysUser/getSysUserListByDeptIds",method:"post",data:e})}function o(){return Object(r["a"])({baseURL:"http://192.168.91.112:10006/api/v1/sysUser/getCurrentUserDeptUsers",method:"get"})}function i(e){return Object(r["a"])({url:"/zgCompany/collectCompanyToOther",method:"post",params:e})}function c(e){return Object(r["a"])({url:"/zgCompany/changeCompanyToOther",method:"post",params:e})}function u(e){return Object(r["a"])({url:"/zgCompany/checkCompany",method:"post",params:e})}function d(e){return Object(r["a"])({url:"/zgUserPrivate/condition",method:"post",params:e})}function p(e){return Object(r["a"])({url:"/tag/all/list",method:"post",params:e})}function h(e){return Object(r["a"])({url:"/tag/save",method:"post",params:e})}function f(e){return Object(r["a"])({url:"/tag/update",method:"post",params:e})}function g(e){return Object(r["a"])({url:"/tag/delete",method:"post",params:e})}function b(e){return Object(r["a"])({baseURL:"http://data.zhiguoguo.net/parent/info",method:"post",params:e})}function m(e){return Object(r["a"])({baseURL:"http://data.zhiguoguo.net/trade/mark/info",method:"post",params:e})}function v(e){return Object(r["a"])({baseURL:"http://data.zhiguoguo.net/commerce/info",method:"post",params:e})}},e675:function(e,t,a){"use strict";var r=a("28e3"),n=a.n(r);n.a}}]);