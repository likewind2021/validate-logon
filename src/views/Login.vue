<template>
  <div class="container fly-marginTop">
    <div class="fly-panel fly-panel-user">
      <div class="tab">
        <ul class="tab-title">
          <li class="this">登入</li>
          <li><router-link :to="{ name: 'reg' }">注册</router-link></li>
        </ul>
        <div class="form tab-content">
          <div class="tab-item">
            <div class="form-pane">
              <form method="post">
                <validation-provider name="email"  rules="required|email" v-slot="{errors}">
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
                    </div>
                  </div>
                </validation-provider>
                <validation-provider name="password"  rules="required|min:6" v-slot="{errors}">
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
                  <button class="btn">立即登录</button>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
// import * as rules from 'vee-validate/dist/rules'
// import zh from 'vee-validate/dist/locale/zh_CN'
import { getCode } from '../api/login'

// for (const rule in rules) {
//   extend(rule, {
//     ...rules[rule],
//     message: zh.messages[rule]
//   })
// }

export default {
  name: 'login',
  components: {
    ValidationProvider
  },
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: '图片'
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      getCode().then((res) => {
        if (res.code === 200) {
          this.svg = res.data
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
  color: #009966;
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
  background: #009966;
  color: #fff;
}
.fa-qq {
  padding: 0 20px;
}
input {
  display: inline-block;
}
</style>
