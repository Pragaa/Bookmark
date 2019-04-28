
//listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);





function saveBookmark(e){
  
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  



  var bookmark = {
    name : siteName,
    url  : siteURL
  }


  //test if bookmark is null
  if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks = [];
    //add to the array
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add the bookmark submitted
    bookmarks.push(bookmark);
    // re-set it to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //reset form  
  document.getElementById('myForm').reset();

  //re-fetch bookmarks
  fetchBookmarks();


  //prevents form from subbmitting
  e.preventDefault();
}



//function delete bookmark
function deleteBookmark(url){
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop trought bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i , 1);
    }
  }
  //re-set the local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //re-fetch bookmarks
  fetchBookmarks();

}


//function fetch and build bookmarks
function fetchBookmarks(){
   //get bookmarks from local storage
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //get output id
   var bookmarksResults = document.getElementById('bookmarksResults');

   //build output 
   bookmarksResults.innerHTML = '';
   for(let i = 0; i < bookmarks.length ; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="dass">'+
                                  '<h3>' +name+
                                  ' <a class="dass1" target="_blank" href="http://'+url+'">visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="dass2" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
   }
  
}