require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

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
      to: 'sbstzuluaga1111@gmail.com',
      subject: 'Nuevo formulario de sugerencias',
      html: `<p>Nombre: ${nombre}</p><p>Correo: ${correo}</p><p>Comentario: ${comentario}</p><p>Autorización: ${autorizacion ? 'Sí' : 'No'}</p>`,
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
