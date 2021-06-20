

mainb=document.querySelector(".main")

var activities=[]
var time=[];


db.collection("transactions").onSnapshot(data => {
    var html=""
    data.forEach(doc => {
        var d = doc.data().date.toString();
       // var date = doc.data().date.split('at')[0];
    //     activities.push(doc.data());
//time=activities
html+=`<div class="block" style="display: flex; justify-content: space-between;">
<span>Transaction on ${doc.data().date} from ${doc.data().from} to ${doc.data().to}.</span>
<span>$${doc.data().Amount}</span>
</div>
`

    })
    mainb.innerHTML = html
    
    // console.log(activities)
    // const sortedActivities = activities.sort((a, b) => b.date - a.date)
    // console.log(sortedActivities)
    // console.log(activities)


})

// const datas = [
//     {notes: 'Game was played', time: '2017-10-04T20:24:30+00:00', sport: 'hockey', owner: 'steve', players: '10', game_id: 1},
//     { notes: 'Game was played', time: '2017-10-04T12:35:30+00:00', sport: 'lacrosse', owner: 'steve', players: '6', game_id: 2 },
//     { notes: 'Game was played', time: '2017-10-14T20:32:30+00:00', sport: 'hockey', owner: 'steve', players: '4', game_id: 3 },
//     { notes: 'Game was played', time: '2017-10-04T10:12:30+00:00', sport: 'hockey', owner: 'henry', players: '10', game_id: 4 },
//     { notes: 'Game was played', time: '2017-10-14T20:34:30+00:00', sport: 'soccer', owner: 'john', players: '12', game_id: 5 }
//   ];
  
// const groups = datas.reduce((groups, dat) => {
//     const date = dat.time.split('T')[0];
//     console.log(typeof(date))
//     if (!groups[date]) {
//       groups[date] = [];
//     }
//     groups[date].push(dat);
//     return groups;
//   }, {});
  
//   // Edit: to add it in the array format instead
//   const groupArrays = Object.keys(groups).map((date) => {
//     return {
//       date,
//       games: groups[date]
//     };
//   });

//   console.log(groupArrays)

