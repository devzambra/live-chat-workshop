const url = "/messages";
const user = 1;

var database = firebase.database();

window.onload = function(){
    Rx.Observable.fromEventPattern(
        handler => firebase.database().ref(url).on('value', handler),
        handler => firebase.database().ref(url).off('value', handler)
    ).subscribe(
        res => {
            var listContainer = document.querySelector('.messages');
            listContainer.innerHTML = '';

            for(var key in res.val()) {
                var message = res.val()[key];
                var messageElement = document.createElement('li');  
                var spanEl = document.createElement('span');
                spanEl.innerText = message.message;
                if(message.userId == user) {
                    messageElement.className += 'user-me';
                }
                messageElement.appendChild(spanEl);

                listContainer.appendChild(messageElement);

            }

        }
    );
   
};

function addMessage() {

    var msg = document.querySelector('[name="message"]');

    if(msg.value && msg.value.length > 0) {
        firebase.database().ref(url).push({
            message: msg.value,
            userId: user
        });
        msg.value = '';
        var listContainer = document.querySelector('.messages');

        listContainer.scrollTop = listContainer.scrollHeight;
    }
    
}