(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2cfc"],{2668:function(e,t,l){"use strict";l.r(t);l("b0c0");var n=l("7a23"),c={key:0,class:"hstack mb-3"},o=Object(n["createElementVNode"])("i",{class:"bx bx-plus font-size-16 align-middle me-2"},null,-1),r=Object(n["createTextVNode"])(" Ajouter un nouveau "),a={key:1,class:"row"},i={class:"col-lg-12"},s={class:"card"},d={class:"card-body"},u=Object(n["createElementVNode"])("h4",{class:"card-title"},"Listes des photos et vidéos de l'album ",-1),m={class:"card-title-desc"},b=Object(n["createTextVNode"])(" Le tableau ci-dessous présente la listes des "),p=Object(n["createElementVNode"])("code",null,"photos et vidéos",-1),O=Object(n["createTextVNode"])(" de l'album "),f=Object(n["createTextVNode"])(". "),j={class:"row bg-light g-3 pb-3 px-1"},h={class:"bg-white p-2 rounded"},g=["src","onClick"],V=Object(n["createElementVNode"])("i",{class:"bx bx-trash font-size-16 align-middle mx-1"},null,-1),k={class:""},v=Object(n["createElementVNode"])("label",{for:""},"Fichier(s)",-1),y=Object(n["createElementVNode"])("input",{type:"file",multiple:"",accept:".png, .jpg, .jpeg, .mp4, .avi",required:"",id:"file",class:"form-control"},null,-1),E={key:0,class:"text-danger mt-2"},N={key:0,class:"mt-3"},x=Object(n["createElementVNode"])("input",{type:"submit",value:"Enregistrer",class:"btn btn-primary"},null,-1),w=[x],C={key:1,class:"mt-3 text-center"},B=Object(n["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(n["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),_=[B],L=["src"],S=Object(n["createElementVNode"])("p",{class:"mb-2"}," Voulez-vous vraiment supprimer ce fichier ? ",-1),A={key:0,class:"hstack mt-2"},D={key:1,class:"text-center"},I=Object(n["createElementVNode"])("div",{class:"spinner-border text-primary",role:"status"},[Object(n["createElementVNode"])("span",{class:"visually-hidden"},"Loading...")],-1),T=[I];function R(e,t,l,x,B,I){var R=Object(n["resolveComponent"])("PageHeader"),U=Object(n["resolveComponent"])("b-button"),G=Object(n["resolveComponent"])("b-modal"),F=Object(n["resolveComponent"])("Layout");return Object(n["openBlock"])(),Object(n["createBlock"])(F,null,{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(R,{title:B.title,items:B.items},null,8,["title","items"]),B.gallery.id?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",c,[Object(n["createVNode"])(U,{variant:"primary",onClick:t[0]||(t[0]=function(e){return x.doesAddOpen=!0}),class:"ms-auto"},{default:Object(n["withCtx"])((function(){return[o,r]})),_:1})])):Object(n["createCommentVNode"])("",!0),B.gallery.id?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",a,[Object(n["createElementVNode"])("div",i,[Object(n["createElementVNode"])("div",s,[Object(n["createElementVNode"])("div",d,[u,Object(n["createElementVNode"])("p",m,[b,p,O,Object(n["createElementVNode"])("code",null,Object(n["toDisplayString"])(B.gallery.name),1),f]),Object(n["createElementVNode"])("div",j,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(B.gallery.gallery_files,(function(e){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",{class:"col-lg-3 col-md-4 col-sm-6",key:e.id},[Object(n["createElementVNode"])("div",h,[Object(n["createElementVNode"])("img",{src:B.STORAGE_URL+e.file,onClick:function(t){return I.initItem(e)},type:"button",class:"w-100 rounded",style:{height:"150px","object-fit":"cover"},alt:""},null,8,g),Object(n["createVNode"])(U,{variant:"danger",onClick:function(t){return I.initItem(e,"delete")},class:"mt-2 w-100 btn-sm"},{default:Object(n["withCtx"])((function(){return[V]})),_:2},1032,["onClick"])])])})),128))])])])])])):Object(n["createCommentVNode"])("",!0),Object(n["createVNode"])(G,{modelValue:x.doesAddOpen,"onUpdate:modelValue":t[2]||(t[2]=function(e){return x.doesAddOpen=e}),id:"modal-center",centered:"",title:"Ajouter un fichier","title-class":"font-18","hide-footer":""},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("form",{onSubmit:t[1]||(t[1]=Object(n["withModifiers"])((function(e){return I.addItem()}),["prevent"]))},[Object(n["createElementVNode"])("div",k,[v,y,B.errors.file?(Object(n["openBlock"])(),Object(n["createElementBlock"])("span",E,Object(n["toDisplayString"])(B.errors.file),1)):Object(n["createCommentVNode"])("",!0)]),B.loading?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",C,_)):(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",N,w))],32)]})),_:1},8,["modelValue"]),Object(n["createVNode"])(G,{modelValue:x.doesShowOpen,"onUpdate:modelValue":t[3]||(t[3]=function(e){return x.doesShowOpen=e}),id:"modal-center","title-class":"font-18","hide-footer":""},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("img",{src:B.STORAGE_URL+B.gallery_file.file,class:"w-100 rounded",alt:""},null,8,L)]})),_:1},8,["modelValue"]),Object(n["createVNode"])(G,{modelValue:x.doesDeleteOpen,"onUpdate:modelValue":t[6]||(t[6]=function(e){return x.doesDeleteOpen=e}),id:"modal-center",title:"Supprimer le fichier","title-class":"font-18","hide-footer":""},{default:Object(n["withCtx"])((function(){return[S,B.loading?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",D,T)):(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",A,[Object(n["createElementVNode"])("button",{class:"btn btn-dark ms-auto",onClick:t[4]||(t[4]=function(e){return x.doesDeleteOpen=!1})},"Annuler"),Object(n["createElementVNode"])("button",{class:"ms-3 btn btn-danger",onClick:t[5]||(t[5]=function(e){return I.deleteIt()})},"Supprimer")]))]})),_:1},8,["modelValue"])]})),_:1})}l("a4d3"),l("e01a"),l("d3b7"),l("4de4");var U=l("3d20"),G=l.n(U),F=l("444f"),z=l("c2a4"),q=l("2579"),P=l("e01f"),H={setup:function(){var e=Object(n["ref"])(!1),t=Object(n["ref"])(!1),l=Object(n["ref"])(!1);return{doesAddOpen:e,doesDeleteOpen:t,doesShowOpen:l}},page:{title:"Galérie",meta:[{name:"description",content:z.description}]},components:{Layout:F["a"],PageHeader:q["a"]},data:function(){return{title:"Galérie",items:[{text:"Menu",href:"/"},{text:"Galérie",active:!0},{text:"Un Album",active:!0}],errors:[],gallery:{},gallery_file:[],loading:!1,id:"",STORAGE_URL:P["a"].STORAGE_URL}},methods:{getItem:function(){var e=this;fetch(P["a"].route("gallerys/"+this.id),P["a"].requestOptions()).then((function(e){return P["a"].tokenChecker(e.status),e.json()})).then((function(t){console.log(t.data),e.gallery=t.data}))},addItem:function(){var e=this;this.loading=!0,this.errors=[];var t=new FormData;t.append("gallery_id",this.id),t.append("file",document.getElementById("file").files[0]),fetch(P["a"].route("gallery-files"),P["a"].requestOptions("POST",t)).then((function(t){return P["a"].tokenChecker(t.status),e.status=t.status,t.json()})).then((function(t){console.log(e.status),console.log(t),e.loading=!1,200==e.status?(e.doesAddOpen=!1,e.gallery.gallery_files.push(t.data),G.a.fire("Fichier ajouter !","Le fichier a été enregistré avec succès.","success")):e.errors.file=P["a"].getError(t.data,"file")})).catch((function(t){console.log(t),e.loading=!1}))},deleteIt:function(){var e=this;this.loading=!0,fetch(P["a"].route("gallery-files/"+this.gallery_file.id),P["a"].requestOptions("DELETE")).then((function(t){return P["a"].tokenChecker(t.status),e.status=t.status,t.text()})).then((function(t){console.log(e.status),console.log(t),e.loading=!1,e.doesDeleteOpen=!1,204==e.status?(e.gallery.gallery_files=e.gallery.gallery_files.filter((function(t){return t.id!==e.gallery_file.id})),G.a.fire("Fichier supprimer !","Le fichier a été supprimé avec succès.","success")):G.a.fire("Fichier non supprimer ?","La suppression n'a pas marché, veuillez réssayez plus tard.","error")}))},initItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"edit";this.gallery_file=e,"delete"==t?this.doesDeleteOpen=!0:this.doesShowOpen=!0}},mounted:function(){this.id=this.$route.params.id,this.getItem()}},J=l("6b0d"),M=l.n(J);const $=M()(H,[["render",R]]);t["default"]=$}}]);
//# sourceMappingURL=chunk-2d0b2cfc.778958db.js.map