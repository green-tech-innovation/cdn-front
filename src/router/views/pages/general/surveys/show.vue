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
      survey_item_id: "",
      survey_vote: {},
      loading: false,
      loadingPublish: false,
      status: 201,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('general/surveys/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log('survey', data.data);
        this.survey = data.data.survey
        this.survey_vote = data.data.survey_vote
      })
    },
    sendResponse() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append("survey_item_id", this.survey_item_id)
      fetch(Helper.route('survey-votes'), Helper.requestOptions("POST", formData))
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
          this.survey_item_id = ""
          this.doesAddOpen = false
          this.survey_vote = data.data.survey_vote
          this.survey = data.data.survey
          Swal.fire("Reponse envoyé !", "Votre choix a été envoyé avec succès.", "success");
        } else {
          this.errors.survey_item_id = Helper.getError(data.data, "survey_item_id")
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
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="hstack mb-3" v-if="!survey_vote.id && survey.can_vote">
        <b-button variant="success" @click="doesAddOpen = true" class="ms-auto">
            <i class="bx bx-send font-size-16 align-middle me-2"></i>
            Envoyer votre choix
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
                                <th>Option</th>
                                <th class="text-center" v-if="survey_vote.id">Nombre de vote</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(survey_item, i) in survey.survey_items" :key="survey_item.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                  {{ survey_item.item }}
                                </td>
                                <td class="text-center" v-if="survey_vote.id">{{ survey_item.survey_votes.length }}</td>
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
        title="Envoyez votre choix"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="sendResponse()">
          <div>
            <label for="">Votre choix</label>
            <select v-model="survey_item_id" class="form-control">
              <option :value="survey_item.id" v-for="survey_item in survey.survey_items" :key="survey_item.id">{{ survey_item.item }}</option>
            </select>
            <span class="text-danger mt-2" v-if="errors.survey_item_id">{{ errors.survey_item_id }}</span>
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
