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
    title: "Organes",
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
      title: "Organes",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Définition",
        },
        {
          text: "Organes",
          active: true,
        },
      ],
      errors: [],
      organe: {},
      organes: [],
      name: "",
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
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
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('name', this.name)
      fetch(Helper.route('organes'), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        this.loading = false
        if (this.status == 201) {
          this.name = ""
          this.doesAddOpen = false
          this.organes.push(data.data)
          Swal.fire("Organes ajouter !", "L'organe a été enregistré avec succès.", "success");
        } else {
          this.errors.name = Helper.getError(data.data, "name")
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
      formData.append('name', this.name)
      formData.append('_method', "PUT")
      console.log(formData.get("name"), 'id', this.organe.id);
      fetch(Helper.route('organes/'+this.organe.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log('last',this.organe);
        console.log('new',data.data);
        this.loading = false
        if (this.status == 200) {
          this.name = ""
          this.doesEditOpen = false
          this.organes = this.organes.map(i => i.id !== this.organe.id ? i : data.data)
          Swal.fire("Organes modifier !", "L'organe a été modifié avec succès.", "success");
        } else {
          this.errors.name = Helper.getError(data.data, "name")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    deleteIt() {
      this.loading = true
      fetch(Helper.route('organes/'+this.organe.id), Helper.requestOptions("DELETE"))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.text()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        this.name = ""
        this.loading = false
        this.doesDeleteOpen = false
        if (this.status == 204) {
          this.organes = this.organes.filter(i => i.id !== this.organe.id)
          Swal.fire("Organes supprimer !", "L'organe a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Organes non supprimer ?", "La suppression n'a pas marché, veuillez réssayez plus tard.", "error");
        }
        this.organe = null
      })
    },
    initItem(organe, action="edit") {
      this.organe = organe
      console.log('init', this.organe);
      this.name = organe.name
      if (action == "delete") {
        this.doesDeleteOpen = true
      } else {
        this.doesEditOpen = true
      }
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
        this.name = ""
        this.organe = null
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.organe = null
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
            <h4 class="card-title">Listes des organes</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>organes</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom de l'organe</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(organe_, i) in organes" :key="organe_.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td><router-link :to="'/cdn/organes/'+organe_.id">{{ organe_.name }}</router-link></td>
                    <td class="hstack">
                        <b-button class="btn-sm" @click="initItem(organe_)" variant="success">
                            <i
                            class="bx bx-edit font-size-16 align-middle mx-1"
                            ></i>
                        </b-button>
                        <b-button variant="danger" @click="initItem(organe_, 'delete')" class="ms-2 btn-sm">
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
        centered
        title="Ajouter une catégorie"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div>
            <input type="text" required placeholder="Nom de l'organe" v-model="name" class="form-control">
            <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
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
        title="Modifier l'organe"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div>
            <input type="text" required placeholder="Nom de l'organe" v-model="name" class="form-control">
            <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
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
        title="Supprimer l'organe"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer l'organe <b>{{ organe?.name }}</b>
        </p>
        <p class="text-danger">Attention ! Supprimer une catégorie implique la suppression des secteurs de cette catégorie.</p>
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
