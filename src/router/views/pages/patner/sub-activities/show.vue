<script>

import Layout from "../../../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import Helper from '@/helpers/helper';

/**
 * Dashboard Component
 */
export default {
    page: {
    title: "Sous-activités",
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
      title: "Sous-activités",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Activités",
          active: true,
        },
        {
          text: "Une sous-activité",
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
      fetch(Helper.route('patner/sub-activities/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.sub_activity = data.data
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

          </div>
        </div>
      </div>
    </div>




  </Layout>
</template>
