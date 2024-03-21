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
    title: "Sondages",
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
      title: "Sondages",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Sondages",
          active: true,
        },
      ],
      survey: {},
      surveys: [],
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('general/surveys'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.surveys = data.data
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
            <h4 class="card-title">Listes des sondages</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>sondages</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom </th>
                    <th>Description </th>
                    <th>Date </th>
                    <th class="text-center">Sondage </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(survey_, i) in surveys" :key="survey_.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/surveys/'+survey_.id">{{ survey_.name }}</router-link>
                    </td>
                    <td class="text-truncate" style="max-width: 250px;">{{ survey_.description }}</td>
                    <td>{{ survey_.date }}</td>
                    <td class="text-center">{{ survey_.survey_items.length  }}</td>
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
