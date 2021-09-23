<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
    if(this.$router.history.current.path == '/')
      this.$router.push({name: 'home'})
  }
}
</script>

<style>
html,body{
  background-image: radial-gradient(circle, white 1%, #fdc7b5);
  /*border: 3px solid green;*/
  height: 100%;
  margin: unset;
  
}
#app, button, input  {
  font-family: 'Fredoka One', cursive !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a14744; 
  height: 100%;
  overflow: auto;
}
/*@media screen and (height: 90%) {
  #app {
    overflow: auto;
  }
} */
.font-web{
  font-size: 2rem;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/*@media only screen and ({max-width: 600px,max-height: 900px}) position: inherit;*/
@media screen and (max-width: 600px), 
       screen and (max-height: 700px)
{
  .centered {
    position: initial;
    overflow: auto;
    height: 50vh;
  }
}
#board {
  padding: 2rem;
  border: 1px solid #ff00004f;
  background-color: #ff000033;
  border-radius: 10px;
  box-shadow: 2.5px 5px 25px #ff00004f, 0 1px 6px #ff00004f;
}
.info-area{
  background: #f6a39f;
  /*color: white;*/
  padding: 10px;
  border-radius: 5px;
  font-size: 2rem;
  font-weight: bold;
}
.btn {
  border: none; 
  color: white; 
  padding: 14px 28px; 
  cursor: pointer; 
  border-radius: 5px;
}
.success {background-color: #04AA6D;} /* Green */
.success:hover {background-color: #46a049;}

.info {background-color: #2196F3;} /* Blue */
.info:hover {background: #0b7dda;}

.default {background-color: #c9c3c3;} /* Gray */
.default:hover {background: #ddd;}

.warning {background-color: #ff9800;} /* Orange */
.warning:hover {background: #e68a00;}
</style>
