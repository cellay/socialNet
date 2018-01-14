var config = {
    apiKey: "AIzaSyDSwdy8QBD6nkYB8f52EtJ8MDO18pYVxJ0",
    authDomain: "socialnetwork-be86a.firebaseapp.com",
    databaseURL: "https://socialnetwork-be86a.firebaseio.com",
    projectId: "socialnetwork-be86a",
    storageBucket: "socialnetwork-be86a.appspot.com",
    messagingSenderId: "884615217617"
  };
  firebase.initializeApp(config);

  var dataImage= firebase.database().ref('imagePost');

  $('#upload').on('change', function() {
      if(this.files&&this.files[0]) {
          var watcher = new FileReader();
          watcher.onload = function(e) {
            dataImage.push({
                url:e.target.result,
            });

            $('.box').append('<img src="" alt="">');
            $(img).attr('src', e.target.result);
          };
          watcher.readAsDataURL(this.files[0])
      }
  })