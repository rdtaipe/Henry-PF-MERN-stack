import cheerio from 'cheerio';
import fs from 'fs';



const Document = cheerio.load(fs.readFileSync('./src/utils/mail/templates/document.html', 'utf8'))
const Footer = cheerio.load(fs.readFileSync('./src/utils/mail/templates/footer.html', 'utf8'))
const Header = cheerio.load(fs.readFileSync('./src/utils/mail/templates/header.html', 'utf8'))





export default ({name}) => {
    var brand="ChicCloset"
    const msg = {
        title: `Bienvenido a ${brand}`,
        intro: `¡Hola ${name}!`,
        body: `<p>¡Hola! Gracias por registrarte en nuetro sitio web. Estoy muy emocionado de tenerte aquí y espero que disfrutes de todo lo que tengo que ofrecer. Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarme. </p>
        <p>¡Gracias de nuevo por unirte a mi comunidad!</p>
        <p>Atentamente,</p>
        <p>${brand}</p>`
    }
    Document('#title').text(msg.title)
    Document('#intro').text(msg.intro)
    Document('#body').html(msg.body)
    Document('#header').html(Header.html())
    Document('#footer').html(Footer.html())

    return Document.html()
}