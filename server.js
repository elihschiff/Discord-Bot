//Keeps the bot alive on glitch.com
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 200000);




const Discord = require('discord.js');
const client = new Discord.Client();


///////Security Code
var secretMessageCode
secretMessageCode = generateCode()
console.log(secretMessageCode);
function generateCode() {
  var text = "!";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
  text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
///////Security Code


//Code runs when the bot starts up
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('try !mom-help', {
    type: 'playing'
  })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
});



//Code runs whenever a message is sent in the chat
client.on('message', msg => {


  //Mom Bot will reply F to pay her respects
  if (msg.content.toLowerCase() === 'f') {
    if (msg.author.username != "Mom Bot" && msg.author.username != "Tester Bot" && msg.author.bot == false) {
      msg.channel.send('f');
    }
  }

  //Mom Bot is a person of faith
  if (msg.content.toLowerCase().includes("christian server")) {
    if (msg.author.username != "Mom Bot" && msg.author.username != "Tester Bot") {
      msg.channel.send('Amen to that');
    }
  }

  //Randomly when somebody mentions RPI (the college) Mom Bot makes a joke about how RPI is close to RIP
  if (msg.content.toLowerCase().includes("rpi")) {
    if (msg.author.username != "Mom Bot" && msg.author.username != "Tester Bot") {
      if (Math.floor(Math.random() * 10) == 3) {
        msg.channel.send("RPI more like RIP you wallet :coffin: :money_mouth: :moneybag: <https://www.cbsnews.com/pictures/the-50-most-expensive-us-colleges/28/>");
      }
    }
  }

  //Telling somebody that they will not do something is a form of peer pressure that Mom Bot does not like and therefore she reminds everyone to be kind to eachother
  if (msg.content.toLowerCase().includes("you wont") || msg.content.toLowerCase().includes("u wont")) {
    if (msg.author.username != "Mom Bot" && msg.author.username != "Tester Bot") {
      //if (Math.floor(Math.random() * 2) == 1) {
        msg.channel.send("As your mom I just want to remind you that peer pressure is not nice. If you keep this up I will have no choice but to take away the internets from you.");
      //}
    }
  }

  //Finds a random gif for a given topic
  //Example: "!gif book" returns a random gif relating to a book
  if (msg.content.toLowerCase().startsWith("!gif ")) {
    var request = require("request")
    var url = "http://api.giphy.com/v1/gifs/random?api_key=" + process.env.GIF_API_KEY + "&rating=pg-13&tag="
    url += msg.content.substring(msg.content.indexOf(' ') + 1)
    console.log(url)
    request({
      url: url,
      json: true
    }, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        try {
          console.log(body.data.images.original.url) // Print the json response
          msg.channel.send(body.data.images.original.url);
        } catch (e) {}
      }
    })
  }

  //Finds the weather for a given zip code
  //Example: "!weather 20500" returns the weather for the White House as that is the zip code of the White House
  //Example: "!weather" returns the weather for Troy NY which is the location of the college of the group for which this bot was made
  if (msg.content.toLowerCase().startsWith("!weather")) {
    var request = require("request")
    var url = "http://api.wunderground.com/api/" + process.env.WEATHER_API_KEY + "/conditions/q/CA/"
    if (msg.content.indexOf(' ') > 0) {
      url += msg.content.substring(msg.content.indexOf(' ') + 1)
    } else {
      url += "12180"
    }
    url += ".json"
    console.log(url)
    request({
      url: url,
      json: true
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          var value = "It is currently "
          value += body.current_observation.weather
          value += " and feels like "
          value += body.current_observation.feelslike_string
          value += " in "
          value += body.current_observation.display_location.full
          value += ". "
          //console.log(body.current_observation) // Print the json response
          msg.channel.send(value);
        } catch (e) {}
      }
    })
  }

  //Responds with a yo mamma joke
  //Example: "!yo mamma" with a joke
  if (msg.content.toLowerCase() == ("yo momma") || msg.content.toLowerCase() == ("yo mama")) {
    var request = require("request")
    var yomomaJokeUrl = "http://api.yomomma.info/"
    request({
      url: yomomaJokeUrl,
      json: true
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log(body) // Print the json response
        try {
          var joke = body.joke.toString()
          joke = "so fat" + joke.substring(joke.indexOf("so fat") + "so fat".length);
          msg.channel.send(joke);
        } catch (e) {}
      }
    })
  }

  //Gets info on the next rocket launch from around the world
  //Example: "!launch" responds with a date, type of rocket, and payload for the next rocket launch
  //Example: "!launch falcon 9 " responds with a date, type of rocket, and payload for the next rocket launch on a falcon 9 rocket
  if (msg.content.toLowerCase().startsWith("!launch") || msg.content.toLowerCase().startsWith("!rocket")) {
    var request = require("request")
    var URL
    if (msg.content.indexOf(' ') == -1) {
      URL = "https://launchlibrary.net/1.4/launch/next/1"
    } else {
      URL = "https://launchlibrary.net/1.4/launch/" + msg.content.substring(msg.content.indexOf(' ') + 1) + "?next=1"
      console.log(URL)
    }
    request({
      url: URL,
      json: true
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        //console.log("Result: %j", body)
        try {
          var text = "Launching next on " + body.launches[0].net + ', atop the ' + body.launches[0].lsp.name + ' ' + body.launches[0].rocket.name + ' rocket, will be ' + body.launches[0].missions[0].name + ' '
          //console.log(text)
          msg.channel.send(text);
        } catch (e) {}
      }else{
        msg.channel.send('Sorry I could not find a launch matching your request for "' + msg.content.substring(msg.content.indexOf(' ') + 1) + '"\nCurrently you can only search by rocket type such as "Atlas V" or "Falcon 9"\nIf you just want the next launch please type "!rocket"');
      }
    })
  }

  //Gets top news articles from around the web on a specific topic
  //Example: "!news" responds with a top news article
  //Example: "!news apple" responds with a top news article relating to apple
  if (msg.content.toLowerCase().startsWith("!news")) {
    var request = require("request")
    var URL
    if (msg.content.indexOf(' ') == -1) {
      URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY
    } else {
      URL = "https://newsapi.org/v2/top-headlines?apiKey=" + process.env.NEWS_API_KEY + "&q=" + msg.content.substring(msg.content.indexOf(' ') + 1)
    }
    console.log(URL)
    request({
      url: URL,
      json: true
    }, function(error, response, body) {
      console.log("Result: %j", body)
      if (!error && response.statusCode === 200) {

        try {
          var newsNumber = Math.floor(Math.random()*body.totalResults)
          var text = '**' + body.articles[newsNumber].title + ':**\n' + body.articles[newsNumber].description + '\n<' + body.articles[newsNumber].url + '>'
          msg.channel.send(text);
        } catch (e) {
          msg.channel.send('Sorry I could not find any current news relating to "' + msg.content.substring(msg.content.indexOf(' ') + 1))
        }
      }else{
        msg.channel.send('Sorry I could not find any current news relating to "' + msg.content.substring(msg.content.indexOf(' ') + 1))
      }
    })
  }

  //Randomly responds to "Dad Bot" which is another bot on the server this bot was designed for. This command randomly responds to a joke sometimes told by "Dad Bot"
  if (msg.content.startsWith("Hi ")) {
    if (msg.author.username == "Dad Bot") {
      if (Math.floor(Math.random() * 10) == 3) {
        msg.channel.send("If you don't stop that stupid joke we are getting a divorce!")
      }
    }
  }

  //Wishes a person "happy birthday" if somebody else in the chat just wished somebody happy birthday
  if (msg.content.toLowerCase().startsWith("happy birthday")) {
    if (msg.author.username != "Mom Bot") {
      msg.channel.send("Happy Birthday from you mother! You are growing up so fast!")
    }
  }


  //Gets the definition for a word from urban dictionary
  //Example:
  if (msg.content.toLowerCase().startsWith("!def") || msg.content.toLowerCase().startsWith("!define")) {
    const ud = require('urban-dictionary')

    var number = msg.content.substring(msg.content.indexOf(':') + 1,msg.content.indexOf(' '))
    number = parseInt(number, 10);

    if(isNaN(number)){
      number = 1;
    }
    number -=1;

    var definition = msg.content.substring(msg.content.indexOf(' ') + 1)
    if (msg.content.indexOf(' ') == -1) {
      const ud = require('urban-dictionary')

      ud.random(function(error, entry) {
        if (!error) {
          var msgToSend = '**According to Urban Dictionary the random word "' + entry.word + '" means:**\n\n' + entry.definition + '\n\n***' + entry.example + '***';
          msgToSend = msgToSend.substring(0, 1999);
          msg.channel.send(msgToSend)
        }
      })
    } else {

      ud.term(definition, function(error, entries, tags, sounds) {
        if (!error) {

          if(number-1> entries.length || number<0){
            number = 0;
          }

          var msgToSend = '**According to Urban Dictionary "' + entries[number].word + '" means:**\n\n' + entries[number].definition + '\n\n***' + entries[number].example + '***'
          msgToSend = msgToSend.substring(0, 1999);
          msg.channel.send(msgToSend)
        } else {
          msg.channel.send('Sorry I could not find a definition for "' + definition + '"');
        }
      })
    }
  }

  //Gets top posts from reddit
  //Example: "!reddit" responds with the current top post all of reddit
  //Example: "!reddit apple" responds with the current top post on the apple subreddit
  //Example: "!reddit:5 apple" responds with the current 5th post on the apple subreddit
  if (msg.content.toLowerCase().startsWith("!reddit")) {
    if(msg.content.indexOf(' ') ==  -1){
      var number = msg.content.substring(msg.content.indexOf(':') + 1,msg.content.length)
    }else{
      var number = msg.content.substring(msg.content.indexOf(':') + 1,msg.content.indexOf(' '))
    }
    number = parseInt(number, 10);

    if(isNaN(number)){
      number = 1;
    }
    number -=1;
    //console.log(number);
    var subreddit;
    if(msg.content.indexOf(' ') ==  -1){
      subreddit = "popular"
    }else{
      subreddit = msg.content.substring(msg.content.indexOf(' ') + 1)
    }

    var request = require("request")
    var url = "https://www.reddit.com/r/"
    url += subreddit
    url+="/hot.json"
    console.log(url)
    request({
      url: url,
      json: true
    }, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        try {
          //console.log(body.data.images.original.url) // Print the json response
          if(body.data.children[number].data.domain.startsWith("self.")){
            var msgToSend = '**' + body.data.children[number].data.title + '**\n\n' + body.data.children[number].data.selftext
            console.log("self post");
          }else{
            var msgToSend = '**' + body.data.children[number].data.title + '**\n' + body.data.children[number].data.url;
          }


          msgToSend = msgToSend.substring(0, 1999);
          msg.channel.send(msgToSend);
        } catch (e) {}
      }
    })
  }


  if (msg.toString().startsWith(secretMessageCode)) {
    var value = msg.content.substring(msg.content.indexOf(' ') + 1)
    msg.channel.send(value);

    secretMessageCode = generateCode()
    console.log(secretMessageCode);
  }



  //Searches wikipedia api and returns a short result and a link
  //Example: "!wiki computer" responds with a short description of what a computer is as well as the link to the wikipedia computer page
  //Known Bugs: This action can return broken links or fail to get result on some topics that have more than 1 wikipedia page such as "!wiki table"
  if (msg.content.toLowerCase().startsWith('!wiki')) {
    var request = require("request")
    //var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&iwurl=1&utf8=1&srsearch="
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&iwurl=1&prop=extracts&explaintext=1&titles="
    url += msg.content.substring(msg.content.indexOf(' ') + 1)
    console.log(url)
    request({
      url: url,
      json: true
    }, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        try {
          var snippet = JSON.stringify(body);
          //console.log(snippet);
          var title = find_between(snippet, 'title":"', '","ex')
          snippet = find_between(snippet, 'extract":"', '\\n')
          // snippet = snippet.replace(/<\/?[^>]+(>|$)/g, "");
          if (snippet.includes("may refer to:")) {
            snippet = "Currently I am not smart enough to decide what type of " + title + " you are thinking of, however you can find out more by going here:"
          } else if (snippet == "") {
            snippet = "I dont have much to say about this topic, however you can find out more here:"
          }
          console.log(snippet + "\n <https://en.wikipedia.org/wiki/" + title + ">"); // Print the json response
          msg.channel.send(snippet + "\n<https://en.wikipedia.org/wiki/" + title + ">");
        } catch (e) {}
      }
    })
  }

  //calculate math problems using the worlfram alpha apiKey
  //Example: "!calc 5+10" responds with "15"
  //Example: "!calc d/dx x^2" responds with "2x" along with a graph of 2x
  //Example: "!calc 7feet to inches" responds with "84 inches"
  if (msg.content.toLowerCase().startsWith('!calc') || msg.content.toLowerCase().startsWith('!calculate') || msg.content.toLowerCase().startsWith('!calculator')) {
    var queryString = msg.content.substring(msg.content.indexOf(' ') + 1)
    var wolfram = require('wolfram').createClient(process.env.WOLFRAM_API_KEY)

    wolfram.query(queryString, function(err, result) {
      if (err) throw err
      console.log("Result: %j", result)


      if (result[1].title.startsWith("Result") || result[1].title.startsWith("Exact result") || result[1].title.startsWith("Power of 10 representation") || result[1].title.startsWith("Decimal approximation")) {
        var msgToSend = 'The answer for "' + result[0].subpods[0].value + '" is: ' + result[1].subpods[result[1].subpods.length - 1].value
      } else if (result[1].title.startsWith("Plot")) {
        var msgToSend = 'Here is a graph of "' + result[0].subpods[0].value + '"\n' + result[1].subpods[0].image
      } else {
        var msgToSend = 'I could not find an answer for "' + result[0].subpods[0].value + '"'
      }
      msg.channel.send(msgToSend);
    })
  }



  //help message to let anyone in the discord server to know what commands are possible
  //Example: "!mom-help" responds with a list of actions the bot can complete
  if (msg.content.toLowerCase().startsWith("!mom-help") || msg.content.toLowerCase().startsWith("!help-mom")) {
    if (msg.author.username != "Mom Bot" && msg.author.username != "Tester Bot") {
      msg.channel.send("Hi I am Mom Bot \n" +
      'I am designed by Eli Schiff for the RPI 2022 Gamers Server\n' +
      'For info on the next rocket launch say "!rocket TYPE" leaving TYPE blank will find the next rocket launch\n' +
      'For some current news say "!news TOPIC" leaving TOPIC blank will pick a current top story. This news is sourced from newsapi.org\n' +
      'For a Yo Momma joke just say "Yo Momma" \n' +
      'For the weather just say "!weather ZIP-CODE" leaving the ZIP-CODE blank will default to the weather at RPI\n' +
      'To find the definition of a word say "!reddit:NUMBER SUBREDDIT" leaving SUBREDDIT blank will use /r/popular and larger values for :NUMBER will give an alternative post\n' +
      'To find the definition of a word say "!def:NUMBER WORD" leaving the WORD blank will use a random word and larger values for :NUMBER will give an alternative definition\n' +
      'To search for a gif just say "!gif TOPIC"\n' +
      'To search Wikipedia just say "!wiki TOPIC"\n' +
      'To ask a math question just say "!calc QUESTION"\n' +
      'Remember you can always see this help again by typing "!Mom-Help" \n' +
      'Thanks for using Mom Bot. \n' +
      'My code can be found here for anyone interested <https://glitch.com/edit/#!/bitschiff-mom-bot> also I host it on glitch.com because it is free\n' +
      'If you have any feature requests or want a feature removed just message Eli Schiff (@bitschiff#0738) my creator.\n' +
      'PS: I also have a bunch of hidden features that are triggered by specific words or commands :)\n'
    );
  }
}
});


///////////Functions
function find_between(string, firstWord, lastWord) {
  var newString = string.substring(string.indexOf(firstWord) + firstWord.length)
  newString = newString.substring(0, newString.indexOf(lastWord))
  return newString
}



function isThisALegalCommand(command) {
  var blackList = ["!", "?", "d!"];
  var whiteList = ["!gif", "!wiki", "!wikipedia", "!weather", "!play", "!def", "!define", "!mom-help", "!help-mom"];

  for (var i = 0; i < whiteList.length; i++) {
    if (command.toString().toLowerCase().startsWith(whiteList[i])) {
      return true
    }
  }

  if (command.toString().startsWith(secretMessageCode)) {
    return true
  }

  for (var i = 0; i < blackList.length; i++) {
    if (command.toString().toLowerCase().startsWith(blackList[i])) {
      return false
    }
  }
  return true
}
///////////Functions

client.login(process.env.DISCORD_BOT_TOKEN);
