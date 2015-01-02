var socket = io.connect();

function addMessage(msg, pseudo) {
  $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sentMessage() {
  if ($('#messageInput').val() != "")
  {
    socket.emit('message', $('#messageInput').val());
    addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
    $('#messageInput').val('');
  }
}

function setPseudo() {
  if ($("#pseudoInput").val() != "")
  {
    socket.name = $("#pseudoInput").val();
    socket.emit('setPseudo', $("#pseudoInput").val());
    $('#chatControls').show();
    $('#pseudoInput').hide();
    $('#pseudoSet').hide();
  }
}

socket.on('message', function(data) {
  addMessage(data['message'], data['pseudo']);
});

$(function() {
  $("#chatControls").hide();
  $("#pseudoSet").click(function() {setPseudo()});
  $("#submit").click(function() {sentMessage();});
  $("#messageInput").keydown(function (e){
    if(e.keyCode == 13){
      sentMessage();
    }
  });
  $("#pseudoInput").keydown(function (e){
    if(e.keyCode == 13){
      setPseudo();
    }
  });
});
