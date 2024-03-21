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
    title: "Categories",
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
      title: "Personnels",
      items: [
        {
          text: "Définition",
        },
        {
          text: "Personnels",
          active: true,
        },
      ],
      errors: [],
      user: {},
      users: [],
      lastname: "",
      firstname: "",
      email: "",
      sex: "",
      phone: "",
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('users'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.users = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('lastname', this.lastname)
      formData.append('firstname', this.firstname)
      formData.append('sex', this.sex)
      formData.append('email', this.email)
      formData.append('phone', this.phone)
      fetch(Helper.route('users'), Helper.requestOptions("POST", formData))
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
          this.users.push(data.data) 
          Swal.fire("Personnel ajouter !", "Le personnel a été enregistré avec succès.", "success");
        } else {
          // this.errors.lastname = data?.data?.lastname[0]
          // this.errors.firstname = data?.data?.firstname[0]
          this.errors.email = data?.data?.email[0]
          this.errors.sex = data.data?.sex[0]
          this.errors.phone = data?.data?.phone[0]
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
      formData.append('lastname', this.lastname)
      formData.append('firstname', this.firstname)
      formData.append('sex', this.sex)
      formData.append('email', this.email)
      formData.append('phone', this.phone)
      formData.append('_method', "PUT")
      console.log(formData.get("name"), 'id', this.user.id);
      fetch(Helper.route('users/'+this.user.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log('last',this.user);
        console.log('new',data.data);
        this.loading = false
        if (this.status == 200) {
          this.name = ""
          this.doesEditOpen = false
          this.users = this.users.map(i => i.id !== this.user.id ? i : data.data)
          Swal.fire("Personnel modifier !", "Le personnel a été modifié avec succès.", "success");
        } else {
          this.errors.lastname = data?.data?.lastname[0]
          this.errors.firstname = data?.data?.firstname[0]
          this.errors.email = data?.data?.email[0]
          this.errors.sex = data?.data?.sex[0]
          this.errors.phone = data?.data?.phone[0]
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    deleteIt() {
      this.loading = true
      fetch(Helper.route('users/'+this.user.id), Helper.requestOptions("DELETE"))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.text()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        if (this.status == 204) {
          this.users = this.users.filter(i => i.id !== this.user.id)
          this.name = ""
          this.loading = false
          this.user = null
          this.doesDeleteOpen = false
          Swal.fire("Personnel supprimer !", "Le personnel a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Personnel non supprimer ?", "La suppression n'a pas marché, veuillez réessayez plus tard.", "error");
        }
      })
    },
    initItem(user, action="edit") {
      this.user = user
      console.log('init', this.user);
      this.lastname = user.lastname
      this.firstname = user.firstname
      this.email = user.email
      this.phone = user.phone
      this.sex = user.sex
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
        this.lastname = ""
        this.firstname = ""
        this.email = ""
        this.phone = ""
        this.sex = ""
        this.user = null
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.lastname = ""
        this.firstname = ""
        this.email = ""
        this.phone = ""
        this.sex = ""
        this.user = null
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
            <h4 class="card-title">Listes des personnels</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>personnels</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Sexe</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, i) in users" :key="user.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.sex }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td class="hstack">
                        <router-link :to="'/cdn/users/'+user.id">
                          <b-button class="btn-sm" variant="info">
                              <i class="bx bx-bullseye font-size-16 align-middle mx-1"></i>
                          </b-button>
                        </router-link>
                        <b-button class="btn-sm ms-2" @click="initItem(user)" variant="success">
                            <i class="bx bx-edit font-size-16 align-middle mx-1"></i>
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
        title="Ajouter un personnel"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="text" placeholder="Nom de Famille" required v-model="lastname" class="form-control">
              <span class="text-danger mt-2" v-if="errors.lastname">{{ errors.lastname }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" required placeholder="Prénom(s)" v-model="firstname" class="form-control">
              <span class="text-danger mt-2" v-if="errors.firstname">{{ errors.firstname }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <select v-model="sex" required class="form-control">
                <option value="">Selectionner le Sexe</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
              </select>
              <span class="text-danger mt-2" v-if="errors.firstname">{{ errors.firstname }}</span>
            </div>
            <div class="col-md-6">
              <input type="email" required placeholder="Email" v-model="email" class="form-control">
              <span class="text-danger mt-2" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="col-md-6">
              <input type="tel" required placeholder="Téléphone" v-model="phone" class="form-control">
              <span class="text-danger mt-2" v-if="errors.phone">{{ errors.phone }}</span>
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
        title="Modifier le personnel"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <input type="text" placeholder="Nom de Famille" required v-model="lastname" class="form-control">
              <span class="text-danger mt-2" v-if="errors.lastname">{{ errors.lastname }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <input type="text" required placeholder="Prénom(s)" v-model="firstname" class="form-control">
              <span class="text-danger mt-2" v-if="errors.firstname">{{ errors.firstname }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <select v-model="sex" required class="form-control">
                <option value="">Selectionner le Sexe</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
              </select>
              <span class="text-danger mt-2" v-if="errors.firstname">{{ errors.firstname }}</span>
            </div>
            <div class="col-md-6">
              <input type="email" required placeholder="Email" v-model="email" class="form-control">
              <span class="text-danger mt-2" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="col-md-6">
              <input type="tel" required placeholder="Téléphone" v-model="phone" class="form-control">
              <span class="text-danger mt-2" v-if="errors.phone">{{ errors.phone }}</span>
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
