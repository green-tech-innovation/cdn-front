<script>

import Layout from "../../../layouts/main";
import appConfig from "@/app.config";
import Helper from '@/helpers/helper';

/**
 * Dashboard Component
 */
export default {
    page: {
    title: "Notifications",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  data() {
    return {
      errors: [],
      me: null,
      loading: false,
      last_password: "",
      new_password: "",
      confirm_password: "",
      error: "",
      success: "",
    };
  },
  methods: {
    setPassword() {
      this.loading = true
      this.error = ""
      this.success = ""
      let formData = new FormData()
      formData.append('last_password', this.last_password)
      formData.append('new_password', this.new_password)
      fetch(Helper.route('auth/update-password'), Helper.requestOptions("POST", formData))
      .then(response => {
          Helper.tokenChecker(response.status)
          this.status = response.status
          return response.json()
      })
      .then(data => {
        this.loading = false
        if (this.status == 200) {
          if (data.status) {
            this.last_password = ""
            this.new_password = ""
            this.confirm_password = ""
            this.success = data.message
          } else { 
            this.error = data.message
          }
        } else {
          this.errors.new_password = Helper.getError(data.data, "new_password")
          this.errors.last_password = Helper.getError(data.data, "last_password")
        }
      }).catch(error => {
        console.log(error);
        this.loading = false
      })
    },
  },
};
</script>

<template>
  <Layout>
    
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-0 fw-bold">Paramètre</h4>
          </div>
        </div>

        <div class="row m-0">
          <div class="col-lg-6 bg-light p-0">
            <div class="h-100 shadow-sm border-right p-3">
              <h5 class="text-black">Modifier votre mot de passe</h5>
              <hr class="m-0 bg-primary mb-3">
              
              <div class="alert alert-danger mb-2" v-if="error">{{ error }}</div>
            
              <div class="alert alert-success mb-2" v-if="success">{{ success }}</div>

              <form @submit.prevent="setPassword()">
                <div class="row">
                  <div class="mb-3">
                    <label for="">Mot de passe actuel</label>
                    <input type="password" required v-model="last_password" class="form-control">
                    <span class="text-danger mt-2" v-if="errors.last_password">{{ errors.last_password }}</span>
                  </div>
                  <div class="mb-3">
                    <label for="">Nouveau mot de passe</label>
                    <input type="password" required v-model="new_password" class="form-control">
                    <span class="text-danger mt-2" v-if="errors.new_password">{{ errors.new_password }}</span>
                  </div>
                  <div class="mb-3">
                    <label for="">Confirmer mot de passe</label>
                    <input type="password" required v-model="confirm_password" class="form-control">
                    <span class="text-danger mt-2" v-if="errors.confirm_password">{{ errors.confirm_password }}</span>
                    <span class="text-danger mt-2" v-if="confirm_password != '' && new_password != confirm_password">Les deux mots de passe ne sont pas identiques</span>
                  </div>
                </div>
                <div v-if="!loading">
                  <input type="submit" :disabled="!(last_password.length >= 6 && confirm_password.length >= 6 && new_password == confirm_password)" value="Modifier" class="btn btn-primary">
                </div>
                <div class="mt-3 text-center" v-else>
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        

      </div>
    </div>


  </Layout>
</template>
