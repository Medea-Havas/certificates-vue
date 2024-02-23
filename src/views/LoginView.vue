<script setup>
import { reactive, ref } from 'vue'
import router from '@/router'

const ruleFormRef = ref()

const form = reactive({})
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
        } else {
          router.push('/login')
        }
      })
      .catch((error) => {
        console.log(error)
        router.push('/login')
      })
  })
}
</script>

<template>
  <div class="formContainer">
    <img src="@/assets/certificates-logo.svg" />
    <div class="form">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" require-asterisk-position="right">
        <el-form-item label="Usuario" prop="user" required>
          <el-input v-model="form.user" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Contraseña" prop="pass" required>
          <el-input v-model="form.pass" autocomplete="off" show-password type="password" />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="handleSubmitForm(ruleFormRef)" type="primary">Entrar</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-form-item {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
}
.el-form-item:last-child {
  margin-bottom: 2rem;
}
.footer button {
  width: 100%;
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
</style>
