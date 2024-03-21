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
    title: "Sondage",
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
      title: "Sondage",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Sondage",
          active: true,
        },
        {
          text: "Un Sondage",
          active: true,
        },
        {
          text: "Les votans",
          active: true,
        },
      ],
      survey_item: {},
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('survey-items/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log('survey_item', data.data);
        this.survey_item = data.data
      })
    },
  },
  mounted() {
    this.id = this.$route.params.id
    this.getItem()
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Listes des votants du sondage</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>votants</code> du sondage <code>{{ survey_item.item }}</code>.
            </p>
            

            <div>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Option</th>
                                <th>Date de vote</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(survey_vote, i) in survey_item.survey_votes" :key="survey_vote.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link :to="'/cdn/patners/'+survey_vote.entity.id" v-if="survey_vote.entity.type == 'PATNER'">{{ survey_vote.entity.name }}</router-link>
                                    <router-link :to="'/cdn/sectors/'+survey_vote.entity.id" v-else>{{ survey_vote.entity.name }}</router-link>
                                </td>
                                <td>{{ survey_vote.created_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>
