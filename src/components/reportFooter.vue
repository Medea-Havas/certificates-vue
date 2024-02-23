<script setup>
import moment from 'moment'
</script>

<template>
  <footer>
    <div class="footerContainer">
      <p>© {{ moment().format('Y') }} MEDEA Education Agency S.L.</p>
      <ul>
        <li><a class="legalLinks" href="/aviso-legal">Aviso legal</a></li>
        <li>
          <a class="legalLinks" href="/politica-de-privacidad">Política de privacidad</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--steelbluelowlight);
  color: var(--white);
}
.footerContainer {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
}
.footerContainer ul {
  align-items: center;
  display: flex;
  list-style: none;
}
.footerContainer ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.legalLinks {
  color: var(--white);
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
}
.legalLinks:hover {
  color: var(--white);
  text-decoration: none;
}
</style>
