(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e1423"],{"7a58":function(e,t,r){"use strict";r.r(t);r("b0c0"),r("a4d3"),r("e01a");var c=r("7a23"),o={class:"hstack mb-3"},n=Object(c["createElementVNode"])("i",{class:"bx bx-plus font-size-16 align-middle me-2"},null,-1),a=Object(c["createTextVNode"])(" Ajouter un nouveau "),s={class:"row"},l={class:"col-lg-12"},i={class:"card"},d={class:"card-body"},u=Object(c["createElementVNode"])("h4",{class:"card-title"},"Listes des secteurs",-1),m=Object(c["createElementVNode"])("p",{class:"card-title-desc"},[Object(c["createTextVNode"])(" Le tableau ci-dessous présente la listes des "),Object(c["createElementVNode"])("code",null,"secteurs"),Object(c["createTextVNode"])(". ")],-1),p={class:"table-responsive"},b={class:"table align-middle mb-0"},O=Object(c["createElementVNode"])("thead",null,[Object(c["createElementVNode"])("tr",null,[Object(c["createElementVNode"])("th",null,"#"),Object(c["createElementVNode"])("th",null,"Catégorie"),Object(c["createElementVNode"])("th",null,"Nom du secteur"),Object(c["createElementVNode"])("th",null,"Email"),Object(c["createElementVNode"])("th",null,"Responsable"),Object(c["createElementVNode"])("th",null,"Action")])],-1),j={scope:"row"},h={class:"hstack"},E=Object(c["createElementVNode"])("i",{class:"bx bx-edit font-size-16 align-middle mx-1"},null,-1),g=Object(c["createElementVNode"])("i",{class:"bx bx-trash font-size-16 align-middle mx-1"},null,-1),f={class:"row"},V={class:"col-md-6 mb-3"},v=Object(c["createElementVNode"])("option",{value:""},"Selectionnez la catégorie",-1),k=["value"],N={class:"col-md-6 mb-3"},y=Object(c["createElementVNode"])("option",{value:""},"Selectionnez le responsable",-1),x=["value"],B={key:0,class:"text-danger mt-2"},D={class:"col-md-6 mb-3"},_={key:0,class:"text-danger mt-2"},S={class:"col-md-6 mb-3"},C={key:0,class:"text-danger mt-2"},w={class:"col-md-6 mb-3"},T={key:0,class:"text-danger mt-2"},U={class:"col-md-6 mb-3"},L={key:0,class:"text-danger mt-2"},q={key:0,class:"text-danger mt-2"},M={key:0,class:"mt-3"},A=Object(c["createElementVNode"])("input",{type:"submit",value:"Enregistrer",class:"btn btn-primary"},null,-1),z=[A],I={key:1,class:"mt-3 text-center"},F=Object(c["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(c["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),P=[F],H={class:"row"},J={class:"col-md-6 mb-3"},R=Object(c["createElementVNode"])("option",{value:""},"Selectionnez la catégorie",-1),G=["value"],K={class:"col-md-6 mb-3"},Q=Object(c["createElementVNode"])("option",{value:""},"Selectionnez le responsable",-1),W=["value"],X={key:0,class:"text-danger mt-2"},Y={class:"col-md-6 mb-3"},Z={key:0,class:"text-danger mt-2"},$={class:"col-md-6 mb-3"},ee={key:0,class:"text-danger mt-2"},te={class:"col-md-6 mb-3"},re={key:0,class:"text-danger mt-2"},ce={class:"col-md-6 mb-3"},oe={key:0,class:"text-danger mt-2"},ne={key:0,class:"text-danger mt-2"},ae={key:0,class:"mt-3"},se=Object(c["createElementVNode"])("input",{type:"submit",value:"Enregistrer",class:"btn btn-primary"},null,-1),le=[se],ie={key:1,class:"mt-3 text-center"},de=Object(c["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(c["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),ue=[de],me={class:"mb-2"},pe=Object(c["createTextVNode"])(" Voulez-vous vraiment supprimer le secteur "),be=Object(c["createElementVNode"])("p",{class:"text-danger"},"Attention ! Supprimer un secteur implique la suppression de ces projets.",-1),Oe={key:0,class:"hstack mt-2"},je={key:1,class:"text-center"},he=Object(c["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(c["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),Ee=[he];function ge(e,t,r,A,F,se){var de=Object(c["resolveComponent"])("PageHeader"),he=Object(c["resolveComponent"])("b-button"),ge=Object(c["resolveComponent"])("router-link"),fe=Object(c["resolveComponent"])("b-modal"),Ve=Object(c["resolveComponent"])("Layout");return Object(c["openBlock"])(),Object(c["createBlock"])(Ve,null,{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(de,{title:F.title,items:F.items},null,8,["title","items"]),Object(c["createElementVNode"])("div",o,[Object(c["createVNode"])(he,{variant:"primary",onClick:t[0]||(t[0]=function(e){return A.doesAddOpen=!0}),class:"ms-auto"},{default:Object(c["withCtx"])((function(){return[n,a]})),_:1})]),Object(c["createElementVNode"])("div",s,[Object(c["createElementVNode"])("div",l,[Object(c["createElementVNode"])("div",i,[Object(c["createElementVNode"])("div",d,[u,m,Object(c["createElementVNode"])("div",p,[Object(c["createElementVNode"])("table",b,[O,Object(c["createElementVNode"])("tbody",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(F.sectors,(function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:e.id},[Object(c["createElementVNode"])("th",j,Object(c["toDisplayString"])(t+1),1),Object(c["createElementVNode"])("td",null,[Object(c["createVNode"])(ge,{to:"/cdn/categories/"+e.category.id},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.category.name),1)]})),_:2},1032,["to"])]),Object(c["createElementVNode"])("td",null,[Object(c["createVNode"])(ge,{to:"/cdn/sectors/"+e.id},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.name),1)]})),_:2},1032,["to"])]),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.email),1),Object(c["createElementVNode"])("td",null,Object(c["toDisplayString"])(e.user.lastname+" "+e.user.firstname),1),Object(c["createElementVNode"])("td",h,[Object(c["createVNode"])(he,{class:"btn-sm",onClick:function(t){return se.initItem(e)},variant:"success"},{default:Object(c["withCtx"])((function(){return[E]})),_:2},1032,["onClick"]),Object(c["createVNode"])(he,{variant:"danger",onClick:function(t){return se.initItem(e,"delete")},class:"ms-2 btn-sm"},{default:Object(c["withCtx"])((function(){return[g]})),_:2},1032,["onClick"])])])})),128))])])])])])])]),Object(c["createVNode"])(fe,{modelValue:A.doesAddOpen,"onUpdate:modelValue":t[9]||(t[9]=function(e){return A.doesAddOpen=e}),id:"modal-center",size:"lg",centered:"",title:"Ajouter un secteur","title-class":"font-18","hide-footer":""},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("form",{onSubmit:t[8]||(t[8]=Object(c["withModifiers"])((function(e){return se.addItem()}),["prevent"]))},[Object(c["createElementVNode"])("div",f,[Object(c["createElementVNode"])("div",V,[Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{required:"","onUpdate:modelValue":t[1]||(t[1]=function(e){return F.category_id=e}),class:"form-control"},[v,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(F.categories,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("option",{key:e.id,value:e.id},Object(c["toDisplayString"])(e.name),9,k)})),128))],512),[[c["vModelSelect"],F.category_id]])]),Object(c["createElementVNode"])("div",N,[Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{required:"","onUpdate:modelValue":t[2]||(t[2]=function(e){return F.user_id=e}),class:"form-control"},[y,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(F.users,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("option",{key:e.id,value:e.id},Object(c["toDisplayString"])(e.lastname+" "+e.firstname),9,x)})),128))],512),[[c["vModelSelect"],F.user_id]]),F.errors.user_id?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",B,Object(c["toDisplayString"])(F.errors.user_id),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",D,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text",required:"",placeholder:"Nom du secteur","onUpdate:modelValue":t[3]||(t[3]=function(e){return F.name=e}),class:"form-control"},null,512),[[c["vModelText"],F.name]]),F.errors.name?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",_,Object(c["toDisplayString"])(F.errors.name),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",S,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"email",required:"",placeholder:"Email du secteur","onUpdate:modelValue":t[4]||(t[4]=function(e){return F.email=e}),class:"form-control"},null,512),[[c["vModelText"],F.email]]),F.errors.email?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",C,Object(c["toDisplayString"])(F.errors.email),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",w,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"tel",required:"",placeholder:"Téléphone du secteur","onUpdate:modelValue":t[5]||(t[5]=function(e){return F.phone=e}),class:"form-control"},null,512),[[c["vModelText"],F.phone]]),F.errors.phone?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",T,Object(c["toDisplayString"])(F.errors.phone),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",U,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text",placeholder:"Adresse du secteur","onUpdate:modelValue":t[6]||(t[6]=function(e){return F.address=e}),class:"form-control"},null,512),[[c["vModelText"],F.address]]),F.errors.address?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",L,Object(c["toDisplayString"])(F.errors.address),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",null,[Object(c["withDirectives"])(Object(c["createElementVNode"])("textarea",{"onUpdate:modelValue":t[7]||(t[7]=function(e){return F.description=e}),placeholder:"Description du secteur",class:"form-control",rows:"4"},null,512),[[c["vModelText"],F.description]]),F.errors.description?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",q,Object(c["toDisplayString"])(F.errors.description),1)):Object(c["createCommentVNode"])("",!0)])]),F.loading?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",I,P)):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",M,z))],32)]})),_:1},8,["modelValue"]),Object(c["createVNode"])(fe,{modelValue:A.doesEditOpen,"onUpdate:modelValue":t[18]||(t[18]=function(e){return A.doesEditOpen=e}),id:"modal-center",centered:"",size:"lg",title:"Modifier le secteur","title-class":"font-18","hide-footer":""},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("form",{onSubmit:t[17]||(t[17]=Object(c["withModifiers"])((function(e){return se.editItem()}),["prevent"]))},[Object(c["createElementVNode"])("div",H,[Object(c["createElementVNode"])("div",J,[Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{required:"","onUpdate:modelValue":t[10]||(t[10]=function(e){return F.category_id=e}),class:"form-control"},[R,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(F.categories,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("option",{key:e.id,value:e.id},Object(c["toDisplayString"])(e.name),9,G)})),128))],512),[[c["vModelSelect"],F.category_id]])]),Object(c["createElementVNode"])("div",K,[Object(c["withDirectives"])(Object(c["createElementVNode"])("select",{required:"","onUpdate:modelValue":t[11]||(t[11]=function(e){return F.user_id=e}),class:"form-control"},[Q,(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(F.users,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("option",{key:e.id,value:e.id},Object(c["toDisplayString"])(e.lastname+" "+e.firstname),9,W)})),128))],512),[[c["vModelSelect"],F.user_id]]),F.errors.user_id?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",X,Object(c["toDisplayString"])(F.errors.user_id),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",Y,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text",required:"",placeholder:"Nom du secteur","onUpdate:modelValue":t[12]||(t[12]=function(e){return F.name=e}),class:"form-control"},null,512),[[c["vModelText"],F.name]]),F.errors.name?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",Z,Object(c["toDisplayString"])(F.errors.name),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",$,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"email",required:"",placeholder:"Email du secteur","onUpdate:modelValue":t[13]||(t[13]=function(e){return F.email=e}),class:"form-control"},null,512),[[c["vModelText"],F.email]]),F.errors.email?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",ee,Object(c["toDisplayString"])(F.errors.email),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",te,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"tel",required:"",placeholder:"Téléphone du secteur","onUpdate:modelValue":t[14]||(t[14]=function(e){return F.phone=e}),class:"form-control"},null,512),[[c["vModelText"],F.phone]]),F.errors.phone?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",re,Object(c["toDisplayString"])(F.errors.phone),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",ce,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text",placeholder:"Adresse du secteur","onUpdate:modelValue":t[15]||(t[15]=function(e){return F.address=e}),class:"form-control"},null,512),[[c["vModelText"],F.address]]),F.errors.address?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",oe,Object(c["toDisplayString"])(F.errors.address),1)):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",null,[Object(c["withDirectives"])(Object(c["createElementVNode"])("textarea",{"onUpdate:modelValue":t[16]||(t[16]=function(e){return F.description=e}),required:"",placeholder:"Description du secteur",class:"form-control",rows:"4"},null,512),[[c["vModelText"],F.description]]),F.errors.description?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",ne,Object(c["toDisplayString"])(F.errors.description),1)):Object(c["createCommentVNode"])("",!0)])]),F.loading?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ie,ue)):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",ae,le))],32)]})),_:1},8,["modelValue"]),Object(c["createVNode"])(fe,{modelValue:A.doesDeleteOpen,"onUpdate:modelValue":t[21]||(t[21]=function(e){return A.doesDeleteOpen=e}),id:"modal-center",title:"Supprimer le secteur","title-class":"font-18","hide-footer":""},{default:Object(c["withCtx"])((function(){var e;return[Object(c["createElementVNode"])("p",me,[pe,Object(c["createElementVNode"])("b",null,Object(c["toDisplayString"])(null===(e=F.sector)||void 0===e?void 0:e.name),1)]),be,F.loading?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",je,Ee)):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",Oe,[Object(c["createElementVNode"])("button",{class:"btn btn-dark ms-auto",onClick:t[19]||(t[19]=function(e){return A.doesDeleteOpen=!1})},"Annuler"),Object(c["createElementVNode"])("button",{class:"ms-3 btn btn-danger",onClick:t[20]||(t[20]=function(e){return se.deleteIt()})},"Supprimer")]))]})),_:1},8,["modelValue"])]})),_:1})}r("d3b7"),r("d81d"),r("4de4");var fe=r("3d20"),Ve=r.n(fe),ve=r("444f"),ke=r("c2a4"),Ne=r("2579"),ye=r("e01f"),xe={setup:function(){var e=Object(c["ref"])(!1),t=Object(c["ref"])(!1),r=Object(c["ref"])(!1);return{doesAddOpen:e,doesEditOpen:t,doesDeleteOpen:r}},page:{title:"Secteurs",meta:[{name:"description",content:ke.description}]},components:{Layout:ve["a"],PageHeader:Ne["a"]},data:function(){return{title:"Secteurs",items:[{text:"Menu",href:"/"},{text:"Secteurs",active:!0}],errors:[],categories:[],users:[],sector:{},sectors:[],category_id:"",user_id:"",name:"",description:"",type:"SECTOR",email:"",phone:"",address:"",loading:!1,status:201}},methods:{loadList:function(){var e=this;fetch(ye["a"].route("entities?type=sector"),ye["a"].requestOptions()).then((function(e){return ye["a"].tokenChecker(e.status),e.json()})).then((function(t){console.log(t.data),e.sectors=t.data}))},addItem:function(){var e=this;this.loading=!0,this.errors=[];var t=new FormData;t.append("category_id",this.category_id),t.append("user_id",this.user_id),t.append("name",this.name),t.append("phone",this.phone),t.append("email",this.email),t.append("address",this.address),t.append("description",this.description),t.append("type",this.type),fetch(ye["a"].route("entities"),ye["a"].requestOptions("POST",t)).then((function(t){return ye["a"].tokenChecker(t.status),e.status=t.status,t.json()})).then((function(t){console.log(e.status),console.log(t),e.loading=!1,200==e.status?(e.name="",e.doesAddOpen=!1,e.sectors.push(t.data),Ve.a.fire("Secteur ajouter !","Le secteur a été enregistré avec succès.","success")):(console.log(ye["a"].getError(t.data,"user_id")),e.errors.category_id=ye["a"].getError(t.data,"category_id"),e.errors.user_id=ye["a"].getError(t.data,"user_id"),e.errors.name=ye["a"].getError(t.data,"name"),e.errors.phone=ye["a"].getError(t.data,"phone"),e.errors.email=ye["a"].getError(t.data,"email"),e.errors.address=ye["a"].getError(t.data,"address"),e.errors.description=ye["a"].getError(t.data,"description"))})).catch((function(t){console.log(t),e.loading=!1}))},editItem:function(){var e=this;this.loading=!0,this.errors=[];var t=new FormData;t.append("_method","PUT"),t.append("category_id",this.category_id),t.append("user_id",this.user_id),t.append("name",this.name),t.append("phone",this.phone),t.append("email",this.email),t.append("address",this.address),t.append("description",this.description),t.append("type",this.type),console.log(t.get("name"),"id",this.sector.id),fetch(ye["a"].route("entities/"+this.sector.id),ye["a"].requestOptions("POST",t)).then((function(t){return ye["a"].tokenChecker(t.status),e.status=t.status,t.json()})).then((function(t){console.log(e.status),console.log("last",e.sector),console.log("new",t.data),e.loading=!1,200==e.status?(e.name="",e.doesEditOpen=!1,e.sectors=e.sectors.map((function(r){return r.id!==e.sector.id?r:t.data})),Ve.a.fire("Secteur modifier !","Le secteur a été modifié avec succès.","success")):(console.log(ye["a"].getError(t.data,"user_id")),e.errors.category_id=ye["a"].getError(t.data,"category_id"),e.errors.user_id=ye["a"].getError(t.data,"user_id"),e.errors.name=ye["a"].getError(t.data,"name"),e.errors.phone=ye["a"].getError(t.data,"phone"),e.errors.email=ye["a"].getError(t.data,"email"),e.errors.address=ye["a"].getError(t.data,"address"),e.errors.description=ye["a"].getError(t.data,"description"))})).catch((function(t){console.log(t),e.loading=!1}))},deleteIt:function(){var e=this;this.loading=!0,fetch(ye["a"].route("entities/"+this.sector.id),ye["a"].requestOptions("DELETE")).then((function(t){return ye["a"].tokenChecker(t.status),e.status=t.status,t.text()})).then((function(t){console.log(e.status),console.log(t),console.log(e.sector.id),e.name="",e.loading=!1,e.doesDeleteOpen=!1,204==e.status?(e.sectors=e.sectors.filter((function(t){console.log(t),t.id,e.sector.id})),Ve.a.fire("Secteur supprimer !","Le secteur a été supprimé avec succès.","success")):Ve.a.fire("Secteur non supprimer ?","La suppression n'a pas marché, veuillez réessayez plus tard.","error"),e.sector=null}))},loadCategories:function(){var e=this;fetch(ye["a"].route("categories"),ye["a"].requestOptions()).then((function(e){return ye["a"].tokenChecker(e.status),e.json()})).then((function(t){e.categories=t.data}))},loadUsers:function(){var e=this;fetch(ye["a"].route("users"),ye["a"].requestOptions()).then((function(e){return ye["a"].tokenChecker(e.status),e.json()})).then((function(t){e.users=t.data}))},initItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"edit";this.sector=e,this.initData(e),"delete"==t?this.doesDeleteOpen=!0:this.doesEditOpen=!0},initData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.category_id=null!=e?e.category_id:"",this.user_id=null!=e?e.user_id:"",this.name=null!=e?e.name:"",this.email=null!=e?e.email:"",this.phone=null!=e?e.phone:"",this.address=null!=e?e.address:"",this.description=null!=e?e.description:""}},mounted:function(){this.loadList(),this.loadCategories(),this.loadUsers()},watch:{doesAddOpen:function(){this.errors=[]},doesEditOpen:function(){this.errors=[],this.doesEditOpen||(this.sector=null,this.initData(null))},doesDeleteOpen:function(){this.doesDeleteOpen||(this.sector=null,this.initData(null))}}},Be=r("6b0d"),De=r.n(Be);const _e=De()(xe,[["render",ge]]);t["default"]=_e}}]);
//# sourceMappingURL=chunk-2d0e1423.4ce59038.js.map