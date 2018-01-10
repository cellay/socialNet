// Función de inicio
function begin() {
  createPosts();
}

function createPosts() {
  // Crear variables para obtener elementos
  var postBtn = $('#post-btn');
  console.log(postBtn);
  var postSection = $('.photo-section');
  // Crear evento de publicar al dar clic en botón
  $(postBtn).on('click', function() {
    // Capturar valor del área de texto
    var postTxtAreaValue = $('#post-txtarea').val();
    console.log(postTxtAreaValue);
    // Crear párrafo de publicación
    var pPost = '<p>' + postTxtAreaValue + '</p>';
    // Agregar un párrafo de publicacíon que aparecerá en el perfil
    $(postSection).append(pPost);
  });
}

$(document).ready(begin);
