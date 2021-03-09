const products = [
  {
    name: 'smash ball',
    description: 'unleash your best move on your foes!',
    imageUrl: 'https://www.ssbwiki.com/images/a/a2/SSBU_spirit_Smash_Ball.png',
    price: 59995
  },
  {
    name: 'blast box',
    description: 'send your enemies flying, but be careful!',
    imageUrl:
      'https://static.wikia.nocookie.net/ssb/images/b/b3/Blastbox.png/revision/latest/top-crop/width/360/height/450?cb=20140325233357',
    price: 25000
  },
  {
    name: 'maxim tomato',
    description: 'get your daily requirement of veggies',
    imageUrl:
      'https://static.wikia.nocookie.net/nintendo/images/1/13/Maxim_Tomato_%28KTD%29.png/revision/latest/top-crop/width/360/height/360?cb=20160511001739&path-prefix=en',
    price: 29599
  },
  {
    name: 'bunny hood',
    description: 'move faster than the wind!',
    imageUrl:
      'https://static.wikia.nocookie.net/ssb/images/7/7f/Bunnyhood.png/revision/latest?cb=20140325233908',
    price: 22999
  },
  {
    name: 'assist trophy',
    description: 'Call on a friend for help!',
    imageUrl:
      'https://img.rankedboost.com/wp-content/uploads/2018/11/item_0_assist.png',
    price: 19999
  },
  {
    name: 'poke ball',
    description: 'choose a pokemon to help you in battle!',
    imageUrl:
      'https://www.models-resource.com/resources/big_icons/29/28667.png',
    price: 14999
  },
  {
    name: 'master ball',
    description: "summon a legendary pokemon's strength!",
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/LFg1PtQQxWQ0pqIKdwFssH4QtouFzFoMweeXc5l5lqi7L94TEreXB7Evj8wx3eZnTo60BbYMDBCcCyPQgbYcYXDnobQQsW99WmCrXU4AxfrRiey2wzvTW3kn',
    price: 34999
  },
  {
    name: 'heart container',
    description:
      "You've found a heart container! You feel like you're just getting warmed up!",
    imageUrl:
      'https://www.ssbwiki.com/images/8/82/Heart_Container_Skyward_Sword.png',
    price: 29999
  },
  {
    name: 'smash ball f',
    description: 'Smash ball on sale!... Or is it?',
    imageUrl:
      'https://static.wikia.nocookie.net/ssb/images/0/0a/Fakesmashball-0.png/revision/latest?cb=20180927214938',
    price: 19999
  },
  {
    name: 'metal box',
    description:
      "Who's more metal... you or Iron Maiden? You can safely answer that its you now",
    imageUrl:
      'https://static.wikia.nocookie.net/ssb/images/6/6b/MetalBox.png/revision/latest?cb=20140328220626',
    price: 34999
  },
  {
    name: 'timer',
    description: 'Are you always missing your punches? Not anymore.',
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/M5HjEMKKHNl4bbLkQSKa4bG8MVgAmbDrMVpwVm0QnL-8QCfHbbz0Bxo4MszyuLre3-3GdomxywoA3dcSeBEICLldQeUSjWeERiNfi-qKf7iLw4n_',
    price: 14999
  },
  {
    name: 'beam sword',
    description:
      'Ever wanted to use the force? Now you can... its just license friendly',
    imageUrl:
      'https://static.wikia.nocookie.net/ssb/images/a/ac/SSBUBeamSword.png/revision/latest?cb=20201007154512',
    price: 23999
  },
  {
    name: 'bullet bill',
    description:
      "Your opponents won't be able to dodge you if you're as fast as a bullet!",
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/OGMnBC6MevvKhcy-HqkGdrICT17DlbJGw259jaPUZhsOgYXdD87RUmRgQU7BR3gvLqWMbad23VedbPzOxCS7wJsOFln7Mhlq92ZXY4DCp0RyihobKwQiKpff',
    price: 32999
  },
  {
    name: 'golden hammer',
    description:
      "With a weapon like this you can even go after titans, just don't miss.",
    imageUrl:
      'https://static.wikia.nocookie.net/ssb/images/1/10/Gold.png/revision/latest/top-crop/width/360/height/450?cb=20140325143936',
    price: 44999
  },
  {
    name: 'back shield',
    description: ` "We got ya back, but you best to watch your front" - RZA`,
    imageUrl:
      'https://static.wikia.nocookie.net/ssb/images/b/bd/BackShield.png/revision/latest/top-crop/width/360/height/450?cb=20140409062221',
    price: 28999
  },
  {
    name: 'home run bat',
    description: "Now here's another hit, Barry bonds.",
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/N7UXTepnT0yx10LPVVUvQq9l8-AE3WxCvKJSgapOlwushPnsrJykiXJ5Yq6GPiBlU4Uty2GH01rpxMc0A_e0sA-r8wPkCktwmmz56camiPY57g',
    price: 29999
  },
  {
    name: 'moon',
    description:
      'You have 72 hours remaining... actually make that about 7.2 seconds',
    imageUrl:
      'https://static.wikia.nocookie.net/nintendo/images/a/ac/Moon_Assist_Trophy_%28SSBU%29.png/revision/latest?cb=20180916130512&path-prefix=en',
    price: 9999
  },
  {
    name: 'shovel knight',
    description: 'Just keep digging... just keep digging',
    imageUrl:
      'https://static.wikia.nocookie.net/supersmashbrosfanon/images/e/e7/Shovelknight_ssba.png/revision/latest?cb=20160702185104',
    price: 8999
  },
  {
    name: 'nitendog',
    description: "Isn't he cute? He just wants all the attention!",
    imageUrl:
      'https://mario.wiki.gallery/images/thumb/8/8b/Nintendog_SSBU.png/200px-Nintendog_SSBU.png',
    price: 7999
  },
  {
    name: 'chain chomp',
    description:
      'What a good boy! He just wants to take a bite out of your enemies!',
    imageUrl:
      'https://lh3.googleusercontent.com/proxy/KQJy-kMUvRza-spEdFsczbKCoUIhWQG8Wj-ClJBvncXfM-Fird67zsvCwZyoCdiZr0N6Gkuq88_jzA3kzZbda-sDh4jCiyDceEB4iU4iyXMXHUTGmTh1NV_0',
    price: 8999
  }
]

module.exports = products
