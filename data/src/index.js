"use strict";

import fs from 'fs'
const path = require('path');
const load = require('cheerio').load;

const RAW_DATA = path.join(__dirname, '../raw/tg.html');
const OUTPUT = path.join(__dirname, '../output/entries.json');
const CATEGORIES = ["BancoDeDados", "WordPress", "Vagas", "Cloud", "Servers", "Regional", "Virtualização", "Windows", "Gestão", "Android", "Segurança", "TI", "Web", "Hacktivismo", "Design", "Robótica", "Tech", "BSD", "Redes", "Hacking", "Notícias", "Software", "Humor", "DataScience", "MachineLearning", "Linux", "MoedaVirtual", "Hardware", "Apple", "Office", "Oracle", "SoftwareLivre", "Wallpapers", "Mobile", "Telegram", "Geral", "Impressão3D", "Gaming", "Programação", "Outros"];

function getEntries(html) {
  const $ = load(html);
  let entries = {
    grupo: [],
    canal: [],
    desconhecido: []
  }

  $('.im_message_text, .im_message_photo_caption').each((i, el) => {
    let tags = $(el).find('[href^="tg://search_hashtag"]').text();
    if (!tags.length || tags.match(/Evento|Palestra|Live/g)) return

    let desc = $(el).clone().children('[href^="tg://search_hashtag"]').remove().end().find('br').replaceWith(' ').end().text().trim().replace(/^-\s/, '').replace(/\s\s+/g, ' ');
    let link = $(el).find('[href^="tg://join"],[href^="tg://resolve"],[href^="https://www.telegram.me/"]').text();
    if (!link.length) return

    let chatType = tags.match(/Grupo|Canal/g)
    if (!chatType) {
      chatType = desc.match(/Grupo|Canal/gi)
    }
    chatType = chatType ? chatType[0].toLowerCase() : 'desconhecido'

    entries[chatType].push({
      tags: tags.replace(/^#/, '').split('#'),
      desc: desc,
      link: link
    })
  })

  // const filtered = entries.filter(item => {
  //   return (item.tags.length && item.link.length && !item.tags.match(/Evento|Palestra/g))
  // })
  // const jeyzon = {
  //   grupos: filtered.
  // }
  // console.log(`${filtered.length} grupos/canais encontrados`);
  Object.keys(entries).forEach(key => {
    console.log(`${key}: ${entries[key].length}`);
  })
  return JSON.stringify(entries, null, '  ');
}

function parse(path) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) return console.log(err);
    fs.writeFile(OUTPUT, getEntries(data), (err) => {
      if (err) return console.log(err);
      console.log('Salvo em:', OUTPUT);
    });
  })
}

parse(RAW_DATA);
