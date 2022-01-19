import {extend, localize} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en.json';
import ko from 'vee-validate/dist/locale/ko.json';

localize({
             en: {
                 names: {
                     email: 'E-mail Address',
                     password: 'Password',
                     title: 'Title',
                     name: 'Name',
                     content: 'Content',
                     password_confirmation: 'Password Confirmation',
                     comment: 'Comment',
                 },
                 messages: {
                     userName: "{_field_} can't not include Special Characters.",
                     maxNewLine: "Contained too many newLines in {_field_} ",
                     ...en.messages
                 }
             },
             ko: {
                 names: {
                     email: '이메일',
                     password: '비밀번호',
                     title: '제목',
                     name: '이름',
                     content: '내용',
                     password_confirmation: '비밀번호 확인',
                     comment: '댓글',
                 },
                 messages: {
                     userName: "{_field_} 항목의 값은 특수문자를 포함 할 수 없습니다.",
                     maxNewLine: "{_field_} 항목 값에 너무 많은 줄이 포함되어 있습니다.",
                     ...ko.messages
                 }
             }
         });


Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule], // copies rule configuration
    });
});


extend('userName', {
    validate(value) {
        return {
            required: true,
            valid: /^([A-Za-zㄱ-ㅎ가-힣0-9]+ )+[A-Za-zㄱ-ㅎ가-힣0-9]+$|^[A-Za-zㄱ-ㅎ가-힣0-9]+$|^([A-Za-zㄱ-ㅎ가-힣0-9]+ )+([A-Za-zㄱ-ㅎ가-힣0-9]+ )+$|^([A-Za-zㄱ-ㅎ가-힣0-9])+([A-Za-zㄱ-ㅎ가-힣0-9]+ )+$/.test(
                value)
        };
    },

    computesRequired: true
});


extend('maxNewLine', {
// @ts-ignore
    validate: (value, [max]) => {
        let count = (value.match(/\n/g) || []).length;

        return count <= max
    },

    computesRequired: true
});
