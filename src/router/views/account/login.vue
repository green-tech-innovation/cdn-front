<script>
import Helper from '@/helpers/helper';
import { useUserStore } from '@/store/user';

import Layout from "../../layouts/auth";

import appConfig from "@/app.config";
import { required, email, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

/**
 * Login component
 */
export default {
  setup() {
    return { v$: useVuelidate(), store: useUserStore() };
  },
  page: {
    title: "Login",
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
      email: "emailagentcdn@gmail.com",//"vinceles.so.n@gmail.com",
      password: "123456",
      type: "CDN",//"SECTOR",
      loading: false,
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Please enter valid email", email),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
    },
    type: {
      required: helpers.withMessage("type is required", required),
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods: {
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        this.authError = null
        let registerFormData = new FormData()
        registerFormData.append('email', this.email)
        registerFormData.append('password', this.password)
        registerFormData.append('type', this.type)

        fetch(Helper.route('auth/login'), Helper.requestOptions("POST", registerFormData))
        .then(response => {
            return response.json()
        })
        .then(data => {
          console.log(data);
          if (data.status == false) {
            this.authError = data.message
          } else {
              localStorage.setItem(Helper.CLIENT_TOKEN, data.token)
              localStorage.setItem(Helper.WHO_CONNECTED, this.type)
              localStorage.setItem("entity_id", data.entity.id)
              this.store.setUser(data.user)
              if (this.type == "CDN") {
                this.$router.push({name: "cdn_sectors"})
              } else if(this.type == "SECTOR") {
                this.$router.push({name: "sector_projects"})
              } else {
                this.$router.push({name: "patner_projects"})
              }      
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
                  <h5 class="text-primary">Heureux de vous revoir !</h5>
                  <p>Connectez-vous à CDN.</p>
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
            
            <div class="alert alert-danger" v-if="authError">{{ authError }}</div>
            <div
              v-if="notification.message"
              :class="'alert ' + notification.type"
            >
              {{ notification.message }}
            </div>

            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                label="Email"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="email"
                  type="text"
                  placeholder="Entrez votre email"
                  :class="{
                    'is-invalid': submitted && v$.email.$error,
                  }"
                ></b-form-input>

                <div
                  v-for="(item, index) in v$.email.$errors"
                  :key="index"
                  class="invalid-feedback"
                >
                  <span v-if="item.$message">{{ item.$message }}</span>
                </div>
              </b-form-group>

              <b-form-group
                class="mb-3"
                id="input-group-2"
                label="Mot de passe"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  :class="{
                    'is-invalid': submitted && v$.password.$error,
                  }"
                ></b-form-input>
                <div
                  v-if="submitted && v$.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="v$.password.required.$message">{{
                    v$.password.required.$message
                  }}</span>
                </div>
              </b-form-group>

              <b-form-group
                class="mb-3"
                id="input-group-3"
                label="Se connecter en tant que"
                label-for="input-3"
              >
                <b-form-select class="form-select mb-3" required v-model="type">
                  <b-form-select-option value="CDN">CDN</b-form-select-option>
                  <b-form-select-option value="SECTOR">Secteur</b-form-select-option>
                  <b-form-select-option value="PATNER">Partenaire</b-form-select-option>
                </b-form-select>

                <div
                    v-if="submitted && v$.type.$error"
                    class="invalid-feedback"
                  >
                  <span v-if="v$.type.required.$message">{{
                    v$.type.required.$message
                  }}</span>
                </div>
              </b-form-group>

              <div class="mt-3 d-grid" v-if="!loading">
                <b-button type="submit" variant="primary" class="btn-block">Se connecter</b-button>
              </div>
              <div class="mt-3 text-center" v-else>
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div class="mt-4 text-center">
                <router-link to="/forgot-password" class="text-muted">
                  <i class="mdi mdi-lock me-1"></i> Mot de passe oublié ?
                </router-link>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-1 text-center">
          <p>
            © {{ new Date().getFullYear() }} CDN. Créer avec
            <i class="mdi mdi-heart text-danger"></i> par <a target="_blank" href="https://green-tech-innovation.com/">Green Tech Innovation</a>
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>