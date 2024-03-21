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
    title: "Partenaires",
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
      title: "Partenaires",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Partenaires",
          active: true,
        },
      ],
      errors: [],
      categories: [],
      users: [],
      sector: {},
      patners: [],
      // category_id: "",
      user_id: "",
      name: "",
      description: "",
      type: "PATNER",
      email: "",
      phone: "",
      address: "",
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('entities?type='+this.type), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.patners = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      // formData.append('category_id', this.category_id)
      formData.append('user_id', this.user_id)
      formData.append('name', this.name)
      formData.append('phone', this.phone)
      formData.append('email', this.email)
      formData.append('address', this.address)
      formData.append('description', this.description)
      formData.append('type', this.type)
      formData.append('file', document.getElementById('file').files[0])
      fetch(Helper.route('entities'), Helper.requestOptions("POST", formData))
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
          this.patners.push(data.data)
          Swal.fire("Partenaire ajouter !", "Le partenaire a été enregistrée avec succès.", "success");
        } else {      
            console.log(Helper.getError(data.data, "user_id"));
            this.errors.category_id = Helper.getError(data.data, "category_id")
            this.errors.user_id = Helper.getError(data.data, "user_id")
            this.errors.name = Helper.getError(data.data, "name")
            this.errors.phone = Helper.getError(data.data, "phone")
            this.errors.email = Helper.getError(data.data, "email")
            this.errors.address = Helper.getError(data.data, "address")
            this.errors.description = Helper.getError(data.data, "description")
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
      // formData.append('category_id', this.category_id)
      formData.append('user_id', this.user_id)
      formData.append('name', this.name)
      formData.append('phone', this.phone)
      formData.append('email', this.email)
      formData.append('address', this.address)
      formData.append('description', this.description)
      formData.append('type', this.type)
      if (document.getElementById('file1').files[0]) {  
        formData.append('file1', document.getElementById('file').files[0])
      }
      console.log(formData.get("name"), 'id', this.sector.id);
      fetch(Helper.route('entities/'+this.sector.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log('last',this.sector);
        console.log('new',data.data);
        this.loading = false
        if (this.status == 200) {
          this.doesEditOpen = false
          this.patners = this.patners.map(i => i.id !== this.sector.id ? i : data.data)
          Swal.fire("Partenaire modifier !", "La partenaire a été modifiée avec succès.", "success");
        } else {
            this.errors.category_id = Helper.getError(data.data, "category_id")
            this.errors.user_id = Helper.getError(data.data, "user_id")
            this.errors.name = Helper.getError(data.data, "name")
            this.errors.phone = Helper.getError(data.data, "phone")
            this.errors.email = Helper.getError(data.data, "email")
            this.errors.address = Helper.getError(data.data, "address")
            this.errors.description = Helper.getError(data.data, "description")
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false
      })
    },
    deleteIt() {
      this.loading = true
      fetch(Helper.route('entities/'+this.sector.id), Helper.requestOptions("DELETE"))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.text()
      })
      .then(data => {
        console.log(this.status);
        console.log(data);
        console.log(this.sector.id);
        this.name = ""
        this.loading = false
        this.doesDeleteOpen = false
        if (this.status == 204) {
            this.patners = this.patners.filter(i => {
                console.log(i);
                i.id !== this.sector.id
            })
            Swal.fire("Partenaire supprimer !", "La partenaire a été supprimée avec succès.", "success");
        } else {
            Swal.fire("Partenaire non supprimer ?", "La suppression n'a pas marché, veuillez réessayez plus tard.", "error");
        }
        this.sector = null
      })
    },
    loadCategories() {
      fetch(Helper.route('categories'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        this.categories = data.data
      })
    },
    loadUsers() {
      fetch(Helper.route('users'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        this.users = data.data
      })
    },
    initItem(sector, action="edit") {
        this.sector = sector
        this.initData(sector)
        if (action == "delete") {
        this.doesDeleteOpen = true
        } else {
        this.doesEditOpen = true
        }
    },
    initData(item = null) {
      //this.category_id = item != null ? item.category_id : ""
      this.user_id = item != null ? item.user_id : ""
      this.name = item != null ? item.name : ""
      this.email = item != null ? item.email : ""
      this.phone = item != null ? item.phone : ""
      this.address = item != null ? item.address : ""
      this.description = item != null ? item.description : ""
    }
  },
  mounted() {
    this.loadList()
    this.loadCategories()
    this.loadUsers()
  },
  watch: {
    doesAddOpen: function() {
      this.errors = []
    },
    doesEditOpen: function() {
      this.errors = []
      if (!this.doesEditOpen) {
        this.sector = null
        this.initData(null)
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.sector = null
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
            <h4 class="card-title">Listes des partenaires</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>partenaires</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom du partenaire</th>
                    <th>Email</th>
                    <th>Responsable</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sector, i) in patners" :key="sector.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/cdn/patners/'+sector.id">{{ sector.name }}</router-link>
                    </td>
                    <td>{{ sector.email }}</td>
                    <td>
                      <router-link :to="'/cdn/users/'+sector.user.id">{{ sector.user.lastname +" "+sector.user.firstname }}</router-link>
                    </td>
                    <td class="hstack">
                        <b-button class="btn-sm" @click="initItem(sector)" variant="success">
                            <i
                            class="bx bx-edit font-size-16 align-middle mx-1"
                            ></i>
                        </b-button>
                        <b-button variant="danger" @click="initItem(sector, 'delete')" class="ms-2 btn-sm">
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
        title="Ajouter un partenaire"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
                <select required v-model="user_id" class="form-control">
                    <option value="">Selectionnez le responsable</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.lastname+" "+user.firstname }}</option>
                </select>
                <span class="text-danger mt-2" v-if="errors.user_id">{{ errors.user_id }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="text" required placeholder="Nom du partenaire" v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Logo du partenaire</label>
                <input type="file" required id="file" class="form-control">
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Email du partenaire</label>
                <input type="email" required placeholder="Email du partenaire" v-model="email" class="form-control">
                <span class="text-danger mt-2" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="tel" required placeholder="Téléphone du partenaire" v-model="phone" class="form-control">
                <span class="text-danger mt-2" v-if="errors.phone">{{ errors.phone }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="text" placeholder="Adresse du partenaire" v-model="address" class="form-control">
                <span class="text-danger mt-2" v-if="errors.address">{{ errors.address }}</span>
            </div>
            <div>
                <textarea v-model="description" placeholder="Description du partenaire" class="form-control" rows="4"></textarea>
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
        title="Modifier le partenaire"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
            <div class="row">
            <div class="col-md-6 mb-3">
                <select required v-model="user_id" class="form-control">
                    <option value="">Selectionnez le responsable</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.lastname+" "+user.firstname }}</option>
                </select>
                <span class="text-danger mt-2" v-if="errors.user_id">{{ errors.user_id }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="text" required placeholder="Nom du partenaire" v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Logo du partenaire</label>
                <input type="file" id="file1" class="form-control">
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Email du partenaire</label>
                <input type="email" required placeholder="Email du partenaire" v-model="email" class="form-control">
                <span class="text-danger mt-2" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="tel" required placeholder="Téléphone du partenaire" v-model="phone" class="form-control">
                <span class="text-danger mt-2" v-if="errors.phone">{{ errors.phone }}</span>
            </div>
            <div class="col-md-6 mb-3">
                <input type="text" placeholder="Adresse du partenaire" v-model="address" class="form-control">
                <span class="text-danger mt-2" v-if="errors.address">{{ errors.address }}</span>
            </div>
            <div>
                <textarea v-model="description" required placeholder="Description du partenaire" class="form-control" rows="4"></textarea>
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
        title="Supprimer le partenaire"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer le partenaire <b>{{ sector?.name }}</b>
        </p>
        <p class="text-danger">Attention ! Supprimer un partenaire implique la suppression de ces projets.</p>
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
