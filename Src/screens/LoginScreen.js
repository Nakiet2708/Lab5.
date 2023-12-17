
import * as WebBrowser from 'expo-web-browser';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, TextInput, HelperText, Avatar } from 'react-native-paper';

import { FIRE_BASE_AUTH } from '../firebase/firebaseConfig'; //getAuth
WebBrowser.maybeCompleteAuthSession(); 
 function LoginScreen() {
  //* SignInWithEmailAndPassword
  const [isFocusTxtInput, setIsFocusTxtInput] = React.useState(false);
  const [button, setButton] = React.useState(false);
  const [textUserName, setTextUserName] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');

  const handleSubmit = async () => {
    if (textUserName && textPassword) {
      try {
        await signInWithEmailAndPassword(
          FIRE_BASE_AUTH,
          textUserName,
          textPassword,
          setButton(true),
          // navigation.navigate("HomeScreen")
        );
        // navigation.navigate("HomeScreen", {
        //   emailcurrentUser: isUserLogin.user.email,

        // });
      } catch (err) {
        setButton(false);
        alert('Tài khoản ' + textUserName + ' chưa được đăng ký hoặc nhập sai mật khẩu!');

        console.log('got error: ', err.message);
      }
    }
  };
  // const { user } = useAuth();
  const validateEmail = (textUserName) => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,3}))$/; //gg bard
    // const reg = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/; //Bing
    // var reg = /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/;//chatGPT
    return reg.test(textUserName);
  };

  const hasErrorsEmail = () => {
    return !validateEmail(textUserName);
  };

  const hasErrorsPassword = () => {
    return textPassword.length < 8;
  };

  const handleResetPassword = async () => {
    await sendPasswordResetEmail(FIRE_BASE_AUTH, textUserName)
      .then(() => {
        // Password reset email sent!
        alert(
          'Một liên kết đã gửi đến địa chỉ Email của bạn. Vui lòng kiểm tra Email để đặt lại mật khẩu!',
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Địa chỉ Email chưa tồn tại. Vui lòng chọn một Email khác!');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txtHeader}>LoginScreen</Text>
      <View style={styles.groupTxtInput}>
        <TextInput
          style={styles.txtInput}
          mode="outlined"
          activeOutlineColor={hasErrorsEmail() ? 'rgb(255, 43, 43)' : 'rgb(61, 243, 25)'}
          outlineColor={
            !isFocusTxtInput
              ? 'rgb(0, 0, 0)'
              : hasErrorsEmail()
                ? 'rgb(255, 43, 43)'
                : 'rgb(61, 243, 25)'
          }
          label="Email"
          textColor="rgb(0, 0, 0)"
          // labelStyle={{color:"black"}}
          placeholder="vd: abc@gmail.com"
          placeholderTextColor="rgb(149, 145, 145)"
          value={textUserName}
          onChangeText={(textUserName) => setTextUserName(textUserName)}
          left={<TextInput.Icon icon="email" size={20} color="rgb(0, 0, 0)" />}
          right={<TextInput.Affix text=" 0/16" />}
          keyboardType="email-address"
        />
        {isFocusTxtInput ? (
          <HelperText type="error" visible={hasErrorsEmail()}>
            Nhập đúng định dạng địa chỉ Email!
          </HelperText>
        ) : null}
        <TextInput
          style={styles.txtInput}
          activeOutlineColor={hasErrorsPassword() ? 'rgb(255, 43, 43)' : 'rgb(61, 243, 25)'}
          mode="outlined"
          secureTextEntry
          onFocus={() => setIsFocusTxtInput(true)}
          left={<TextInput.Icon icon="shield-key" size={20} color="rgb(0, 0, 0)" />}
          outlineColor={
            !isFocusTxtInput
              ? 'rgb(0, 0, 0)'
              : hasErrorsPassword()
                ? 'rgb(255, 43, 43)'
                : 'rgb(61, 243, 25)'
          }
          placeholder="*******"
          maxLength={8}
          textColor="rgb(0, 0, 0)"
          // passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; maxlength: 8;"

          //right={<TextInput.Icon icon="eye" />}
          placeholderTextColor="rgb(149, 145, 145)"
          label="Password"
          value={textPassword}
          onChangeText={(textPassword) => setTextPassword(textPassword)}
        />
        {isFocusTxtInput ? (
          <HelperText type="error" visible={hasErrorsPassword()}>
            Mật khẩu 8 ký tự!
          </HelperText>
        ) : null}
      </View>
      <Button
        style={styles.btnLogin}
        disabled={!!hasErrorsEmail()}
        mode="outlined"
        textColor="rgb(255, 255, 255)"
        loading={button}
        icon={button ? null : 'login'}
        onPress={handleSubmit}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  txtHeader: {
    marginVertical: 10,
    color: 'rgb(239, 80, 107)',
    fontWeight: 'bold',
    fontSize: 27,
  },

  groupTxtInput: {
    // backgroundColor: "#ce33d6",
    // top: 250,
    // bottom: 120,
    margin: 10,
  },

  txtInput: {
    marginVertical: 5,
    // color: "white",

    width: 280,
    backgroundColor: 'rgb(255, 255, 255)',
  },

  txtForgetPassWord: {
    // flexDirection: "row",
    // position: "relative",
    // start: 60,
    // backgroundColor: "#ce33d6",
    bottom: 110,
    // top: 425,
    color: 'blue',
  },

  btnLogin: {
    width: 250,

    backgroundColor: 'rgb(239, 80, 107)',
    borderRadius: 5,
    // position: "relative",
    // bottom: 100,
    // top: 450,
    // backgroundColor: "#000",
  },

  txtSignUp: {
    flexDirection: 'row',
    // position: "relative",
    // start: 90,
    // backgroundColor: "#ce33d6",
    bottom: 90,
    marginVertical: 5,
    // top: 500,
  },

  btnSocialAuth: {
    bottom: 80,
    marginVertical: 5,
  },
});
export default LoginScreen;