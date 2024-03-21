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
    title: "Une activité",
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
      loadingPublish: false,
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('patner/activities/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.activity = data.data
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
                                    <router-link v-if="activity.sub_activity_is_add" :to="'/patner/sub-activities/'+sub_activity.id">{{ sub_activity.name }}</router-link>
                                    <span v-else>{{ sub_activity.name }}</span>
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


  </Layout>
</template>
