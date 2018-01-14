// Initialize Firebase
var config = {
  apiKey: "AIzaSyDSwdy8QBD6nkYB8f52EtJ8MDO18pYVxJ0",
  authDomain: "socialnetwork-be86a.firebaseapp.com",
  databaseURL: "https://socialnetwork-be86a.firebaseio.com",
  projectId: "socialnetwork-be86a",
  storageBucket: "socialnetwork-be86a.appspot.com",
  messagingSenderId: "884615217617"
};
firebase.initializeApp(config);


// Uniendo Firebase register
$('#register').on('click', function (event) {
  var email = $('#email').val();
  var password = $('#pass').val();
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    
  });
});

//Uniendo Firebase login
$('#login').on('click', function (event) {
  var email = $('#email-login').val();
  var password = $('#pass-login').val();
  
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  }); 
});

// Añadiendo lectura en tiempo real

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
    $(location).attr('href', 'views/newsfeed.html'); //Direccionamos a la view de newsfeed
   
    

  } else {
    // User is signed out.
    // ...
    console.log('No has ingresado');
  }
});


// Inicio de sesión con Google y Facebook

var user = null;

$('#login-fb').on('click', function(event) {
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    // ...
    // $(location).attr('href', 'views/newsfeed.html'); //Direccionamos a la view de newsfeed

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

});

$('#login-google').on('click', function(event) {
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user);
    // ...
    // $(location).attr('href', 'views/newsfeed.html'); //Direccionamos a la view de newsfeed
    
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});

//Cerrando sesión
$('#logout').on('click', function(event) {
  firebase.auth().signOut().then(function() {
    $(location).attr('href', 'index.html');
  }).catch(function(error) {
    // An error happened.
  });
});


$(document).ready(function() {
    validEmail = false;
    validPass = false;

    function validateBtn() {
      if (validEmail && validPass) {
        $('div > button:eq( 0 )').attr('disabled', false);
      };
    }

    function defaultBtn() {
      $('div > button:eq( 0 )').attr('disabled', 'disabled');
    }

    $('#email').on('input', function(event) {
      var constant = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
      if (constant.test($(this).val())) {
        validEmail = true;
        validateBtn(); 
      } else {
        console.log('Ingrese un email válido');
        defaultBtn();
      }
    });

    $('#email-login').on('input', function (event) {
      var constant = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
      if (constant.test($(this).val())) {
        validEmail = true;
        validateBtn(); 
      } else {
        console.log('Ingrese un email válido');
        defaultBtn();
      }
    });

    

    $('#pass').on('input', function (event) {
      if ($(this).val().length >= 5) {
        validPass = true;
        validateBtn(); 
      } else {
        defaultBtn();
        console.log('Ingrese una contraseña válida');
      }
    });

    $('#pass-login').on('input', function (event) {
      if ($(this).val().length >= 5) {
        validPass = true;
        validateBtn(); 
      } else {
        defaultBtn();
        console.log('Ingrese una contraseña válida');
      }
    });
});
