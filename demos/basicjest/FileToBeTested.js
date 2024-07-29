module.exports = {
  sum: function(a,b) {
    return a+b;
  },
  MakeCharacter: function(name,age) {
    obj = {"name":name, "age":age};
    return obj;
  },
  IsEven: function(number){
    return (number%2 == 0);
  }
}
