const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { nombre, correo, comentario, autorizacion } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Nombre del remitente" <remitente@example.com>`,
      to: 'serviciocoravi.sas@gmail.com',
      subject: 'Comentario',
      html: `
        <p>Nombre: ${nombre}</p>
        <p>Correo: ${correo}</p>
        <p>Comentario: ${comentario}</p>
        <p>Autorización de comunicaciones: ${autorizacion ? 'Sí' : 'No'}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Correo enviado con éxito. URL del mensaje de prueba:', nodemailer.getTestMessageUrl(info));

    res.status(200).send('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send(error.toString());
  }
});


app.post('/send-email-form2', async (req, res) => {
  const { nombre, telefono, correo, comentario, autorizacion, fecha } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Formatear la fecha
    const formattedFecha = new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const mailOptions = {
      from: `"Nombre del remitente" <remitente@example.com>`,
      to: 'serviciocoravi.sas@gmail.com',
      subject: 'Agendamiento de cita',
      html: `
        <p>Nombre: ${nombre}</p>
        <p>Teléfono: ${telefono}</p>
        <p>Correo: ${correo}</p>
        <p>Comentario: ${comentario}</p>
        <p>Autorización de comunicaciones: ${autorizacion ? 'Sí' : 'No'}</p>
        <p>Fecha de la cita: ${formattedFecha}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Correo enviado con éxito. URL del mensaje de prueba:', nodemailer.getTestMessageUrl(info));

    res.status(200).send('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send(error.toString());
  }
});

app.post('/subscribe', async (req, res) => {
  const { nombre, correo } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Nombre del remitente" <remitente@example.com>`,
      to: 'sbstzuluaga1111@gmail.com', // Cambia esto al destinatario correcto
      subject: 'Nueva suscripción',
      html: `
        <p>Nombre: ${nombre}</p>
        <p>Correo: ${correo}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Correo enviado con éxito. URL del mensaje de prueba:', nodemailer.getTestMessageUrl(info));

    res.status(200).send('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send(error.toString());
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
