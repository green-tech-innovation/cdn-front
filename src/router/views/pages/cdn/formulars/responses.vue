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
    title: "Evènement",
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
      title: "Formulaire",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Formulaire",
          active: true,
        },
        {
          text: "Une question",
          active: true,
        },
      ],
      formular_quiz: {},
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('formular-quizzes/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        console.log('formular_quiz', data.data);
        this.formular_quiz = data.data
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
            <h4 class="card-title">Listes des réponses de la question</h4>
            <p class="card-title-desc">
              Le tableau ci-dessous présente la listes des <code>réponses</code> de la question <code>{{ formular_quiz.quiz }}</code>.
            </p>
            

            <div>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Entité</th>
                                <th>Réponse</th>
                                <th>Date de réponse</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(formular_response, i) in formular_quiz.formular_responses" :key="formular_response.id">
                                <th scope="row">{{ i + 1 }}</th>
                                <td>
                                    <router-link :to="'/cdn/patners/'+formular_response.entity.id" v-if="formular_response.entity.type == 'PATNER'">{{ formular_response.entity.name }}</router-link>
                                    <router-link :to="'/cdn/sectors/'+formular_response.entity.id" v-else>{{ formular_response.entity.name }}</router-link>
                                </td>
                                <td>{{ formular_response.response }}</td>
                                <td>{{ formular_response.created_at }}</td>
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
