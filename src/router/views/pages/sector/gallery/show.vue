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
        const doesDeleteOpen = ref(false);
        const doesShowOpen = ref(false)

        return {
            doesAddOpen,
            doesDeleteOpen,
            doesShowOpen
        };
    },
    page: {
    title: "Galérie",
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
      title: "Galérie",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Galérie",
          active: true,
        },
        {
          text: "Un Album",
          active: true,
        },
      ],
      errors: [],
      gallery: {},
      gallery_file: [],
      loading: false,
      id: "",
      STORAGE_URL: Helper.STORAGE_URL,
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('sector/gallerys/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.gallery = data.data
      })
    },
    addItem() {
        this.loading = true
        this.errors = []
        let formData = new FormData()
        formData.append('gallery_id', this.id)
        formData.append('file', document.getElementById("file").files[0])
        fetch(Helper.route('gallery-files'), Helper.requestOptions("POST", formData))
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
            this.gallery.gallery_files.push(data.data)
            Swal.fire("Fichier ajouter !", "Le fichier a été enregistré avec succès.", "success");
            } else {
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
      fetch(Helper.route('gallery-files/'+this.gallery_file.id), Helper.requestOptions("DELETE"))
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
          this.gallery.gallery_files = this.gallery.gallery_files.filter(i => i.id !== this.gallery_file.id)
          Swal.fire("Fichier supprimer !", "Le fichier a été supprimé avec succès.", "success");
        } else {
          Swal.fire("Fichier non supprimer ?", "La suppression n'a pas marché, veuillez réssayez plus tard.", "error");
        }
      })
    },
    initItem(gallery_file, action="edit") {
        this.gallery_file = gallery_file
        if (action == "delete") {
          this.doesDeleteOpen = true
        } else {
          this.doesShowOpen = true
        }
    },
  },
  mounted() {
    this.id = this.$route.params.id
    this.getItem()
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="hstack mb-3" v-if="gallery.id">
        <b-button variant="primary" @click="doesAddOpen = true" class="ms-auto">
            <i class="bx bx-plus font-size-16 align-middle me-2"></i>
            Ajouter un nouveau
        </b-button>
    </div>
    
    <div class="row" v-if="gallery.id">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listes des photos et vidéos de l'album </h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>photos et vidéos</code> de l'album <code>{{ gallery.name }}</code>.
            </p>

            <div class="row bg-light g-3 pb-3 px-1">
                <div class="col-lg-3 col-md-4 col-sm-6" v-for="(gallery_file) in gallery.gallery_files" :key="gallery_file.id">
                    <div class="bg-white p-2 rounded">
                        <img :src="STORAGE_URL+gallery_file.file" @click="initItem(gallery_file)" type="button" class="w-100 rounded" style="height: 150px; object-fit: cover;" alt="">
                        <b-button variant="danger" @click="initItem(gallery_file, 'delete')" class="mt-2 w-100 btn-sm">
                            <i class="bx bx-trash font-size-16 align-middle mx-1"></i>
                        </b-button>
                    </div>
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
        title="Ajouter un fichier"
        title-class="font-18"
        hide-footer
        >
        <form @submit.prevent="addItem()">
            <div class="">
                <label for="">Fichier(s)</label>
                <input type="file" multiple accept=".png, .jpg, .jpeg, .mp4, .avi" required id="file" class="form-control">
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

    <!-- SHOW MODAL -->
    <b-modal
        v-model="doesShowOpen"
        id="modal-center"
        title-class="font-18"
        hide-footer
        >
        <img :src="STORAGE_URL+gallery_file.file" class="w-100 rounded" alt="">
    </b-modal>

    <!-- DELETE MODAL -->
    <b-modal
        v-model="doesDeleteOpen"
        id="modal-center"
        title="Supprimer le fichier"
        title-class="font-18"
        hide-footer
        >
        <p class="mb-2">
            Voulez-vous vraiment supprimer ce fichier ?
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
