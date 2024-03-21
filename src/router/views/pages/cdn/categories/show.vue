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
    title: "Categories",
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
      title: "Catégories",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Catégories",
          active: true,
        },
        {
          text: "Une catégorie",
          active: true,
        },
      ],
      category: {},
      id: "",
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('categories/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log(data.data);
        this.category = data.data
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
            <h4 class="card-title">Listes des secteurs de la catégorie</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>secteurs</code> de la catégorie <code>{{ category.name }}</code>.
            </p>

            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom du secteur</th>
                    <th>Email</th>
                    <th>Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sector, i) in category.entities" :key="sector.id">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>
                      <router-link :to="'/cdn/sectors/'+sector.id">{{ sector.name }}</router-link>
                    </td>
                    <td>{{ sector.email }}</td>
                    <td>{{ sector.user.lastname +" "+sector.user.firstname }}</td>
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
