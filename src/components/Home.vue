<template>
    <span class="centered font-web">
        <div class="info-area">
            X O GAME
        </div><br/>
        <div id="board">
        <div class="row">
            <div class="column" >
                <b><span >Board Size</span><br/><br/>
                <span >4 X 4</span></b>
            </div>
        </div>
            <!-- <b><span >Board Size</span><br/><br/>
            <span >4 X 4</span></b> -->
        </div>
        <div style="padding-top: 3rem;">            
            <button class="btn success font-web" @click="$router.push({name: 'game'})">Start !</button>
            &emsp;            
            <button class="btn warning font-web" @click="$router.push({name: 'history'})">History</button>            
        </div>
    </span>
</template>

<style scoped>
.row {
    display: grid;
    width: 100%;
}
.column {
  float: left;
  text-align: center;
  width: 100%;
}
/*@media only screen and (max-width: 900px) {
  .row {
    width: 100%;
  
}*/
</style>