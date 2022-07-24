myTest = function(){
    alert('ok');
 }

 function initialize(bookId) {
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(bookId);
  }

 loadViewer = function(bookId){
    google.books.load();
    google.books.setOnLoadCallback(initialize(bookId));
 }