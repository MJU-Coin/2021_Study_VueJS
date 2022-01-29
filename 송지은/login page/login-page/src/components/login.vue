<!-- VueJS Pratice 예제 - SignIn 구현하기
요구사항
아이디 비밀번호를 입력 받아서 로그인 요청을 할 수 있다.
로그인 요청 시 입력 값이 없으면 로그인 요청을 하지 않는다.
로그인 요청 시 아이디, 비밀번호가 일치하지 않거나 없는 경우에 경고 메세지를 띄어준다.
회원 가입 구현 없이 user / 1234로 입력된 경우만 로그인 시키고 그 외에 경우에는 로그인 실패로 처리한다.
로그인 요청 성공 시 메인 페이지(/home)로 이동한다.-->

<template>
    <div>
        <div>
            <input type="search" placeholder="아이디" v-model="loginId">
        </div>
        <div>
            <input type="password" placeholder="비밀번호" v-model="loginPassword" v-on:keypress.enter="loginJudgement">
        </div>
        <modal v-if="showModal" v-on:close="showModal = false">
            <h2 slot="header">{{ modalText }}</h2>
        </modal>
    </div>

</template>

<script>
import Modal from './common/Modal.vue'

export default {
    components: {
        Modal,
    },
    data() {
        return {
            loginId: "",
            loginPassword: "",
            modalText: "아이디나 비밀번호를 다시 확인해주세요",
            showModal: false,
        };
    },
    methods: {
        loginSubmit() {
            // 로컬스토리지에 저장
            if (this.loginJudgement){
                this.clearInput();//input 비우기
                this.$router.push("/home");//메인페이지로 이동
            }
        },
        clearInput() {
            // input폼 비우기
            this.loginId = '';
            this.loginPassword ='';
        },
        loginJudgement() {
            localStorage.setItem("user", "1234");
                if (this.IDExist && this.PasswordExist){
                    console.log("안에 값이 있음");
                    if (localStorage.getItem(this.loginId) === this.loginPassword){
                        console.log("성공!");
                        this.clearInput();
                        this.loginSubmit();
                        }
                }
                this.showModal = true;
                this.clearInput();
            },
        DIExist() {
            if (this.loginId !== ""){
                return true;
            }
            else {
                return false;
            }
        },
        PasswordExist() {
            if (this.loginPassword !== ""){
                return true;
            }
            else {
                return false;
            }
        },
    }
}
</script>

<style>
</style>