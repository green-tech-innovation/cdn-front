<script>
import Swal from 'sweetalert2'

import Layout from "../../../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import Helper from '@/helpers/helper';

/**
 * Dashboard Component
 */
export default {
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
      sub_activity: {},
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('sector/sub-activities/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.sub_activity = data.data
      })
    },
    sendReport() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('sub_activity_id', this.id)
      formData.append('report', document.getElementById("report").files[0])
      fetch(Helper.route('sector/sub-activities/'+this.id+'/report'), Helper.requestOptions("POST", formData))
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
          this.sub_activity = data.data
          Swal.fire("Rapport envoyé !", "Le rapport a été envoyé avec succès.", "success");
        } else {
          this.errors.report = Helper.getError(data.data, "report")
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
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    
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

            <div v-if="!sub_activity.report || (sub_activity.approved == -1 && sub_activity.report)" class="col-lg-6 bg-light border rounded p-3 pt-3 mt-3">
                <h5 class="mb-3 text-danger">♣ Envoyer le rapport</h5>
                <form @submit.prevent="sendReport()">
                    <div class="row">
                        <div class="">
                            <label for="">Fichier explicatif </label>
                            <input type="file" id="report" required accept=".pdf, .docx" class="form-control">
                            <span class="text-danger mt-2" v-if="errors.report">{{ errors.report }}</span>
                        </div>
                    </div>
                    <div class="mt-3" v-if="!loading">
                        <input type="submit" value="Envoyer le rapport" class="btn btn-primary">
                    </div>
                    <div class="mt-3 text-center" v-else>
                        <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </form>
            </div>

          </div>
        </div>
      </div>
    </div>




  </Layout>
</template>
