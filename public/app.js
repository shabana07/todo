var main = document.getElementById('main');
var list;
firebase.database().ref('todo').on('child_added',function(data){
  
        // CREATE li//
   list =  document.createElement('li');
  var listText = document.createTextNode(data.val().value);
  list.appendChild(listText);
  main.appendChild(list);
  // CREATE UPDATE INPUT//
  var updtInput = document.createElement('input');
  updtInput.setAttribute('placeholder',input.value);
  updtInput.className = 'hide';
  list.appendChild(updtInput);
  
  // CREATE DELETE BUTTON//
  var delBtn = document.createElement('button');
  delBtn.innerHTML = '<i class="fas fa-times fa-2x"></i>';
  delBtn.setAttribute('id',data.val().key)
  delBtn.setAttribute('onclick','delItem(this)')
  list.appendChild(delBtn);
  // CREATE EDIT BUTTON//
  var edtBtn = document.createElement('button');
  edtBtn.innerHTML = '<i class="fas fa-pencil-alt fa-2x"></i>';
  edtBtn.setAttribute('id',data.val().key);
  edtBtn.setAttribute('onclick','edtItem(this)')
  list.appendChild(edtBtn);
 

})
function addItem() {
    
    var input = document.getElementById('input');
    if(input.value != ''){
    var key = firebase.database().ref('todo').push().key;
    var todos = {
        value : input.value,
        key: key
    }
    firebase.database().ref('todo').child(key).set(todos);
    input.value = "";
}else{
    alert('Plese enter some task')
}
}
function delAll(){
    main.innerHTML = "";
    firebase.database().ref('todo').remove()
}
function delItem(e){
    e.parentNode.remove()
    firebase.database().ref('todo').child(e.id).remove();
}
function edtItem(e){
    e.className = 'hide';
    // CREATING UPDATE BTN//
    var updtBtn = document.createElement('button');
    updtBtn.innerHTML = '<i class="fas fa-plus fa-2x"></i>';
    updtBtn.setAttribute('onclick','updtBtn(this)');
    updtBtn.setAttribute('id',e.id)
    list.appendChild(updtBtn);
    e.parentNode.firstChild.nodeValue  ="";
    e.parentNode.firstChild.nextSibling.className = 'show';

}
function updtBtn(e){
    if(e.parentNode.firstChild.nextSibling.value != ''){
    var editTodo = {
        value: e.parentNode.firstChild.nextSibling.value,
        key: e.id
    }
    firebase.database().ref('todo').child(e.id).set(editTodo);
    e.parentNode.firstChild.nodeValue= e.parentNode.firstChild.nextSibling.value;
    e.parentNode.firstChild.nextSibling.className = 'hide';
    e.parentNode.lastChild.className = 'hide';
    e.parentNode.lastChild.previousSibling.className = 'show';
}else{
    alert('Please enter some task');
}
}
