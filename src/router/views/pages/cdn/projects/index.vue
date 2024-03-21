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
    title: "Tous les projets",
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
      title: "Tous les projets",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Tous les projets",
          active: true,
        },
      ],
      errors: [],
      sectors: [],
      project: null,
      projects: [],
      organes: [],
      entity_id: "",
      organe_id: "",
      name: "",
      target: "",
      goal: "",
      result: "",
      file: null,
      cost: "",
      date_start: "",
      date_end: "",
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('projects'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.projects = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('entity_id', this.entity_id)
      formData.append('organe_id', this.organe_id)
      formData.append('name', this.name)
      formData.append('file', document.getElementById("file").files[0])
      formData.append('cost', this.cost)
      formData.append('date_start', this.date_start)
      formData.append('date_end', this.date_end)
      formData.append('target', this.target)
      formData.append('goal', this.goal)
      formData.append('result', this.result)
      fetch(Helper.route('projects'), Helper.requestOptions("POST", formData))
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
          this.name = ""
          this.doesAddOpen = false
          this.initData(null)
          this.projects.push(data.data)
          Swal.fire("Projet ajouter !", "Le projet a été enregistré avec succès.", "success");
        } else {      
            this.errors.entity_id = Helper.getError(data.data, "entity_id")
            this.errors.name = Helper.getError(data.data, "name")
            this.errors.cost = Helper.getError(data.data, "cost")
            this.errors.file = Helper.getError(data.data, "file")
            this.errors.date_start = Helper.getError(data.data, "date_start")
            this.errors.date_end = Helper.getError(data.data, "date_end")
            this.errors.target = Helper.getError(data.data, "target")
            this.errors.goal = Helper.getError(data.data, "goal")
            this.errors.result = Helper.getError(data.data, "result")
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
      formData.append('_method', "PUT")
      formData.append('entity_id', this.entity_id)
      formData.append('organe_id', this.organe_id)
      formData.append('name', this.name)
      formData.append('file', document.getElementById("file1").files[0])
      formData.append('cost', this.cost)
      formData.append('date_start', this.date_start)
      formData.append('date_end', this.date_end)
      formData.append('target', this.target)
      formData.append('goal', this.goal)
      formData.append('result', this.result)
      fetch(Helper.route('projects/'+this.project.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log('last',this.project);
        console.log('new',data.data);
        this.loading = false
        if (this.status == 200) {
          this.name = ""
          this.doesEditOpen = false
          this.projects = this.projects.map(i => i.id !== this.project.id ? i : data.data)
          Swal.fire("Projet modifier !", "Le projet a été modifié avec succès.", "success");
        } else {
            this.errors.entity_id = Helper.getError(data.data, "entity_id")
            this.errors.name = Helper.getError(data.data, "name")
            this.errors.cost = Helper.getError(data.data, "cost")
            this.errors.file = Helper.getError(data.data, "file")
            this.errors.date_start = Helper.getError(data.data, "date_start")
            this.errors.date_end = Helper.getError(data.data, "date_end")
            this.errors.target = Helper.getError(data.data, "target")
            this.errors.goal = Helper.getError(data.data, "goal")
            this.errors.result = Helper.getError(data.data, "result")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    deleteIt() {
      this.loading = true
      fetch(Helper.route('projects/'+this.project.id), Helper.requestOptions("DELETE"))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.text()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        console.log(this.project.id);
        this.name = ""
        this.loading = false
        this.doesDeleteOpen = false
        if (this.status == 204) {
            this.projects = this.projects.filter(i => i.id !== this.project.id)
            Swal.fire("Projet supprimer !", "Le projet a été supprimé avec succès.", "success");
        } else {
            Swal.fire("Projet non supprimer ?", "Le suppression n'a pas marché, veuillez réssayez plus tard.", "error");
        }
        this.project = null
      })
    },
    loadSectors() {
      fetch(Helper.route('entities?type=sector'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.sectors = data.data
      })
    },
    loadOrganes() {
      fetch(Helper.route('organes'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.organes = data.data
      })
    },
    initItem(project, action="edit") {
        this.project = project
        this.initData(project)
        if (action == "delete") {
          this.doesDeleteOpen = true
        } else {
          this.doesEditOpen = true
        }
    },
    initData(item = null) {
      this.organe_id = item != null ? item.organe_id : ""
      this.entity_id = item != null ? item.entity_id : ""
      this.name = item != null ? item.name : ""
      this.cost = item != null ? item.cost : ""
      this.date_start = item != null ? item.date_start : ""
      this.date_end = item != null ? item.date_end : ""
      this.target = item != null ? item.target : ""
      this.goal = item != null ? item.goal : ""
      this.result = item != null ? item.result : ""
    }
  },
  mounted() {
    this.loadList()
    this.loadSectors()
    this.loadOrganes()
  },
  watch: {
    doesAddOpen: function() {
      this.errors = []
    },
    doesEditOpen: function() {
      this.errors = []
      if (!this.doesEditOpen) {
        this.project = null
        this.initData(null)
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.project = null
        this.initData(null)
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
            Ajouter un nouveau
        </b-button>
    </div>
    
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listes des projets</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>projets</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Secteur</th>
                    <th>Organe</th>
                    <th>Nom du projet</th>
                    <th>Montant alloué</th>
                    <th>Date Début</th>
                    <th>Date Fin</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(project, i) in projects" :key="project.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/cdn/sectors/'+project.entity.id">{{ project.entity.name }}</router-link>
                    </td>
                    <td>
                      <router-link :to="'/cdn/organes/'+project.organe.id">{{ project.organe.name }}</router-link>
                    </td>
                    <td>
                      <router-link :to="'/cdn/projects/'+project.id">{{ project.name }}</router-link>
                    </td>
                    <td>{{ project.cost }} F CFA</td>
                    <td>{{ project.date_start }}</td>
                    <td>{{ project.date_end }}</td>
                    <td class="hstack">
                        <b-button class="btn-sm" @click="initItem(project)" variant="success">
                            <i
                            class="bx bx-edit font-size-16 align-middle mx-1"
                            ></i>
                        </b-button>
                        <b-button variant="danger" @click="initItem(project, 'delete')" class="ms-2 btn-sm">
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

    <!-- ADD MODAL -->
    <b-modal
        v-model="doesAddOpen"
        id="modal-center"
        size="lg"
        centered
        scrollable
        title="Ajouter un projet"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
                <label for="">Organe de mise en oeuvre</label>
                <select required v-model="organe_id" class="form-control">
                    <option value="">Selectionnez l'organe de mise en oeuvre</option>
                    <option v-for="organe in organes" :key="organe.id" :value="organe.id">{{ organe.name }}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Secteur</label>
                <select required v-model="entity_id" class="form-control">
                    <option value="">Selectionnez le secteur</option>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{ sector.name }}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Intitulé du projet</label>
                <input type="text" required placeholder="Intitulé du projet" v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Montant alloué</label>
                <input type="number" required v-model="cost" class="form-control">
                <span class="text-danger mt-2" v-if="errors.cost">{{ errors.cost }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Fichier du projet</label>
                <input type="file" required accept=".pdf, .docx" id="file" class="form-control">
                <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Date Début</label>
                <input type="date" required placeholder="Date Début" v-model="date_start" class="form-control">
                <span class="text-danger mt-2" v-if="errors.date_start">{{ errors.date_start }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Date Fin</label>
                <input type="date" v-model="date_end" class="form-control">
                <span class="text-danger mt-2" v-if="errors.date_end">{{ errors.date_end }}</span>
            </div>
            <div class="mb-3">
                <label for="">Cibles du projet</label>
                <textarea v-model="target" class="form-control" rows="2"></textarea>
            </div>
            <div class="mb-3">
                <label for="">Objectif du projet</label>
                <textarea v-model="goal" class="form-control" rows="2"></textarea>
            </div>
            <div class="mb-3">
                <label for="">Resulat</label>
                <textarea v-model="result" class="form-control" rows="2"></textarea>
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
        scrollable
        size="lg"
        title="Modifier le projet"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
                <label for="">Organe de mise en oeuvre</label>
                <select required v-model="organe_id" class="form-control">
                    <option value="">Selectionnez l'organe de mise en oeuvre</option>
                    <option v-for="organe in organes" :key="organe.id" :value="organe.id">{{ organe.name }}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Secteur</label>
                <select required v-model="entity_id" class="form-control">
                    <option value="">Selectionnez le secteur</option>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{ sector.name }}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <input type="text" required placeholder="Intitulé du projet" v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="number" required placeholder="Montant alloué" v-model="cost" class="form-control">
                <span class="text-danger mt-2" v-if="errors.cost">{{ errors.cost }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Fichier du projet</label>
                <input type="file" accept=".pdf, .docx" id="file1" class="form-control">
                <span class="text-secondary mt-1">Facultatif</span> <br>
                <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Date Début</label>
                <input type="date" required placeholder="Date Début" v-model="date_start" class="form-control">
                <span class="text-danger mt-2" v-if="errors.date_start">{{ errors.date_start }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Date Fin</label>
                <input type="date" v-model="date_end" class="form-control">
                <span class="text-danger mt-2" v-if="errors.date_end">{{ errors.date_end }}</span>
            </div>
            <div class="mb-3">
                <label for="">Cibles du projet</label>
                <textarea v-model="target" class="form-control" rows="2"></textarea>
            </div>
            <div class="mb-3">
                <label for="">Objectif du projet</label>
                <textarea v-model="goal" class="form-control" rows="2"></textarea>
            </div>
            <div class="mb-3">
                <label for="">Resulat</label>
                <textarea v-model="result" class="form-control" rows="2"></textarea>
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
        title="Supprimer le projet"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer le projet <b>{{ project?.name }}</b>
        </p>
        <p class="text-danger">Attention ! Supprimer un projet implique la suppression de ces activités.</p>
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
