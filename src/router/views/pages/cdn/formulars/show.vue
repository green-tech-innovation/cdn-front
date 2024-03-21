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
        const doesAddOpen1 = ref(false);
        const doesEditOpen = ref(false);
        const doesDeleteOpen = ref(false);

        return {
            doesAddOpen,
            doesAddOpen1,
            doesEditOpen,
            doesDeleteOpen,
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
      entities: [],
      entity_id: null,
      participant: null,
      errors: [],
      formular: {},
      formular_quiz: {},
      loading: false,
      loadingPublish: false,
      status: 201,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('formulars/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log('formulars', data.data);
        this.formular = data.data
      })
    },
    loadEntities() {
      fetch(Helper.route('entities'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        this.entities = data.data
      })
    },
    publishFormular() {
        this.loadingPublish = true
        fetch(Helper.route('formulars/'+this.id+'/publish'), Helper.requestOptions())
        .then(response => {
            Helper.tokenChecker(response.status)
            return response.json()
        })
        .then(data => {
            this.loadingPublish = false
            this.formular = data.data
            Swal.fire("Formulaire publié !", "Un message de rappel a été déjà envoyé  à tous les secteurs et partenaires pour participer de façon facultative.", "success");
            console.log(data);
        })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('quiz', this.quiz)
      formData.append("formular_id", this.id)
      fetch(Helper.route('formular-quizzes'), Helper.requestOptions("POST", formData))
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
          this.quiz = ""
          this.doesAddOpen = false
          this.formular.formular_quizzes.push(data.data)
          Swal.fire("Question ajouter !", "La question a été enregistrée avec succès.", "success");
        } else {
          this.errors.quiz = Helper.getError(data.data, "quiz")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    addParticipant() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append("formular_id", this.id)
      formData.append('entity_id', JSON.stringify(this.entity_id))
      fetch(Helper.route('formular-participants'), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(data);
        this.loading = false
        if (this.status == 200) {
          this.entity_id = null
          this.doesAddOpen1 = false
          this.formular.formular_participants = data.data
          Swal.fire("Participant ajouter !", "Le(les) participants a (ont) été enregistré(s) avec succès.", "success");
        } else {
          this.errors.entity_id = Helper.getError(data.data, "entity_id")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    deleteIt() {
      this.loading = true
      fetch(Helper.route('formular-participants/'+this.participant.id), Helper.requestOptions("DELETE"))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.text()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        this.loading = false
        this.doesDeleteOpen = false
        if (this.status == 204) {
          this.formular.formular_participants = this.formular.formular_participants.filter(i => i.id !== this.participant.id)
          Swal.fire("Participant supprimer !", "Le participant a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Participant non supprimer ?", "La suppression n'a pas marché, veuillez réessayez plus tard.", "error");
        }
      })
    },
    initItem(formular_quiz, action="edit") {
      this.formular_quiz = formular_quiz
      this.quiz = formular_quiz.quiz
      console.log('init', this.formular_quiz);
      if (action == "delete") {
        this.doesDeleteOpen = true
      } else {
        this.doesEditOpen = true
      }
    },
    initParticiant(participant, action="edit") {
      this.participant = participant
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
    this.loadEntities()
  },
  watch: {
    doesAddOpen: function() {
      this.errors = []
    },
    doesAddOpen1: function() {
      this.errors = []
      let selected_ids = this.formular.formular_participants.map(participant => participant.entity.id)
      for (let i = 0; i < selected_ids.length; i++) {  
        this.entities = this.entities.filter(i1 => i1.id !== selected_ids[i])
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.formular_quiz = null
      }
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div class="hstack mb-3" v-if="formular.is_published == false">
        <div class="ms-auto">
            <div v-if="formular.formular_quizzes.length != 0">
                <b-button variant="success" v-if="!loadingPublish" @click="publishFormular()" class="ms-auto">
                    <i class="bx bx-send font-size-16 align-middle me-2"></i>
                    Publier le formulaire
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
            Ajouter une nouvelle question
        </b-button>
        <b-button variant="primary" class="ms-3" @click="doesAddOpen1 = true">
            <i class="bx bx-plus font-size-16 align-middle me-2"></i>
            Ajouter des participants
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
            
            <div class="bg-light p-3 pt-3">
                <h6 class="font-20 text-danger">♣ Listes des questions</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th class="text-center">Réponse</th>
                                <th>Date d'ajout</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(formular_quiz, i) in formular.formular_quizzes" :key="formular_quiz.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link :to="'/cdn/formulars/'+formular_quiz.id+'/responses'">{{ formular_quiz.quiz }}</router-link>
                                </td>
                                <td class="text-center">{{ formular_quiz.formular_responses.length }}</td>
                                <td>{{ formular_quiz.created_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="bg-light p-3 mt-4 pt-3">
                <h6 class="font-20 text-danger">♣ Listes des participants</h6>

                <div class="table-responsive">
                    <table class="table table-bordered table-striped align-middle mb-0">
                        <thead>
                          <tr>
                              <th>#</th>
                              <th>Nom du participant</th>
                              <th v-if="!formular.is_published">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(participant, i) in formular.formular_participants" :key="participant.id">
                              <th scope="row">{{ i + 1 }}</th>
                              <td>
                                  <router-link :to="'/cdn/patners/'+participant.entity.id" v-if="participant.entity.type == 'PATNER'">{{ participant.entity.name }}</router-link>
                                  <router-link :to="'/cdn/sectors/'+participant.entity.id" v-else>{{ participant.entity.name }}</router-link>
                              </td>
                              <td v-if="!formular.is_published" class="hstack">
                                  <b-button variant="danger" @click="initParticiant(participant, 'delete')" class="ms-2 btn-sm">
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

    <!-- ADD MODAL -->
    <b-modal
        v-model="doesAddOpen"
        id="modal-center"
        centered
        title="Ajouter une question"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div>
            <label for="">Question</label>
            <input type="text" required v-model="quiz" class="form-control">
            <span class="text-danger mt-2" v-if="errors.quiz">{{ errors.quiz }}</span>
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

    
    <!-- ADD PARTICIPANT -->
    <b-modal
        v-model="doesAddOpen1"
        id="modal-center"
        centered
        title="Ajouter une participant"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addParticipant()">
          <div>
            <label for="">Selectionnez l'entité</label>
            <select required multiple v-model="entity_id" class="form-control">
                <template v-for="entity in entities" :key="entity.id">
                  <option :value="entity.id">{{ entity.name }}</option>
                </template>
            </select>
            <span class="text-danger mt-2" v-if="errors.entity_id">{{ errors.entity_id }}</span>
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



    <!-- DELETE MODAL -->
    <b-modal
        v-model="doesDeleteOpen"
        id="modal-center"
        title="Supprimer la participant"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer le participant ?
        </p>
        <div class="hstack mt-2" v-if="!loading">
          <button class="btn btn-dark ms-auto" @click="doesDeleteOpen = false">Annuler</button>
          <button class="ms-3 btn btn-danger" @click="deleteIt()">Supprimer</button>
        </div>
        <div class="text-center" v-else>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
    </b-modal>


  </Layout>
</template>
