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
    title: "Projets",
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
      project: {},
      activity: {},
      loading: false,
      STORAGE_URL: Helper.STORAGE_URL,
      status: 201,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('patner/projects/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log("project", data.data);
        this.project = data.data
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
    
    <div class="row" v-if="project.id">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-primary mb-3">{{ project.name }}</h4>
            <p><b>Fichier du projet</b> : 
                <a :href="STORAGE_URL+project.file" v-if="project.file" target="_blank" class="btn btn-sm btn-success rounded-pill">
                    <i class="bx bx-download font-size-14 align-middle mx-1 text-white"></i>
                    Télécharger le Fichier
                </a>
            </p>
            <p>
                <b>Progression</b> : {{ project.progress }}%
                <b-progress :value="project.progress" :max="100" class="mt-2" variant="success"></b-progress> 
            </p>
            <p><b>Montant alloué</b> : {{ project.cost }} F CFA</p>
            <p><b>Date debut</b> : {{ project.date_start }}</p>
            <p><b>Date Fin</b> : {{ project.date_end }}</p>
            <h6><b>Description</b></h6>
            <p class="card-title-desc">
              {{ project.description }}
            </p>

            <div class="bg-light p-3 pt-3 mt-3">
                <h6 class="font-20 text-danger">♣ Listes des activités</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Activité</th>
                                <th class="text-center">Progession</th>
                                <th class="text-center">Poids</th>
                                <th class="text-center">Montant alloué</th>
                                <th v-if="project.activity_is_add == false">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(activity, i) in project.activities" :key="activity.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link v-if="project.activity_is_add" :to="'/patner/activities/'+activity.id">{{ activity.name }}</router-link>
                                    <span v-else>{{ activity.name }}</span>
                                </td>
                                <td class="text-center">{{ activity.progress }} %</td>
                                <td class="text-center">{{ activity.weight }}</td>
                                <td class="text-center text-black">{{ activity.amount }} F</td>
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
