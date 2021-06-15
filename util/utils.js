module.exports = (client) => {

  client.toProperCase = (t) => {
    // if (!t || typeof t == "string") return t;
    return t.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  String.prototype.toProperCase = (t) => {
    if (!t || typeof t == "string") return t;
    return t.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  String.prototype.capitalize = (t) => {
    return t.charAt(0).toUpperCase() + t.slice(1)
  }

  Array.prototype.random = () => {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == 'Promise')
      text = await text;
    if (typeof evaled !== 'string')
      text = require('util').inspect(text, {
        depth: 1
      });

    text = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replace(client.settings.token, 'NO--TOKEN--4U');

    return text;
  };
};
