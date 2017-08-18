export default function registerServiceWorkder() {
  if ('serviceWorker' in navigator) {
    //process.env.PUBLIC_URL = current environment where project is built
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}\sw.js`).then(function (register) {
      //console.log('Success!', register);
    }).catch(function(err){
      console.log('Failed!', err);
    });
  }
}
