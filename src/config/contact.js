/**
 * MSS-DATA — Configuración central de contacto
 * -------------------------------------------------------------------
 * Único lugar que hay que tocar para cambiar a dónde llegan los leads.
 *
 * CÓMO ACTIVAR EL ENVÍO POR CORREO (gratis, sin backend):
 *   1. Entra a https://web3forms.com y pon el correo que recibirá los leads.
 *   2. Te llega una "Access Key" por correo (un UUID). Pégala en la raíz del
 *      proyecto dentro de un archivo .env:
 *
 *        PUBLIC_WEB3FORMS_KEY=tu-access-key-aqui
 *
 *   3. Listo. Sin clave, el formulario sigue funcionando: cae automáticamente
 *      al modo mailto (abre el cliente de correo del visitante).
 *
 * La Access Key es pública por diseño (va en el HTML). No es un secreto,
 * pero igual la leemos de .env para no quemarla en el repositorio.
 */

export const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '';

/**
 * ¿La cuenta de Web3Forms es de pago?
 *
 * IMPORTANTE: el plan GRATUITO envía a UN SOLO destinatario. El campo `ccemail`
 * es exclusivo del plan Pro, así que mientras esto sea `false` no se emite
 * (emitirlo no haría nada y además regalaría los tres correos a los bots).
 *
 * Para que los tres reciban el lead sin pagar, ver NOTIFY_EMAILS abajo.
 */
export const WEB3FORMS_PRO = false;

/**
 * Socios que deben enterarse de cada lead.
 *
 * En plan gratuito esta lista NO se renderiza en el HTML: es documentación.
 * El reparto se resuelve del lado del correo, con una de estas dos opciones:
 *
 *   OPCIÓN 1 (recomendada) — Grupo de Google, gratis:
 *     Crear groups.google.com → p. ej. leads@mssdataperu.com (o un grupo
 *     con dirección @googlegroups.com), agregar a los tres como miembros y
 *     registrar ESA dirección como destinatario en Web3Forms.
 *     Ventaja: entra y sale gente del grupo sin tocar el código ni la web.
 *
 *   OPCIÓN 2 — Reenvío automático en Gmail:
 *     En el Gmail que recibe, Configuración → Reenvío, verificar las otras
 *     dos direcciones y crear un filtro que reenvíe los correos de
 *     Web3Forms. Gmail exige verificar cada dirección una sola vez.
 */
export const NOTIFY_EMAILS = [
  'alessandrosamaniegoq@gmail.com',
  'alfredo041000@gmail.com',
  'franchelo202@gmail.com',
];

/** Correo que se muestra en la web y se usa para el fallback mailto. */
export const PUBLIC_EMAIL = 'contacto@mssdataperu.com';

/**
 * Números de WhatsApp de los socios, en formato internacional sin "+",
 * sin espacios y sin guiones (así lo exige la API de wa.me).
 * El orden define la rotación de leads: el botón flotante reparte las
 * consultas entre los tres de forma pareja.
 *
 * TODO (ustedes): corregir los nombres, los puse por orden de la lista.
 */
export const WHATSAPP_CONTACTS = [
  { id: 'alessandro', name: 'Alessandro', phone: '51994129629' },
  { id: 'alfredo', name: 'Alfredo', phone: '51920602563' },
  { id: 'franchelo', name: 'Franchelo', phone: '51961409439' },
];

/** Horario de atención mostrado en el panel de WhatsApp. */
export const BUSINESS_HOURS = { start: 9, end: 19, timezone: 'America/Lima' };
