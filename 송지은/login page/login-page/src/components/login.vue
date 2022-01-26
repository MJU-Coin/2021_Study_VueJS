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
            <input type="password" placeholder="비밀번호" v-model="loginPassword" v-on:keyup.up.enter="loginSubmit()">
        </div>
        <p id="loginP" v-on:click="loginSubmit()">로그인하기</p>
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
    name: 'LoginForm',
    data() {
        return {
            loginId: "",
            loginPassword: "",
            loginAccept: false,
            modalText: "값 할당 안됨",
            showModal: false
        };
        
    },
    methods: {
        loginSubmit() {
            // 로컬스토리지에 저장
            if (this.loginAccept){
                console.log(this.loginId,this.loginPassword);
                localStorage.setItem(this.loginId, this.loginPassword);
                this.clearInput();
            }
            else{
                console.log(this.modalText);
                this.showModal = true;
                this.clearInput();
            }
            
        },
        clearInput() {
            // input폼 비우기
            this.loginId = '';
            this.loginPassword ='';
        },
        loginJudgement() {
            //로컬스토리지에 값이 있는지 확인
            if (localStorage.length > 0){
                console.log(this.loginId);
                console.log(localStorage.key(this.loginId));
                if((localStorage.key(this.loginId) == this.loginPassword)&&(this.loginId!="")&&(this.loginPassword!="")){
                    this.loginAccept = true;
                }
                else if((localStorage.key(this.loginId) == this.loginPassword)&&((this.loginId="")||(this.loginPassword=""))){
                    this.modalText = "아이디나 패스워드를 입력해주세요."
                    this.loginAccept = false;
                }
                else if((localStorage.key(this.loginId) != this.loginPassword)&&((this.loginId!="")&&(this.loginPassword!=""))){
                    this.modalText = "아이디나 패스워드가 잘못되었습니다."
                    this.loginAccept = false;
                }   
            }
        },
        
    }
}
</script>

<style>

</style>