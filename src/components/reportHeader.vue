<template>
  <div className="sectionHeader">
    <h1>
      Secretaría técnica de programas de formación <br />
      médica continuada
    </h1>
  </div>
</template>

<style>
.sectionHeader {
  flex-shrink: 0;
  max-width: 1600px;
}
.sectionHeader h1 {
  color: var(--blue);
  font-size: var(--lg);
  line-height: 1.5;
  margin: 3rem 0;
  text-align: center;
}
.sectionHeader h1 br {
  display: none;
}
@media (min-width: 400px) {
  .sectionHeader h1 br {
    display: block;
  }
}
</style>
