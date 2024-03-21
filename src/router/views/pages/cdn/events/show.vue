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
      title: "Evènement",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Evènement",
          active: true,
        },
        {
          text: "Un évènement",
          active: true,
        },
      ],
      id: "",
      errors: [],
      event: {},
      entities: [],
      entity_id: "",
      participant: {},
      loading: false,
      loadingRapport: false,
      status: 201,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('events/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log('event', data.data.participants);
        this.event = data.data
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
    sendReminder() {
        this.loadingRapport = true
        fetch(Helper.route('events/'+this.id+'/send-reminder'), Helper.requestOptions())
        .then(response => {
            Helper.tokenChecker(response.status)
            return response.json()
        })
        .then(data => {
            this.loadingRapport = false
            Swal.fire("Rappel envoyé !", "Un message de rappel a été déjà envoyé  à tous les participants.", "success");
            console.log(data);
        })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('event_id', this.id)
      formData.append('entity_id', JSON.stringify(this.entity_id))
      fetch(Helper.route('participants'), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(data);
        this.loading = false
        if (this.status == 200) {
          this.entity_id = ""
          this.doesAddOpen = false
          this.event.participants = data.data
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
      fetch(Helper.route('participants/'+this.participant.id), Helper.requestOptions("DELETE"))
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
          this.event.participants = this.event.participants.filter(i => i.id !== this.participant.id)
          Swal.fire("Participant supprimer !", "Le participant a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Participant non supprimer ?", "La suppression n'a pas marché, veuillez réessayez plus tard.", "error");
        }
      })
    },
    initItem(participant, action="edit") {
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
      let selected_ids = this.event.participants.map(participant => participant.entity.id)
      console.log(selected_ids);
      for (let i = 0; i < selected_ids.length; i++) {  
        this.entities = this.entities.filter(i1 => i1.id !== selected_ids[i])
      }
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

    <div class="hstack mb-3">
        <div class="ms-auto">
            <template v-if="event.participants?.length != 0">
              <b-button variant="success" v-if="!loadingRapport" @click="sendReminder()" class="ms-auto">
                <i class="bx bx-send font-size-16 align-middle me-2"></i>
                Envoyer un rappel
              </b-button>
              <div class="text-center" v-else>
                  <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                  </div>
              </div>
            </template>
        </div>
        <b-button variant="primary" @click="doesAddOpen = true" class="ms-3">
            <i class="bx bx-plus font-size-16 align-middle me-2"></i>
            Ajouter un participant
        </b-button>
    </div>
    
    <div class="row" v-if="event.id">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ event.name }}</h4>
            <p class="my-2">
                Date de Fin : <b class="text-danger">{{ event.date }}</b>
            </p>
            <p>
              Lieu ou Lien :  <b>{{ event.place_link }}</b>
            </p>
            <p class="card-title-desc" style="text-align: justify;">
              <b class="text-black">Un peu de detail</b> <br>
              {{ event.description }}
            </p>

            <div class="bg-light p-3 pt-3">
                <h6 class="font-20 text-danger">♣ Listes des participants</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                          <tr>
                              <th>#</th>
                              <th>Nom du participant</th>
                              <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(participant, i) in event.participants" :key="participant.id">
                              <th scope="row">{{ i + 1 }}</th>
                              <td>
                                  <router-link :to="'/cdn/patners/'+participant.entity.id" v-if="participant.entity.type == 'PATNER'">{{ participant.entity.name }}</router-link>
                                  <router-link :to="'/cdn/sectors/'+participant.entity.id" v-else>{{ participant.entity.name }}</router-link>
                              </td>
                              <td class="hstack">
                                  <b-button variant="danger" @click="initItem(participant, 'delete')" class="ms-2 btn-sm">
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
        title="Ajouter une participant"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
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
