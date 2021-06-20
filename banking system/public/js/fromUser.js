
const leftc = document.querySelector(".leftc");
const rightc = document.querySelector(".rightc");
    db.collection('users').onSnapshot(data => {
        var html=""
        data.forEach(doc => {
            reqid=doc.ref.id;
            var info = `
            <div class="is-centered columns" id="${reqid}"  onclick="sel(\'' + this.id + '\')">
                <div class="column is-7">
                    <div class="card leftside " style="border-radius: 10px; padding:5px; margin-bottom: 20px; cursor:pointer; box-shadow:0 0px 25px 0 rgba(0,0,0,0.15);">
                        <header class="card-header" style="box-shadow: 0 0 0 0" >
                            <p class="card-header-title is-centered" style="font-size: larger">
                                ${doc.data().username}
                            </p>
                        </header>
                    </div>
                </div>
            </div>
                `
            html+=info
        })
        leftc.innerHTML=html;
})


function start(){
    $(".addmodal").addClass("is-active");

}

var email,uname,balance, pass, hash;

const details = document.querySelector('#details');

//     e.preventDefault();
details.addEventListener('submit', (e) => {
    e.preventDefault();
//window.alert("hello")
//var email = document.getElementById('email').innerHTML;
email = details['email'].value;
uname = details['name'].value;
balance = parseInt(details['balance'].value);
pass = details['password'].value;
var hashitem = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
hashitem.update(pass);
hash = hashitem.getHash("HEX");
    db.collection('users').add({
        email: email,
        username:uname,
        balance:balance,
        password:hash
    
    })

    $(".modal").removeClass("is-active");
})

const passaccept = document.querySelector('#passaccept');
var passobj;


function sel(obj){
    $(".pin").addClass("is-active");
    passobj=obj;
}

function history(){
    $(".history").addClass("is-active");
    

mainb=document.querySelector(".main")



db.collection("transactions").orderBy("time", "desc").onSnapshot(data => {
    var html=""
    var count=0;
    data.forEach(doc => {
        count++;
        var d = doc.data().date.toString();
       // var date = doc.data().date.split('at')[0];
    //     activities.push(doc.data());
//time=activities
html+=`<tr>
<th>${count}</th>
<td>${doc.data().date}</td>
<td>${doc.data().from}</td>
<td>${doc.data().to}</td>
<td>$${doc.data().Amount}</td>
</tr>
`

    })
    mainb.innerHTML = html
    


})


}

passaccept.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('users').doc(passobj).onSnapshot(doc => {
        var hashitem = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
        var hashitem2 = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
        hashitem.update(passaccept['passinput'].value);
        hashitem2.update(0000);
        hasho=hashitem2.getHash("HEX");
        hashi = hashitem.getHash("HEX");
        console.log(doc.data().password)
        console.log(hashi)
        console.log(hasho)
        if(hashi== doc.data().password){
            let url = 'toUser.html?uid=' + passobj;
            window.location.assign(url);
        }
        else{
            window.alert("Wrong pincode!")
        }
    })
   
})
