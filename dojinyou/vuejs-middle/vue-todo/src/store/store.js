import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) != "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
  addItem(newTodo) {
    localStorage.setItem(newTodo.item, JSON.stringify(newTodo));
  },
  removeOneItem(todo) {
    localStorage.removeItem(todo.item);
  },
  toggleItem(todo) {
    this.removeOneItem(todo);
    this.addItem(todo);
  },
  clearAll() {
    localStorage.clear();
  }
};

export const store = new Vuex.Store({
  state: {
    headerText: "TODO it!",
    todoItems: storage.fetch()
  },
  getters: {
    headerText(state) {
      return state.headerText;
    },
    todoItems(state) {
      return state.todoItems;
    }
  },
  mutations: {
    addOneItem(state, newTodoItem) {
      // console.log(newTodoItem);
      const createTodo = { completed: false, item: newTodoItem };
      // 데이터베이스 저장하는 로직
      storage.addItem(createTodo);
      // 데이터 동기화
      state.todoItems.push(createTodo);
    },
    removeOneItem(state, payload) {
      storage.removeOneItem(payload.todoItem);
      state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
      // 데이터베이스 반영
      state.todoItems[payload.index].completed = !state.todoItems[payload.index]
        .completed;
      storage.toggleItem(state.todoItems[payload.index]);
    },
    clearAll(state) {
      state.todoItems = [];
      storage.clearAll();
    }
  }
});
