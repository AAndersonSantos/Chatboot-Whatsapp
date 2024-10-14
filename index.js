const qrcode = require("qrcode-terminal");
const { Client, Buttons, List, MessageMedia } = require("whatsapp-web.js");
const express = require("express"); // Adicionando o express
const fs = require("fs");

const app = express();
const client = new Client();

// Rota para exibir o QR code em uma página da web
app.get("/qr", (req, res) => {
  res.sendFile(__dirname + "/qr.html"); // Servir o arquivo HTML com o QR code
});

// serviço de leitura do qr code
client.on("qr", (qr) => {
  // Gera um arquivo PNG do QR code
  const qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?data=${qr}&size=200x200`;

  // Cria um arquivo HTML simples que mostra o QR code
  fs.writeFileSync(
    "qr.html",
    `<html><body><h1>Escaneie o QR Code com o WhatsApp</h1><img src="${qrCodeImage}" /></body></html>`
  );

  console.log(
    "QR code atualizado! Acesse http://localhost:3000 para escanear."
  );
});

// Após isso, ele diz que foi tudo certo
client.on("ready", () => {
  console.log("Tudo certo! WhatsApp conectado.");
});

// Inicializa o cliente do WhatsApp
client.initialize();

// Função de delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Funil de mensagens
client.on("message", async (msg) => {
  if (
    msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) &&
    msg.from.endsWith("@c.us")
  ) {
    const chat = await msg.getChat();

    await delay(3000); // Delay de 3 segundos
    await chat.sendStateTyping(); // Simulando digitação
    await delay(3000); // Delay de 3000 milissegundos (3 segundos)
    const contact = await msg.getContact();
    const name = contact.pushname;
    await client.sendMessage(
      msg.from,
      `Olá ${
        name.split(" ")[0]
      }! Sou o assistente virtual. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n1 - Fazer uma compra\n2 - Atendimento`
    );
  }

  if (msg.body === "1" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Está com alguma dificuldade para realizar uma compra ou tem dúvidas sobre algum produto? Selecione uma das opções abaixo:\n\n3 - Dúvidas sobre um produto\n4 - Dificuldade ao realizar a compra\n5 - Falar com o atendimento\n6 - Voltar ao menu anterior"
    );
  }

  if (msg.body === "2" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Certo! Vou te encaminhar para um atendente. Enquanto isso, pode me contar como podemos te ajudar."
    );
  }

  if (msg.body !== null && msg.body === "3" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Certo! Vou te encaminhar para um atendente. Enquanto isso, pode me informar qual a sua dúvida sobre o produto? Assim, podemos agilizar o atendimento."
    ); //Primeira mensagem de texto

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(5000); //Delay de 5 segundos
  }

  if (msg.body !== null && msg.body === "4" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Certo! Vou te encaminhar para um atendente. Enquanto isso, pode me informar qual é o problema ao realizar sua compra? Assim, podemos agilizar o atendimento."
    ); //Primeira mensagem de texto

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(5000); //Delay de 5 segundos
  }

  if (msg.body !== null && msg.body === "5" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Certo! Vou te encaminhar para um atendente. Enquanto isso, pode me contar como podemos te ajudar."
    ); //Primeira mensagem de texto

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(5000); //Delay de 5 segundos
  }

  if (msg.body !== null && msg.body === "6" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    const contact = await msg.getContact(); //Pegando o contato
    const name = contact.pushname; //Pegando o nome do contato
    await client.sendMessage(
      msg.from,
      " Digite uma das opções abaixo:\n\n1 - Fazer uma compra\n2 - Atendimento"
    ); //Primeira mensagem de texto

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(5000); //Delay de 5 segundos
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
