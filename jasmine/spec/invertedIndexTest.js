describe('Index function', function() {

  describe('Read book data', function(){
    var jsonFile;

    beforeEach(function(){
      jsonFile = readJsonFile('books.json');
    });

    it('should check that function readJsonFile is defined', function(){
      expect(readJsonFile).toBeDefined();
    });

    it('should check that function readJsonFile throws no error', function() {
      expect(readJsonFile).not.toThrow();
    });

    it('should read the JSON file and asserts that it is not empty', function() {
      expect(jsonFile).toBeDefined();
    });

    it('should check that json file contains objects', function() {
      expect(jsonFile).toEqual(jasmine.any(Object));
    });

    it('should expect content of json file to be strings', function() {
      for(var i in jsonFile){
        expect(jsonFile[i].title).toEqual(jasmine.any(String));
      }
    });

  });

  describe('Populate Index', function(){
    var jsonFileIndex;

    beforeEach(function(){
      jsonFileIndex = getIndex('books.json');
    });

    it('should ensure index is created once JSON file has been read', function() {
      expect(jsonFileIndex).toBeDefined();
    });

    it('should ensure that the index maps the string keys to the correct objects in the JSON array', function() {
      // The word 'Alice' appeared ONLY in index 0 
      expect(jsonFileIndex.Alice).toEqual(jasmine.arrayContaining([0]));
      expect(jsonFileIndex.Alice).not.toEqual(jasmine.arrayContaining([1]));

      // The word 'Lord' appeared ONLY in index 1
      expect(jsonFileIndex).toEqual(jasmine.objectContaining({Lord: [1]}));
      expect(jsonFileIndex.Lord).not.toEqual(jasmine.objectContaining({Lord: [0]}));

      // The word 'of' appeared in both index 0 and 1
      expect(jsonFileIndex.of).toContain(0);
      expect(jsonFileIndex.of).toContain(1);

    });

  });

  describe('Search Index', function(){
    var resultOfSearch;

    it('should return an array of the indices of the correct objects that contain the words in the search query', function() {

      resultOfSearch = searchIndex('falls');
      expect(resultOfSearch).toEqual([0]);

      resultOfSearch = searchIndex('and');
      expect(resultOfSearch).toEqual([0, 1]);
    });

    it('should handle a varied number of search term as arguments', function() {
      resultOfSearch = searchIndex('rabbit', 'dwarf', 'powerful');
      expect(resultOfSearch).toEqual([0, 1, 1]);
    });

    it('should handle an array of search terms', function() {
      resultOfSearch = searchIndex(['into', 'imagination', 'man', 'seek']);
      expect(resultOfSearch).toEqual([0, 0, 1, 1]);
    });
  });

});