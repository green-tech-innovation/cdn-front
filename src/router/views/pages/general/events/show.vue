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
      title: "Evènement",
      items: [
        {
          text: "Menu",
          href: "/",
        },
        {
          text: "Evènement",
          active: true,
        },
        {
          text: "Un évènement",
          active: true,
        },
      ],
      id: "",
      event: {},
    };
  },
  methods: {
    getItem() {
      fetch(Helper.route('events/'+this.id), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        this.event = data.data
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

    
    <div class="row" v-if="event.id">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ event.name }}</h4>
            <p class="text-danger my-4">
                Date de Fin : {{ event.date }}
            </p>
            <p class="card-title-desc mb-0">
              {{ event.description }}
            </p>
            
          </div>
        </div>
      </div>
    </div>


  </Layout>
</template>
