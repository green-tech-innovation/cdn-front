<script>
import Layout from "../../../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import Helper from '@/helpers/helper';



/**
 * Dashboard Component
 */
export default {
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
      fetch(Helper.route('general/formulars'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.formulars = data.data
      })
    },
  },
  mounted() {
    this.loadList()
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    
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
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(formular_, i) in formulars" :key="formular_.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/formulars/'+formular_.id">{{ formular_.name }}</router-link>
                    </td>
                    <td class="text-truncate" style="max-width: 250px;">{{ formular_.description }}</td>
                    <td>{{ formular_.date }}</td>
                    <td class="text-center">{{ formular_.formular_quizzes.length  }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


  </Layout>
</template>
