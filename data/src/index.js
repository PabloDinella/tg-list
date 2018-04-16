"use strict";

const fs = require('fs');
const path = require('path');
const load = require('cheerio').load;
const request = require('request-promise');
const normalizeUrl = require('normalize-url');

const RAW_DATA = path.join(__dirname, '../raw/tg.html');
const OUTPUT = path.join(__dirname, '../output/entries.json');
const CATEGORIES = ["BancoDeDados", "WordPress", "Vagas", "Cloud", "Servers", "Regional", "Virtualização", "Windows", "Gestão", "Android", "Segurança", "TI", "Web", "Hacktivismo", "Design", "Robótica", "Tech", "BSD", "Redes", "Hacking", "Notícias", "Software", "Humor", "DataScience", "MachineLearning", "Linux", "MoedaVirtual", "Hardware", "Apple", "Office", "Oracle", "SoftwareLivre", "Wallpapers", "Mobile", "Telegram", "Geral", "Impressão3D", "Gaming", "Programação", "Outros"];

async function getEntries(html) {
  const $ = load(html);
  let entries = {
    group: [],
    channel: [],
  }

    // $('.im_message_text, .im_message_photo_caption').each(async (i, el) => {
    const chats = $('.im_message_text, .im_message_photo_caption').map((i, el) => {
      return el
    }).get()

    const chats2 = chats.slice(54, 68)
    for (let el of chats) {
      let tags = $(el).find('[href^="tg://search_hashtag"]').text();
      if (!tags.length || tags.match(/Evento|Palestra|Live/g)) continue

      let desc = $(el).clone().children('[href^="tg://search_hashtag"]').remove().end().find('br').replaceWith(' ').end().text().trim().replace(/^-\s/, '').replace(/\s\s+/g, ' ');
      let link = $(el).find('[href^="tg://join"],[href^="tg://resolve"],[href^="https://www.telegram.me/"]').text()
      if (!link.length) continue
      link = normalizeUrl(link)

      try {
        const webogramHtml = await request(link.search(/^http/) === -1 ? `https://${link}` : link)
        const j = load(webogramHtml)

        const image = j('.tgme_page_photo a img').first().attr('src')
        const title = j('.tgme_page_title').text().trim()
        if (!title) {
          continue
        }
        const participants = parseInt(j('.tgme_page_extra').text().replace(' ', ''))
        const description = j('.tgme_page_description').text().trim()
        const join = j('.tgme_page_photo a').first().attr('href')
        const chatType = j('.tgme_action_button_new').text().toLowerCase().match(/channel|group/)[0]
        console.log('--->', JSON.stringify([title, link, chatType, participants], ' '));

        entries[chatType].push({
          tags: tags.replace(/^#/, '').split('#'),
          desc: description ? description : desc,
          title,
          image,
          participants,
          join,
          link: link
        })
      } catch (e) {
        console.warn('erro', e);
      }
    }
    // })

    // const filtered = entries.filter(item => {
    //   return (item.tags.length && item.link.length && !item.tags.match(/Evento|Palestra/g))
    // })
    // const jeyzon = {
    //   grupos: filtered.
    // }
    // console.log(`${filtered.length} grupos/canais encontrados`);
    console.log('final');
    Object.keys(entries).forEach(key => {
      console.log(`${key}: ${entries[key].length}`);
    })
    return JSON.stringify(entries, null, '  ');
}

function parse(path) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) return console.log(err);
    getEntries(data)
      .then(result => {
        fs.writeFile(OUTPUT, result, (err) => {
          if (err) return console.log(err);
          console.log('Salvo em:', OUTPUT, result);
        });
      })
  })
}

parse(RAW_DATA);
