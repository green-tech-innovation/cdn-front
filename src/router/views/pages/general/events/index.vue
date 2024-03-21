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
    title: "Evènements",
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
      title: "Evènements",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Evènements",
          active: true,
        },
      ],
      errors: [],
      evenements: [],
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('events'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.evenements = data.data
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

    
    <div class="row mt-4">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listes des évènements</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>évènements</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom </th>
                    <th>Lieu ou lien </th>
                    <th>Description </th>
                    <th>Date </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(evenement_, i) in evenements" :key="evenement_.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/events/'+evenement_.id">{{ evenement_.name }}</router-link>
                    </td>
                    <td>
                      <router-link :to="'/events/'+evenement_.id">{{ evenement_.place_link }}</router-link>
                    </td>
                    <td class="d-inline-block text-truncate" style="max-width: 350px;">{{ evenement_.description }}</td>
                    <td>{{ evenement_.date }}</td>
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
