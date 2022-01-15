<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <!-- <button v-on:click="addTodo">add</button> -->

    <span class="addContainer">
      <i class="addBtn fas fa-plus" v-on:click="addTodo"></i>
    </span>

    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">
        경고!
        <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
      </h3>
      <h3 slot="body">입력된 값이 없습니다.</h3>
    </Modal>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
import Modal from "./common/Modal.vue";

export default {
  data() {
    return {
      newTodoItem: "",
      showModal: false
    };
  },
  methods: {
    // ...mapMutations({
    //   addTodo:'addOneItem'
    // })
    addTodo() {
      if (this.newTodoItem !== "") {
        // Vuex Refactoring
        // this.$emit("addTodoItem", this.newTodoItem);
        const newTodoItem = this.newTodoItem.trim();
        this.$store.commit("addOneItem", newTodoItem);
        // 입력값 초기화
        // this.newTodoItem = "";
        // refactoring => 함수의 역할 분리
        this.clearInput();
      } else {
        this.showModal = true;
      }
    },
    clearInput() {
      this.newTodoItem = "";
    }
  },
  components: {
    Modal
  }
};
</script>

<style scope>
input:focus {
  outline: none;
}

.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}

.addBtn {
  color: white;
  vertical-align: middle;
}

.closeModalBtn {
  color: #42b983;
}
</style>
