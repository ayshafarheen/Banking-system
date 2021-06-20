
start = Date.now()
let userstuff={};
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
var he =new Date(today)
var toid;

var url = document.location.href,
                params = url.split('?')[1].split('&'),
                 tmp;
            for (var i = 0, l = params.length; i < l; i++) {
                tmp = params[i].split('=');
                userstuff[tmp[0]] = tmp[1];
            }
//console.log(userstuff.uid)
var fromobj,toobj,fromcur,tocur;
const card = document.querySelector(".card-info")

db.collection('users').doc(userstuff.uid).onSnapshot(doc => {
    fromcur=doc.data().balance;
        var info = `<div class="column is-3">
        <div class="box card-info gradient" style="text-align: center;">
          <div style="text-align: left; color:white;">X-CARD</div>
          <br>
          <div class="icon-text" style="text-align: left;">
              <span> <strong style=" font-size: xx-large; color:white;">${doc.data().username}</strong> </span>
          </div>
            <div class="icon-text" style="text-align: left; color:white;">
              <span class="icon is-small">
                <i class="fas fa-dollar-sign " style=" vertical-align: middle;"></i>
              </span>
              <span><strong style="color:white; font-size: xx-large;"> ${doc.data().balance}</strong></span>
          </div>
        </div>
      </div>
    `
    card.innerHTML=info;
    })


    const ppl = document.querySelector(".towhom")

    db.collection('users').onSnapshot(data => {
        var html=""
        data.forEach(doc => {
            if(doc.ref.id!=userstuff.uid){
            reqid=doc.ref.id;
            var info = `
    <div class="is-centered columns" id="${reqid}"  onclick="openmodal(\'' + this.id + '\')">
        <div class="column is-7">
        <div class="card leftside " style="border-radius: 10px; padding:5px; margin-bottom: 20px; cursor:pointer; box-shadow:0 0px 25px 0 rgba(0,0,0,0.15);">
        <header class="card-header" style="box-shadow: 0 0 0 0" >
                    <p class="card-header-title is-centered" style="font-size:larger">
                        ${doc.data().username}
                    </p>
                </header>
            </div>
        </div>
    </div>
        `
            html+=info
            } 
        })
        ppl.innerHTML=html;
})


var mod=document.querySelector("#transaction");
function openmodal(obj){
    toid=obj
    db.collection("users").doc(obj).onSnapshot(doc => {
        toobj=doc.data().username;
        tocur=doc.data().balance;
        console.log(toobj)
    })
        $(".big").addClass("is-active");
        db.collection("users").doc(userstuff.uid).onSnapshot(doc =>{
            fromobj = doc.data().username;
            mod.innerHTML = `
            <strong style="font-size: xx-large; color:black;"> Amount to Transfer </strong>
            <br>
            <br>
            <div class="control has-icons-left">
             <input class="input" type="number" id="balance" placeholder="Amount" required>
             <span class="icon is-small is-left">
               <i class="fas fa-dollar-sign"></i>
             </span>
           </div>
           <br>
           <div style="font-size: x-large; font-weight:200;">From ${fromobj} to ${toobj}</div>
           <div style="font-size: x-large; font-weight:200;">${today}</div>
           <br>
           <button class="button is-large" >CONFIRM</button>
           </form>
           `;
        })
            
    

}


mod.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(toid)
    console.log("in")
    const amt = parseInt(transaction ['balance'].value);
    console.log(typeof(amt))
    const increment = firebase.firestore.FieldValue.increment(amt);
    const decrement = firebase.firestore.FieldValue.increment(-amt);
    console.log(fromcur)
    if(fromcur < amt){
        console.log(fromcur + "<" + amt)
        window.alert("You do not have enough balance!")
    }
    else{
        console.log("in")
            db.collection("transactions").add({
                from: fromobj,
                to: toobj,
                date:today,
                Amount:amt,
                time:start
            })
    
        db.collection("users").doc(userstuff.uid).update({
            balance: decrement
        }).then(() => {
            console.log(toid)
            console.log("for kitti");
            db.collection("users").doc(toid).update({
                balance: increment
            }).then(() =>{
                window.location.href="index.html?true";
            })
            })
        }

})





