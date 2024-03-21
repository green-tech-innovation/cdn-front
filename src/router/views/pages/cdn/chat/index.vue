<script>
import Layout from "../../../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import Helper from '@/helpers/helper';

import { ref } from "vue";


/**
 * Dashboard Component
 */
export default {
    setup() {
        const doesAddOpen = ref(false);

        return {
          doesAddOpen,
        };
    },
    page: {
    title: "Categories",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Discussions",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Discussions",
          active: true,
        },
      ],
      entity_id: localStorage.getItem('entity_id'),
      messages: [],
      message: "",
      loadingList: false,
      loading: false,
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL,
    };
  },
  methods: {
    loadList() {
      this.loadingList = true
      fetch(Helper.route('messages'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.messages = data.data
        this.loadingList = false
        setTimeout(this.updateScroll, 100);
      })
      .catch(error => {
        console.log(error);
        this.loadingList = false
      })
    },
    addItem() {
      this.loading = true
      let formData = new FormData()
      formData.append('message', this.message)
      fetch(Helper.route('messages'), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        this.loading = false
        if (this.status == 200) {
          this.message = ""
          this.messages.push(data.data)
          setTimeout(this.updateScroll, 100);
        } else {
          this.message.name = Helper.getError(data.data, "message")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    onFileChange(e) {
      let file = e.target.files[0];
      if (file != undefined) {
        this.doesAddOpen = true
        let formData = new FormData()
        formData.append('file', file)
        fetch(Helper.route('messages'), Helper.requestOptions("POST", formData))
        .then(response => {
            Helper.tokenChecker(response.status)
            this.status = response.status
            return response.json()
        })
        .then(data => {
          console.log(this.status);
          console.log(data);
          if (this.status == 200) {
            this.message = ""

            setTimeout(() => {
              this.doesAddOpen = false
            }, 100);

            this.messages.push(data.data)
            setTimeout(this.updateScroll, 100);
          } 
        })
        .catch(error => {
          console.log(error);
          this.doesAddOpen = false
        })
      }
    },
    updateScroll() {
      var element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    },
  },
  mounted() {
    this.loadList()
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    
    
    <div class="bg-dark">
      <div>
        <div class="bg-white rounded p-0">
          <div class="bg-primary text-white text-center p-2" @click="loadList()">
            <span type="button" v-if="!loadingList">Synchroniser la discussion</span>
            <div class="fs-5 w-100 text-center" v-else>
              <div class="spinner-border text-white" style="height: 25px; width: 25px;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div class="px-3" style="height: 430px;">            
            <div id="messages" class="pe-3 pb-3" style="height: 350px; overflow-y: auto;">
              
              <div v-for="message in messages" :key="message.id" :class="entity_id == message.entity.id ? 'offset-md-6' : ''" class="col-md-6 p-3 bg-light mt-2 rounded">
                <h5 class="text-primary fs-6">{{ message.entity.name }}</h5>
                <p class="mb-2">
                  {{ message.message }}
                  <a :href="STORAGE_URL+message.file" v-if="message.file" target="_blank" class="btn btn-primary px-3 rounded-pill">
                      <i class="bx bx-download font-size-16 align-middle mx-1 text-white"></i>
                      Télécharger le Fichier
                    </a>
                </p>
                <p class="mb-0 font-size-13 hstack">
                  <i class="bx bx-time font-size-14 align-middle mx-1 mt-2"><span class="px-1">{{ message.created_at }}</span></i>
                </p>
              </div>
              
              
            </div>

            <form @submit.prevent="addItem()" class="hstack py-1" style="height: 80px;">
              <div>
                <i class="bx bx-file fs-3 text-primary mx-2 p-2"  @click="$refs.file.click()" type="button"></i>
                <input type="file" hidden accept=".png, .jpg, jpeg, .csv, .xlsx, .pdf, .doc, .docx, .zip, .rar, .mp4, .mp3, .avi" @change="onFileChange" id="file" ref="file" >
              </div>
              <div class="w-100">
                <textarea class="form-control" v-model="message" placeholder="Ecrivez votre message" rows="2"></textarea>
              </div>
              <div class="px-2 col-1 text-center">
                <button :disabled="message.length == 0" class="btn btn-primary" v-if="!loading">
                  <i class="bx bx-send font-size-16 align-middle me-2"></i>
                  Envoyer
                </button>
                <div class="mt-3 text-center" v-else>
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>


    <!-- ADD MODAL -->
    <b-modal
        v-model="doesAddOpen"
        id="modal-center"
        centered
        title-class="font-18"
        hide-footer
        >
        <div>
          
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
          </div>

          <p class="mt-3 text-center">
            Veuillez patienter le téléchargement du fichier du fichier
          </p>

        </div>
    </b-modal>

  </Layout>
</template>
