<script>
import SimpleLogin from './components/SimpleLogin'
// import ProLogin from './components/ProLogin'
// import MultipleLogin from './components/MultiLogin'
import config from '@/config/defaultSettings'
export default {
  name: 'Login',
  components: { SimpleLogin },
  beforeCreate () {
  },
  render () {
    return (
      config.pageOption.loginMode === 'simple' ? (<SimpleLogin />) : (<span></span>)
    )
  }
}
</script>
