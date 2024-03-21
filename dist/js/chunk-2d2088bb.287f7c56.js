(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2088bb"],{a4f8:function(e,t,n){"use strict";n.r(t);n("b0c0");var a=n("7a23"),r={class:"row"},l={class:"col-lg-12"},o={class:"card"},c={class:"card-body"},s=Object(a["createElementVNode"])("h4",{class:"card-title"},"Listes des rapport annuels",-1),d=Object(a["createElementVNode"])("p",{class:"card-title-desc"},[Object(a["createTextVNode"])(" Le tableau ci-dessous présente la listes des "),Object(a["createElementVNode"])("code",null,"rapport annuels"),Object(a["createTextVNode"])(". ")],-1),i=Object(a["createTextVNode"])(" annual_reports "),u={class:"table-responsive"},p={class:"table align-middle mb-0"},b=Object(a["createElementVNode"])("thead",null,[Object(a["createElementVNode"])("tr",null,[Object(a["createElementVNode"])("th",null,"#"),Object(a["createElementVNode"])("th",null,"Secteur"),Object(a["createElementVNode"])("th",null,"Nom du rapport"),Object(a["createElementVNode"])("th",null,"Fichier"),Object(a["createElementVNode"])("th",null,"Année")])],-1),m={scope:"row"},O=["href"],j=Object(a["createElementVNode"])("i",{class:"bx bx-download font-size-16 align-middle mx-1 text-white"},null,-1),f=Object(a["createTextVNode"])(" Télécharger "),h=[j,f],E={class:"row"},V={class:"mb-3"},N=Object(a["createElementVNode"])("label",{for:""},"Nom du rapport annuel",-1),g={key:0,class:"text-danger mt-2"},v=Object(a["createElementVNode"])("label",{for:""},"Fichier du rapport annuel",-1),y=Object(a["createElementVNode"])("input",{type:"file",required:"",accept:".pdf, .docx",id:"file",class:"form-control"},null,-1),k={key:0,class:"text-danger mt-2"},x={key:0,class:"mt-3"},w=Object(a["createElementVNode"])("input",{type:"submit",value:"Enregistrer",class:"btn btn-primary"},null,-1),D=[w],_={key:1,class:"mt-3 text-center"},B=Object(a["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(a["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),T=[B];function L(e,t,n,j,f,w){var B=Object(a["resolveComponent"])("PageHeader"),L=Object(a["resolveComponent"])("router-link"),S=Object(a["resolveComponent"])("b-modal"),A=Object(a["resolveComponent"])("Layout");return Object(a["openBlock"])(),Object(a["createBlock"])(A,null,{default:Object(a["withCtx"])((function(){return[Object(a["createVNode"])(B,{title:f.title,items:f.items},null,8,["title","items"]),Object(a["createElementVNode"])("div",r,[Object(a["createElementVNode"])("div",l,[Object(a["createElementVNode"])("div",o,[Object(a["createElementVNode"])("div",c,[s,d,i,Object(a["createElementVNode"])("div",u,[Object(a["createElementVNode"])("table",p,[b,Object(a["createElementVNode"])("tbody",null,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(f.annual_reports,(function(e,t){return Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",{key:e.id},[Object(a["createElementVNode"])("th",m,Object(a["toDisplayString"])(t+1),1),Object(a["createElementVNode"])("td",null,[Object(a["createVNode"])(L,{to:"/cdn/sectors/"+e.entity.id},{default:Object(a["withCtx"])((function(){return[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.entity.name),1)]})),_:2},1032,["to"])]),Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(e.name),1),Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("a",{href:f.STORAGE_URL+e.file,target:"_blank",class:"btn btn-primary rounded-pill"},h,8,O)]),Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(e.year),1)])})),128))])])])])])])]),Object(a["createVNode"])(S,{modelValue:j.doesAddOpen,"onUpdate:modelValue":t[2]||(t[2]=function(e){return j.doesAddOpen=e}),id:"modal-center",centered:"",title:"Ajouter un rapport annuel","title-class":"font-18","hide-footer":""},{default:Object(a["withCtx"])((function(){return[Object(a["createElementVNode"])("form",{onSubmit:t[1]||(t[1]=Object(a["withModifiers"])((function(e){return w.addItem()}),["prevent"]))},[Object(a["createElementVNode"])("div",E,[Object(a["createElementVNode"])("div",V,[N,Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{type:"text",required:"","onUpdate:modelValue":t[0]||(t[0]=function(e){return f.name=e}),class:"form-control"},null,512),[[a["vModelText"],f.name]]),f.errors.name?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",g,Object(a["toDisplayString"])(f.errors.name),1)):Object(a["createCommentVNode"])("",!0)]),Object(a["createElementVNode"])("div",null,[v,y,f.errors.file?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",k,Object(a["toDisplayString"])(f.errors.file),1)):Object(a["createCommentVNode"])("",!0)])]),f.loading?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",_,T)):(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",x,D))],32)]})),_:1},8,["modelValue"])]})),_:1})}n("a4d3"),n("e01a"),n("d3b7");var S=n("3d20"),A=n.n(S),C=n("444f"),R=n("c2a4"),F=n("2579"),U=n("e01f"),q={setup:function(){var e=Object(a["ref"])(!1),t=Object(a["ref"])(!1),n=Object(a["ref"])(!1);return{doesAddOpen:e,doesEditOpen:t,doesDeleteOpen:n}},page:{title:"Tous les rapport annuels",meta:[{name:"description",content:R.description}]},components:{Layout:C["a"],PageHeader:F["a"]},data:function(){return{title:"Tous les rapport annuels",items:[{text:"Menu",href:"/"},{text:"Tous les rapport annuels",active:!0}],errors:[],annual_report:null,annual_reports:[],name:"",year:"",loading:!1,STORAGE_URL:U["a"].STORAGE_URL,status:201}},methods:{loadList:function(){var e=this;fetch(U["a"].route("annual-reports"),U["a"].requestOptions()).then((function(e){return U["a"].tokenChecker(e.status),e.json()})).then((function(t){console.log(t.data),e.annual_reports=t.data}))},addItem:function(){var e=this;this.loading=!0,this.errors=[];var t=new FormData;t.append("name",this.name),t.append("file",document.getElementById("file").files[0]),t.append("year",(new Date).getFullYear()),fetch(U["a"].route("annual-reports"),U["a"].requestOptions("POST",t)).then((function(t){return U["a"].tokenChecker(t.status),e.status=t.status,t.json()})).then((function(t){e.loading=!1,200==e.status?(e.doesAddOpen=!1,e.initData(null),e.annual_reports.push(t.data),A.a.fire("Rapport annuel ajouter !","Le rapport annuel a été enregistré avec succès.","success")):t.data?(e.errors.name=U["a"].getError(t.data,"name"),e.errors.file=U["a"].getError(t.data,"file")):(e.doesAddOpen=!1,e.initData(null),A.a.fire("Rapport annuel non ajouter ?",t.message,"error"))})).catch((function(t){console.log(t),e.loading=!1}))},initItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"edit";this.annual_report=e,this.initData(e),"delete"==t?this.doesDeleteOpen=!0:this.doesEditOpen=!0},initData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.name=null!=e?e.name:"",this.year=null!=e?e.year:""}},mounted:function(){this.loadList()},watch:{doesAddOpen:function(){this.errors=[]},doesEditOpen:function(){this.errors=[],this.doesEditOpen||(this.annual_report=null,this.initData(null))},doesDeleteOpen:function(){this.doesDeleteOpen||(this.annual_report=null,this.initData(null))}}},I=n("6b0d"),G=n.n(I);const M=G()(q,[["render",L]]);t["default"]=M}}]);
//# sourceMappingURL=chunk-2d2088bb.287f7c56.js.map