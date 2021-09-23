<template>
  <span class="centered font-web">
    <!-- Info -->
    <div class="info-area">    
      <span v-if="winner">
        Winner : " {{currentPlayer}} " | Score Point : {{score}}
      </span>
      <span v-else-if="!winner && stepNumber > 14">
        Game : Draw!!
      </span>
      <span v-else>
        Player : " {{currentPlayer}} "
      </span>
      &emsp;
      <button class="btn warning" style="float: right;line-height: 1;"
              v-if="winner || stepNumber > 14" 
              @click="winner ? openmodal = true : reset()">
          RESTART
      </button>
    </div>
    <br/>
    <!-- Board Game -->
    <div class="row">          
      <div class="column" v-for="(row,index) in 4" :key="index" >
        <button v-for="i in 4" :key="indexByRow(i, row)" :id="indexByRow(i, row)"                 
                @click="click(indexByRow(i, row))" 
                class="btntext"
                :class="[ indexByRow(i, row) == random ? 'random' : square[indexByRow(i, row)] ]" > 

          {{ indexByRow(i, row) == random ? '' : square[indexByRow(i, row)]}}
        </button>            
      </div> 
    </div> 
    <div style="padding-top: 1rem;">
        <button v-if="stepNumber === 0" class="btn info font-web" @click="$router.push({name: 'home'})">Home</button>
        &emsp;
        <button v-if="stepNumber === 0" class="btn warning font-web" @click="$router.push({name: 'history'})">History</button>
    </div>

    <!-- Modal -->
    <div v-if="openmodal" class="modal" >     
      <span style="font-size: 2rem">Input Name for Winner : "{{currentPlayer}}"</span><br/>
      <input class="myinput" type="text" placeholder="name.." v-model="winnername" name="winnername"><br/>
      <span v-show="errspan && !winnername" class="text-danger">input name plase.</span><br/>
      <div>
        <button class="btn success"  @click="save()">Save</button>&nbsp;
        <button class="btn default"  @click="openmodal = false,winnername = null,errspan = false">Cancel</button>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      square: Array(16).fill(null),
      random: Math.floor(Math.random() * 15),
      winnername: null,
      score: 0,
      stepNumber: 0,
      currentPlayer: 'X',
      winner: null,
      openmodal: false,
      errspan: false
    }
  },
  watch: {
    winner: function (value){
      setTimeout(function(){
        if(value){
          value.forEach((inx) => {   
            document.getElementById(inx).classList.add("winner")
          })
        }
      },100)      
    }
  },
  methods: {
    indexByRow (index, row, max = 4) {
        return (row * max + index) - (max + 1)
    },
    click (i) {
      if(i != this.random){
        if (this.square[i] || this.winner) return 
          this.$set(this.square, i, this.currentPlayer)
          
        if (!this.hasWinner()) {
          this.stepNumber++
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        }else{
          this.score = (15 - (this.stepNumber+1))
        }
      }   
    },
    hasWinner() {
        if (this.winner)
          return true    

        const square = this.square
        const matches = [
            [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], 
            [0, 4, 8, 12],[1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
            [0, 5, 10, 15],[3, 6, 9, 12]
        ]
        var arrmatch = []

        matches.forEach((element) => {
            var chk = element.find( (item) => {
                return item == this.random
            })
            if(chk == undefined)
              arrmatch.push(element)
        })      
        for (let i = 0; i < arrmatch.length; i++) {
            const [a, b, c, d] = arrmatch[i]
            if (square[a] && square[a] === square[b] && square[a] === square[c] && square[a] === square[d]) {
                this.winner = [ a, b, c, d ] 
                return true
            }
        }
        return false
    },
    restart(){
      if(this.winner){
        this.openmodal = true   
      }
      else
        this.reset()
    },
    save(){
      function compare( a, b ) {
        if ( a.score > b.score ){
          return -1;
        }
        if ( a.last_nom < b.last_nom ){
          return 1;
        }
        return 0;
      }
            
      var history = JSON.parse(localStorage.getItem('history'))
      var arr = []
      if(this.winnername){
        arr.push({'name': this.winnername, 'score': this.score})
        if(history)
          arr.push(...history)

        arr.sort(compare);
        localStorage.setItem("history", JSON.stringify(arr))

        // console.log('score', this.score, history, JSON.parse(localStorage.getItem('history')))
        this.reset()     

      }else{
        this.errspan = true
      }      
    },
    reset(){
      this.openmodal = false
      this.square = Array(16).fill(null)
      this.score = 0
      this.stepNumber = 0
      this.currentPlayer = 'X'
      this.winner = null
      this.winnername = null
      this.errspan = false
    },
}
}
</script>

<style scoped>
.winner{
  background-color: #a147447d;
}
.btntext{
  font-weight: 800;
  font-size: 3rem;
  text-shadow: 2px 2px 5px #4e4d4d;
  border-color: #a14744;
  border-width: thick;
  cursor: pointer
}
.btntext.X {
  color: red;
}
.btntext.O {
  color: green;
}
.btntext.random {
  cursor: no-drop;
  background-color: #a14744;
}
.text-danger{
  font-size: 16px;
  float: left;
  color: red;
}
.myinput{
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
  border-radius: 3px;
  width: 95%;
  text-align: left;
}
.modal{
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
  animation-name: animatetop;
  animation-duration: 0.5s;
  z-index: 1000;
  position: fixed;
  top: 30%;
  left: 18%;
  background: #fbb6b2;
}
@keyframes animatetop {
  from {top: 0; opacity: 0}
  to {top: 30%; opacity: 1}
}
.row {
  border: 1rem solid;
  box-shadow: 2.5px 5px 25px #0004, 0 1px 6px #0006;
  border-radius: .5rem;
  width: 65vmin;
  height: 65vmin;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  backdrop-filter: blur(10px);
  margin: auto;
}
.column {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
}
/*
.button {
  background-color: #bdbaba;
  float: right;
}
.button:hover {background-color: #cfcccc;}*/
</style>