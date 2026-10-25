/* clases del Nivel 5 que todavía no se publican: una por módulo, para que cada clase conserve su lugar (y su avance) al llegar */
const T5PEND=(n,t)=>({title:'Clase '+n+' · '+t,lessons:[L('Clase '+n+' · '+t,'',[])]});

/* Nivel 4 · Especialización Niño interior · Clase 1 (contenido en curso/n4.js) */
const N4N1a=C2('Clase 1 · Bienvenida y agenda',[['ni1','Lo que el niño interno nos enseña a sanar'],['ni2','Agenda de la clase']]);
const N4N1b=C2('Clase 1 · Qué es el niño interno y cómo se forma',[['ni3','¿Qué es el niño interno?'],['ni4','¿Cómo se forma el niño interno?']]);
const N4N1c=C2('Clase 1 · Qué podemos sanar con él',[['ni5','¿Qué podemos sanar con el niño interno?']]);
const N4N1d=C2('Clase 1 · Cómo se forma una herida',[['ni6','De la necesidad al patrón adulto'],['ni7','Las cinco heridas de un vistazo']]);
const N4N1e=C2('Clase 1 · Las cinco heridas, una por una',[['ni8','Herida de rechazo','Máscara evasiva'],['ni9','Herida de abandono','Máscara dependiente'],['ni10','Herida de humillación','Máscara masoquista'],['ni11','Herida de traición','Máscara controladora'],['ni12','Herida de injusticia','Máscara rígida']]);
const N4N1f=C2('Clase 1 · Rechazo y abandono: diferencias',[['ni13','No son lo mismo']]);
const N4N1g=C2('Clase 1 · El gráfico: la madre y el padre',[['nian','Volvamos al gráfico','Los anillos'],['ni14','La madre en el gráfico'],['ni15','El padre en el gráfico']]);
const N4N1h=C2('Clase 1 · Lectura profunda y camino de sanación',[['ni16','De la lectura a la comprensión','Arma una lectura en el gráfico'],['ni17','El camino de sanación']]);
const N4N1i=C2('Clase 1 · Meditación: encuentro con mi niño interior',[['ni18','Encuentro con mi niño interior','Meditación guiada · 15 minutos']]);
const N4N1j=C2('Clase 1 · Práctica, repaso y tarea',[['ni19','Práctica: reconoce la herida'],['ni20','Reglas de oro del facilitador'],['nicp','Comprobemos lo aprendido'],['ni21','Repaso'],['ni22','Tarea de la semana']]);
const N4N2a=C2('Clase 2 · Bienvenida y agenda',[['nj1','De la herida a la limpieza'],['nj2','Agenda de la clase']]);
const N4N2b=C2('Clase 2 · Oración de conexión',[['nj3','Oración de conexión']]);
const N4N2c=C2('Clase 2 · Revisión de la tarea',[['nj4','Revisemos la tarea de la semana'],['nj5','Ronda de descubrimientos']]);
const N4N2d=C2('Clase 2 · El protocolo de Casa Muladhara',[['nj6','El protocolo de Casa Muladhara','Cinco pasos']]);
const N4N2e=C2('Clase 2 · Paso 2: leer la herida',[['nj7','Paso 2: leer la herida','Gráfico del niño interno']]);
const N4N2f=C2('Clase 2 · Paso 3: Energías Discordantes',[['nj8','Energías Discordantes','El gráfico'],['nj9','Heridas y las energías que suelen acompañarlas']]);
const N4N2g=C2('Clase 2 · Paso 4: limpiar directo o investigar en el Mapa',[['nj10','Limpiar directo o investigar'],['nj11','El Mapa: investigar la emoción'],['nj12','Los seis sectores del Mapa']]);
const N4N2h=C2('Clase 2 · Paso 5: la limpieza',[['nj13','La limpieza','Pedir permiso, nombrar, limpiar, verificar y agradecer']]);
const N4N2i=C2('Clase 2 · Ejemplo y práctica en parejas',[['nj14','Ejemplo del protocolo completo'],['nj15','Práctica en parejas','Ficha de sesión']]);
const N4N2j=C2('Clase 2 · Reglas de oro, repaso y tarea',[['nj16','Reglas de oro al limpiar'],['nj17','Comprobemos lo aprendido'],['nj18','Tarea de la semana']]);
const N4N3a=C2('Clase 3 · Bienvenida y agenda',[['nk1','El tiempo y las figuras de la herida'],['nk2','Agenda de la clase']]);
const N4N3b=C2('Clase 3 · Revisión de la tarea',[['nk3','Revisemos la tarea de la semana'],['nk4','Ronda de descubrimientos']]);
const N4N3c=C2('Clase 3 · Los anillos que completamos hoy',[['nk5','Hoy completamos el gráfico','Anillos 1 y 4']]);
const N4N3d=C2('Clase 3 · Anillo 1: el momento de la herida',[['nk6','El momento de la herida'],['nk7','La escala de 0 a 100']]);
const N4N3e=C2('Clase 3 · Anillo 4: las doce figuras',[['nk8','Las doce figuras']]);
const N4N3f=C2('Clase 3 · Figuras del vínculo y del entorno',[['nk9','Figuras del vínculo cercano'],['nk10','Figuras del entorno']]);
const N4N3g=C2('Clase 3 · Lo femenino, lo masculino y uno mismo',[['nk11','Lo femenino y lo masculino'],['nk12','Cuando la figura es uno mismo']]);
const N4N3h=C2('Clase 3 · Ejemplo y práctica en parejas',[['nk13','Ejemplo: una lectura completa'],['nk14','Práctica en parejas','Ficha de sesión']]);
const N4N3i=C2('Clase 3 · Reglas de oro, repaso y tarea',[['nk15','Reglas de oro al leer figuras'],['nk16','Comprobemos lo aprendido'],['nk17','Tarea de la semana']]);
const N4N4a=C2('Clase 4 · Bienvenida y agenda',[['nl1','La sesión completa'],['nl2','Agenda de la clase']]);
const N4N4b=C2('Clase 4 · Revisión de la tarea',[['nl3','Revisemos la tarea de la semana']]);
const N4N4c=C2('Clase 4 · El camino recorrido',[['nl4','Cuatro clases, un camino']]);
const N4N4d=C2('Clase 4 · La sesión completa: antes, durante y después',[['nl5','La sesión completa en tres momentos'],['nl6','Antes: el encuadre'],['nl7','Durante: el protocolo']]);
const N4N4e=C2('Clase 4 · Cómo comunicar la lectura',[['nl8','Cómo comunicar la lectura','Decir así o evitar']]);
const N4N4f=C2('Clase 4 · Cierre, señales de alerta y registro',[['nl9','Después: cierre y acompañamiento'],['nl10','Señales de alerta y derivación'],['nl11','Ficha de sesión completa']]);
const N4N4g=C2('Clase 4 · Demostración y evaluación práctica',[['nl12','Demostración en vivo'],['nl13','Evaluación práctica en tríos'],['nl14','Pauta de evaluación']]);
const N4N4h=C2('Clase 4 · Repaso y certificación',[['nl15','Comprobemos lo aprendido'],['nl16','Requisitos para la certificación']]);
const N4N4i=C2('Clase 4 · Oración de agradecimiento y cierre',[['nl17','Oración de agradecimiento'],['nl18','Gracias por este camino']]);
const N4V1a=C2('Clase 1 · Bienvenida y agenda',[['va1','La memoria del alma'],['va2','Agenda de la clase']]);
const N4V1b=C2('Clase 1 · Del linaje al alma',[['va3','Del linaje al alma']]);
const N4V1c=C2('Clase 1 · Qué es una vida pasada y cómo se expresa',[['va4','¿Qué es una vida pasada?'],['va5','Cómo puede expresarse hoy']]);
const N4V1d=C2('Clase 1 · Para qué se investiga y el encuadre ético',[['va6','Para qué se investiga'],['va7','El encuadre ético']]);
const N4V1e=C2('Clase 1 · Los cinco gráficos de la especialización',[['va8','Los cinco gráficos de la especialización']]);
const N4V1f=C2('Clase 1 · Fechas: vida activa, vidas atrás y época',[['va9','El gráfico de Fechas'],['va10','¿Hay una vida pasada activa?'],['va11','¿Cuántas vidas atrás y en qué época?']]);
const N4V1g=C2('Clase 1 · Investigación: daño, tipo e intensidad',[['va12','El gráfico Vidas Pasadas (Investigación)'],['va13','¿Hubo daño o herida?'],['va14','Los siete tipos de daño'],['va15','La intensidad del daño'],['va16','Cómo se lee']]);
const N4V1h=C2('Clase 1 · Ejemplo y práctica en parejas',[['va17','Ejemplo de lectura'],['va18','Práctica en parejas']]);
const N4V1i=C2('Clase 1 · Repaso y tarea',[['va19','Comprobemos lo aprendido'],['va20','Tarea para la próxima clase']]);
const N4V2a=C2('Clase 2 · Bienvenida y agenda',[['vb1','Quién fui y con quién'],['vb2','Agenda de la clase']]);
const N4V2b=C2('Clase 2 · Revisión de la tarea y ronda',[['vb3','Revisemos la tarea de la semana'],['vb4','Ronda: lo que resonó en ti']]);
const N4V2c=C2('Clase 2 · El anexo de investigación',[['vb5','El anexo de investigación'],['vb6','El gráfico del anexo']]);
const N4V2d=C2('Clase 2 · Hombre o mujer y clase social',[['vb7','Hombre o mujer'],['vb8','Clase social'],['vb9','Lo que puede dejar la clase social']]);
const N4V2e=C2('Clase 2 · Profesión',[['vb10','Profesión'],['vb11','Profesiones que pueden dejar huella']]);
const N4V2f=C2('Clase 2 · Tipo de relación y vínculos kármicos',[['vb12','Tipo de relación'],['vb13','Vínculos kármicos'],['vb14','Las almas que se reencuentran']]);
const N4V2g=C2('Clase 2 · Fechas: cuándo se activó en esta vida',[['vb15','¿Cuándo se activó en esta vida?']]);
const N4V2h=C2('Clase 2 · Limpiar, ejemplo y práctica',[['vb16','Limpiar la memoria'],['vb17','Ejemplo de lectura completa'],['vb18','Práctica en parejas']]);
const N4V2i=C2('Clase 2 · Reglas de oro, repaso y tarea',[['vb19','Reglas de oro y comprobemos'],['vb20','Tarea para la próxima clase']]);
const N4V3a=C2('Clase 3 · Bienvenida y agenda',[['vc1','Cómo terminó y qué prometí'],['vc2','Agenda de la clase']]);
const N4V3b=C2('Clase 3 · Revisión de la tarea y ronda',[['vc3','Revisemos la tarea de la semana'],['vc4','Ronda de descubrimientos']]);
const N4V3c=C2('Clase 3 · Por qué importa cómo terminó una vida',[['vc5','Por qué importa cómo terminó una vida']]);
const N4V3d=C2('Clase 3 · El gráfico de Causas de Muerte',[['vc6','El gráfico de Causas de Muerte'],['vc7','Muertes naturales y por enfermedad'],['vc8','Accidente, catástrofe y escasez'],['vc9','Muertes por violencia'],['vc10','Muertes que piden más cuidado']]);
const N4V3e=C2('Clase 3 · Cómo se expresa hoy y cómo leer con cuidado',[['vc11','Cómo puede expresarse hoy'],['vc12','Leer con cuidado']]);
const N4V3f=C2('Clase 3 · Los votos de vidas pasadas',[['vc13','Los votos de vidas pasadas'],['vc14','El gráfico de Votos o Pactos'],['vc15','Votos frecuentes de otras vidas'],['vc16','Votos del linaje y votos de vidas pasadas']]);
const N4V3g=C2('Clase 3 · La oración de Votos',[['vc17','La oración de Votos']]);
const N4V3h=C2('Clase 3 · Ejemplo, práctica y repaso',[['vc18','Ejemplo: de la causa de muerte al voto'],['vc19','Práctica en parejas'],['vc20','Comprobemos lo aprendido']]);
const N4V3i=C2('Clase 3 · Tarea',[['vc21','Tarea para la próxima clase']]);
const N4V4a=C2('Clase 4 · Bienvenida y agenda',[['vd1','La sesión de vidas pasadas'],['vd2','Agenda de la clase']]);
const N4V4b=C2('Clase 4 · Revisión de la tarea',[['vd3','Revisemos la tarea de la semana']]);
const N4V4c=C2('Clase 4 · El camino recorrido',[['vd4','El camino recorrido']]);
const N4V4d=C2('Clase 4 · La sesión: antes, durante y después',[['vd5','La sesión en tres momentos'],['vd6','Antes: el encuadre'],['vd7','Durante: el protocolo completo']]);
const N4V4e=C2('Clase 4 · Comunicar y cuidar',[['vd8','Comunicar en hipótesis y sin fantasía'],['vd9','Temas sensibles y derivación']]);
const N4V4f=C2('Clase 4 · Cierre y ficha de sesión',[['vd10','Después: cierre de la sesión'],['vd11','Ficha de sesión de vidas pasadas']]);
const N4V4g=C2('Clase 4 · Demostración y evaluación práctica',[['vd12','Demostración en vivo'],['vd13','Evaluación práctica en tríos']]);
const N4V4h=C2('Clase 4 · Tres miradas y repaso',[['vd14','Tres miradas, una misma persona'],['vd15','Comprobemos lo aprendido']]);
const N4V4i=C2('Clase 4 · Certificación y cuidado de la facilitadora',[['vd16','Requisitos para la certificación'],['vd17','Cuidar a quien acompaña']]);
const N4V4j=C2('Clase 4 · Ritual, oración y cierre',[['vd18','Honrar el camino del alma'],['vd19','Oración de agradecimiento'],['vd20','Gracias por este camino']]);
const N4U1a=C2('Clase 1 · Bienvenida y agenda',[['lu1','El útero y el linaje femenino'],['lu2','Agenda de la clase']]);
const N4U1b=C2('Clase 1 · Del linaje al cuerpo',[['lu3','Del linaje al cuerpo']]);
const N4U1c=C2('Clase 1 · Sanación de Útero',[['lu4','Sanación de Útero'],['lu5','Sanar no es traicionar']]);
const N4U1d=C2('Clase 1 · Qué es y qué no es la limpieza de útero',[['lu6','¿Qué es la limpieza de útero?'],['lu7','Lo que no es'],['lu8','El útero como centro']]);
const N4U1e=C2('Clase 1 · La fidelidad al linaje femenino',[['lu9','La fidelidad al linaje femenino']]);
const N4U1f=C2('Clase 1 · El árbol femenino de siete generaciones',[['lu10','El árbol femenino de siete generaciones'],['lu11','Las dos líneas femeninas'],['lu12','Constelación Familiar como punto de partida']]);
const N4U1g=C2('Clase 1 · El gráfico de Limpieza Uterina',[['lu13','El gráfico de Limpieza Uterina'],['lu14','Las siete generaciones'],['lu15','Los temas del gráfico'],['lu16','El porcentaje'],['lu17','Cómo se lee el gráfico']]);
const N4U1h=C2('Clase 1 · Ejemplo y práctica',[['lu18','Ejemplo y práctica en parejas']]);
const N4U1i=C2('Clase 1 · Repaso y tarea',[['lu19','Comprobemos lo aprendido'],['lu20','Tarea para la próxima clase']]);
const N4U2a=C2('Clase 2 · Bienvenida y agenda',[['lv1','Las memorias del útero'],['lv2','Agenda de la clase']]);
const N4U2b=C2('Clase 2 · Revisión de la tarea y ronda',[['lv3','Revisemos la tarea de la semana'],['lv4','Ronda: las mujeres de mi linaje']]);
const N4U2c=C2('Clase 2 · Lo que el útero guarda',[['lv5','Lo que el útero guarda']]);
const N4U2d=C2('Clase 2 · Memorias emocionales y de dolor',[['lv6','Tristeza, miedos e inseguridad'],['lv7','Ira, frustración, rencor y odio'],['lv8','Asco y rechazo'],['lv9','Memorias de dolor']]);
const N4U2e=C2('Clase 2 · Abusos, abortos y el cuerpo: leer con cuidado',[['lv10','Abusos e impactos de abortos'],['lv11','El cuerpo: memorias, no diagnósticos']]);
const N4U2f=C2('Clase 2 · El protocolo',[['lv12','El protocolo'],['lv13','Limpiar directo: Energías Discordantes'],['lv14','Investigar desde el Mapa'],['lv15','Cuándo ir al Transgeneracional']]);
const N4U2g=C2('Clase 2 · Leer con cuidado y derivar',[['lv16','Leer con cuidado']]);
const N4U2h=C2('Clase 2 · Ejemplo y práctica',[['lv17','Ejemplo de lectura y limpieza'],['lv18','Práctica en parejas']]);
const N4U2i=C2('Clase 2 · Reglas de oro, repaso y tarea',[['lv19','Reglas de oro y comprobemos'],['lv20','Tarea para la próxima clase']]);
const N4U3a=C2('Clase 3 · Bienvenida y agenda',[['lw1','Recuperar la energía femenina'],['lw2','Agenda de la clase']]);
const N4U3b=C2('Clase 3 · Revisión de la tarea y ronda',[['lw3','Revisemos la tarea de la semana'],['lw4','Ronda de descubrimientos']]);
const N4U3c=C2('Clase 3 · Limpiar y recuperar',[['lw5','Limpiar y recuperar'],['lw6','Los sectores de recuperación']]);
const N4U3d=C2('Clase 3 · Sexualidad, creatividad, virtudes y fuerza',[['lw7','Recuperar la sexualidad'],['lw8','Manifestar la creatividad'],['lw9','Recuperar las virtudes'],['lw10','Recuperar la fuerza']]);
const N4U3e=C2('Clase 3 · Honrar, respetar y perdonar',[['lw11','Honrar las experiencias'],['lw12','Respetar'],['lw13','Perdonar: liberar sin justificar']]);
const N4U3f=C2('Clase 3 · Soltar y el equilibrio de energías',[['lw14','Soltar, confiar y dejar ir'],['lw15','El equilibrio de las energías']]);
const N4U3g=C2('Clase 3 · Oración y meditación',[['lw16','La oración del linaje femenino'],['lw17','Meditación: conexión con el útero']]);
const N4U3h=C2('Clase 3 · Ejemplo, práctica y repaso',[['lw18','De la memoria a la recuperación'],['lw19','Práctica en parejas y comprobemos']]);
const N4U3i=C2('Clase 3 · Tarea',[['lw20','Tarea para la próxima clase']]);
const N4U4a=C2('Clase 4 · Bienvenida y agenda',[['lx1','La sesión de limpieza de útero'],['lx2','Agenda de la clase']]);
const N4U4b=C2('Clase 4 · Revisión de la tarea',[['lx3','Revisemos la tarea de la semana']]);
const N4U4c=C2('Clase 4 · El camino recorrido',[['lx4','El camino recorrido']]);
const N4U4d=C2('Clase 4 · La sesión: antes, durante y después',[['lx5','La sesión en tres momentos'],['lx6','Antes: el encuadre'],['lx7','Durante: el protocolo completo']]);
const N4U4e=C2('Clase 4 · Comunicar y cuidar',[['lx8','Comunicar sin culpar a la madre ni a las abuelas'],['lx9','Temas sensibles y derivación']]);
const N4U4f=C2('Clase 4 · Cierre y ficha de sesión',[['lx10','Después: cierre de la sesión'],['lx11','Ficha de sesión de limpieza de útero']]);
const N4U4g=C2('Clase 4 · Demostración y evaluación práctica',[['lx12','Demostración en vivo'],['lx13','Evaluación práctica en tríos']]);
const N4U4h=C2('Clase 4 · Cuatro miradas y repaso',[['lx14','Cuatro miradas, una misma persona'],['lx15','Comprobemos lo aprendido']]);
const N4U4i=C2('Clase 4 · Certificación y cuidado de la facilitadora',[['lx16','Requisitos para la certificación'],['lx17','Cuidar a quien acompaña']]);
const N4U4j=C2('Clase 4 · Ritual, oración y cierre',[['lx18','El hilo sagrado del linaje femenino'],['lx19','Oración de agradecimiento'],['lx20','Gracias por este camino']]);
const N4T1a=C2('Clase 1 · Bienvenida y agenda',[['ta1','El árbol y el clan'],['ta2','Agenda de la clase']]);
const N4T1b=C2('Clase 1 · Del niño interno al clan',[['ta3','Del niño interno al clan']]);
const N4T1c=C2('Clase 1 · Qué es lo transgeneracional y cómo se transmite',[['ta4','¿Qué es lo transgeneracional?'],['ta5','Cómo se transmite una memoria']]);
const N4T1d=C2('Clase 1 · El árbol y los dos linajes',[['ta6','El árbol de cuatro generaciones'],['ta7','Linaje materno y linaje paterno']]);
const N4T1e=C2('Clase 1 · Las leyes del clan',[['ta8','Las tres leyes del clan'],['ta9','Qué pasa cuando una ley se rompe']]);
const N4T1f=C2('Clase 1 · Los tres gráficos de la formación',[['ta10','Los tres gráficos de la formación']]);
const N4T1g=C2('Clase 1 · El gráfico de Constelación Familiar',[['ta11','El gráfico de Constelación Familiar'],['ta12','El centro: ¿de qué linaje viene?'],['ta13','Las cuatro generaciones y la escala'],['ta14','Los temas del gráfico'],['ta15','Cómo se lee el gráfico'],['ta16','Ejemplo de lectura']]);
const N4T1h=C2('Clase 1 · Práctica en parejas',[['ta17','Práctica en parejas']]);
const N4T1i=C2('Clase 1 · Honrar, repaso y tarea',[['ta18','Comprender sin juzgar'],['ta19','Comprobemos lo aprendido'],['ta20','Tarea para la próxima clase']]);
const N4T2a=C2('Clase 2 · Bienvenida y agenda',[['tb1','Lealtades, roles y repeticiones'],['tb2','Agenda de la clase']]);
const N4T2b=C2('Clase 2 · Revisión de la tarea y ronda',[['tb3','Revisemos la tarea de la semana'],['tb4','Ronda: lo que descubrí en mi árbol']]);
const N4T2c=C2('Clase 2 · Lealtades y repeticiones',[['tb5','Lo que el clan pide sin decirlo'],['tb6','Lealtades conscientes e inconscientes'],['tb7','Repetición de patrones']]);
const N4T2d=C2('Clase 2 · Los lugares en el clan',[['tb8','Roles cambiados y ser hijo bastón'],['tb9','El doble, el yacente y el heredero universal'],['tb10','Excluidos en el árbol']]);
const N4T2e=C2('Clase 2 · Madre, padre y abundancia',[['tb11','Bloqueos con la madre y con el padre'],['tb12','Herencias, abundancia, dinero y éxitos']]);
const N4T2f=C2('Clase 2 · Pérdidas y cargas',[['tb13','Pérdidas y rupturas'],['tb14','Enfermedades, vínculos y cargas emocionales']]);
const N4T2g=C2('Clase 2 · El protocolo y un ejemplo',[['tb15','El protocolo'],['tb16','Ejemplo de lectura y limpieza']]);
const N4T2h=C2('Clase 2 · Práctica en parejas',[['tb17','Práctica en parejas']]);
const N4T2i=C2('Clase 2 · Reglas de oro, repaso y tarea',[['tb18','Reglas de oro'],['tb19','Comprobemos lo aprendido'],['tb20','Tarea para la próxima clase']]);
const N4T3a=C2('Clase 3 · Bienvenida y agenda',[['tc1','Memorias y votos del linaje'],['tc2','Agenda de la clase']]);
const N4T3b=C2('Clase 3 · Revisión de la tarea y ronda',[['tc3','Revisemos la tarea de la semana'],['tc4','Ronda de descubrimientos']]);
const N4T3c=C2('Clase 3 · El gráfico Transgeneracional',[['tc5','El gráfico Transgeneracional']]);
const N4T3d=C2('Clase 3 · Las memorias del linaje',[['tc6','Lo que se ocultó'],['tc7','Las uniones'],['tc8','Fertilidad y nacimientos'],['tc9','Exclusión y poder'],['tc10','La historia colectiva'],['tc11','Pérdidas, deudas y muertes']]);
const N4T3e=C2('Clase 3 · Memorias de violencia: leer con cuidado',[['tc12','Memorias de violencia: leer con cuidado']]);
const N4T3f=C2('Clase 3 · La oración del linaje',[['tc13','La oración del linaje']]);
const N4T3g=C2('Clase 3 · El gráfico de Votos o Pactos',[['tc14','Cuándo se va al gráfico de Votos'],['tc15','El gráfico de Votos o Pactos'],['tc16','Votos frecuentes en el linaje'],['tc17','Votos del linaje y votos de vidas pasadas']]);
const N4T3h=C2('Clase 3 · La oración para anular votos',[['tc18','La oración de Votos']]);
const N4T3i=C2('Clase 3 · Ejemplo, práctica, repaso y tarea',[['tc19','Ejemplo de lectura'],['tc20','Ahora en parejas'],['tc21','Comprobemos lo aprendido'],['tc22','Tarea para la Clase 4']]);
const N4T4a=C2('Clase 4 · Bienvenida y agenda',[['td1','La sesión transgeneracional'],['td2','Agenda de la clase']]);
const N4T4b=C2('Clase 4 · Revisión de la tarea',[['td3','Revisemos la tarea de la semana']]);
const N4T4c=C2('Clase 4 · El camino recorrido',[['td4','El camino recorrido']]);
const N4T4d=C2('Clase 4 · La sesión: antes, durante y después',[['td5','La sesión en tres momentos'],['td6','Antes: encuadre y datos del árbol'],['td7','Durante: el protocolo completo']]);
const N4T4e=C2('Clase 4 · Comunicar y cuidar',[['td8','Comunicar sin culpar a los ancestros'],['td9','Temas sensibles y derivación']]);
const N4T4f=C2('Clase 4 · Cierre y ficha de sesión',[['td10','Después: cierre de la sesión'],['td11','Ficha de sesión transgeneracional']]);
const N4T4g=C2('Clase 4 · Demostración y evaluación práctica',[['td12','Demostración en vivo'],['td13','Evaluación práctica en tríos']]);
const N4T4h=C2('Clase 4 · Niño interno y linaje',[['td14','Niño interno y linaje: cómo se complementan']]);
const N4T4i=C2('Clase 4 · Repaso y certificación',[['td15','Comprobemos lo aprendido'],['td16','Requisitos para la certificación']]);
const N4T4j=C2('Clase 4 · Ritual, oración y cierre',[['td17','Honrar a los ancestros'],['td18','Oración de agradecimiento'],['td19','Gracias por este camino']]);
const LEVELS=[
 {n:1,id:'pendulo',title:'Péndulo Hebreo Nivel 1',mode:'pres',dur:'1 jornada intensiva · 8 horas',status:'done',
  desc:'La base de tu camino. Aprendes a usar el péndulo hebreo para limpiar, armonizar y sanar: su origen, los chakras, el aura y los cuerpos energéticos, las etiquetas, tu kit de trabajo y el protocolo de una sesión. La jornada es presencial; aquí lo repasas tocando, jugando y practicando.',
  modules:[
   {title:'Módulo 1 · Conoce el Péndulo Hebreo',lessons:[
     DK('Bienvenida',[['welcome','Bienvenida'],['learn','Qué vas a aprender','Tu ruta de la jornada']],1),
     DK('Qué es, qué hace y para qué se usa',[['what','Qué es'],['does','Qué hace','Detecta, limpia, armoniza e irradia'],['uses','Para qué se usa']],1),
     DK('Origen y evolución',[['origin','Línea de tiempo']],1),
     DK('Cómo funciona y sus partes',[['how','Cómo funciona'],['anatomy','Conoce tu péndulo','Polos, madera y etiquetas']],1)]},
   {title:'Módulo 2 · Tu campo energético',lessons:[
     DK('Los chakras',[['chakras','Los siete chakras']],1),
     DK('El aura',[['aura','Aura con bloqueos y aura limpia']],1),
     DK('Los 7 cuerpos energéticos',[['bodies','Construye tus 7 cuerpos']],1),
     DK('Qué trabajaremos y beneficios',[['work','Qué trabajaremos'],['benefits','Beneficios de la terapia']],1)]},
   {title:'Módulo 3 · Materiales y etiquetas',lessons:[
     DK('Tu kit de trabajo',[['kit','Los 9 materiales']],1),
     DK('Las etiquetas hebreas',[['labels','Qué son'],['tags','Detectar, irradiar y sellar'],['cards','Etiquetas en hebreo']],1),
     DK('Los 72 Nombres de Dios y la Cábala',[['kabbalah','Contexto y aclaración']],1)]},
   {title:'Módulo 4 · Protocolo de la sesión',lessons:[
     DK('La ficha clínica',[['ficha','Ficha de ejemplo']],1),
     DK('Preparación del terapeuta',[['prep','Antes de cada sesión']],1),
     DK('Trabajo a distancia',[['remote','Protocolo y plantilla testigo']],1),
     DK('Oración de conexión con el péndulo',[['prayer','Paso a paso']],1)]},
   {title:'Módulo 5 · Cierre y práctica',lessons:[
     DK('Cierre, repaso y siguiente paso',[['close','Cierre de la clase'],['quiz','Repaso: 8 preguntas'],['next','Tu camino y práctica presencial']],1),
     L('Evaluación y entrega de insignia','05:00',[T('00:00','Cómo enviar tus 3 prácticas','')],[],1)]}
  ]},
 {n:2,id:'espacios',title:'Limpieza energética de casas y espacios',mode:'live',dur:'Método Casa Muladhara® · online en vivo',status:'done',
  desc:'Aprendes a evaluar, limpiar y armonizar casas, consultas y espacios de trabajo con el Péndulo Hebreo: medir con el gráfico de Bovis, detectar radiaciones y bloqueos, aplicar el protocolo de 7 pasos y dejar el lugar protegido. Aquí lo repasas tocando, ordenando y practicando.',
  modules:[
   {title:'Módulo 1 · Bienvenida y fundamentos',lessons:[
     DK('Bienvenida y objetivos',[['n2welcome','Bienvenida'],['n2obj','Objetivos de la formación','Toca los que más te resuenan'],['n2goals','Qué aprenderás y objetivo general','Dónde practicas cada punto']],1),
     DK('Qué es limpiar un espacio y por qué medir primero',[['n2def','Qué es la limpieza energética','Antes y después'],['n2why','Primero medimos, luego intervenimos','Cuatro razones para evaluar']],1),
     DK('Materiales necesarios',[['n2kit','Tu kit de trabajo']],1)]},
   {title:'Módulo 2 · Protocolo y protección',lessons:[
     DK('El protocolo Casa Muladhara®',[['n2proto','Los 7 pasos'],['n2order','Ordena el protocolo']],1),
     DK('Preparación y protección de la terapeuta',[['n2prep','Preparación de la terapeuta'],['n2prot','Protección antes y después']],1),
     DK('Oración para la limpieza de casas y espacios',[['n2prayer','Paso a paso']],1)]},
   {title:'Módulo 3 · Medición con el gráfico de Bovis',lessons:[
     DKf('El gráfico de Bovis',[['n2bovis0','Estado energético del espacio','Toca cada nivel'],['n2btab','Los 7 niveles'],['n2bovis','Practica la lectura','Mueve el medidor']],[F('pdf','Gráficos radiestésicos del Nivel 2','6 láminas',N2P+'graficos_radiestesicos.pdf')],1)]},
   {title:'Módulo 4 · Radiaciones y bloqueos',lessons:[
     DK('Radiaciones negativas de la Tierra',[['n2tierra','Gráfico y categorías']],1),
     DK('Radiaciones técnico dañinas',[['n2tecnico','Gráfico y categorías']],1),
     DK('Radiaciones paranormales',[['n2para','Gráfico y categorías']],1),
     DK('Gráfico de bloqueo completo',[['n2bloq','Los tres anillos','Arma una lectura']],1),
     DK('Naturaleza, ubicación e intensidad',[['n2naturaleza','Naturaleza del bloqueo','Anillo externo'],['n2ubic','Ubicación física','Anillo medio'],['n2intens','Nivel de intensidad','Anillo interno']],1),
     DK('Origen energético específico',[['n2origen','De maldiciones a desencarnados'],['n2odet','Detalle de cada categoría']],1)]},
   {title:'Módulo 5 · Práctica y acciones',lessons:[
     DK('Práctica sobre el plano',[['n2plan','Mide cada zona']],1),
     DK('Muebles, ORGÓN/SCAP y protección activa',[['n2furn','¿Qué hacer con este mueble?'],['n2orgon','ORGÓN / SCAP'],['n2prot2','Protección energética activa'],['n2pct','Gráfico de porcentajes','De −100 % a +100 %']],1)]},
   {title:'Módulo 6 · Cierre y práctica final',lessons:[
     DKf('Oración de cierre y etiquetas hebreas',[['n2close','Oración de cierre'],['n2heb','Etiquetas hebreas']],[F('pdf','Etiquetas hebreas del Nivel 2','3 hojas para recortar',N2P+'etiquetas_hebreas_nivel2.pdf')],1),
     DKf('Ficha de registro interactiva',[['n2fi1','Datos generales'],['n2fi2','Medición inicial'],['n2fi3','Plano y zonas evaluadas'],['n2fi4','Desequilibrios detectados'],['n2fi5','Etiquetas y trabajo realizado'],['n2fi6','Medición final y observaciones'],['n2fi7','Tu ficha completa']],[F('pdf','Ficha de registro en blanco','1 hoja para imprimir',N2P+'ficha_de_registro.pdf')],1),
     DK('Repaso y cierre de la clase',[['n2quiz','Repaso: 12 preguntas'],['n2end','Cierre de la clase']],1),
     DK('Práctica final y entrega de insignia',[['n2pf1','Qué entregas'],['n2pf2','Tu recorrido'],['n2pf3','Envía tu ficha y recibe tu insignia']],1)]}
  ]},
 {n:3,id:'radiestesia',title:'Radiestesia y Sanación del Alma',mode:'live',dur:'8 clases · 2 meses · online en vivo',status:'progress',
  desc:'Profundizas en la radiestesia terapéutica para trabajar el alma: memorias, emociones y patrones que se repiten.',
  modules:[
   {title:'Clase 1 · Fundamentos de la radiestesia y activación del péndulo',lessons:[N3C1_1,N3C1_2,N3C1_3,N3C1_4,N3C1_5,N3C1_6]},
   {title:'Clase 2 · Sistema energético humano',lessons:[N3L2a,N3L2b,N3L2c,N3L2d,N3L2e,N3L2f]},
   {title:'Clase 3 · Yo Superior y biómetros',lessons:[N3L3a,N3L3b,N3L3c,N3L3d,N3L3e,N3L3f,N3L3g]},
   {title:'Clase 4 · Interpretación terapéutica y evaluación energética integral',lessons:[N3L4a,N3L4b,N3L4c,N3L4d,N3L4e,N3L4f,N3L4g,N3L4h]},
   {title:'Clase 5 · Aplicación práctica: revisión y desarrollo de la clase',lessons:[N3L5a,N3L5b,N3L5c,N3L5d,N3L5e,N3L5f]},
   {title:'Clase 6 · Profundización en la investigación radiestésica',lessons:[N3L6a,N3L6b,N3L6c,N3L6d,N3L6e,N3L6f,N3L6g]},
   {title:'Clase 7 · Investigación radiestésica y profundización del diagnóstico',lessons:[N3L7a,N3L7b,N3L7c,N3L7d,N3L7e,N3L7f,N3L7g]},
   {title:'Clase 8 · Integración y profundización',lessons:[N3L8a,N3L8b,N3L8c,N3L8d,N3L8e,N3L8f,N3L8g,N3L8h]}
  ]},
 {n:4,id:'especializaciones',title:'Especializaciones en Radiestesia',mode:'live',dur:'4 especializaciones · 4 clases y 1 mes cada una',status:'locked',
  desc:'Cuatro especializaciones para trabajar temas profundos con la radiestesia. Cada una tiene su propia insignia.',
  modules:[
   {title:'Niño interior',lessons:[N4N1a,N4N1b,N4N1c,N4N1d,N4N1e,N4N1f,N4N1g,N4N1h,N4N1i,N4N1j,N4N2a,N4N2b,N4N2c,N4N2d,N4N2e,N4N2f,N4N2g,N4N2h,N4N2i,N4N2j,N4N3a,N4N3b,N4N3c,N4N3d,N4N3e,N4N3f,N4N3g,N4N3h,N4N3i,N4N4a,N4N4b,N4N4c,N4N4d,N4N4e,N4N4f,N4N4g,N4N4h,N4N4i]},
   {title:'Vidas pasadas',lessons:[N4V1a,N4V1b,N4V1c,N4V1d,N4V1e,N4V1f,N4V1g,N4V1h,N4V1i,N4V2a,N4V2b,N4V2c,N4V2d,N4V2e,N4V2f,N4V2g,N4V2h,N4V2i,N4V3a,N4V3b,N4V3c,N4V3d,N4V3e,N4V3f,N4V3g,N4V3h,N4V3i,N4V4a,N4V4b,N4V4c,N4V4d,N4V4e,N4V4f,N4V4g,N4V4h,N4V4i,N4V4j]},
   {title:'Terapia transgeneracional',lessons:[N4T1a,N4T1b,N4T1c,N4T1d,N4T1e,N4T1f,N4T1g,N4T1h,N4T1i,N4T2a,N4T2b,N4T2c,N4T2d,N4T2e,N4T2f,N4T2g,N4T2h,N4T2i,N4T3a,N4T3b,N4T3c,N4T3d,N4T3e,N4T3f,N4T3g,N4T3h,N4T3i,N4T4a,N4T4b,N4T4c,N4T4d,N4T4e,N4T4f,N4T4g,N4T4h,N4T4i,N4T4j]},
   {title:'Limpieza uterina',lessons:[N4U1a,N4U1b,N4U1c,N4U1d,N4U1e,N4U1f,N4U1g,N4U1h,N4U1i,N4U2a,N4U2b,N4U2c,N4U2d,N4U2e,N4U2f,N4U2g,N4U2h,N4U2i,N4U3a,N4U3b,N4U3c,N4U3d,N4U3e,N4U3f,N4U3g,N4U3h,N4U3i,N4U4a,N4U4b,N4U4c,N4U4d,N4U4e,N4U4f,N4U4g,N4U4h,N4U4i,N4U4j]}
  ]},
 {n:5,id:'tarot',title:'Tarot Terapéutico: El Camino del Ser',mode:'live',dur:'16 clases · 4 meses · online en vivo',status:'locked',
  desc:'El tarot como herramienta terapéutica de autoconocimiento. Cierra tu formación como Terapeuta Holístico Integral.',
  modules:[
   {title:'Clase 1 · Introducción y El Loco',lessons:[N5L1a,N5L1b,N5L1c,N5L1d,N5L1e,N5L1f]},
   {title:'Clase 2 · Voluntad, intuición y creación',lessons:[N5L2a,N5L2b,N5L2c,N5L2d,N5L2e,N5L2f]},
   {title:'Clase 3 · Estructura, enseñanza y elección',lessons:[N5L3a,N5L3b,N5L3c,N5L3d,N5L3e,N5L3f]},
   {title:'Clase 4 · Avanzar, sostener y mirar adentro',lessons:[N5L4a,N5L4b,N5L4c,N5L4d,N5L4e,N5L4f]},
   {title:'Clase 5 · Ciclos, equilibrio y entrega',lessons:[N5L5a,N5L5b,N5L5c,N5L5d,N5L5e,N5L5f]},
   {title:'Clase 6 · Transformación, sanación y sombra',lessons:[N5L6a,N5L6b,N5L6c,N5L6d,N5L6e,N5L6f]},
   {title:'Clase 7 · Ruptura, esperanza y mundo emocional',lessons:[N5L7a,N5L7b,N5L7c,N5L7d,N5L7e,N5L7f]},
   {title:'Clase 8 · Plenitud y cierre del viaje',lessons:[N5L8a,N5L8b,N5L8c,N5L8d,N5L8e,N5L8f]},
   {title:'Clase 9 · Los Menores y el fuego de los Bastos',lessons:[N5L9a,N5L9b,N5L9c,N5L9d,N5L9e,N5L9f]},
   {title:'Clase 10 · Bastos: el fuego que madura',lessons:[N5L10a,N5L10b,N5L10c,N5L10d,N5L10e]},
   {title:'Clase 11 · Copas: el agua del corazón',lessons:[N5L11a,N5L11b,N5L11c,N5L11d,N5L11e]},
   {title:'Clase 12 · Copas: el corazón que madura',lessons:[N5L12a,N5L12b,N5L12c,N5L12d,N5L12e]},
   {title:'Clase 13 · Espadas: el aire de la mente',lessons:[N5L13a,N5L13b,N5L13c,N5L13d,N5L13e]},
   {title:'Clase 14 · Espadas: la mente que se libera',lessons:[N5L14a,N5L14b,N5L14c,N5L14d,N5L14e]},
   {title:'Clase 15 · Oros: la tierra que sostiene',lessons:[N5L15a,N5L15b,N5L15c,N5L15d,N5L15e]},
   {title:'Clase 16 · Oros: la cosecha del camino',lessons:[N5L16a,N5L16b,N5L16c,N5L16d,N5L16e]}
  ]}
];
const allLessons=lv=>lv.modules.flatMap(m=>m.lessons);
const pct=lv=>{const a=allLessons(lv);return Math.round(a.filter(x=>x.done).length/a.length*100)};

const BADGES=[
 {id:'b1',lvl:1,name:'Iniciada del Péndulo',sub:'Nivel 1 · Péndulo Hebreo',hue:'#c98b3f',earned:'14 jun 2026'},
 {id:'b2',lvl:2,name:'Guardiana de Espacios',sub:'Nivel 2 · Limpieza de casas y espacios',hue:'#5d9c7f',earned:'12 sep 2026'},
 {id:'b3',lvl:3,name:'Sanadora del Alma',sub:'Nivel 3 · Radiestesia y Sanación del Alma',hue:'#7d6bb0'},
 {id:'b4c',lvl:4,name:'Niño Interior',sub:'Especialización · Nivel 4',hue:'#d08a6a'},
 {id:'b4a',lvl:4,name:'Vidas Pasadas',sub:'Especialización · Nivel 4',hue:'#4f7fb0'},
 {id:'b4b',lvl:4,name:'Linaje Sanado',sub:'Especialización · Terapia transgeneracional',hue:'#a0654f'},
 {id:'b4d',lvl:4,name:'Útero Sagrado',sub:'Especialización · Limpieza uterina',hue:'#b5607a'},
 {id:'b5',lvl:5,name:'Camino del Ser',sub:'Nivel 5 · Tarot Terapéutico',hue:'#3b6d74'}
];

/* tienda del aula: los productos de Casa Muladhara (los mismos de la página web y el mazo de tarot) */
const SHOP=[
 {id:'spray',name:'Spray Áurico de salvia, romero y lavanda',tag:'Spray · 30 ml',price:'$6.99',unit:'USD · 30 ml',img:'assets/img/c6ce786100.webp',
  alt:'Spray Áurico de 30 ml con la etiqueta verde y crema de Casa Muladhara',
  pts:['<b>Salvia:</b> limpia y renueva tu energía.','<b>Romero:</b> aporta protección, vitalidad y fuerza.','<b>Lavanda:</b> favorece la calma, la relajación y la armonía.','Rocía alrededor de tu cuerpo a 20 cm, con los ojos cerrados, o en tus espacios y objetos sagrados.']},
 {id:'tintura',name:'Tintura Madre de Muérdago',tag:'Tintura madre · 30 ml',price:'$9.99',unit:'USD · 30 ml',img:'assets/img/cdf5f76943.webp',
  alt:'Tintura Madre de Muérdago de 30 ml con la etiqueta verde y crema de Casa Muladhara',
  pts:['Viscum album, extracto puro, sin químicos añadidos.','Pensada para acompañar el trabajo con <b>Péndulo Hebreo</b>.','Limpieza, descarga y armonización, junto a las etiquetas hebreas y el trabajo vibracional del péndulo.'],warn:'Uso externo · No ingerir'},
 {id:'tarot',name:'Mazo de Tarot Terapéutico',tag:'Mazo · Arcanos Mayores y Menores',price:'$14.990',unit:'CLP',img:'assets/img/mazo-tarot.svg',
  alt:'Mazo de Tarot Terapéutico de Casa Muladhara',isNew:1,
  pts:['El mazo con el que trabajamos en el <b>Nivel 5 · Tarot Terapéutico: El Camino del Ser</b>.','Para tus prácticas de autoconocimiento y tus sesiones con consultantes.','Acompaña cada clase: las cartas que estudias son las que tienes en tus manos.']}
];

const CHANNELS=[
 {id:'general',name:'General'},{id:'presentaciones',name:'Preséntate'},
 {id:'n1',name:'Nivel 1 · Péndulo'},{id:'n2',name:'Nivel 2 · Espacios'},{id:'n3',name:'Nivel 3 · Radiestesia'},
 {id:'n4',name:'Nivel 4 · Especializaciones'},{id:'n5',name:'Nivel 5 · Tarot'},{id:'testimonios',name:'Testimonios'}
];
let POSTS=[];
const RES=[
 {t:'Tabla de etiquetas hebreas',type:'PDF',lvl:1,size:'860 KB',k:'pdf'},
 {t:'Meditación de protección',type:'Audio',lvl:1,size:'12 min',k:'mp3'},
 {t:'Protocolo de sanación resumido',type:'PDF',lvl:1,size:'640 KB',k:'pdf'},
 {t:'Etiquetas hebreas del Nivel 2',type:'PDF',lvl:2,size:'3 hojas',k:'pdf',href:'assets/n2/print/etiquetas_hebreas_nivel2.pdf'},
 {t:'Ficha de registro en blanco',type:'Plantilla',lvl:2,size:'1 hoja',k:'pdf',href:'assets/n2/print/ficha_de_registro.pdf'},
 {t:'Gráficos radiestésicos del Nivel 2',type:'PDF',lvl:2,size:'6 láminas',k:'pdf',href:'assets/n2/print/graficos_radiestesicos.pdf'},
 {t:'Mantras de los chakras',type:'PDF',lvl:3,size:'1 lámina',k:'pdf',href:'assets/n3/print/mantras_chakras.pdf',new:1},
 {t:'Clase 3 · Láminas de Tarot',type:'PDF',lvl:5,size:'20 láminas',k:'pdf',href:'assets/n5/print/clase3_laminas.pdf',new:1},
 {t:'Clase 4 · Láminas de Tarot',type:'PDF',lvl:5,size:'21 láminas',k:'pdf',href:'assets/n5/print/clase4_laminas.pdf',new:1},
 {t:'Clase 5 · Láminas de Tarot',type:'PDF',lvl:5,size:'20 láminas',k:'pdf',href:'assets/n5/print/clase5_laminas.pdf',new:1},
 {t:'Clase 6 · Láminas de Tarot',type:'PDF',lvl:5,size:'20 láminas',k:'pdf',href:'assets/n5/print/clase6_laminas.pdf',new:1},
 {t:'Clase 7 · Láminas de Tarot',type:'PDF',lvl:5,size:'20 láminas',k:'pdf',href:'assets/n5/print/clase7_laminas.pdf',new:1},
 {t:'Clase 8 · Láminas de Tarot',type:'PDF',lvl:5,size:'21 láminas',k:'pdf',href:'assets/n5/print/clase8_laminas.pdf',new:1},
 {t:'Clase 9 · Láminas de Tarot',type:'PDF',lvl:5,size:'20 láminas',k:'pdf',href:'assets/n5/print/clase9_laminas.pdf',new:1},
 {t:'Clase 10 · Láminas de Tarot',type:'PDF',lvl:5,size:'16 láminas',k:'pdf',href:'assets/n5/print/clase10_laminas.pdf',new:1},
 {t:'Clase 11 · Láminas de Tarot',type:'PDF',lvl:5,size:'16 láminas',k:'pdf',href:'assets/n5/print/clase11_laminas.pdf',new:1},
 {t:'Clase 12 · Láminas de Tarot',type:'PDF',lvl:5,size:'17 láminas',k:'pdf',href:'assets/n5/print/clase12_laminas.pdf',new:1},
 {t:'Clase 13 · Láminas de Tarot',type:'PDF',lvl:5,size:'16 láminas',k:'pdf',href:'assets/n5/print/clase13_laminas.pdf',new:1},
 {t:'Clase 14 · Láminas de Tarot',type:'PDF',lvl:5,size:'17 láminas',k:'pdf',href:'assets/n5/print/clase14_laminas.pdf',new:1},
 {t:'Clase 15 · Láminas de Tarot',type:'PDF',lvl:5,size:'16 láminas',k:'pdf',href:'assets/n5/print/clase15_laminas.pdf',new:1},
 {t:'Clase 16 · Láminas de Tarot',type:'PDF',lvl:5,size:'18 láminas',k:'pdf',href:'assets/n5/print/clase16_laminas.pdf',new:1},
 {t:'Clase 2 · Láminas de Tarot',type:'PDF',lvl:5,size:'20 láminas',k:'pdf',href:'assets/n5/print/clase2_laminas.pdf',new:1},
 {t:'Clase 1 · Láminas de Tarot',type:'PDF',lvl:5,size:'19 láminas',k:'pdf',href:'assets/n5/print/clase1_laminas.pdf',new:1},
 {t:'Clase 8 · Láminas',type:'PDF',lvl:3,size:'32 láminas',k:'pdf',href:'assets/n3/print/clase8_laminas.pdf',new:1},
 {t:'Clase 7 · Láminas',type:'PDF',lvl:3,size:'22 láminas',k:'pdf',href:'assets/n3/print/clase7_laminas.pdf',new:1},
 {t:'Clase 6 · Láminas',type:'PDF',lvl:3,size:'19 láminas',k:'pdf',href:'assets/n3/print/clase6_laminas.pdf',new:1},
 {t:'Clase 5 · Láminas',type:'PDF',lvl:3,size:'25 láminas',k:'pdf',href:'assets/n3/print/clase5_laminas.pdf',new:1},
 {t:'Clase 4 · Láminas',type:'PDF',lvl:3,size:'26 láminas',k:'pdf',href:'assets/n3/print/clase4_laminas.pdf',new:1},
 {t:'Clase 3 · Gráficos y protocolo',type:'PDF',lvl:3,size:'7 láminas',k:'pdf',href:'assets/n3/print/clase3_graficos_y_protocolo.pdf',new:1},
 {t:'Clase 1 · Ejercicios y reflexión',type:'Plantilla',lvl:3,size:'2 hojas',k:'pdf',href:'assets/n3/print/clase1_ejercicios_y_reflexion.pdf'},
 {t:'Meditación de limpieza del aura',type:'Audio',lvl:3,size:'18 min',k:'mp3'},
 {t:'Ficha de registro de sesión',type:'Plantilla',lvl:0,size:'180 KB',k:'doc'},
 {t:'Consentimiento informado para consultantes',type:'Plantilla',lvl:0,size:'120 KB',k:'doc'},
 {t:'Cómo cobrar y agendar tus primeras sesiones',type:'Video',lvl:0,size:'24 min',k:'mp4'},
 {t:'Glosario holístico',type:'PDF',lvl:0,size:'1,4 MB',k:'pdf'},
 {t:'Meditación de raíz (chakra Muladhara)',type:'Audio',lvl:0,size:'20 min',k:'mp3'},
 {t:'Bibliografía recomendada',type:'PDF',lvl:0,size:'300 KB',k:'pdf'}
];
const FAQ={
 cuenta:{name:'Acceso y cuenta',ic:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',q:[
  ['Olvidé mi contraseña, ¿cómo la recupero?','En la pantalla de ingreso toca "Olvidé mi contraseña" y te llegará un enlace a tu correo. Revisa también la carpeta de spam.'],
  ['¿Puedo ver las clases desde el celular?','Sí. El aula funciona en cualquier navegador del celular, tablet o computador, sin instalar nada.'],
  ['¿Por cuánto tiempo tengo acceso a las grabaciones?','Mientras estés en la formación y hasta 12 meses después de terminar tu último nivel.']]},
 clases:{name:'Clases en vivo',ic:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',q:[
  ['¿Dónde entro a la clase en vivo?','En Calendario, el botón "Entrar a la clase" se activa 15 minutos antes de comenzar.'],
  ['No pude asistir, ¿dónde queda la grabación?','Cada clase queda grabada dentro de su nivel en Mi formación, normalmente el mismo día.'],
  ['¿Cómo hago una pregunta sobre una clase?','Dentro de cada clase está la pestaña "Preguntas". La Maestra Holística responde ahí para que todas aprendan.']]},
 pagos:{name:'Pagos e inscripciones',ic:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/>',q:[
  ['¿Puedo pagar en cuotas?','Sí, cada nivel se puede pagar en cuotas. El detalle aparece al inscribirte.'],
  ['¿Cómo me inscribo al siguiente nivel?','Cuando completes un nivel aparecerá el botón "Inscribirme" en el siguiente. Si eres alumna de la formación completa se desbloquea solo.']]},
 cert:{name:'Insignias y certificados',ic:'<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/>',q:[
  ['¿Cuándo recibo mi insignia?','Al completar todas las clases y la práctica final de un nivel. Aparece de inmediato en Insignias y te llega un correo.'],
  ['¿Cómo obtengo el certificado de Terapeuta Holístico Integral?','Al completar los cinco niveles, incluidas las cuatro especializaciones del Nivel 4. Podrás descargarlo en PDF desde Insignias.'],
  ['¿Puedo compartir mi insignia en redes?','Sí, cada insignia tiene un botón para compartirla en Instagram, Facebook o LinkedIn.']]}
};
