// leitor de qr code
const qrcode = require("qrcode-terminal");
const { Client, Buttons, List, MessageMedia } = require("whatsapp-web.js"); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
// apos isso ele diz que foi tudo certo
client.on("ready", () => {
  console.log("Tudo certo! WhatsApp conectado.");
});
// E inicializa tudo
client.initialize();

const delay = (ms) => new Promise((res) => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

client.on("message", async (msg) => {
  if (
    msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) &&
    msg.from.endsWith("@c.us")
  ) {
    const chat = await msg.getChat();

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
    const contact = await msg.getContact(); //Pegando o contato
    const name = contact.pushname; //Pegando o nome do contato
    await client.sendMessage(
      msg.from,
      "Olá! " +
        name.split(" ")[0] +
        " Sou o assistente virtual. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n1 - Fazer uma compra\n2 - Atendimento"
    ); //Primeira mensagem de texto

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(5000); //Delay de 5 segundos
  }

  if (msg.body !== null && msg.body === "1" && msg.from.endsWith("@c.us")) {
    const chat = await msg.getChat();

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(3000);
    await client.sendMessage(
      msg.from,
      "Está com alguma dificuldade para realizar uma compra ou tem dúvidas sobre algum produto? Selecione uma das opções abaixo para que possamos te ajudar:\n\n3 - Dúvidas sobre um produto\n4 - Dificuldade ao realizar a compra\n5 - Falar com o atendimenton\n6 - Voltar ao menu anterior"
    ); //Primeira mensagem de texto

    await delay(3000); //delay de 3 segundos
    await chat.sendStateTyping(); // Simulando Digitação
    await delay(5000); //Delay de 5 segundos
  }

  if (msg.body !== null && msg.body === "2" && msg.from.endsWith("@c.us")) {
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
