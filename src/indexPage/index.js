import 'babel-polyfill'
import { setAppId, oauthLogin } from '../common/appId'
import { load as loadLang } from '../common/lang'
import '../common/binary-ui/dropdown'

loadLang()
setAppId()
oauthLogin(() => {
  $('.show-on-load').show()
  $('.barspinner').hide()
})
