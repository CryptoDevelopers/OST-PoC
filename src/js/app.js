App = {

  init: function(){
    console.log("App.init()");

    var json = JSON.parse('./API.txt')

    const API_KEY = "XXXX";
    const API_SECRET = json.secret;
    const Ostkit = require("ostkit");                             // tell node.js that you need ostkit.js
    const ost=new Ostkit(API_KEY, API_SECRET);      // initialize the API connection

    return App.initWeb3();
  },

  initDataLayer: function(){
    //List users/API.txt
    ost.usersList().then((res) => {
      console.log(res)
    });

    console.log("web3 instance initialized");
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("EthSplitter.json", function(artifactData){
      App.contracts.EthSplitter = TruffleContract(artifactData);
      App.contracts.EthSplitter.setProvider(App.web3Provider);
      console.log("initialized EthSplitter contract");

      return App.initUI();
    });
  },

  initUI: function () {
    console.log("App.initUI()");
    var ethSplitterInstance;

  }
};

$(window).on("load", function(){
  App.init();
});
