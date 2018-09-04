export function getRandomColor(){
    function c() {
        var hex = Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
      }
      return `#${c()}${c()}${+c()}`;
}
