const url = "/messages";
//JSON.stringify({message: 'Otro mensaje',userId: 2})

var database = firebase.database();


window.onload = function(){
    Rx.Observable.fromEventPattern(
        handler => firebase.database().ref(url).on('value', handler),
        handler => firebase.database().ref(url).off('value', handler)
    ).subscribe(
        res => console.log(res.val())
    );
   
};

function addMessage() {

    firebase.database().ref(url).push({
        message: 'Yet another message',
        userId: 3
    });
}