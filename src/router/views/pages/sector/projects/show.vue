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
      name: "",
      description: "",
      weight: 1,
      amount: "",
      date_start: "",
      date_end: "",
      project: {},
      activity: {},
      loading: false,
      loadingPublish: false,
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('sector/projects/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.project = data.data
      })
    },
    publishProject() {
        this.loadingPublish = true
        fetch(Helper.route('sector/projects/'+this.id+'/publish'), Helper.requestOptions())
        .then(response => {
            Helper.tokenChecker(response.status)
            return response.json()
        })
        .then(data => {
            this.loadingPublish = false
            console.log(data);
            if(data.status == false) {
              Swal.fire("Activités non envoyées au CDN !", data.message.join(";"), "error");
            } else {
              this.project = data.data
              Swal.fire("Activités publiées !", "Les activités sont déjà envoyé au CDN", "success");
            }
        })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('project_id', this.id)
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('amount', this.amount)
      formData.append('weight', this.weight)
      formData.append('date_start', this.date_start)
      formData.append('date_end', this.date_end)
      if(document.getElementById("file").files[0] != undefined) {
        formData.append('file', document.getElementById("file").files[0])
      }
      fetch(Helper.route('sector/activities'), Helper.requestOptions("POST", formData))
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
          this.doesAddOpen = false
          this.initData(null)
          this.project.activities.push(data.data)
          Swal.fire("Activité ajouter !", "L'activité a été enregistrée avec succès.", "success");
        } else {
          this.errors.name = Helper.getError(data.data, "name")
          this.errors.description = Helper.getError(data.data, "description")
          this.errors.amount = Helper.getError(data.data, "amount")
          this.errors.weight = Helper.getError(data.data, "weight")
          this.errors.date_start = Helper.getError(data.data, "date_start")
          this.errors.date_end = Helper.getError(data.data, "date_end")
          this.errors.file = Helper.getError(data.data, "file")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    editItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('project_id', this.id)
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('amount', this.amount)
      formData.append('weight', this.weight)
      formData.append('date_start', this.date_start)
      formData.append('date_end', this.date_end)
      if(document.getElementById("file1").files[0] != undefined) {
        formData.append('file', document.getElementById("file1").files[0])
      }
      formData.append('_method', "PUT")
      console.log(formData.get("name"), 'id', this.activity.id);
      fetch(Helper.route('sector/activities/'+this.activity.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        this.loading = false
        if (this.status == 200) {
          this.doesEditOpen = false
          this.project.activities = this.project.activities.map(i => i.id !== this.activity.id ? i : data.data)
          Swal.fire("Activité modifier !", "L'activité a été modifiée avec succès.", "success");
        } else {
          this.errors.name = Helper.getError(data.data, "name")
          this.errors.description = Helper.getError(data.data, "description")
          this.errors.amount = Helper.getError(data.data, "amount")
          this.errors.weight = Helper.getError(data.data, "weight")
          this.errors.date_start = Helper.getError(data.data, "date_start")
          this.errors.date_end = Helper.getError(data.data, "date_end")
          this.errors.file = Helper.getError(data.data, "file")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    deleteIt() {
      this.loading = true
      console.log(this.activity.id);
      fetch(Helper.route('sector/activities/'+this.activity.id), Helper.requestOptions("DELETE"))
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
          this.project.activities = this.project.activities.filter(i => i.id !== this.activity.id)
          Swal.fire("Partenaire supprimer !", "Le partenaire a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Partenaire non supprimer ?", "La suppression n'a pas marché, veuillez réessayez plus tard.", "error");
        }
        this.activity = null
      })
    },
    initItem(activity, action="edit") {
        this.activity = activity
        this.initData(activity)
        if (action == "delete") {
          this.doesDeleteOpen = true
        } else {
          this.doesEditOpen = true
        }
    },
    initData(item = null) {
      this.name = item != null ? item.name : ""
      this.amount = item != null ? item.amount : ""
      this.weight = item != null ? item.weight : ""
      this.date_start = item != null ? item.date_start : ""
      this.date_end = item != null ? item.date_end : ""
      this.description = item != null ? item.description : ""
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
    doesEditOpen: function() {
      this.errors = []
      if (!this.doesEditOpen) {
        this.activity = null
        this.initData(null)
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.activity = null
        this.initData(null)
      }
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="hstack mb-3" v-if="project.activity_is_add == false">
        <div class="ms-auto">
            <div v-if="project.activity_is_add == 0">
                <b-button variant="success" v-if="!loadingPublish" @click="publishProject()" class="ms-auto">
                    <i class="bx bx-send font-size-16 align-middle me-2"></i>
                    Toutes les activités ont été enregistrées
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
            Ajouter une nouvelle activité
        </b-button>
    </div>
    
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
                                    <router-link v-if="project.activity_is_add" :to="'/sector/activities/'+activity.id">{{ activity.name }}</router-link>
                                    <span v-else>{{ activity.name }}</span>
                                </td>
                                <td class="text-center">{{ activity.progress }} %</td>
                                <td class="text-center">{{ activity.weight }}</td>
                                <td class="text-center text-black">{{ activity.amount }} F</td>
                                <td class="hstack" v-if="project.activity_is_add == false">
                                    <b-button class="btn-sm" @click="initItem(activity)" variant="success">
                                        <i class="bx bx-edit font-size-16 align-middle mx-1"></i>
                                    </b-button>
                                    <b-button variant="danger" @click="initItem(activity, 'delete')" class="ms-2 btn-sm">
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
        size="lg"
        title="Ajouter une activité"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
            <div class="row">
              <div class="col-md-6 mb-3">
                  <label for="">Nom de l'activité</label>
                  <input type="text" required v-model="name" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
              </div>
              <div class="col-md-6">
                  <label for="">Fichier explicatif (Facultatif)</label>
                  <input type="file" id="file" accept=".pdf, .docx" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Poids de l'activité (Le cumul des poids doit être = 100)</label>
                  <input type="number" required min="1" max="100" v-model="weight" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.weight">{{ errors.weight }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Montant alloué à l'activité</label>
                  <input type="number" required v-model="amount" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.amount">{{ errors.amount }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Date de debut de l'activité</label>
                  <input type="date" required v-model="date_start" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.date_start">{{ errors.date_start }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Date de fin de l'activité</label>
                  <input type="date" required v-model="date_end" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.date_end">{{ errors.date_end }}</span>
              </div>
            <div>
                <label for="">Description de l'activité</label>
                <textarea v-model="description" required class="form-control" rows="4"></textarea>
                <span class="text-danger mt-2" v-if="errors.description">{{ errors.description }}</span>
            </div>
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



    <!-- EDIT MODAL -->
    <b-modal
        v-model="doesEditOpen"
        id="modal-center"
        centered
        size="lg"
        title="Modifier le sondage"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div class="row">
              <div class="col-md-6 mb-3">
                  <label for="">Nom de l'activité</label>
                  <input type="text" required v-model="name" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
              </div>
              <div class="col-md-6">
                  <label for="">Fichier explicatif (Facultatif)</label>
                  <input type="file" id="file1" accept=".pdf, .docx" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Poids de l'activité (Le cumul des poids doit être = 100)</label>
                  <input type="number" required min="1" max="100" v-model="weight" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.weight">{{ errors.weight }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Montant alloué à l'activité</label>
                  <input type="number" required v-model="amount" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.amount">{{ errors.amount }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Date de debut de l'activité</label>
                  <input type="date" required v-model="date_start" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.date_start">{{ errors.date_start }}</span>
              </div>
              <div class="col-md-6 mb-3">
                  <label for="">Date de fin de l'activité</label>
                  <input type="date" required v-model="date_end" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.date_end">{{ errors.date_end }}</span>
              </div>
            <div>
                <label for="">Description de l'activité</label>
                <textarea v-model="description" required class="form-control" rows="4"></textarea>
                <span class="text-danger mt-2" v-if="errors.description">{{ errors.description }}</span>
            </div>
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
        title="Supprimer l'activité"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer l'activité <b>{{ activity?.name }}</b> ?
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
