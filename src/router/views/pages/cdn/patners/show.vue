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
    title: "Partenaire",
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
      title: "Partenaire",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Partenaire",
          active: true,
        },
        {
          text: "Un Partenaire",
          active: true,
        },
      ],
      sector: {},
      id: "",
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('entities/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.sector = data.data
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

    
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">À propos du Partenaire <code> {{ sector.name }} </code> de la catégorie <code>{{ sector.category ? sector.category.name : "" }} </code></h4>
            <p class="card-title-desc mb-3">
              {{ sector.description }}
            </p>

            <div class="bg-light p-2 pt-3">
                <h6 class="font-20 text-danger">♣ Les projets du secteur</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom du projet</th>
                                <th>Montant alloué</th>
                                <th class="text-center">Nombre d'activités</th>
                                <th>Date Début</th>
                                <th>Date Fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="sector.projects">
                              <tr v-for="(project, i) in sector.projects" :key="project.id">
                                  <th scope="row">{{ i + 1 }}</th>
                                  <td>
                                      <router-link :to="'/cdn/projects/'+project.id">{{ project.name }}</router-link>
                                  </td>
                                  <td>{{ project.cost }} F CFA</td>
                                  <td class="text-center">{{ project.activities.length }}</td>
                                  <td>{{ project.date_start }}</td>
                                  <td>{{ project.date_end }}</td>
                              </tr>
                            </template>
                            <template v-else>
                                <tr v-for="(project_patner, i) in sector.project_patners" :key="project_patner.id">
                                    <th scope="row">{{ i + 1 }}</th>
                                    <td>
                                        <router-link :to="'/cdn/projects/'+project_patner.project.id">{{ project_patner.project.name }}</router-link>
                                    </td>
                                    <td>{{ project_patner.project.cost }} F CFA</td>
                                    <td class="text-center">{{ project_patner.project.activities.length }}</td>
                                    <td>{{ project_patner.project.date_start }}</td>
                                    <td>{{ project_patner.project.date_end }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>


            <div class="bg-light p-2 mt-3 pt-3">
                <h6 class="font-20 text-danger">♣ Historique des responsables</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Responsable</th>
                            <th>Date Début</th>
                            <th>Date Fin</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(personal, i) in sector.personals" :key="personal.id">
                            <th scope="row">{{ i + 1 }}</th>
                            <td>
                                <router-link :to="'/cdn/users/'+personal.user.id">{{ personal.user.lastname + " "+personal.user.firstname }}</router-link>
                            </td>
                            <td>{{ personal.date_start }}</td>
                            <td>{{ personal.date_end }}</td>
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
