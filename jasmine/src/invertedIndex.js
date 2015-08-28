//function to read json file
function readJsonFile(filePath) {
  var json;
  $.ajax({
    'async': false,
    'url': filePath,
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
}

// Index functions
var Index = function(){};


// Function to create Index of Json File
Index.prototype.createIndex = function(filePath){
  var index = {};
  json = readJsonFile(filePath);
  for(var i in json){
    for(var j in json[i]){
      var words = json[i][j].split(' ');
      for(var k = 0; k < words.length; k++){
        if(words[k].slice(-1) === '.' || words[k].slice(-1) === ',' || words[k].slice(-1) === ':'){
          words[k] = words[k].slice(0, -1);
        }
        if(index.hasOwnProperty(words[k]) ) {
          var arr = index[words[k]];
          if(arr.indexOf(parseInt(i)) === -1){
            arr.push(parseInt(i));
            index[words[k]] = arr; 
          }
        }
        else {
          index[words[k]] = [parseInt(i)];
        }
      }
    }
  }
  return index;
};

// creating an instance of the Index Constructor
var indexInstance = new Index();

// 
var getIndex = indexInstance.createIndex;

// Function to search the index
function searchIndex(terms){
  var jsonIndex = getIndex('books.json');
  var arr = [];
  args = arguments;
  if(typeof terms === 'object'){
    args = terms; 
  }
  for (var key in jsonIndex){
    for(var i in args){
      if(key === args[i]){
        for(var j in jsonIndex[key]){
          arr.push(parseInt(jsonIndex[key][j]));
        }
      }  
    }
  }
  return arr;
}