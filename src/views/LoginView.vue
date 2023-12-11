<template>
  <div class="formContainer">
    <img src="@/assets/certificates-logo.svg" />
    <div class="form">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
        <el-form-item label="Usuario" required prop="user">
          <el-input v-model="form.user" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Contraseña" required prop="pass">
          <el-input v-model="form.pass" autocomplete="off" type="password" show-password />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="handleSubmitForm(ruleFormRef)">Entrar</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import router from '@/router'

const form = reactive({})

const ruleFormRef = ref()

const rules = reactive({
  user: [{ required: true, message: 'Usuario necesario', trigger: 'blur' }],
  pass: [{ required: true, message: 'Contraseña necesaria', trigger: 'blur' }]
})

const handleSubmitForm = (formEl) => {
  formEl.validate(async (valid) => {
    if (!valid) return
    fetch(`${import.meta.env.VITE_API_HOST}/login/1`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: { 'Content-type': 'application/json;charset=UTF-8' }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('token', res.messages.data.token)
          router.push('/')
        }
      })
      .catch((error) => console.log(error))
  })
}
</script>

<style scoped>
.el-form-item {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
}
.el-form-item:last-child {
  margin-bottom: 2rem;
}
.form {
  background: var(--white);
  border-radius: 10px;
  width: 100%;
  padding: 2rem;
}
.formContainer {
  max-width: 18rem;
  width: 100%;
}
.formContainer img {
  margin: 1rem 20%;
  width: 60%;
}
.footer button {
  width: 100%;
}
</style>
