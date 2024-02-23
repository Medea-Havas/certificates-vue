<script setup>
import ReportHeader from '../components/reportHeader.vue'
import ReportFooter from '../components/reportFooter.vue'

const goBack = () => {
  window.history.back()
}
</script>

<template>
  <ReportHeader />
  <div class="navigation">
    <el-button @click="goBack">Volver</el-button>
  </div>
  <main id="legal">
    <div class="container">
      <h1>AVISO LEGAL</h1>
      <h2>INTRODUCCIÓN</h2>
      <p>
        En esta página se describen las condiciones legales aplicables a todos los usuarios que
        accedan a este Sitio Web. Al visitar este Sitio Web usted acepta cumplir estas condiciones
        sin reservas. Le aconsejamos consultar regularmente estas condiciones, ya que pueden ser
        modificadas sin previo aviso. Esta modificación será publicada de forma visible en este
        Sitio Web, indicando la fecha de la última actualización en la parte inferior de esta
        política.
      </p>
      <h2>CONTENIDO.</h2>
      <ol class="menu">
        <li>
          <a href="#section01" class="link">Datos de la compañía</a>
        </li>
        <li>
          <a href="#section02" class="link">Condiciones de uso de la plataforma </a>
        </li>
        <li>
          <a href="#section03" class="link">Naturaleza de la información</a>
        </li>
        <li>
          <a href="#section04" class="link">Política de Privacidad</a>
        </li>
        <li>
          <a href="#section05" class="link">Exclusión de responsabilidades</a>
        </li>
        <li>
          <a href="#section06" class="link">Enlaces a otros sitios web</a>
        </li>
        <li>
          <a href="#section07" class="link">Disponibilidad del Sitio web</a>
        </li>
        <li>
          <a href="#section08" class="link">Propiedad intelectual</a>
        </li>
        <li>
          <a href="#section09" class="link">Información sobre productos</a>
        </li>
        <li>
          <a href="#section10" class="link"> Ley y jurisdicción</a>
        </li>
      </ol>
      <section id="section01">
        <header>1. Datos de la compañía</header>
        <p class="padleft">
          <b>• Titular: MEDEA Education Agency, S.L.</b>
          , (en adelante “
          <b>MEDEA</b>
          ”).
          <br />
          <b>• Domicilio social:</b>

          Calle Eloy Gonzalo, 10 CP 28010 Madrid.
          <br />
          <b>• NIF:</b>

          B-82660697.
          <br />
          <b>• E-mail: </b>
          <a href="mailto:gdpr.spain@havasmg.com" target="_blank" rel="noopener"
            >gdpr.spain@havasmg.com</a
          >
          .
        </p>
      </section>
      <section id="section02">
        <header>2. Condiciones de uso de la plataforma</header>
        <p>
          No está permitido y, por tanto, sus consecuencias serán de exclusiva responsabilidad del
          Usuario, el acceso o la utilización del Sitio Web con fines ilegales o no autorizados, con
          o sin finalidad económica, y más específicamente, con carácter enunciativo, pero no
          limitativo, queda prohibido:
        </p>
        <ol>
          <li>
            Usar el Sitio Web en forma alguna que pueda provocar daños, interrupciones,
            ineficiencias o defectos en su funcionalidad o en el ordenador de un tercero.
          </li>
          <li>
            Usar el Sitio Web para la transmisión, la instalación o la publicación de cualquier
            virus, código malicioso u otros programas o archivos perjudiciales.
          </li>
          <li>Usar el Sitio Web para recoger datos de carácter personal de otros usuarios.</li>
          <li>
            Registrarse o comunicarse con MEDEA a través del Sitio Web con una identidad falsa,
            aportando datos o informaciones falsas, suplantando a terceros o realizando cualquier
            otra acción que pueda confundir a otros usuarios sobre la identidad del origen de un
            mensaje.
          </li>
          <li>
            Acceder sin autorización a cualquier sección del Sitio Web, a otros sistemas o redes
            conectadas al mismo, a ningún servidor de MEDEA ni a los servicios ofrecidos a través
            del Sitio Web, por medio de pirateo o falsificación, extracción de contraseñas o
            cualquier otro medio ilegítimo.
          </li>
          <li>
            Quebrantar, o intentar quebrantar, las medidas de seguridad o autenticación del Sitio
            Web o de cualquier red conectada al mismo, o las medidas de seguridad o protección
            inherentes a los contenidos ofrecidos en la Plataforma.
          </li>
        </ol>
        <p>
          El incumplimiento por el Usuario de cualquiera de estas condiciones de uso podrá conllevar
          la adopción por parte de MEDEA de las medidas oportunas amparadas en Derecho y en el
          ejercicio de sus derechos u obligaciones.
        </p>
        <p>
          MEDEA podrá llegar a impedir el acceso al Sitio Web o la posibilidad de participar en los
          espacios habilitados en el mismo a los usuarios que incumplan estas condiciones, sin que
          medie posibilidad de indemnización alguna por los daños y perjuicios causados.
        </p>
      </section>
      <section id="section03">
        <header>3. Naturaleza de la información</header>
        <p>
          Este Sitio Web está destinado exclusivamente a los estudiantes de cursos gestionados por
          Medea, así como a personal de la Administración que desee verificar los datos aportados
          por dichos estudiantes.
        </p>
        <p>La web contiene información respecto a:</p>
        <ul>
          <li>Los datos de aquellos alumnos que han superado los cursos gestionados por Medea</li>
        </ul>
      </section>
      <section id="section04">
        <header>4. Política de Privacidad</header>
        <p>
          El registro y acceso a la Plataforma requiere que el Usuario facilite determinados datos
          sobre sí mismo, de conformidad con lo dispuesto en la Política de Privacidad.
        </p>
        <p>
          Siempre que el Usuario facilite datos personales, este será el único responsable de la
          veracidad y exactitud de dichos datos, de modo que deberá comunicar a MEDEA cualquier
          actualización de estos tan pronto como le sea posible.
        </p>
      </section>
      <section id="section05">
        <header>5. Exclusión de responsabilidades</header>
        <p>
          MEDEA realiza los máximos esfuerzos para garantizar lo mejor posible la exactitud y
          actualización de la información difundida en el Sitio Web, reservándose el derecho de
          modificar en cualquier momento y sin previo aviso. Sin embargo, MEDEA no puede garantizar
          plenamente la exactitud, precisión, actualización o exhaustividad de la información
          disponible en el Sitio Web.
        </p>
        <p>
          En consecuencia, y excepto el daño directo producido por una mala conducta intencionada o
          grave negligencia por parte de MEDEA, éste último no se hace responsable de:
        </p>
        <ul>
          <li>
            Cualquier imprecisión, inexactitud u omisión relativa a la información suministrada en
            el Sitio Web;
          </li>
          <li>
            Cualquier daño resultante de la intrusión fraudulenta de un tercero que modifique la
            información o los materiales suministrados en el Sitio Web.
          </li>
          <li>
            De un modo más general, cualquier daño directo o indirecto, independientemente de su
            causa, origen, naturaleza o consecuencias, incluso aunque MEDEA supiera que dicho daño
            era previsible, producido como resultado de (i) el acceso o la imposibilidad de acceder
            al Sitio Web, (ii) la utilización del Sitio Web, incluyendo cualquier daño o virus que
            pueda infectar su ordenador o cualquier otro producto, y/o (iii) la credibilidad
            otorgada a cualquier información suministrada directa o indirectamente en el Sitio Web.
            Los materiales del Sitio Web y todos los otros sitios Web se suministran "tal cual", sin
            ningún tipo de garantía, expresa o supuesta. MEDEA no ofrece ninguna garantía expresa o
            supuesta sin limitación a su comerciabilidad e idoneidad para fines particulares.
          </li>
        </ul>
      </section>
      <section id="section06">
        <header>6. Enlaces a otros sitios web</header>
        <p>
          MEDEA no asumirá responsabilidad por ningún sitio Web de terceros al que haya podido
          acceder a través de este Sitio Web.
        </p>
        <p>
          MEDEA no dispone de medios para controlar el contenido de estos sitios Web de terceros,
          totalmente independientes de MEDEA. Además, la existencia de un enlace entre el Sitio Web
          y cualquier sitio de terceros en modo alguno implica que MEDEA apruebe el contenido de
          dicho sitio o ni siquiera el uso al cual dicho contenido pueda destinarse. Además, es
          responsabilidad suya tomar las precauciones necesarias para evitar que el Sitio Web sea
          infectado por, incluyéndose, pero no limitándose, uno o más "virus", "troyanos" o
          cualquier otro "parásito".
        </p>
        <p>
          Algunos sitios Web externos pueden contener hiperenlaces que le conduzcan al Sitio Web.
          Este tipo de hiperenlace no debe instalarse sin la autorización expresa previa de MEDEA.
          En cualquier caso, MEDEA no es en modo alguno responsable de la falta de disponibilidad de
          dichos sitios Web externos y MEDEA no revisa, controla, aprueba, ni se hace responsable de
          los contenidos, publicidad, productos u otros materiales disponibles en o accesibles a
          través de dichos sitios Web.
        </p>
      </section>
      <section id="section07">
        <header>7. Disponibilidad del Sitio Internet</header>
        <p>
          Debe usted tener en cuenta que (i) es técnicamente imposible que el Sitio Web se ofrezca
          libre de errores y que MEDEA no puede asumir ninguna responsabilidad por ello, que (ii)
          dichos errores pueden hacer que el Sitio Web esté temporalmente no disponible, y que (iii)
          el funcionamiento del Sitio Web puede verse negativamente afectado por situaciones y
          hechos fuera del control de MEDEA, como por ejemplo, los métodos de transmisión y
          telecomunicación entre MEDEA y usted y entre MEDEA y otros sistemas y redes. MEDEA y/o sus
          proveedores pueden, en cualquier momento, de forma temporal o permanente, modificar o
          interrumpir la totalidad o una parte del Sitio Web para efectuar labores de mantenimiento
          y/o realizar mejoras y/o cambios en el Sitio Web. MEDEA no asumirá responsabilidad por
          ninguna modificación, suspensión o interrupción del Sitio Web.
        </p>
      </section>
      <section id="section08">
        <header>8. Propiedad intelectual</header>
        <p>
          Este sitio Web es propiedad de y está gestionado por MEDEA. La presentación y todos los
          elementos, incluyendo marcas, logotipos, nombres de dominio y códigos fuente, expuestos en
          el sitio Web están protegidos por las leyes de Propiedad Intelectual y son propiedad de
          MEDEA o han recibido una autorización de utilización.
        </p>
        <p>
          El material procedente del Sitio Web no podrá ser copiado, reproducido, modificado,
          publicado de nuevo, cargado, manipulado, transmitido o distribuido de modo alguno, en
          ningún soporte, total o parcialmente, sin el consentimiento previo por escrito de MEDEA,
          salvo una copia de los materiales que usted podrá almacenar en su ordenador personal para
          uso privado, sin fines comerciales, respetando todos los derechos de propiedad intelectual
          y cualquier otro derecho que se pudiera mencionar. En todas las copias del contenido total
          o parcial del Sitio Web, deberá figurar la siguiente frase:
        </p>
        <p>
          MEDEA se reserva el derecho de perseguir judicialmente cualquier infracción de sus
          derechos de propiedad intelectual.
        </p>
      </section>
      <section id="section09">
        <header>9. Información sobre Productos</header>
        <p>
          La información contenida y difundida en el Sitio Web puede contener referencias directas o
          indirectas a medicamentos y/o productos sanitarios,
        </p>
        <p>
          Dichas referencias no implican, por parte de MEDEA, ninguna intención de vender dichos
          productos, programas o servicios en su país. Para cualquier información sobre productos,
          programas o servicios disponibles en su región/país le rogamos consulte a la filial del
          Grupo Sanofi local o al representante comercial de Sanofi.
        </p>
      </section>
      <section id="section10">
        <header>10. Ley y jurisdicción</header>
        <p>
          El Sitio Web y sus contenidos se rigen por la legislación española. Cualquier posible
          litigio sobre el Sitio Web y su contenido será competencia de los tribunales españoles.
        </p>
      </section>
    </div>
    <ReportFooter />
  </main>
</template>

<style scoped>
#legal section {
  padding: 0px;
}

#legal section header {
  padding: 0px;
  padding-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 700;
}

#legal h2 {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

#legal h1 {
  font-size: 1.602rem;
  text-align: center;
}

#legal h2 {
  font-size: 1.125rem;
  font-weight: 700;
}

#legal a {
  color: var(--steelbluelowlight);
}

#legal a:hover {
  color: var(--steelblue);
}

#legal p {
  margin-bottom: 0.75rem;
}

#legal table {
  margin-top: 1.5rem;
}

#legal ul,
#legal ol {
  margin-bottom: 1rem;
}

#legal ol {
  list-style-type: decimal;
  padding-left: 2rem;
}

#legal ul {
  list-style-type: disc;
  padding-left: 2rem;
}

#legal .browsers {
  margin-top: 1.5rem;
}

#legal .container {
  background: #efefef;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  max-width: 1600px;
  padding: 2rem;
}

@media (min-width: 1700px) {
  #legal .container {
    padding: 0;
  }
}

#legal .first-level {
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
  padding-left: 1rem;
}

#legal .menu {
  margin-bottom: 1.5rem;
}

#legal .menu li a {
  font-weight: 700;
}

#legal .padleft {
  margin-left: 1rem;
}

#legal .second-level {
  margin-bottom: 0.25rem;
  padding-left: 2rem;
}
.navigation {
  margin: 0 2rem;
}
</style>
