// import React, { useState } from 'react'

// // Firebase
// import { projectFirestore } from '../firebase/config';

// function CountdownTimer() {
//     const [time, setTime] = useState('')

//     // Fetch snapshot of tasks collection and log to console
//     const storedTime = projectFirestore.collection('tasks').get().then((snapshot) => {
//         snapshot.docs.data(time);
//     })

//     setTime(parseInt(storedTime));

//     const hours = Math.floor(time / 3600);
//     let minutes = Math.floor((time % 3600) / 60);
//     let seconds = time % 60;

//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     const countdown = time >= 0 ? `${hours}:${minutes}:${seconds}` : 'Expired';

//     return (
//         <div>{countdown}</div>
//     )
// }

// export default CountdownTimer