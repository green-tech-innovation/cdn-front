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
    title: "Galerie",
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
      title: "Galerie",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Galerie",
          active: true,
        },
      ],
      errors: [],
      gallery: null,
      gallerys: [],
      name: "",
      entity_id_: "",
      entity_id: localStorage.getItem('entity_id'),
      is_public: false,
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('gallerys'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.gallerys = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('file', document.getElementById("file").files[0])
      fetch(Helper.route('gallerys'), Helper.requestOptions("POST", formData))
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
          this.gallerys.push(data.data)
          Swal.fire("Album ajouter !", "L'album a été enregistré avec succès.", "success");
        } else {      
            this.errors.name = Helper.getError(data.data, "name")
            this.errors.is_public = Helper.getError(data.data, "is_public")
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
      formData.append('_method', "PUT")
      formData.append('name', this.name)
      formData.append('is_public', this.is_public)
      if (document.getElementById("file1") != undefined) {
        formData.append('file', document.getElementById("file1").files[0]) 
      }
      fetch(Helper.route('gallerys/'+this.gallery.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        this.loading = false
        if (this.status == 200) {
          this.name = ""
          this.doesEditOpen = false
          this.gallerys = this.gallerys.map(i => i.id !== this.gallery.id ? i : data.data)
          Swal.fire("Album modifier !", "L'album a été modifié avec succès.", "success");
        } else {
            this.errors.name = Helper.getError(data.data, "name")
            this.errors.is_public = Helper.getError(data.data, "is_public")
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
      fetch(Helper.route('gallerys/'+this.gallery.id), Helper.requestOptions("DELETE"))
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
            this.gallerys = this.gallerys.filter(i => i.id !== this.gallery.id)
            Swal.fire("Album supprimer !", "L'album a été supprimé avec succès.", "success");
        } else {
            Swal.fire("Album non supprimer ?", "La suppression n'a pas marché, veuillez réssayez plus tard.", "error");
        }
      })
    },
    initItem(gallery, action="edit") {
        this.gallery = gallery
        this.initData(gallery)
        if (action == "delete") {
        this.doesDeleteOpen = true
        } else {
        this.doesEditOpen = true
        }
    },
    initData(item = null) {
      this.name = item != null ? item.name : ""
      this.is_public = item != null ? item.is_public : ""
      this.entity_id_ = item != null ? item.entity_id : ""
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
        this.gallery = null
        this.initData(null)
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.gallery = null
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
            <h4 class="card-title">Listes des albums</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>albums</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom de l'album</th>
                    <th>Est public</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(gallery, i) in gallerys" :key="gallery.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/cdn/gallery/'+gallery.id">{{ gallery.name }}</router-link>
                    </td>
                    <td>{{ gallery.is_public ? "Oui" : "Non" }}</td>
                    <td class="hstack">
                        <b-button class="btn-sm" @click="initItem(gallery)" variant="success">
                            <i class="bx bx-edit font-size-16 align-middle mx-1"></i>
                        </b-button>
                        <!-- <b-button variant="danger" @click="initItem(gallery, 'delete')" class="ms-2 btn-sm">
                            <i class="bx bx-trash font-size-16 align-middle mx-1"></i>
                        </b-button> -->
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
        title="Ajouter un album"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="mb-3">
                <label for="">Nom de l'album</label>
                <input type="text" required v-model="name" class="form-control">
                <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <div>
                <label for="">Album (Image principale)</label>
                <input type="file" required accept=".png, .jpg, .jpeg" id="file" class="form-control">
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


    <!-- EDIT MODAL -->
    <b-modal
        v-model="doesEditOpen"
        id="modal-center"
        centered
        title="Modifier l'album"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div class="row">
            <template v-if="entity_id_ == entity_id">
              <div class="mb-3">
                  <label for="">Nom de l'album </label>
                  <input type="text" required v-model="name" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.name">{{ errors.name }}</span>
              </div>
              <div class="mb-3">
                  <label for="">Album (Image principale, Facultatif)</label>
                  <input type="file" accept=".png, .jpg, .jpeg" id="file1" class="form-control">
                  <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
              </div>              
            </template>
            <div>
                <label for="">Statut</label>
                <select class="form-control" v-model="is_public">
                  <option value="1">Public</option>
                  <option value="0">Privée</option>
                </select>
                <span class="text-danger mt-2" v-if="errors.is_public">{{ errors.is_public }}</span>
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
        title="Supprimer l'album"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer l'album <b>{{ gallery?.name }}</b>
        </p>
        <p class="text-danger">Attention ! Supprimer un album implique la suppression de toutes ses photos et vidéos.</p>
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
