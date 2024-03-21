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
      projects: [],
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('patner/projects'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.projects = data.data
      })
    },
  },
  mounted() {
    this.loadList()
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
    
    <div class="row mt-4">
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
                    <th>Nom du projet</th>
                    <th>Montant alloué</th>
                    <th class="text-center">Nbre d'activités</th>
                    <th>Date Début</th>
                    <th>Date Fin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(project, i) in projects" :key="project.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ project.entity.name }}</td>
                    <td>
                      <router-link :to="'/patner/projects/'+project.id">{{ project.name }}</router-link>
                    </td>
                    <td>{{ project.cost }} F CFA</td>
                    <td class="text-center">{{ project.activities.length }}</td>
                    <td>{{ project.date_start }}</td>
                    <td>{{ project.date_end }}</td>
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
        title="Ajouter un projet"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
                <select required v-model="entity_id" class="form-control">
                    <option value="">Selectionnez le secteur</option>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{ sector.name }}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <input type="text" required placeholder="Nom du projet" v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="number" required placeholder="Montant alloué" v-model="cost" class="form-control">
                <span class="text-danger mt-2" v-if="errors.cost">{{ errors.cost }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="file" required placeholder="Fichier du projet" accept=".pdf, .docx" id="file" class="form-control">
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
            <div>
                <textarea v-model="description" placeholder="Description du projet" class="form-control" rows="4"></textarea>
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
        title="Modifier le projet"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
                <select required v-model="entity_id" class="form-control">
                    <option value="">Selectionnez le secteur</option>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">{{ sector.name }}</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <input type="text" required placeholder="Nom du projet" v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="number" required placeholder="Montant alloué" v-model="cost" class="form-control">
                <span class="text-danger mt-2" v-if="errors.cost">{{ errors.cost }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="file" placeholder="Fichier du projet" accept=".pdf, .docx" id="file1" class="form-control">
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
            <div>
                <textarea v-model="description" placeholder="Description du projet" class="form-control" rows="4"></textarea>
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
