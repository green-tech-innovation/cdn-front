<script>

import Layout from "../../../layouts/main";
import appConfig from "@/app.config";
import Helper from '@/helpers/helper';

/**
 * Dashboard Component
 */
export default {
    page: {
    title: "Profil",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      me: null,
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('auth/me'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data);
        this.me = data
      })
    },
  },
  mounted() {
    this.loadList()
  },
};
</script>

<template>
  <Layout>
    
    <div class="row" v-if="me != null">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-0 fw-bold">Profil</h4>
          </div>
        </div>

        <div class="row bg-white m-0">
          <div class="col-lg-6 p-0">
            <div class="h-100 bg-light border-right p-3">
              <h5 class="text-black">{{ me.entity.type == "CDN" ? "CDN" : (me.entity.type == "PATNER" ? "Partenaire" : "Secteur") }}</h5>
              <hr class="m-0 bg-primary mb-3">
              <div>
                <label for="" class="font-size-11">Intitulé de l'entité</label>
                <p class="font-size-13 text-primary">{{ me.entity.name }}</p>
              </div>
              <div class="mt-3">
                <label for="" class="font-size-11">Email</label>
                <p class="font-size-13 text-primary">{{ me.entity.email }}</p>
              </div>
              <div class="mt-3">
                <label for="" class="font-size-11">Téléphone</label>
                <p class="font-size-13 text-primary">{{ me.entity.phone }}</p>
              </div>
              <div class="mt-3">
                <label for="" class="font-size-11">Adresse</label>
                <p class="font-size-13 text-primary">{{ me.entity.address }}</p>
              </div>
              <div class="mt-3">
                <label for="" class="fw-bolder font-size-11">Description</label>
                <p class="font-size-13">{{ me.entity.description }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 p-0">
            <div class="h-100 shadow-sm border-right p-3">
              <h5 class="text-black">Actuel responsable</h5>
              <hr class="m-0 bg-primary mb-3">
              <div>
                <label for="" class="font-size-11">Nom</label>
                <p class="font-size-13 text-primary">{{ me.entity.user.lastname }}</p>
              </div>
              <div class="mt-3">
                <label for="" class="font-size-11">Prénom</label>
                <p class="font-size-13 text-primary">{{ me.entity.user.firstname }}</p>
              </div>
              <div class="mt-3">
                <label for="" class="font-size-11">Email</label>
                <p class="font-size-13 text-primary">{{ me.entity.user.email }}</p>
              </div>
              <div class="mt-3">
                <label for="" class="font-size-11">Téléphone</label>
                <p class="font-size-13 text-primary">{{ me.entity.user.phone }}</p>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>


  </Layout>
</template>
