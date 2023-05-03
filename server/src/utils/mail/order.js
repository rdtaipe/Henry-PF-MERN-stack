import cheerio from 'cheerio';
import fs from 'fs';



const Document = cheerio.load(fs.readFileSync('./src/utils/mail/templates/document.html', 'utf8'))
const Footer = cheerio.load(fs.readFileSync('./src/utils/mail/templates/footer.html', 'utf8'))
const Header = cheerio.load(fs.readFileSync('./src/utils/mail/templates/header.html', 'utf8'))



export default function Order(user,data) {
    // console.log(user,data)
    var brand="ChicCloset"
    const msg = {
        title: `Thank you for purchase in ${brand}`,
        intro: `¡Hi ${user.name}!`,
        body: `
        <h4>you products</h4>
        
        <ul>
        ${data.map(item=>{
            return` <li>${item.name} </li>`
        })}
        </ul>
        
        `
    }
    Document('#title').text(msg.title)
    Document('#intro').text(msg.intro)
    Document('#body').html(msg.body)
    Document('#header').html(Header.html())
    Document('#footer').html(Footer.html())

    return Document.html()
  
}
