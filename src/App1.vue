<template>
  <div id="app">
    <div class="container">
      <!-- :class="{'form-group--error': $v.$invalid}" -->
      <form class="form-horizontal">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">手机/邮箱</label>
          <validation-provider name="用户名"  rules="required|email" v-slot="{errors}">
            <div class="col-sm-10">
              <input
              type="text"
              name="name"
              v-model.trim="name"
              class="form-control  inline"
              id="inputEmail3"
              placeholder="Email"
              />
              <div class="error style">{{errors[0]}}</div>
            </div>
          </validation-provider>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="inputPassword3"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">验证码</label>
          <div class="col-sm-10">
            <input
              type="text"
              v-model="code"
              class="form-control inline"
              id="inputPassword3"
              placeholder="Password"
            />
            <!-- v-html="svg" @click="getCaptcha" -->
            <div class="svg style" >图片</div>
          </div>
        </div>
        <div class="form-group">
          <div class="button-wrap">
            <button class="btn btn-success" type="button" @click="checkForm">点击登录</button>
          </div>
          <a class="imooc-link" href="https://www.baidu.com/" role="button">忘记密码</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'

for (const rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: zh.messages[rule]
  })
}

export default {
  name: 'app',
  components: {
    ValidationProvider
  },
  data () {
    return {
      svg: '',
      name: '',
      password: '',
      code: '',
      errorMsg: []
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      // axios.get('http://……').then((res) => {
      //   console.log(res)
      //   if (res.status === 200) {
      //     const obj = res.data
      //     if (obj.code === 200) {
      //       this.svg = obj.data
      //     }
      //   }
      // })
    },
    checkForm () {
      this.errorMsg = []
      // regex Email
      if (!this.name) {
        this.errorMsg.push('登录名为空!')
      }
      if (!this.password) {
        this.errorMsg.push('密码不得为空!')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}
.container {
  padding: 10px;
  background: #fff;
}
input {
  width: 200px;
}
.style {
  display: inline-block;
  padding: 0 30px;
}
.inline {
  display: inline-block;
}
.button-wrap {
  display: inline-block;
  padding: 0 15px 0 98px;
}
.imooc-link {
  padding: 0 15px;
  &:hover {
    color: #5cb85c;
  }
}
.error {
  color: red
}
</style>
