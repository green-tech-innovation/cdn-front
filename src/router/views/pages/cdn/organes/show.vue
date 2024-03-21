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
    title: "Organes",
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
      title: "Organes",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Organes",
          active: true,
        },
        {
          text: "Un organe",
          active: true,
        },
      ],
      organe: {},
      id: "",
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('organes/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.organe = data.data
      })
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

    
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listes des projets de l'organe</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>projets</code> de l'organe <code>{{ organe.name }}</code>.
            </p>

            <!-- <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom du projet</th>
                    <th>Email</th>
                    <th>Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sector, i) in organe.entities" :key="sector.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/cdn/sectors/'+sector.id">{{ sector.name }}</router-link>
                    </td>
                    <td>{{ sector.email }}</td>
                    <td>{{ sector.user.lastname +" "+sector.user.firstname }}</td>
                  </tr>
                </tbody>
              </table>
            </div> -->

          </div>
        </div>
      </div>
    </div>


  </Layout>
</template>
