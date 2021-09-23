<template>
    <span class="centered font-web">
        <div class="info-area" :style="score && score.length > 8 && {marginBottom: '10px'} ">
            Score Point
        </div><br v-if="!score || score && score.length <= 8" />
        <div id="board" style="padding: 3rem;">
            <div v-if="score" class="row">
                <span style="padding-bottom: 10px">
                    <div class="column" style="width: 20%"><b>#</b></div>
                    <div class="column" style="width: 50%; text-align: left;"><b>Name</b></div>
                    <div class="column" style="width: 30%"><b>Score</b></div>
                </span>
                <span v-for="(tmp,inx) in score.slice(0, 10)" :key="inx" style="padding: 10px 0">                               
                        <div class="column" style="width: 20%">{{inx+1}}</div>
                        <div class="column" style="width: 50%; text-align: left;">{{tmp.name}}</div>
                        <div class="column" style="width: 30%">{{tmp.score}}</div>           
                </span>            
            </div>
            <div v-else>
                <span style="color: #a09a9a;">
                    data not found
                </span>
            </div>
        </div>
        <div :style="score && score.length > 7 ? {paddingTop: '1rem'} : {paddingTop: '3rem'} ">
            <button class="btn info font-web" @click="$router.push({name: 'home'})">Home</button>            
        </div>
    </span>
</template>
<script>
    export default{
        data (){
            return {
                score: JSON.parse(localStorage.getItem('history')),
            }
        }, 
    }
</script>

<style scoped>
.row {
    display: grid;
    width: 35vw;
    text-align: left;
}
.column {
  float: left;
  text-align: center;
  /*width: 33%;*/
}
@media only screen and (max-width: 900px) {
  .row {
    width: 100%;
  }
}
</style>