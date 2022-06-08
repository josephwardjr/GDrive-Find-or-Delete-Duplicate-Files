// function onOpen() {
//   var ui = SpreadsheetApp.getUi();
//   ui.createMenu('Duplicate Files').addItem('FindDuplicateFiles').addToUi();
// }

function FindDuplicateFiles() {
  // https://spreadsheet.dev/user-input-in-google-sheets-using-prompts
  var ui = SpreadsheetApp.getUi();
  // ui.createMenu('Duplicate Files').addItem('myFunction').addToUi();
  var personName = ui.prompt("What's the name of the folder you're searching?");
  Logger.log('Searching: ' + personName.getResponseText());

  var dApp = DriveApp;
  // var folderIter = dApp.getFoldersByName("EE Textbooks");
  var folderIter = dApp.getFoldersByName(personName.getResponseText());
  var folder = folderIter.next();
  var filesIter = folder.getFiles();

  // console.log('filesIter is ' + folder.getFiles);

  fileNames = [];
  fileSize = [];
  fileDate = [];

  // console.log(filesIter);

  // const path = require('path'); //<Doesn't work because this isn't Node.js

  while (filesIter.hasNext()) {
    var file = filesIter.next();
    var filename = file.getName();
    // Want to be able to do the next few lines using the stuff in the first few lines. This is a temporary solution.
    var filesize = file.getSize();
    fileSize.push(filesize);
    var filedate = file.getDateCreated();
    fileDate.push(filedate);


    //Next 8 lines related to this link: https://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript
    // filename.replace(/\.[^/.]+$/, ""); //Not working with some.
    // filename.replace(/\..+$/, ''); //Not working with some.
    // filename.replace(/(.*)\.(.*?)$/, "$1"); //Still not working for some. The duplicates and files that end with ')'.
    // filename = filename.substring(0, filename.lastIndexOf('.'));

    var lastDotPosition = filename.lastIndexOf(".");
    // console.log('Last dot position: ' + lastDotPosition); // Used for debugging
    if (lastDotPosition === -1) { }
    else { filename = filename.substring(0, lastDotPosition); }

 

    fileNames.push(filename);
    Logger.log(filename);
  }

  // console.log(fileNames[0].charAt(0));
  console.log("Number of files " + fileNames.length)

  console.log(fileSize);

  duplicateFiles = [];

  for (let i = 0; i < fileNames.length; i++) {
    // console.log(i+1, " iteration through the loop.");

    var temp1;
    var temp2;

    if ((fileNames[i].charAt(fileNames[i].length - 3) == '(') && (!isNaN(fileNames[i].charAt(fileNames[i].length - 2))) && (fileNames[i].charAt(fileNames[i].length - 1) == ')')) {
      temp1 = fileNames[i].slice(0, -4);
      console.log('Bingo! ' + temp1)
    }
    else {temp1 = fileNames[i];}

    for (let j = i + 1; j < fileNames.length; j++) {
      if ((fileNames[j].charAt(fileNames[j].length - 3) == '(') && (!isNaN(fileNames[j].charAt(fileNames[j].length - 2))) && (fileNames[j].charAt(fileNames[j].length - 1) == ')')) {
        temp2 = fileNames[j].slice(0, -4);
        console.log('Bingo! ' + temp2);
      }
      else {temp2 = fileNames[j];}

      if ((temp1 === temp2) && (fileSize[i] === fileSize[j])) {
        if (fileDate[i] < fileSize[j]) {
        console.log(fileNames[j] + ' is a duplicate');
        }
        else {console.log(fileNames[i] + ' is a duplicate');}
      }
    
    }
  }


  // for (const element of fileNames) {
  //   console.log(element.slice(-3));

  //   // console.log(element.charAt(element.length - 2));
  //   // if (Number.isInteger(element.charAt(element.length - 2))) {
  //   // if (!isNaN(element.charAt(element.length - 2))) { 
  //   // // ^ https://bobbyhadz.com/blog/javascript-check-if-character-in-string-is-number . isInteger didn't work for char in a str
  //   //   console.log('The 2nd to last character is an integer!');
  //   // }

  //   // if (element.charAt(element.length-1)== ')') {
  //   //   console.log('The last character is an ) !'); 
  //   // }

  // if ( (element.charAt(element.length-3) == '(') && (!isNaN(element.charAt(element.length - 2))) && (element.charAt(element.length-1)== ')')) {
  //   console.log('Bingo!');
  // }

  // }
  // if ()

  // element.forEach((v, i) => console.log(v));
  // console.log(element);




  // Logger.log(fileNames);


}