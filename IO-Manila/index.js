var activeUser;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("userLogin").style.display = "none";
    document.getElementById("Content").style.display = "block";
	
    document.getElementById("userEmail").innerHTML = user.email;

    if(user.displayName != null){
      activeUser = user.displayName;
      document.getElementById("userName").innerHTML = user.displayName;
    } else {
      activeUser = user.email;
      document.getElementById("userName").innerHTML = activeUser;
    }

    if(user.photoURL != null){
      document.getElementById("userPhoto").setAttribute("src", user.photoURL);
    } else {
      document.getElementById("userPhoto").setAttribute("src", 'user.png');
    }


  } else {
    // No user is signed in.
    document.getElementById("userLogin").style.display = "block";
    document.getElementById("Content").style.display = "none";
  }
});

function login(){
  var userEmail = document.getElementById('emailField').value;
  var userPassword = document.getElementById('passwordField').value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert("Error: " + errorMessage);
  });
}

function register(){
  var userEmail = document.getElementById('emailField').value;
  var userPassword = document.getElementById('passwordField').value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  alert(errorMessage);
  console.log(error);
  // ...
});
}

function saveDisplayName(){
	var currentUser = firebase.auth().currentUser;
  var preferredUserName = document.getElementById('nameField').value;
	if(preferredUserName !== null || preferredUserName !== '') {
		currentUser.updateProfile({
			displayName: preferredUserName
		});
	}
}

function logout(){
  firebase.auth().signOut();
}

function signInGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

// Get a reference to the database service
var database = firebase.database();

var messages = database.ref('messages');

messages.on('child_added', function(snapshot){
  console.log(snapshot.val());

   if(snapshot.val().image) {
    document.getElementById('messages_results').innerHTML += '<p><b>' + snapshot.val().user + '</b>' + ': ' + snapshot.val().chat + 
    "<br/> <img src='" + snapshot.val().image + "'>"

   + '</p>';
   } else {
    document.getElementById('messages_results').innerHTML += '<p><b>' + snapshot.val().user + '</b>' + ': ' + snapshot.val().chat +
   '</p>';
   }
});

function add_message(){
	// if(document.getElementById('file').files[0] != null) {
	// 	uploadImage();
	// }
	
  messages.push({
      user: activeUser,
      chat: document.getElementById('message_box').value,
      image: document.getElementById('fileLink').value
  });

  document.getElementById('file').value = null;
  document.getElementById('message_box').value = null;
  clear_message();
}

function clear_message(){
  document.getElementById('message_box').value = null;
  document.getElementById('file').value = null;
  document.getElementById('fileLink').value = null;
}

//storage
var storageRef = firebase.storage().ref();

function uploadImage(){
  $('.loginBtn').prop('disabled', true);
	var fileInput = document.getElementById('file');
	var file = fileInput.files[0];
	var filePath = 'images/' + file.name; 
	
	var uploadTask = storageRef.child(filePath).put(file);
	
	uploadTask.on('state_changed', function(snapshot){
	  // Observe state change events such as progress, pause, and resume
	  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
		case firebase.storage.TaskState.PAUSED: // or 'paused'
		  console.log('Upload is paused');
		  break;
		case firebase.storage.TaskState.RUNNING: // or 'running'
		  console.log('Upload is running');
		  break;
	  }
	  
	}, function(error) {
	  // Handle unsuccessful uploads
	}, function() {
	  // Handle successful uploads on complete
	  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		document.getElementById('fileLink').value = downloadURL;
		console.log('File available at', downloadURL);
    alert('File uploaded');
    $('.loginBtn').prop('disabled', false);
	  });
	});
}
