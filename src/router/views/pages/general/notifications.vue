<script>

import Layout from "../../../layouts/main";
import appConfig from "@/app.config";
import Helper from '@/helpers/helper';

/**
 * Dashboard Component
 */
export default {
    page: {
    title: "Notifications",
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
      notifications: [],
      loading: false,
      status: 201,
    };
  },
  methods: {
    loadList() {
      fetch(Helper.route('notifications'), Helper.requestOptions())
      .then(response => {
          Helper.tokenChecker(response.status)
          return response.json()
      })
      .then(data => {
        this.notifications = data.data
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
    
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mb-0 fw-bold">Vos notifications</h4>
          </div>
        </div>

        <div class="bg-white p-4 border shadow-sm mt-3" v-for="notification in notifications" :key="notification.id">
            <h1 class="text-black font-size-15 fw-bolder mb-0">{{ notification.title }}</h1>
            <p class="mt-2 mb-0 font-size-13">
                {{ notification.content }}
            </p>
            <p class="text-end font-size-12 mb-0 text-danger">
                {{ notification.created_at }}
            </p>
        </div>
      </div>
    </div>


  </Layout>
</template>
