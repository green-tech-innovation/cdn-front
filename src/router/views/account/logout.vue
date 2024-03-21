<script>
import Helper from '@/helpers/helper';
import router from '../../index'
export default {
  created() {
        localStorage.removeItem(Helper.CLIENT_TOKEN)
        localStorage.removeItem(Helper.WHO_CONNECTED)
        router.push('/login'); 
  }
}
</script>