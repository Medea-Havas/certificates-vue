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
      <h1>POLÍTICA DE PRIVACIDAD</h1>
      <p>
        A los efectos del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de
        abril de 2016, relativo a la protección de las personas físicas en lo que respecta al
        tratamiento de datos personales y a la libre circulación de estos datos, (en adelante
        “RGPD”), así como, la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
        Personales y garantía de los derechos digitales, (en adelante “LOPDGDD”) y, por lo que se
        refiere al tratamiento de datos de carácter personal que se va desarrollar a través de este
        Sitio Web, le informamos de lo siguiente,
      </p>
      <h2>1.- Responsable del tratamiento</h2>
      <p>
        A estos efectos, queremos que sus datos personales sean tratados como responsable del
        tratamiento por parte de:
      </p>
      <p class="padleft">
        <b>• Nombre:</b>
        MEDEA Medical Education Agency, S.L., (en adelante “<b>MEDEA</b>”).<br />
        <b>• NIF:</b>
        B-82660697<br />
        <b>• Dirección:</b>
        Calle Eloy Gonzalo, 10 CP 28010 Madrid.<br />
        <b>• Delegado de protección de datos (DPD): </b>
        <a href="mailto:gdpr.spain@havasmg.com" target="_blank" rel="noopener"
          >gdpr.spain@havasmg.com</a
        >
      </p>
      <h2>2.- Información y consentimiento</h2>
      <p>
        Mediante la aceptación de la presente Política de Privacidad, el usuario queda informado y
        presta su consentimiento libre, informado, específico e inequívoco para que los datos
        personales que facilite a través del presente Sitio Web sean tratados por MEDEA, así como
        los datos derivados de su navegación y aquellos otros datos que pueda facilitar en un futuro
        a MEDEA.
      </p>
      <p>
        El usuario debe leer con atención esta Política de Privacidad, que ha sido redactada de
        forma clara y sencilla, para facilitar su comprensión, determinando libre y voluntariamente
        si desea facilitar sus datos personales a MEDEA.
      </p>
      <h2>3.- Obligatoriedad de facilitar los datos</h2>
      <p>
        Los datos solicitados en los formularios del Sitio Web son con carácter general,
        obligatorios (salvo que en el campo requerido se especifique lo contrario) para cumplir con
        las finalidades establecidas.
      </p>
      <p>
        Por lo tanto, si no se facilitan los mismos o no se facilitan correctamente no podrán
        atenderse las mismas, sin perjuicio de que podrá visualizar libremente el contenido del
        Sitio Web.
      </p>
      <h2>4.- Finalidades del tratamiento de datos</h2>
      <p>
        Los datos personales facilitados en los formularios del Sitio Web serán tratados por MEDEA
        conforme a las siguientes finalidades:
      </p>
      <ol>
        <li>
          <b>Registro en el Sitio Web.</b>
        </li>
        <li>
          <b>Verificación de la condición de profesional sanitario</b>
          del usuario antes de darle acceso a la información contenida en la plataforma.
        </li>
        <li>
          Dar
          <b>acceso a los contenidos formativos</b>
          incluidos en el Sitio Web, así como comunicar con el usuario durante su desarrollo en
          relación con la misma.
        </li>
        <li>
          <b>Emitir el título acreditativo de la formación y el reconocimiento de los créditos</b>
          asociados a la formación para profesionales sanitarios.
        </li>
        <li>
          <b>Evaluar y valorar la formación</b>
          realizada en cuanto a su contenido y formadores.
        </li>
        <li>
          Realizar
          <b>análisis del Sitio Web</b>
          y comprobar las preferencias y comportamiento de los usuarios.
        </li>
      </ol>
      <h2>5.- Datos del usuario que serán tratados</h2>
      <p>MEDEA tratará las siguientes categorías de datos de los usuarios.</p>
      <p class="first-level">
        1. Datos facilitados para el desarrollo del <b>registro en el Sitio Web</b>.
      </p>
      <p class="second-level">o Datos identificativos: nombre, apellidos y NIF/NIE.</p>
      <p class="second-level">o Datos de contacto: dirección de correo electrónico, móvil.</p>
      <p class="second-level">
        o Datos profesionales: especialidad, sociedad médica, número de colegiado, provincia en la
        que ejerce actualmente, provincia en la que se colegió por primera vez.
      </p>
      <p class="first-level">
        2. Datos facilitados para la
        <b>verificación de la condición de profesional sanitario</b>
        del usuario antes de darle acceso a la información contenida en la plataforma.
      </p>
      <p class="second-level">o Datos identificativos: nombre, apellidos y NIF/NIE.</p>
      <p class="second-level">
        o Datos profesionales: especialidad, sociedad médica, número de colegiado, provincia en la
        que ejerce actualmente, provincia en la que se colegió por primera vez.
      </p>
      <p class="first-level">
        3. Datos facilitados para dar
        <b>acceso a los contenidos formativos</b>
        incluidos en el Sitio Web, así como comunicar con el usuario durante su desarrollo en
        relación con la misma.
      </p>
      <p class="second-level">o Datos identificativos: nombre, apellidos y NIF/NIE.</p>
      <p class="second-level">o Datos de contacto: dirección de correo electrónico.</p>
      <p class="first-level">
        4. Datos facilitados para
        <b>emitir el título acreditativo de la formación y el reconocimiento de los créditos</b>
        asociados a la formación para profesionales sanitarios.
      </p>
      <p class="second-level">o Datos identificativos: nombre, apellidos y NIF/NIE.</p>
      <p class="second-level">o Datos de contacto: dirección de correo electrónico.</p>
      <p class="second-level">
        o Datos profesionales: especialidad, sociedad médica, número de colegiado, provincia en la
        que ejerce actualmente, provincia en la que se colegió por primera vez.
      </p>
      <p class="first-level">
        5. Datos facilitados para
        <b>evaluar y valorar la formación</b>
        realizada en cuanto a su contenido y formadores.
      </p>
      <p class="second-level">o Datos identificativos: nombre, apellidos.</p>
      <p class="second-level">o Datos de contacto: dirección de correo electrónico.</p>
      <p class="first-level">
        6. Realizar
        <b>análisis del Sitio Web</b>
        y comprobar las preferencias y comportamiento de los usuarios.
      </p>
      <p class="second-level">o Datos identificativos: nombre, apellidos.</p>
      <p class="second-level">o Datos de contacto: dirección de correo electrónico.</p>
      <h2>6.- Legitimación para el tratamiento de datos</h2>
      <p>
        La legitimación del tratamiento de los datos personales anteriormente indicado serán las
        siguientes:
      </p>
      <ol>
        <li>
          <b>Registro en el Sitio Web.</b>
          Este tratamiento quedará legitimado por la relación contractual que se establece durante
          el proceso de registro.
        </li>
        <li>
          <b>Verificación de la condición de profesional sanitario</b>
          del usuario antes de darle acceso a la información contenida en la plataforma. Este
          tratamiento queda legitimado por la obligación legal que pesa sobre MEDEA que no dar
          acceso a información y/o documentación relativa a medicamentos y/o productos sanitarios
          que precisen la prescripción o distribución a través de profesionales sanitarios, recogida
          en el Real Decreto Legislativo 1/2015, de 24 de julio, por el que se aprueba el texto
          refundido de la Ley de garantías y uso racional de los medicamentos y productos
          sanitarios.
        </li>
        <li>
          Dar
          <b>acceso a los contenidos formativos</b>
          incluidos en el Sitio Web, así como comunicar con el usuario durante su desarrollo en
          relación con la misma. Este tratamiento quedará legitimado por la relación contractual
          establecida en la inscripción en la formación que se desarrolla a través del proceso de
          inscripción.
        </li>
        <li>
          <b>Emitir el título acreditativo de la formación y el reconocimiento de los créditos</b>
          asociados a la formación para profesionales sanitarios. Este tratamiento quedará
          legitimado por la relación contractual establecida por el proceso de registro en la
          formación.
        </li>
        <li>
          <b>Evaluar y valorar la formación</b>
          realizada en cuanto a su contenido y formadores. Este tratamiento queda legitimado por el
          interés legítimo de MEDEA. Para satisfacer su interés legítimo de controlar la calidad de
          la formación, así como de los formadores, y poder evaluar la satisfacción de sus
          asistentes a la formación, MEDEA podrá ponerse en contacto con el usuario para solicitar
          su valoración del curso, y analizar esta información con el fin de mejorarlo. Este
          tratamiento responde a la necesidad de MEDEA de adaptar las formaciones que ofrece. Este
          tratamiento también contribuye a aumentar la calidad de los servicios prestados a los
          usuarios. Aunque para el análisis de las opiniones se recogerán las respuestas de forma
          individual, su análisis se realizará de forma general, mediante estadísticas, sin
          identificar a usuarios concretos. Los usuarios podrán, en todo caso, negarse a dar su
          valoración, así como comunicar su oposición a ser contactados con esta finalidad.
        </li>
        <li>
          Realizar
          <b>análisis del Sitio Web</b>
          y comprobar las preferencias y comportamiento de los usuarios. Este tratamiento queda
          legitimado por el interés legítimo de MEDEA. Para satisfacer su interés legítimo de
          controlar el uso del Sitio Web, y poder evaluar la satisfacción de los usuarios de este,
          MEDEA podrá utilizar los datos de navegación del usuario para este análisis y con ello,
          mejorar el Sitio Web.<br />Este tratamiento responde a la necesidad de MEDEA de adaptar la
          funcionalidad del Sitio Web y las formaciones que ofrece. Este tratamiento también
          contribuye a aumentar la calidad de los servicios prestados a los usuarios. Aunque para el
          análisis de las opiniones se recogerán las respuestas de forma individual, su análisis se
          realizará de forma general, mediante estadísticas, sin identificar a usuarios concretos.
          Los usuarios podrán, en todo caso, negarse a dar su valoración, así como comunicar su
          oposición a ser contactados con esta finalidad.
        </li>
      </ol>
      <h2>7.- Destinatarios de los datos.</h2>
      <p>
        Sus datos de carácter personal podrán ser cedidos a autoridades sanitarias con competencia
        en la materia con la finalidad de revisar y/o auditar la formación continuada para
        profesionales sanitarios.
      </p>
      <p>
        Con carácter adicional, sus datos de carácter personal no serán cedidos a terceras entidades
        sin su previo consentimiento, salvo obligación legal o requerimiento judicial y/o por parte
        de Cuerpos y Fuerzas de Seguridad del Estado.
      </p>
      <h2>8.- Conservación de datos personales.</h2>
      <p>MEDEA conservará sus datos personales durante los siguientes plazos:</p>
      <ol>
        <li>
          <b>Registro en el Sitio Web.</b>
          Hasta la solicitud por parte de usuario de su baja.
        </li>
        <li>
          <b>Verificación de la condición de profesional sanitario</b>
          del usuario antes de darle acceso a la información contenida en la plataforma. Hasta la
          correcta verificación.
        </li>
        <li>
          Dar
          <b>acceso a los contenidos formativos</b>
          incluidos en el Sitio Web, así como comunicar con el usuario durante su desarrollo en
          relación con la misma. Desde su inscripción hasta la solicitud, por parte del usuario, de
          su baja.
        </li>
        <li>
          <b>Emitir el título acreditativo de la formación y el reconocimiento de los créditos</b>
          asociados a la formación para profesionales sanitarios. Desde su emisión hasta la
          solicitud, por parte del usuario, de su baja.
        </li>
        <li>
          <b>Evaluar y valorar la formación</b>
          realizada en cuanto a su contenido y formadores. Estos datos serán conservados, desde su
          recogida hasta la finalización de la edición.
        </li>
        <li>
          Realizar
          <b>análisis del Sitio Web</b>
          y comprobar las preferencias y comportamiento de los usuarios. Estos datos serán
          conservados, desde su recogida hasta la finalización de la edición.
        </li>
      </ol>
      <h2>9.- Responsabilidades del usuario</h2>
      <p>El usuario:</p>
      <ul>
        <li>
          Garantiza que es mayor de dieciocho (18) años y que los datos que facilita a MEDEA son
          verdaderos, exactos, completos y actualizados. A estos efectos, el usuario responde de la
          veracidad de todos los datos que comunique y mantendrá convenientemente actualizada la
          información facilitada, de tal forma que responda a su situación real.
        </li>
        <li>
          Garantiza que ha informado a los terceros de los que facilite sus datos, en caso de
          hacerlo, de los aspectos contenidos en este documento. Asimismo, garantiza que ha obtenido
          su autorización para facilitar sus datos a MEDEA para los fines indicados.
        </li>
        <li>
          Será responsable de las informaciones falsas o inexactas que proporcione a través del
          Sitio Web y de los daños y perjuicios, directos o indirectos, que ello cause a MEDEA o a
          terceros.
        </li>
      </ul>
      <h2>10.- Ejercicio de derechos</h2>
      <p>
        El usuario puede enviar un escrito a MEDEA, a la dirección indicada en el encabezado de la
        presente Política, o bien por medio de un correo electrónico a la dirección
        <a href="mailto:gdpr.spain@havasmg.com" target="_blank" rel="noopener"
          >gdpr.spain@havasmg.com</a
        >, en cualquier momento y de manera gratuita, para:
      </p>
      <ul>
        <li>Revocar los consentimientos otorgados.</li>
        <li>
          Obtener confirmación acerca de si en MEDEA se están tratando datos personales que
          conciernen al usuario o no.
        </li>
        <li>Acceder a sus datos personales.</li>
        <li>Rectificar los datos inexactos o incompletos.</li>
        <li>
          Solicitar la supresión de sus datos cuando, entre otros motivos, los datos ya no sean
          necesarios para los fines que fueron recogidos.
        </li>
        <li>
          Obtener de MEDEA la limitación del tratamiento de los datos cuando se cumpla alguna de las
          condiciones previstas en la normativa de protección de datos.
        </li>
        <li>
          Solicitar la portabilidad de los datos facilitados por el Usuario en aquellos casos
          previstos en la normativa.
        </li>
        <li>
          Ponerse en contacto con el DPO de MEDEA UP a través de la siguiente dirección:
          <a href="mailto:gdpr.spain@havasmg.com" target="_blank" rel="noopener"
            >gdpr.spain@havasmg.com</a
          >
        </li>
        <li>
          Interponer una reclamación relativa a la protección de sus datos personales ante la
          Agencia Española de Protección de Datos en la dirección Calle de Jorge Juan, 6, 28001
          Madrid, cuando el interesado considere que MEDEA ha vulnerado los derechos que le son
          reconocidos por la normativa aplicable en protección de datos.
        </li>
      </ul>
      <h2>11.- Medidas de seguridad.</h2>
      <p>
        MEDEA tratará los datos del usuario en todo momento de forma absolutamente confidencial y
        guardando el preceptivo deber de secreto respecto de los mismos, de conformidad con lo
        previsto en la normativa de aplicación, adoptando al efecto las medidas de índole técnica y
        organizativas necesarias que garanticen la seguridad de sus datos y eviten su alteración,
        pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la
        naturaleza de los datos almacenados y los riesgos a que están expuestos.
      </p>
      <p>Última actualización: febrero 2024</p>
    </div>
  </main>
  <ReportFooter />
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

#legal h1,
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
