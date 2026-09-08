# Marketing para Venta de Parcelas — Chile

Sitio web estático, mobile-first, para una agencia de marketing especializada en la **venta de parcelas y loteos** en Chile. Listo para publicar gratis con GitHub Pages.

## Archivos

- `index.html` — estructura y contenido del sitio
- `styles.css` — estilos (incluye el formulario de contacto)
- `script.js` — menú, animaciones y lógica del formulario de leads

## Contacto

- **WhatsApp:** el botón flotante y los botones principales enlazan a `https://wa.me/56....`.
  Para cambiar el número, busca `569...` en `index.html` y la constante `WA_NUMBER` en `script.js`.
- **Correo:** el formulario puede enviar los datos a `marketingprofesionalchile@gmail.com`.
  Para cambiarlo, edita la constante `CONTACT_EMAIL` en `script.js`.

## Formulario de leads

El formulario de la sección "Cotiza tu proyecto" no usa base de datos. Al enviar:
- **Enviar por WhatsApp:** abre WhatsApp con los datos ya redactados hacia tu número.
- **Prefiero enviar por correo:** abre el cliente de correo del visitante con el mensaje listo hacia tu Gmail.

Requiere al menos nombre y teléfono.

## Publicar con GitHub Pages

1. Sube los archivos a la raíz del repositorio.
2. En GitHub, entra a **Settings > Pages**.
3. En "Build and deployment", elige **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`. Guarda.

### Por línea de comandos

```
git add .
git commit -m "Sitio orientado a venta de parcelas + formulario de leads"
git push
```
