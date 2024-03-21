<script>
import Helper from '@/helpers/helper';

import Layout from "../../layouts/auth";
import appConfig from "@/app.config";

import { required, email, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

/**
 * Forgot Password component
 */
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Please enter valid email", email),
    },
  },
  page: {
    title: "Forgot Password",
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
      email: "emailagentcdn@gmail.com",
      submitted: false,
      tryingToReset: false,
      isResetError: false,
      error: "",
      success: ""
    };
  },
  methods: {
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        this.success = null
        this.error = null
        let registerFormData = new FormData()
        registerFormData.append('email', this.email)

        fetch(Helper.route('auth/forgot-password'), Helper.requestOptions("POST", registerFormData))
        .then(response => {
            return response.json()
        })
        .then(data => {
          console.log(data);
          if (data.status == false) {
            this.error = data.message
          } else {
            this.success = data.message
          }
        })
        .catch(error => {
            console.log(error)
        });
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Mot de passe oublié</h5>
                  <p>Réinitialiser votre mot de passe.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                  src="@/assets/images/profile-img.png"
                  alt
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>

            

            <div class="p-2">
            
              <div class="alert alert-danger" v-if="error">{{ error }}</div>
            
              <div class="alert alert-success" v-if="success">{{ success }}</div>
              
              <form @submit.prevent="tryToReset">
                <div class="mb-4">
                  <label for="useremail">Email</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="useremail"
                    placeholder="Enter email"
                    :class="{ 'is-invalid': submitted && v$.email.$errors }"
                  />
                  <div
                    v-for="(item, index) in v$.email.$errors"
                    :key="index"
                    class="invalid-feedback"
                  >
                    <span v-if="item.$message">{{ item.$message }}</span>
                  </div>
                </div>

                <div class="mb-3 row mb-0">
                  <div class="col-12 text-end">
                    <button class="btn w-100 btn-primary w-md" type="submit">
                      Réitnitialiser
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Vous vous rappellez déjà ?
            <router-link to="/login" class="fw-medium text-primary"
              >Se connecter</router-link
            >
          </p>
          <p>
            © {{ new Date().getFullYear() }} CDN. Créer avec
            <i class="mdi mdi-heart text-danger"></i> par <a target="_blank" href="https://green-tech-innovation.com/">Green Tech Innovation</a>
          </p>
        </div>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
