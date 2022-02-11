<template>
  <div class="container fly-marginTop">
    <!-- <Alert :msg="'这是alert弹窗'" :isShow="true"></Alert> -->
    <div class="fly-panel fly-panel-user">
      <div class="tab">
        <ul class="tab-title">
          <li class="this">登入</li>
          <li>
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
        </ul>
        <div class="form tab-content">
          <validation-observer ref="observer" v-slot={validate}>
            <div class="tab-item">
              <div class="form-pane">
                <form>
                  <validation-provider name="email" rules="required|email" v-slot="{errors}">
                    <div class="form-item">
                      <label for="L_username" class="form-label">用户名</label>
                      <div class="input-inline">
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          autocomplete="off"
                          class="input"
                          placeholder="请输入用户名"
                        />
                        <div class="error">{{ errors[0] }}</div>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider name="password" rules="required|min:6|max:16" v-slot="{errors}">
                    <div class="form-item">
                      <label for="L_pass" class="form-label">密码</label>
                      <div class="input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          autocomplete="off"
                          class="input"
                          placeholder="请输入密码"
                        />
                      </div>
                      <div class="error">{{ errors[0] }}</div>
                    </div>
                  </validation-provider>
                  <validation-provider ref="codefield" name="code" rules="required|length:4" v-slot="{errors}">
                    <div class="form-item">
                      <label for="L_code" class="form-label">验证码</label>
                      <div class="input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          autocomplete="off"
                          class="input"
                          placeholder="请输入验证码"
                        />
                        <div class="error">{{ errors[0] }}</div>
                        <span @click="_getCode" v-html="svg" class="svg"></span>
                      </div>
                    </div>
                  </validation-provider>
                  <div class="form-item">
                    <button class="btn" @click.prevent="validate().then(submit)">立即登录</button>
                    <span style="padding-left: 20px"
                    ><router-link :to="{ name: 'forget' }"
                    >忘记密码？</router-link
                    ></span
                    >
                  </div>
                  <div class="form-item fly-form-app">
                    <span>或者使用社交帐号登入</span>
                    <a
                      href=""
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade:0.1, time:0})"
                      title="QQ登入"
                      class="fa fa-qq"
                    ></a>
                    <a
                      href=""
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade:0.1, time:0})"
                      title="微博登入"
                      class="fa fa-weibo"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import * as rules from 'vee-validate/dist/rules'
// import zh from 'vee-validate/dist/locale/zh_CN'
import { getCode, login } from '../api/login'
import { v4 as uuidv4 } from 'uuid/'
// import Alert from '../components/modules/alert/Alert'

export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
    // Alert
  },
  data () {
    return {
      username: '123456@qq.com',
      password: '1234567',
      code: '1234',
      svg: '图片'
    }
  },
  mounted () {
    // this.getCaptcha()
    window.vue = this
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    // getCaptcha () {
    //   axios.get('http://localhost:3000/getCaptcha').then((res) => {
    //     if (res.status === 200) {
    //       const obj = res.data
    //       if (obj.code === 200) {
    //         this.svg = obj.data
    //       }
    //     }
    //   })
    // },
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return false
      }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
        } else if (res.code === 401) {
          this.$refs.codefield.setErrors([res.msg])
        }
      }).catch((err) => {
        console.log('error:', err.response)
        const data = err.response.data
        if (data.code === 500) {
          this.$alert('用户名或密码校验失败，请检查！')
        } else {
          this.$alert('服务器错误')
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 30px 100px 50px 100px;
}

.tab {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fff;
}

ul {
  display: inline-block;
  padding: 20px 0 10px 0;
}

li {
  float: left;
  list-style: none;
  padding-right: 30px;
  font-size: 18px;
  font-weight: 900;
}

.this {
  color: #009688;
}

.tab-content {
  border-top: 1px solid #d3d3d3;
  padding: 15px 0;
}

.form-item {
  padding: 15px 0;
}

.form-label {
  width: 90px;
  padding-right: 30px;
  text-align: right;
  /* text-shadow: 1px 1px 3px #ddd; */
}

.input-inline {
  display: inline-block;
}

.error {
  display: inline-block;
  padding: 0 20px;
  color: #c00
}

.btn {
  background: #009688;
  color: #fff;
}

.fa-qq {
  padding: 0 20px;
}

input {
  display: inline-block;
}

</style>
<style lang="scss">
.tab-content {
  .svg {
    position: relative;
    display: inline-block;
    > svg {
      position: absolute;
      top: -20px;
      height: 28px;
      border: 1px solid #ddd;
      border-radius: 2px;
    }
  }
}
</style>
