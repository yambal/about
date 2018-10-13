(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function dialogflowApi(text) {
  jQuery.ajax({
    type: "POST",
    url: "https://api.dialogflow.com/v1/query?v=20170712",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + 'c4202a73a8b147aea7f5fc95546f0cfe'
    },
    data: JSON.stringify({
      query: text,
      lang: "en",
      sessionId: "chatbot"
    }),
    success: function success(response) {
      console.log("success"); // Here you will get the response to your query in json, you will have to parse it based on the type it has like text, image, card etc. & show it to user. 

      parseResponse(response); // function to parse your response. 
    },
    error: function error() {
      console.log("Error");
    }
  });
}

dialogflowApi('こんにちわ');

},{}]},{},[1]);
