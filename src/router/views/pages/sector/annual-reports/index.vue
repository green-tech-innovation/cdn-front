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
    title: "Tous les rapport annuels",
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
      title: "Tous les rapport annuels",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Tous les rapport annuels",
          active: true,
        },
      ],
      errors: [],
      annual_report: null,
      annual_reports: [],
      name: "",
      year: "",
      loading: false,
      status: 201,
      STORAGE_URL: Helper.STORAGE_URL,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('sector/annual-reports'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.annual_reports = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('file', document.getElementById("file").files[0])
      formData.append('year', new Date().getFullYear())
      fetch(Helper.route('annual-reports'), Helper.requestOptions("POST", formData))
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
          this.annual_reports.push(data.data)
          Swal.fire("Rapport annuel ajouter !", "Le rapport annuel a été enregistré avec succès.", "success");
        } else { 
            if (data.data) {
              this.errors.name = Helper.getError(data.data, "name")
              this.errors.file = Helper.getError(data.data, "file")
            } else {
              this.doesAddOpen = false
              this.initData(null)
              Swal.fire("Rapport annuel non ajouter ?", data.message, "error");
            }
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    initItem(annual_report, action="edit") {
        this.annual_report = annual_report
        this.initData(annual_report)
        if (action == "delete") {
        this.doesDeleteOpen = true
        } else {
        this.doesEditOpen = true
        }
    },
    initData(item = null) {
      this.name = item != null ? item.name : ""
      this.year = item != null ? item.year : ""
    }
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
        this.annual_report = null
        this.initData(null)
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.annual_report = null
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
            <h4 class="card-title">Listes des rapport annuels</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>rapport annuels</code>.
            </p>
            annual_reports
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom du rapport</th>
                    <th>Fichier</th>
                    <th>Année</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(annual_report, i) in annual_reports" :key="annual_report.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ annual_report.name }}</td>
                    <td>
                        <a :href="STORAGE_URL+annual_report.file" target="_blank" class="btn btn-primary rounded-pill">
                          <i class="bx bx-download font-size-16 align-middle mx-1 text-white"></i>
                          Télécharger
                        </a>
                    </td>
                    <td>{{ annual_report.year }}</td>
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
        centered
        title="Ajouter un rapport annuel"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="mb-3">
                <label for="">Nom du rapport annuel</label>
                <input type="text" required v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div>
                <label for="">Fichier du rapport annuel</label>
                <input type="file" required accept=".pdf, .docx" id="file" class="form-control">
                <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
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


  </Layout>
</template>
