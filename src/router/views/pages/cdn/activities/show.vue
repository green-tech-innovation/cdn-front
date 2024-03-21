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
        const doesAddOpen1 = ref(false);

        return {
            doesAddOpen,
            doesAddOpen1,
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
      title: "Une activité",
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
          text: "Activités",
          active: true,
        },
        {
          text: "Une activité",
          active: true,
        },
      ],
      errors: [],
      id: "",
      name: "",
      description: "",
      weight: 1,
      amount: "",
      date_start: "",
      date_end: "",
      activity: {},
      sub_activity: {},
      loading: false,
      loadingSetStatut: false,
      loadingReportPublic: false,
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('activities/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.activity = data.data
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
      fetch(Helper.route('activities/'+this.id+'/status'), Helper.requestOptions("POST", formData))
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
          this.activity = data.data
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
    publishReport() {
        this.loadingReportPublic = true
        fetch(Helper.route('sector/activities/'+this.id+'/report-publish'), Helper.requestOptions())
        .then(response => {
            Helper.tokenChecker(response.status)
            return response.json()
        })
        .then(data => {
            this.loadingReportPublic = false
            console.log(data);
            this.activity = data.data
        })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('activity_id', this.id)
      formData.append('name', this.name)
      fetch(Helper.route('activities/'+this.id+'/status'), Helper.requestOptions("POST", formData))
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
          this.doesAddOpen = false
          this.initData(null)
          this.activity = data.data
          Swal.fire("Sous activité ajouter !", "Le sous-activité a été enregistré avec succès.", "success");
        } else {
          this.errors.name = Helper.getError(data.data, "name")
          this.errors.description = Helper.getError(data.data, "description")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
  },
  mounted() {
    this.id = this.$route.params.id
    this.getItem()
  },
  watch: {
    doesAddOpen: function() {
      this.errors = []
    },
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="hstack mb-3" v-if="activity.approved == 0 && activity.progress == 90 && activity.report">
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

    <div class="hstack mb-4" v-if="activity.approved == 1">
      <div class="ms-auto">
        <b-button v-if="!loadingReportPublic" :variant="activity.report_public == 0 ? 'success' : 'danger'" class="ms-3" @click="publishReport()">
            <i class="bx font-size-16 align-middle me-2" :class="activity.report_public == 0 ? 'bx-check-double' : 'bx-window-close'"></i>
            {{ activity.report_public == 0 ? 'Marquer le rapport de l\'activité comme public' : "Marquer le rapport de l\'activité comme privé" }}
        </b-button> 
        <div class="text-center" v-else>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
      </div>
    </div>

    
    <div class="row" v-if="activity.id">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-primary mb-3">{{ activity.name }}</h4>
            <p><b>Fichier du projet</b> : 
                <a :href="STORAGE_URL+activity.file" v-if="activity.file" target="_blank" class="btn btn-sm btn-success rounded-pill">
                    <i class="bx bx-download font-size-14 align-middle mx-1 text-white"></i>
                    Télécharger le Fichier
                </a>
            </p>
            <p>
                <b>Progression</b> : {{ activity.progress }}%
                <b-progress :value="activity.progress" :max="100" class="mt-2" variant="success"></b-progress> 
            </p>
            <p><b>Montant alloué</b> : {{ activity.amount }} F CFA</p>
            <p><b>Date debut</b> : {{ activity.date_start }}</p>
            <p><b>Date Fin</b> : {{ activity.date_end }}</p>
            <h6><b>Description</b></h6>
            <p class="card-title-desc">
              {{ activity.description }}
            </p>


            <div class="bg-light p-2 mt-3 mb-0 pt-3" v-if="activity.report">
                <p><b>Rapport</b> : <br>
                    <a :href="STORAGE_URL+activity.report" target="_blank" class="btn btn-sm btn-success rounded-pill">
                        <i class="bx bx-download font-size-14 align-middle mx-1 text-white"></i>
                        Télécharger le Fichier
                    </a>
                </p>
                <p><b>Date d'envoie</b> : <br> {{ activity.date_report }}</p>
            </div>
            

            <div class="bg-light border shadow p-2 mt-3 mb-0 pt-3" v-if="activity.approved == -1">
              <p><b>Statut du rapport</b> : <br><span class="text-danger">Réjété</span></p>
              <p><b>Message de rejet</b> : <br>{{ activity.message }} </p>
            </div>
            

            <div class="bg-light border shadow p-2 mt-3 mb-0 pt-3" v-if="activity.approved == 1">
              <p><b>Statut du rapport</b> : <br><span class="text-success">Accepté</span></p>
              <p><b>Date d'approbation</b> : <br>{{ activity.date_approved }} </p>
            </div>

            <div class="bg-light p-3 pt-3 mt-3">
                <h6 class="font-20 text-danger">♣ Listes des sous-activités</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Activité</th>
                                <th class="text-center">Progession</th>
                                <th class="text-center">Poids</th>
                                <th class="text-center">Montant alloué</th>
                                <th v-if="activity.sub_activity_is_add == false">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sub_activity, i) in activity.sub_activities" :key="sub_activity.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link :to="'/cdn/sub-activities/'+sub_activity.id">{{ sub_activity.name }}</router-link>
                                </td>
                                <td class="text-center">{{ sub_activity.progress }} %</td>
                                <td class="text-center">{{ sub_activity.weight }}</td>
                                <td class="text-center text-black">{{ sub_activity.amount }} F</td>
                                <td class="hstack" v-if="activity.sub_activity_is_add == false">
                                    <b-button class="btn-sm" @click="initItem(sub_activity)" variant="success">
                                        <i class="bx bx-edit font-size-16 align-middle mx-1"></i>
                                    </b-button>
                                    <b-button variant="danger" @click="initItem(sub_activity, 'delete')" class="ms-2 btn-sm">
                                        <i class="bx bx-trash font-size-16 align-middle mx-1"></i>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
