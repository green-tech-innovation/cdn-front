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

        return {
            doesAddOpen,
        };
    },
    page: {
    title: "Evènement",
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
      title: "Formulaire",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Formulaire",
          active: true,
        },
        {
          text: "Un formulaire",
          active: true,
        },
      ],
      id: "",
      quiz: "",
      errors: [],
      responses: {},
      formular: {},
      formular_quiz: {},
      formular_responses: [],
      loading: false,
      status: 201,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('general/formulars/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log('formulars', data.data);
        this.formular = data.data.formular
        this.formular_responses = data.data.formular_responses
      })
    },
    getResponses() {
      for (let i = 0; i < this.formular.formular_quizzes.length; i++) {
        const formular_quiz = this.formular.formular_quizzes[i];
        let value = document.getElementById("quiz"+formular_quiz['id']).value
        let key1 = "quiz"+formular_quiz['id']
        this.responses[key1] = value
      }
    },
    sendResponse() {
      this.loading = true
      this.errors = []
      this.getResponses()
      let formData = new FormData()
      formData.append('responses', JSON.stringify(this.responses))
      formData.append("formular_id", this.id)
      fetch(Helper.route('general/formular-responses'), Helper.requestOptions("POST", formData))
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
          this.formular = data.data.formular
          this.formular_responses = data.data.formular_responses
          this.doesAddOpen = false
          Swal.fire("Réponse envoyé !", "Vos réponses ont été envoyées avec succès.", "success");
        } else {
          this.errors.quiz = Helper.getError(data.data, "quiz")
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
    
    <div class="hstack mb-3" v-if="!formular_responses.length > 0 && formular.can_submit">
        <b-button variant="success" @click="doesAddOpen = true" class="ms-auto">
            <i class="bx bx-send font-size-16 align-middle me-2"></i>
            Envoyer vos réponses
        </b-button>
    </div>
    
    
    <div class="row" v-if="formular != {}">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ formular.name }}</h4>
            <p class="text-danger mb-2">
                Date de Fin : {{ formular.date }}
            </p>
            <p class="card-title-desc">
              {{ formular.description }}
            </p>
            
            <div class="bg-light p-3 pt-3" v-if="formular_responses.length == 0">
                <h6 class="font-20 text-danger">♣ Listes des questions</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(formular_quiz, i) in formular.formular_quizzes" :key="formular_quiz.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                  {{ formular_quiz.quiz }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="bg-light p-3 pt-3" v-else>
                <h6 class="font-20 text-danger">♣ Vos réponses</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Réponse</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(formular_response, i) in formular_responses" :key="formular_response.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                  {{ formular_response.formular_quiz.quiz }}
                                </td>
                                <td>
                                  {{ formular_response.response }}
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
        size="lg"
        scrollable
        title="Envoyez votre réponse"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="sendResponse()">
          <div class="mb-3" v-for="(formular_quiz, i) in formular.formular_quizzes" :key="formular_quiz.id">
            <label :for="'quiz'+formular_quiz.id">{{ i+1 +" - "+ formular_quiz.quiz }}</label>
            <input type="text" required :id="'quiz'+formular_quiz.id" class="form-control">
          </div>
          <div class="" v-if="!loading">
            <input type="submit" value="Enregistrer" class="btn btn-primary">
          </div>
          <div class=" text-center" v-else>
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </form>
    </b-modal>


  </Layout>
</template>
