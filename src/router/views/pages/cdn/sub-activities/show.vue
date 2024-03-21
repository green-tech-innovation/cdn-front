<script>
import Swal from 'sweetalert2'

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
      title: "Projet",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Projet",
          active: true,
        },
        {
          text: "Un projet",
          active: true,
        },
      ],
      errors: [],
      id: "",
      loading: false,
      loadingSetStatut: false,
      message: "",
      sub_activity: {},
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('sub-activities/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.sub_activity = data.data
      })
    },
    setStatus(approved) {
      if (approved == -1) {
        this.loading = true
      } else {
        this.loadingSetStatut = true
        this.message = ""
      }
      this.errors = []
      let formData = new FormData()
      formData.append('approved', approved)
      formData.append('message', this.message)
      fetch(Helper.route('sub-activities/'+this.id+'/status'), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        this.message = ""
        this.doesAddOpen = false
        if (approved == 0) {
          this.loading = false
        } else {
          this.loadingSetStatut = false
        }
        if (this.status == 200) {
          this.sub_activity = data.data
          Swal.fire("Rapport envoyé !", "Le rapport a été envoyé avec succès.", "success");
        }
      })
      .catch(error => {
        console.log(error);
        if (approved == 0) {
          this.loading = false
        } else {
          this.loadingSetStatut = false
        }
      })
    },
  },
  mounted() {
    this.id = this.$route.params.id
    this.getItem()
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="hstack mb-3" v-if="sub_activity.approved == 0 && sub_activity.report">
        <div class="ms-auto">
          <div class="hstack" v-if="!loadingSetStatut">
            <b-button variant="danger" @click="doesAddOpen = true">
                <i class="bx bx-window-close font-size-16 align-middle me-2"></i>
                Refuser le rapport
            </b-button>
            <b-button variant="success" class="ms-3" @click="setStatus(1)">
                <i class="bx bx-check-double font-size-16 align-middle me-2"></i>
                Accepter le rapport
            </b-button>  
          </div>
          <div class="text-center" v-else>
              <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
              </div>
          </div>
        </div>
    </div>


    
    <div class="row" v-if="sub_activity.id">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-primary mb-3">{{ sub_activity.name }}</h4>
            <p><b>Fichier du projet</b> : 
                <a :href="STORAGE_URL+sub_activity.file" v-if="sub_activity.file" target="_blank" class="btn btn-sm btn-success rounded-pill">
                    <i class="bx bx-download font-size-14 align-middle mx-1 text-white"></i>
                    Télécharger le Fichier
                </a>
            </p>
            <p><b>Montant alloué</b> : {{ sub_activity.amount }} F CFA</p>
            <p><b>Date debut</b> : {{ sub_activity.date_start }}</p>
            <p><b>Date Fin</b> : {{ sub_activity.date_end }}</p>
            <h6><b>Description</b></h6>
            <p class="card-title-desc">
              {{ sub_activity.description }}
            </p>

            <div class="bg-light p-2 mt-3 mb-0 pt-3" v-if="sub_activity.report">
                <p><b>Rapport</b> : <br>
                    <a :href="STORAGE_URL+sub_activity.report" target="_blank" class="btn btn-sm btn-success rounded-pill">
                        <i class="bx bx-download font-size-14 align-middle mx-1 text-white"></i>
                        Télécharger le Fichier
                    </a>
                </p>
                <p><b>Date d'envoie</b> : <br> {{ sub_activity.date_report }}</p>
            </div>
            

            <div class="bg-light border shadow p-2 mt-3 mb-0 pt-3" v-if="sub_activity.approved == -1">
              <p><b>Statut du rapport</b> : <br><span class="text-danger">Réjété</span></p>
              <p><b>Message de rejet</b> : <br>{{ sub_activity.message }} </p>
            </div>
            

            <div class="bg-light border shadow p-2 mt-3 mb-0 pt-3" v-if="sub_activity.approved == 1">
              <p><b>Statut du rapport</b> : <br><span class="text-success">Accepté</span></p>
              <p><b>Date d'approbation</b> : <br>{{ sub_activity.date_approved }} </p>
            </div>

          </div>
        </div>
      </div>
    </div>



    <!-- ADD MODAL -->
    <b-modal
        v-model="doesAddOpen"
        id="modal-center"
        centered
        title="Refuser le rapport"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="setStatus(-1)">
            <div class="mb-3">
                <label for="">Message de rejet</label>
                <textarea v-model="message" class="form-control" rows="3"></textarea>
            </div>
            <div class="mt-3" v-if="!loading">
                <input type="submit" value="Envoyer" class="btn btn-primary">
            </div>
            <div class="mt-3 text-center" v-else>
                <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </form>
    </b-modal>



  </Layout>
</template>
