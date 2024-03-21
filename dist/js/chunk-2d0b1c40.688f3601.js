(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b1c40"],{"20f2":function(e,t,n){"use strict";n.r(t);n("b0c0"),n("a4d3"),n("e01a");var r=n("7a23"),o={class:"hstack mb-3"},a=Object(r["createElementVNode"])("i",{class:"bx bx-plus font-size-16 align-middle me-2"},null,-1),c=Object(r["createTextVNode"])(" Ajouter un nouveau "),l={class:"row"},s={class:"col-lg-12"},i={class:"card"},d={class:"card-body"},u=Object(r["createElementVNode"])("h4",{class:"card-title"},"Listes des formulaires",-1),m=Object(r["createElementVNode"])("p",{class:"card-title-desc"},[Object(r["createTextVNode"])(" Le tableau ci-dessous présente la listes des "),Object(r["createElementVNode"])("code",null,"formulaires"),Object(r["createTextVNode"])(". ")],-1),b={class:"table-responsive"},O={class:"table align-middle mb-0"},p=Object(r["createElementVNode"])("thead",null,[Object(r["createElementVNode"])("tr",null,[Object(r["createElementVNode"])("th",null,"#"),Object(r["createElementVNode"])("th",null,"Nom "),Object(r["createElementVNode"])("th",null,"Description "),Object(r["createElementVNode"])("th",null,"Date "),Object(r["createElementVNode"])("th",{class:"text-center"},"Questions "),Object(r["createElementVNode"])("th",{class:"text-center"},"Peux répondre "),Object(r["createElementVNode"])("th",null,"Action")])],-1),j={scope:"row"},f={class:"text-truncate",style:{"max-width":"250px"}},h={class:"text-center"},V={class:"text-center"},E={class:"hstack"},N=Object(r["createElementVNode"])("i",{class:"bx bx-edit font-size-16 align-middle mx-1"},null,-1),v=Object(r["createElementVNode"])("i",{class:"bx bx-trash font-size-16 align-middle mx-1"},null,-1),g={class:"row"},k={class:"col-md-6 mb-3"},x=Object(r["createElementVNode"])("label",{for:""},"Nom du formulaire",-1),y={key:0,class:"text-danger mt-2"},D={class:"col-md-6 mb-3"},w=Object(r["createElementVNode"])("label",{for:""},"Date de Fin d'envoie de réponse",-1),C={key:0,class:"text-danger mt-2"},B=Object(r["createElementVNode"])("label",{for:""},"Description du formulaire",-1),S={key:0,class:"mt-3"},L=Object(r["createElementVNode"])("input",{type:"submit",value:"Enregistrer",class:"btn btn-primary"},null,-1),T=[L],F={key:1,class:"mt-3 text-center"},q=Object(r["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(r["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),_=[q],z={class:"row"},A={class:"col-md-6 mb-3"},M=Object(r["createElementVNode"])("label",{for:""},"Nom du formulaire",-1),U={key:0,class:"text-danger mt-2"},I={class:"col-md-6 mb-3"},P=Object(r["createElementVNode"])("label",{for:""},"Date de Fin d'envoie de réponse",-1),H={key:0,class:"text-danger mt-2"},J=Object(r["createElementVNode"])("label",{for:""},"Description du formulaire",-1),Q={key:0,class:"mt-3"},G=Object(r["createElementVNode"])("input",{type:"submit",value:"Enregistrer",class:"btn btn-primary"},null,-1),K=[G],R={key:1,class:"mt-3 text-center"},W=Object(r["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(r["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),X=[W],Y={class:"mb-2"},Z=Object(r["createTextVNode"])(" Voulez-vous vraiment supprimer le formulaire "),$={key:0,class:"hstack mt-2"},ee={key:1,class:"text-center"},te=Object(r["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(r["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),ne=[te];function re(e,t,n,L,q,G){var W=Object(r["resolveComponent"])("PageHeader"),te=Object(r["resolveComponent"])("b-button"),re=Object(r["resolveComponent"])("router-link"),oe=Object(r["resolveComponent"])("b-modal"),ae=Object(r["resolveComponent"])("Layout");return Object(r["openBlock"])(),Object(r["createBlock"])(ae,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(W,{title:q.title,items:q.items},null,8,["title","items"]),Object(r["createElementVNode"])("div",o,[Object(r["createVNode"])(te,{variant:"primary",onClick:t[0]||(t[0]=function(e){return L.doesAddOpen=!0}),class:"ms-auto"},{default:Object(r["withCtx"])((function(){return[a,c]})),_:1})]),Object(r["createElementVNode"])("div",l,[Object(r["createElementVNode"])("div",s,[Object(r["createElementVNode"])("div",i,[Object(r["createElementVNode"])("div",d,[u,m,Object(r["createElementVNode"])("div",b,[Object(r["createElementVNode"])("table",O,[p,Object(r["createElementVNode"])("tbody",null,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(q.formulars,(function(e,t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("tr",{key:e.id},[Object(r["createElementVNode"])("th",j,Object(r["toDisplayString"])(t+1),1),Object(r["createElementVNode"])("td",null,[Object(r["createVNode"])(re,{to:"/cdn/formulars/"+e.id},{default:Object(r["withCtx"])((function(){return[Object(r["createTextVNode"])(Object(r["toDisplayString"])(e.name),1)]})),_:2},1032,["to"])]),Object(r["createElementVNode"])("td",f,Object(r["toDisplayString"])(e.description),1),Object(r["createElementVNode"])("td",null,Object(r["toDisplayString"])(e.date),1),Object(r["createElementVNode"])("td",h,Object(r["toDisplayString"])(e.formular_quizzes.length),1),Object(r["createElementVNode"])("td",V,Object(r["toDisplayString"])(e.can_submit?"Oui":"Non"),1),Object(r["createElementVNode"])("td",E,[Object(r["createVNode"])(te,{class:"btn-sm",onClick:function(t){return G.initItem(e)},variant:"success"},{default:Object(r["withCtx"])((function(){return[N]})),_:2},1032,["onClick"]),Object(r["createVNode"])(te,{variant:"danger",onClick:function(t){return G.initItem(e,"delete")},class:"ms-2 btn-sm"},{default:Object(r["withCtx"])((function(){return[v]})),_:2},1032,["onClick"])])])})),128))])])])])])])]),Object(r["createVNode"])(oe,{modelValue:L.doesAddOpen,"onUpdate:modelValue":t[5]||(t[5]=function(e){return L.doesAddOpen=e}),id:"modal-center",centered:"",size:"lg",title:"Ajouter un formulaire","title-class":"font-18","hide-footer":""},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("form",{onSubmit:t[4]||(t[4]=Object(r["withModifiers"])((function(e){return G.addItem()}),["prevent"]))},[Object(r["createElementVNode"])("div",g,[Object(r["createElementVNode"])("div",k,[x,Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{type:"text",required:"","onUpdate:modelValue":t[1]||(t[1]=function(e){return q.name=e}),class:"form-control"},null,512),[[r["vModelText"],q.name]]),q.errors.name?(Object(r["openBlock"])(),Object(r["createElementBlock"])("span",y,Object(r["toDisplayString"])(q.errors.name),1)):Object(r["createCommentVNode"])("",!0)]),Object(r["createElementVNode"])("div",D,[w,Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{type:"datetime-local",required:"","onUpdate:modelValue":t[2]||(t[2]=function(e){return q.date=e}),class:"form-control"},null,512),[[r["vModelText"],q.date]]),q.errors.date?(Object(r["openBlock"])(),Object(r["createElementBlock"])("span",C,Object(r["toDisplayString"])(q.errors.date),1)):Object(r["createCommentVNode"])("",!0)])]),Object(r["createElementVNode"])("div",null,[B,Object(r["withDirectives"])(Object(r["createElementVNode"])("textarea",{"onUpdate:modelValue":t[3]||(t[3]=function(e){return q.description=e}),required:"",class:"form-control",rows:"4"},null,512),[[r["vModelText"],q.description]])]),q.loading?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",F,_)):(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",S,T))],32)]})),_:1},8,["modelValue"]),Object(r["createVNode"])(oe,{modelValue:L.doesEditOpen,"onUpdate:modelValue":t[10]||(t[10]=function(e){return L.doesEditOpen=e}),id:"modal-center",centered:"",size:"lg",title:"Modifier le formulaire","title-class":"font-18","hide-footer":""},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("form",{onSubmit:t[9]||(t[9]=Object(r["withModifiers"])((function(e){return G.editItem()}),["prevent"]))},[Object(r["createElementVNode"])("div",z,[Object(r["createElementVNode"])("div",A,[M,Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{type:"text",required:"","onUpdate:modelValue":t[6]||(t[6]=function(e){return q.name=e}),class:"form-control"},null,512),[[r["vModelText"],q.name]]),q.errors.name?(Object(r["openBlock"])(),Object(r["createElementBlock"])("span",U,Object(r["toDisplayString"])(q.errors.name),1)):Object(r["createCommentVNode"])("",!0)]),Object(r["createElementVNode"])("div",I,[P,Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{type:"datetime-local",required:"","onUpdate:modelValue":t[7]||(t[7]=function(e){return q.date=e}),class:"form-control"},null,512),[[r["vModelText"],q.date]]),q.errors.date?(Object(r["openBlock"])(),Object(r["createElementBlock"])("span",H,Object(r["toDisplayString"])(q.errors.date),1)):Object(r["createCommentVNode"])("",!0)])]),Object(r["createElementVNode"])("div",null,[J,Object(r["withDirectives"])(Object(r["createElementVNode"])("textarea",{"onUpdate:modelValue":t[8]||(t[8]=function(e){return q.description=e}),required:"",class:"form-control",rows:"4"},null,512),[[r["vModelText"],q.description]])]),q.loading?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",R,X)):(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",Q,K))],32)]})),_:1},8,["modelValue"]),Object(r["createVNode"])(oe,{modelValue:L.doesDeleteOpen,"onUpdate:modelValue":t[13]||(t[13]=function(e){return L.doesDeleteOpen=e}),id:"modal-center",title:"Supprimer le formulaire","title-class":"font-18","hide-footer":""},{default:Object(r["withCtx"])((function(){var e;return[Object(r["createElementVNode"])("p",Y,[Z,Object(r["createElementVNode"])("b",null,Object(r["toDisplayString"])(null===(e=q.formular)||void 0===e?void 0:e.name),1)]),q.loading?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",ee,ne)):(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",$,[Object(r["createElementVNode"])("button",{class:"btn btn-dark ms-auto",onClick:t[11]||(t[11]=function(e){return L.doesDeleteOpen=!1})},"Annuler"),Object(r["createElementVNode"])("button",{class:"ms-3 btn btn-danger",onClick:t[12]||(t[12]=function(e){return G.deleteIt()})},"Supprimer")]))]})),_:1},8,["modelValue"])]})),_:1})}n("d3b7"),n("d81d"),n("4de4");var oe=n("3d20"),ae=n.n(oe),ce=n("444f"),le=n("c2a4"),se=n("2579"),ie=n("e01f"),de={setup:function(){var e=Object(r["ref"])(!1),t=Object(r["ref"])(!1),n=Object(r["ref"])(!1);return{doesAddOpen:e,doesEditOpen:t,doesDeleteOpen:n}},page:{title:"Formulaires",meta:[{name:"description",content:le.description}]},components:{Layout:ce["a"],PageHeader:se["a"]},data:function(){return{title:"Formulaires",items:[{text:"Menu",href:"/"},{text:"Formulaires",active:!0}],errors:[],formular:{},formulars:[],name:"",description:"",date:"",loading:!1,status:201}},methods:{loadList:function(){var e=this;fetch(ie["a"].route("formulars"),ie["a"].requestOptions()).then((function(e){return ie["a"].tokenChecker(e.status),e.json()})).then((function(t){console.log(t.data),e.formulars=t.data}))},addItem:function(){var e=this;this.loading=!0,this.errors=[];var t=new FormData;t.append("name",this.name),t.append("description",this.description),t.append("date",this.date),fetch(ie["a"].route("formulars"),ie["a"].requestOptions("POST",t)).then((function(t){return ie["a"].tokenChecker(t.status),e.status=t.status,t.json()})).then((function(t){console.log(e.status),console.log(t),e.loading=!1,200==e.status?(e.initData(null),e.doesAddOpen=!1,e.formulars.push(t.data),ae.a.fire("Formulaire ajouter !","Le formulaire a été enregistré avec succès.","success")):(e.errors.name=ie["a"].getError(t.data,"name"),e.errors.description=ie["a"].getError(t.data,"description"),e.errors.date=ie["a"].getError(t.data,"date"))})).catch((function(t){console.log(t),e.loading=!1}))},editItem:function(){var e=this;this.loading=!0,this.errors=[];var t=new FormData;t.append("name",this.name),t.append("description",this.description),t.append("date",this.date),t.append("_method","PUT"),console.log(t.get("name"),"id",this.formular.id),fetch(ie["a"].route("formulars/"+this.formular.id),ie["a"].requestOptions("POST",t)).then((function(t){return ie["a"].tokenChecker(t.status),e.status=t.status,t.json()})).then((function(t){console.log(e.status),console.log("last",e.formular),console.log("new",t),e.loading=!1,200==e.status?(e.doesEditOpen=!1,e.formulars=e.formulars.map((function(n){return n.id!==e.formular.id?n:t.data})),ae.a.fire("Formulaire modifier !","Le formulaire a été modifié avec succès.","success")):(e.errors.name=ie["a"].getError(t.data,"name"),e.errors.description=ie["a"].getError(t.data,"description"),e.errors.date=ie["a"].getError(t.data,"date"))})).catch((function(t){console.log(t),e.loading=!1}))},deleteIt:function(){var e=this;this.loading=!0,fetch(ie["a"].route("formulars/"+this.formular.id),ie["a"].requestOptions("DELETE")).then((function(t){return ie["a"].tokenChecker(t.status),e.status=t.status,t.text()})).then((function(t){console.log(e.status),console.log(t),e.loading=!1,e.doesDeleteOpen=!1,204==e.status?(e.formulars=e.formulars.filter((function(t){return t.id!==e.formular.id})),ae.a.fire("Formulaire supprimer !","Le formulaire a été supprimé avec succès.","success")):ae.a.fire("Formulaire non supprimer ?","La suppression n'a pas marché, veuillez réssayez plus tard.","error")}))},initItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"edit";this.formular=e,this.initData(e),"delete"==t?this.doesDeleteOpen=!0:this.doesEditOpen=!0},initData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.name=null!=e?e.name:"",this.description=null!=e?e.description:"",this.date=null!=e?e.date:""}},mounted:function(){this.loadList()},watch:{doesAddOpen:function(){this.errors=[]},doesEditOpen:function(){this.errors=[],this.doesEditOpen||(this.formular=null,this.initData(null))},doesDeleteOpen:function(){this.doesDeleteOpen||(this.formular=null,this.initData(null))}}},ue=n("6b0d"),me=n.n(ue);const be=me()(de,[["render",re]]);t["default"]=be}}]);
//# sourceMappingURL=chunk-2d0b1c40.688f3601.js.map