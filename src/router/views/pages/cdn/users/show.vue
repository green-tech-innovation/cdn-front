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
      title: "Catégories",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Catégories",
          active: true,
        },
        {
          text: "Une catégorie",
          active: true,
        },
      ],
      user: {},
      id: "",
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('users/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.user = data.data
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
            <h4 class="card-title">À propos de l'utilisateur</h4>
            <div class="row mt-4">
              <div class="col-md-3">
                <dl>
                  <dt>Nom de Famille</dt>
                  <dd>{{ user.lastname }}</dd>
                </dl>
              </div>
              <div class="col-md-3">
                <dl>
                  <dt>Prénom(s)</dt>
                  <dd>{{ user.lastname }}</dd>
                </dl>
              </div>
              <div class="col-md-3">
                <dl>
                  <dt>Sexe</dt>
                  <dd>{{ user.sex }}</dd>
                </dl>
              </div>
              <div class="col-md-3">
                <dl>
                  <dt>Email</dt>
                  <dd>{{ user.email }}</dd>
                </dl>
              </div>
              <div class="col-md-3">
                <dl>
                  <dt>Téléphone</dt>
                  <dd>{{ user.phone }}</dd>
                </dl>
              </div>
            </div>

            <div class="bg-light p-2 mt-3 pt-3">
                <h6 class="font-20 text-danger">♣ Historique des responsabilités</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Entité</th>
                            <th>Date Début</th>
                            <th>Date Fin</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(personal, i) in user.personals" :key="personal.id">
                            <th scope="row">{{ i + 1 }}</th>
                            <td>
                                <router-link :to="'/cdn/patners/'+personal.entity.id" v-if="personal.entity.type == 'PATNER'">{{ personal.entity.name }}</router-link>
                                <router-link :to="'/cdn/sectors/'+personal.entity.id" v-else>{{ personal.entity.name }}</router-link>
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
