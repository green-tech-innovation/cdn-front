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
      project_patner: {},
      project: {},
      entities: [],
      entity_id: "",
      loading: false,
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('projects/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.project = data.data
      })
    },
    loadEntities() {
      fetch(Helper.route('entities?type=patner'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        this.entities = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('project_id', this.id)
      formData.append('entity_id', this.entity_id)
      if (document.getElementById("file").files[0]) {
        formData.append('file', document.getElementById("file").files[0]) 
      }
      fetch(Helper.route('project-patners'), Helper.requestOptions("POST", formData))
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
          this.project.project_patners.push(data.data)
          Swal.fire("Partenaire ajouter !", "Le partenaire a été enregistré avec succès.", "success");
        } else {
          this.errors.entity_id = Helper.getError(data.data, "entity_id")
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
      console.log(this.project_patner.id);
      fetch(Helper.route('project-patners/'+this.project_patner.id), Helper.requestOptions("DELETE"))
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
          this.project.project_patners = this.project.project_patners.filter(i => i.id !== this.project_patner.id)
          Swal.fire("Partenaire supprimer !", "Le partenaire a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Partenaire non supprimer ?", "La suppression n'a pas marché, veuillez réessayez plus tard.", "error");
        }
        this.project_patner = null
      })
    },
    initItem(project_patner, action="edit") {
      this.project_patner = project_patner
      this.name = project_patner.entity.name
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
    doesEditOpen: function() {
      this.errors = []
      if (!this.doesEditOpen) {
        this.project_patner = null
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.project_patner = null
      }
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="hstack mb-3">
        <b-button variant="primary" @click="doesAddOpen = true" class="ms-auto">
            <i class="bx bx-plus font-size-16 align-middle me-2"></i>
            Ajouter un partnaire
        </b-button>
    </div>
    
    <div class="row" v-if="project.id">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-primary mb-3">{{ project.name }}</h4>
            <p><b>Secteur</b> : {{ project.entity.name }} </p>
            <p><b>Fichier du projet</b> : 
                <a :href="STORAGE_URL+project.file" v-if="project.file !== ''" target="_blank" class="btn btn-sm btn-success rounded-pill">
                    <i class="bx bx-download font-size-14 align-middle mx-1 text-white"></i>
                    Télécharger le Fichier
                </a>
            </p>
            <p>
                <b>Progression</b> : {{ project.progress }}%
                <b-progress :value="project.progress" :max="100" class="mt-2" variant="success"></b-progress> 
            </p>
            <p><b>Date debut</b> : {{ project.date_start }}</p>
            <p><b>Date Fin</b> : {{ project.date_end }}</p>
            <h6><b>Description</b></h6>
            <p class="card-title-desc">
              {{ project.description }}
            </p>

            <div class="bg-light p-3 pt-3">
                <h6 class="font-20 text-danger">♣ Listes des partenaires</h6>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Partenaire</th>
                                <th>Fichier du partenariat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(project_patner, i) in project.project_patners" :key="project_patner.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link :to="'/cdn/patners/'+project_patner.entity.id">{{ project_patner.entity.name }}</router-link>
                                </td>
                                <td>
                                    <a :href="STORAGE_URL+project_patner.file" v-if="project_patner.file" target="_blank" class="btn btn-primary px-3 rounded-pill">
                                        <i class="bx bx-download font-size-16 align-middle mx-1 text-white"></i>
                                        Télécharger le Fichier
                                    </a>
                                </td>
                                <td class="hstack">
                                    <b-button variant="danger" @click="initItem(project_patner, 'delete')" class="ms-2 btn-sm">
                                        <i class="bx bx-trash font-size-16 align-middle mx-1"></i>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(activity, i) in project.activities" :key="activity.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link :to="'/cdn/activities/'+activity.id">{{ activity.name }}</router-link>
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

    <!-- ADD MODAL -->
    <b-modal
        v-model="doesAddOpen"
        id="modal-center"
        centered
        title="Ajouter un partenaire"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
            <div class="mb-3">
                <label for="">Selectionnez l'entité</label>
                <select required v-model="entity_id" class="form-control">
                    <option value="">Selectionnez l'entité</option>
                    <option v-for="entity in entities" :key="entity.id" :value="entity.id">{{ entity.name }}</option>
                </select>
                <span class="text-danger mt-2" v-if="errors.entity">{{ errors.entity }}</span>
            </div>
            <div>
                <label for="">Fichier du partenariat (Facultatif)</label>
                <input type="file" id="file" accept=".pdf, .docx" class="form-control">
                <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
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
        title="Supprimer la catégorie"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer la catégorie <b>{{ project_patner?.entity?.name }}</b> ?
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
