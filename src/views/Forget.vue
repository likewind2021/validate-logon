<template>
  <div class="container fly-marginTop">
    <div class="fly-panel fly-panel-user">
      <div class="tab">
        <ul class="tab-title">
          <li><router-link :to="{name: 'login'}">登入</router-link></li>
          <li class="this">找回密码</li>
        </ul>
        <div class="form tab-content" >
          <div class="tab-item">
            <div class="form-pane">
              <form>
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
                  <button class="btn" @click.prevent="submit">提交</button>
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
import { getCode, forget } from '../api/login'

// for (const rule in rules) {
//   extend(rule, {
//     ...rules[rule],
//     message: zh.messages[rule]
//   })
// }

export default {
  name: 'forget',
  components: {
    ValidationProvider
  },
  data () {
    return {
      username: '',
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
    },
    submit () {
      forget({
        username: this.username,
        code: this.code
      }).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          alert('邮件发送成功')
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
  /* margin-left: -40px; */
  padding: 20px 0 10px 30px;
}
li {
  float: left;
  list-style: none;
  padding-right: 30px;
  font-size: 18px;
  font-weight: 900;
}
.tab-content {
  border-top: 1px solid #d3d3d3;
  padding: 15px 0;
}
.this {
  color: #009688;
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
  padding-left: 20px;
}
.error {
  display: inline-block;
  padding: 0 20px;
  color: #c00
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
