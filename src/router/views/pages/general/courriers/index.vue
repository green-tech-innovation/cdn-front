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
    title: "Courriers",
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
      title: "Courriers",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Courriers",
          active: true,
        },
      ],
      errors: [],
      courrier: {},
      courriers: [],
      object: "",
      message: "",
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('general/courriers'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.courriers = data.data
      })
    },
    addItem() {
      this.loading = true
      this.errors = []
      let formData = new FormData()
      formData.append('object', this.object)
      formData.append('message', this.message)
      if (document.getElementById("file").files[0] != undefined) {
        formData.append('file', document.getElementById("file").files[0])
      }
      fetch(Helper.route('courriers'), Helper.requestOptions("POST", formData))
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
          this.courriers.push(data.data)
          Swal.fire("Courrier ajouter !", "Le courrier a été enregistré avec succès.", "success");
        } else {
          this.errors.object = Helper.getError(data.data, "object")
          this.errors.message = Helper.getError(data.data, "message")
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
      formData.append('object', this.object)
      formData.append('message', this.message)
      if (document.getElementById("file1").files[0] != undefined) {
        formData.append('file', document.getElementById("file1").files[0])
      }
      formData.append('_method', "PUT")
      console.log(formData.get("name"), 'id', this.courrier.id);
      fetch(Helper.route('courriers/'+this.courrier.id), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        console.log(this.status);
        console.log('last',this.courrier);
        console.log('new',data);
        this.loading = false
        if (this.status == 200) {
          this.doesEditOpen = false
          this.courriers = this.courriers.map(i => i.id !== this.courrier.id ? i : data.data)
          Swal.fire("Courrier modifier !", "Le courrier a été modifié avec succès.", "success");
        } else {
          this.errors.object = Helper.getError(data.data, "object")
          this.errors.message = Helper.getError(data.data, "message")
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
      fetch(Helper.route('courriers/'+this.courrier.id), Helper.requestOptions("DELETE"))
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
          this.courriers = this.courriers.filter(i => i.id !== this.courrier.id)
          Swal.fire("Courrier supprimer !", "Le courrier a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Courrier non supprimer ?", "La suppression n'a pas marché, veuillez réssayez plus tard.", "error");
        }
      })
    },
    initItem(courrier, action="edit") {
        this.courrier = courrier
        this.initData(courrier)
        if (action == "delete") {
          this.doesDeleteOpen = true
        } else {
          this.doesEditOpen = true
        }
    },
    initData(item = null) {
      this.object = item != null ? item.object : ""
      this.message = item != null ? item.message : ""
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
        this.courrier = null
        this.initData(null)
      }
    },
    doesDeleteOpen: function() {
      if (!this.doesDeleteOpen) {
        this.courrier = null
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
            <h4 class="card-title">Listes des courriers</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>courriers</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Objet </th>
                    <th>Message </th>
                    <th>Date </th>
                    <!-- <th>Action</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(courrier_, i) in courriers" :key="courrier_.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/courriers/'+courrier_.id">{{ courrier_.object }}</router-link>
                    </td>
                    <td class=" text-truncate" style="max-width: 350px;">{{ courrier_.message }}</td>
                    <td>{{ courrier_.created_at }}</td>
                    <!-- <td>
                        <b-button class="btn-sm d-none" @click="initItem(courrier_)" variant="success">
                            <i
                            class="bx bx-edit font-size-16 align-middle mx-1"
                            ></i>
                        </b-button>
                        <b-button variant="danger" @click="initItem(courrier_, 'delete')" class="ms-2 btn-sm">
                            <i class="bx bx-trash font-size-16 align-middle mx-1"></i>
                        </b-button>
                    </td> -->
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
        title="Ajouter un courrier"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="">Nom du courrier</label>
              <input type="text" required v-model="object" class="form-control">
              <span class="text-danger mt-2" v-if="errors.object">{{ errors.object }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="">Fichier du courrier (Facultatif)</label>
              <input type="file" id="file" class="form-control">
              <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
            </div>
          </div>
          <div>
              <label for="">Message du courrier</label>
              <textarea v-model="message" required class="form-control" rows="4"></textarea>
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
        title="Modifier le courrier"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="editItem()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="">Nom du courrier</label>
              <input type="text" required v-model="object" class="form-control">
              <span class="text-danger mt-2" v-if="errors.object">{{ errors.object }}</span>
            </div>
            <div class="col-md-6 mb-3">
              <label for="">Fichier du courrier (Facultatif)</label>
              <input type="file" id="file1" class="form-control">
              <span class="text-danger mt-2" v-if="errors.file">{{ errors.file }}</span>
            </div>
          </div>
          <div>
              <label for="">Message du courrier</label>
              <textarea v-model="message" required class="form-control" rows="4"></textarea>
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
        title="Supprimer le courrier"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer le courrier <b>{{ courrier?.name }}</b>
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
