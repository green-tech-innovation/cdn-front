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
        const doesEditOpen = ref(false);
        const doesDeleteOpen = ref(false);

        return {
            doesAddOpen,
            doesEditOpen,
            doesDeleteOpen,
        };
    },
    page: {
    title: "Sondages",
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
      title: "Sondages",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Sondages",
          active: true,
        },
        {
          text: "Un Sondage",
          active: true,
        },
      ],
      id: "",
      item: "",
      errors: [],
      survey: {},
      survey_item: {},
      loading: false,
      loadingPublish: false,
      status: 201,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('surveys/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log('surveys', data.data);
        this.survey = data.data
      })
    },
    publishSurvey() {
        this.loadingPublish = true
        fetch(Helper.route('surveys/'+this.id+'/publish'), Helper.requestOptions())
        .then(response => {
            Helper.tokenChecker(response.status)
            return response.json()
        })
        .then(data => {
            this.loadingPublish = false
            this.survey = data.data
            Swal.fire("Sondage publié !", "Un message de rappel a été déjà envoyé  à tous les secteurs et partenaires pour participer de façon facultative.", "success");
            console.log(data);
        })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('item', this.item)
      formData.append("survey_id", this.id)
      fetch(Helper.route('survey-items'), Helper.requestOptions("POST", formData))
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
          this.item = ""
          this.doesAddOpen = false
          this.survey.survey_items.push(data.data)
          Swal.fire("Option ajouter !", "Le sondage a été enregistré avec succès.", "success");
        } else {
          this.errors.item = Helper.getError(data.data, "item")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    initItem(survey_item, action="edit") {
      this.survey_item = survey_item
      this.item = survey_item.item
      console.log('init', this.survey_item);
      if (action == "delete") {
        this.doesDeleteOpen = true
      } else {
        this.doesEditOpen = true
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getItem()
  },
  watch: {
    doesAddOpen: function() {
      this.errors = []
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.participant = null
      }
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div class="hstack mb-3" v-if="survey.is_published == false">
        <div class="ms-auto">
            <div v-if="survey.survey_items.length != 0">
                <b-button variant="success" v-if="!loadingPublish" @click="publishSurvey()" class="ms-auto">
                    <i class="bx bx-send font-size-16 align-middle me-2"></i>
                    Publier le sondage
                </b-button>
                <div class="text-center" v-else>
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <b-button variant="primary" class="ms-3" @click="doesAddOpen = true">
            <i class="bx bx-plus font-size-16 align-middle me-2"></i>
            Ajouter un nouveau
        </b-button>
    </div>
    
    
    <div class="row" v-if="survey != {}">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ survey.name }}</h4>
            <p class="text-danger mb-2">
                Date de Fin : {{ survey.date }}
            </p>
            <p class="card-title-desc">
              {{ survey.description }}
            </p>
            
            <div class="bg-light p-3 pt-3">
                <h6 class="font-20 text-danger">♣ Listes des options</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Sondage</th>
                                <th class="text-center">Nombre de vote</th>
                                <th>Date d'ajout</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(survey_item, i) in survey.survey_items" :key="survey_item.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link :to="'/cdn/surveys/'+survey_item.id+'/votes'">{{ survey_item.item }}</router-link>
                                </td>
                                <td class="text-center">{{ survey_item.survey_votes.length }}</td>
                                <td>{{ survey_item.created_at }}</td>
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
        title="Ajouter une option"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div>
            <label for="">Option</label>
            <input type="text" required v-model="item" class="form-control">
            <span class="text-danger mt-2" v-if="errors.item">{{ errors.item }}</span>
          </div>
          <div class="mt-3" v-if="!loading">
            <input type="submit" value="Enregistrer" class="btn btn-primary">
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
