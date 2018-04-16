const fs = require('fs');
const path = require('path');
const entries = require('../output/entries.json');

function struct() {
  // const chats = entries.grupo.reduce((acc, item) => {
  //   // const tag = acc[item.tags[0]] || []
  //
  //   const tags = item.tags.reduce((acc2, tag) => {
  //     const a = acc[tag]
  //     return {...acc2, ...a} || acc2;
  //   }, {})
  //
  //   const tags2 = Object.keys(tags).map(t => {
  //     return {
  //       ...t,
  //       [item.title]: item,
  //     };
  //   })
  //
  //   return {
  //     ...acc,
  //     ...tags2,
  //   }
  // }, {})

  let chats = {}

  const work = (g, type) => {
    g.tags.forEach(t => {
      chats[t] = {
        ...chats[t],
        [g.title]: {
          ...g,
          type,
        },
      }
    })
  }

  entries.group.forEach((entry) => {work(entry, 'group')})
  entries.channel.forEach((entry) => {work(entry, 'channel')})

  fs.writeFile(
    path.join(__dirname, '..', 'output', 'entries-normalized.json'),
    JSON.stringify(chats, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('SUCCESS');
      }
    },
  );
}

struct()
