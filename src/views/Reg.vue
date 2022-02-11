<template>
  <div class="container fly-marginTop">
    <div class="fly-panel fly-panel-user">
      <div class="tab">
        <ul class="tab-title">
          <li><router-link :to="{name: 'login'}">登入</router-link></li>
          <li class="this">注册</li>
        </ul>
        <div class="form tab-content" >
          <validation-observer  ref="observer" v-slot={validate}>
            <div class="tab-item">
              <div class="form-pane">
                <form>
                  <validation-provider name="username"  rules="required|email" v-slot="{errors}">
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
                        <div class="error">{{errors[0]}}</div>
                        <div class="form-mid" style="color: #888;">将会成为您唯一的登入名</div>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider name="nickname"  rules="required|min:4|nickname" v-slot="{errors}">
                    <div class="form-item">
                      <label for="L_nickname" class="form-label">昵称</label>
                      <div class="input-inline">
                        <input
                          type="text"
                          name="nickname"
                          v-model="nickname"
                          autocomplete="off"
                          class="input"
                          placeholder="请输入昵称"
                        />
                        <div class="error">{{errors[0]}}</div>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider name="password"  rules="required|min:6|max:16" vid="confirmation" v-slot="{errors}">
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
                      <div class="error">{{errors[0]}}</div>
                      <div class="form-mid" style="color: #888;">6到16个字符</div>
                    </div>
                  </validation-provider>
                  <validation-provider name="repass"  rules="required|confirmed:confirmation" v-slot="{errors}">
                    <div class="form-item">
                      <label for="L_repass" class="form-label">确认密码</label>
                      <div class="input-inline">
                        <input
                          type="password"
                          name="repass"
                          v-model="repass"
                          autocomplete="off"
                          class="input"
                          placeholder="请确认密码"
                        />
                      </div>
                      <div class="error">{{errors[0]}}</div>
                    </div>
                  </validation-provider>
                  <validation-provider name="code"  rules="required|length:4" v-slot="{errors}">
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
                        <div class="error">{{errors[0]}}</div>
                        <span @click="_getCode" v-html="svg" class="svg"></span>
                      </div>
                    </div>
                  </validation-provider>
                  <div class="form-item">
                    <button class="btn" @click.prevent="validate().then(submit)">立即注册</button>
                  </div>
                  <div class="form-item fly-form-app">
                    <span>或者直接使用社交帐号快捷注册</span>
                    <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade:0.1, time:0})"
                    title="QQ登入" class="fa fa-qq"></a>
                    <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade:0.1, time:0})"
                    title="微博登入" class="fa fa-weibo"></a>
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
import { getCode, reg } from '../api/login'

// for (const rule in rules) {
//   extend(rule, {
//     ...rules[rule],
//     message: zh.messages[rule]
//   })
// }

export default {
  name: 'reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '123456@qq.com',
      nickname: 'aaaa',
      password: '1234567',
      repass: '1234567',
      code: '1234',
      svg: '图片'
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      console.log(sid)
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
      reg({
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.nickname = ''
          this.password = ''
          this.repass = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登陆页面 让用户登录
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('./login')
          }, 1000)
        } else {
          // username -> '用户名已注册'
          // reg.msg = {username: [], nickname: [], code: []}
          this.$refs.observer.setErrors(res.msg)
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
ul {
  display: inline-block;
  margin-left: -140px;
  padding: 20px 0 10px 0;
}
li {
  float: left;
  list-style: none;
  padding-right: 30px;
  font-size: 18px;
  font-weight: 900;
}
.tab {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #fff;
}
.this {
  color: #009688;
}
.tab-content {
  padding: 15px 0;
  border-top: 1px solid #d3d3d3;
}
.btn {
  background: #009688;
  color: #fff;
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
.form-mid {
  display: inline-block;
}
.error {
  display: inline-block;
  padding: 0 20px;
  color: #c00
}
.fa-qq {
  padding: 0 20px;
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
