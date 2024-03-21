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
    title: "Formulaires",
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
      title: "Formulaires",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Formulaires",
          active: true,
        },
      ],
      errors: [],
      formular: {},
      formulars: [],
      name: "",
      description: "",
      date: "",
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('formulars'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.formulars = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('date', this.date)
      fetch(Helper.route('formulars'), Helper.requestOptions("POST", formData))
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
          this.initData(null)
          this.doesAddOpen = false
          this.formulars.push(data.data)
          Swal.fire("Formulaire ajouter !", "Le formulaire a été enregistré avec succès.", "success");
        } else {
          this.errors.name = Helper.getError(data.data, "name")
          this.errors.description = Helper.getError(data.data, "description")
          this.errors.date = Helper.getError(data.data, "date")
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
      formData.append('description', this.description)
      formData.append('date', this.date)
      formData.append('_method', "PUT")
      console.log(formData.get("name"), 'id', this.formular.id);
      fetch(Helper.route('formulars/'+this.formular.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log('last',this.formular);
        console.log('new',data);
        this.loading = false
        if (this.status == 200) {
          this.doesEditOpen = false
          this.formulars = this.formulars.map(i => i.id !== this.formular.id ? i : data.data)
          Swal.fire("Formulaire modifier !", "Le formulaire a été modifié avec succès.", "success");
        } else {
          this.errors.name = Helper.getError(data.data, "name")
          this.errors.description = Helper.getError(data.data, "description")
          this.errors.date = Helper.getError(data.data, "date")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    deleteIt() {
      this.loading = true
      fetch(Helper.route('formulars/'+this.formular.id), Helper.requestOptions("DELETE"))
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
          this.formulars = this.formulars.filter(i => i.id !== this.formular.id)
          Swal.fire("Formulaire supprimer !", "Le formulaire a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Formulaire non supprimer ?", "La suppression n'a pas marché, veuillez réssayez plus tard.", "error");
        }
      })
    },
    initItem(formular, action="edit") {
        this.formular = formular
        this.initData(formular)
        if (action == "delete") {
          this.doesDeleteOpen = true
        } else {
          this.doesEditOpen = true
        }
    },
    initData(item = null) {
      this.name = item != null ? item.name : ""
      this.description = item != null ? item.description : ""
      this.date = item != null ? item.date : ""
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
        this.formular = null
        this.initData(null)
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.formular = null
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
            <h4 class="card-title">Listes des formulaires</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>formulaires</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom </th>
                    <th>Description </th>
                    <th>Date </th>
                    <th class="text-center">Questions </th>
                    <th class="text-center">Peux répondre </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(formular_, i) in formulars" :key="formular_.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/cdn/formulars/'+formular_.id">{{ formular_.name }}</router-link>
                    </td>
                    <td class="text-truncate" style="max-width: 250px;">{{ formular_.description }}</td>
                    <td>{{ formular_.date }}</td>
                    <td class="text-center">{{ formular_.formular_quizzes.length  }}</td>
                    <td class="text-center">{{ formular_.can_submit ? "Oui" : "Non" }}</td>
                    <td class="hstack">
                        <b-button class="btn-sm" @click="initItem(formular_)" variant="success">
                            <i
                            class="bx bx-edit font-size-16 align-middle mx-1"
                            ></i>
                        </b-button>
                        <b-button variant="danger" @click="initItem(formular_, 'delete')" class="ms-2 btn-sm">
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
        size="lg"
        title="Ajouter un formulaire"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="">Nom du formulaire</label>
              <input type="text" required v-model="name" class="form-control">
              <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="">Date de Fin d'envoie de réponse</label>
              <input type="datetime-local" required v-model="date" class="form-control">
              <span class="text-danger mt-2" v-if="errors.date">{{ errors.date }}</span>
            </div>
          </div>
          <div>
              <label for="">Description du formulaire</label>
              <textarea v-model="description" required class="form-control" rows="4"></textarea>
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
        title="Modifier le formulaire"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="">Nom du formulaire</label>
              <input type="text" required v-model="name" class="form-control">
              <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="">Date de Fin d'envoie de réponse</label>
              <input type="datetime-local" required v-model="date" class="form-control">
              <span class="text-danger mt-2" v-if="errors.date">{{ errors.date }}</span>
            </div>
          </div>
          <div>
              <label for="">Description du formulaire</label>
              <textarea v-model="description" required class="form-control" rows="4"></textarea>
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
        title="Supprimer le formulaire"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer le formulaire <b>{{ formular?.name }}</b>
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
