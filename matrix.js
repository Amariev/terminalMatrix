const chars =
  'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMабвгдежзиклмнопрстуфхцчшщъыьэюяАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯαβγδεζηθικλμνξοπρστυφχψωςΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ1234567890`-=~!@#$%^&*()_+[]{}|;\':",./<>?"';

const colors = {
  red: "\x1b[31m",
  green: "\x1b[38;5;46m",
  yellow: "\x1b[33m",
  blue: "\x1b[38;5;33m",
  magenta: "\x1b[35m",
};

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function strGenerator(len) {
  let newString = "";
  for (let i = 0; i < len; i++) {
    newString += chars[randomNum(0, chars.length - 1)];
  }
  return newString;
}

function linesGenerator(count) {
  let lines = [];
  for (let i = 0; i < count; i++) {
    const strLen = randomNum(5, 20);
    let line = strGenerator(strLen);
    let lineObj = {
        str: line,
        speed: randomNum(1, 3)
    }
    lines.push(lineObj);
  }
  return lines;
}

let cmdColumns = process.stdout.columns;
let cmdLines = process.stdout.rows;
let screenSizeX = cmdColumns / 2 - 1;
let screenSizeY = cmdLines - 1;
let lines = linesGenerator(screenSizeX);
let pos = [];

const timeOut = 1000;

setInterval(() => {
  if (cmdColumns !== process.stdout.columns || cmdLines !== process.stdout.rows) {
    cmdColumns = process.stdout.columns;
    cmdLines = process.stdout.rows;
    screenSizeX = cmdColumns / 2 - 1;
    screenSizeY = cmdLines - 1;
    lines = linesGenerator(screenSizeX);
    pos = [];
    console.clear();
  }

  let finalStrings = [];
  for (let i = 0; i < lines.length; i++) {
    if (!pos[i]) pos[i] = randomNum(0, screenSizeY - lines[i].str.length);

    let str = `${" ".repeat(pos[i])}${lines[i].str}`
    if (str.length <= screenSizeY) {
        str = str + " ".repeat(screenSizeY - str.length)
    } else {
        let extra = str.substring(screenSizeY); // lo que sobra
        if (extra.length >= lines[i].str.length) pos[i] = 0;
        str = extra + str;
    }
    finalStrings.push(str);
    pos[i] += lines[i].speed;
    lines[i].str = lines[i].str.substring(1, lines[i].str.length) + strGenerator(1);
  }

  console.clear();
  for (let i = 0; i < screenSizeY; i++) {
    let finalStr = finalStrings.map(str => str[i]).join(" ");
    console.log(colors.yellow, finalStr);
  }
}, timeOut);
