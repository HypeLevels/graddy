import { StyleSheet } from 'react-native'
import React from 'react';
import { Text, Input, Layout, Divider, Modal, Card, Icon, Button, ButtonGroup } from '@ui-kitten/components';
import { supabase } from '../lib/supabase';

export const NotLogged = () => {
  const [registerModal, setRegisterModal] = React.useState(false);
  const [loginModal, setLoginModal] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false)

  const closeModal = () => {
    setRegisterModal(false)
    setLoginModal(false)
    setPasswd("")
    setEmail("")
    setError("")
  }

  async function signInWithEmail() {
    setLoading(true)
    if (email.length == 0 || passwd.length == 0) {
      setError("Email or Password cannot be empty!")
    } else {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: passwd,
      })

      if (error) setError(error.message)
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    if (email.length == 0 || passwd.length == 0) {
      setError("Email or Password cannot be empty!")
    } else {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: passwd,
      })
      if (error) {
        setError(error.message)
      } else {
        const { user, error } = await supabase.auth.signIn({
          email: email,
          password: passwd,
        })
        if (error) setError("An Account already exists with this email")
      }
    }

    setLoading(false)
  }

  return (
    <Layout style={styles.container}>
      <Modal
        visible={registerModal}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={closeModal}>
        <Card disabled={true}>
          <Layout style={styles.header}>
            <Text category='h1'>Register</Text>
            <Button style={{ width: 12}} appearance="ghost" status="basic" accessoryLeft={<Icon name='close' />} onPress={closeModal} />
          </Layout>
          <Divider style={styles.divider} />
          <Input
            placeholder='Email'
            value={email}
            onChangeText={nextValue => setEmail(nextValue)}
            style={styles.input}
          />
          <Input
            placeholder='Password'
            value={passwd}
            secureTextEntry={true}
            onChangeText={nextValue => setPasswd(nextValue)}
            style={styles.input}
          />
          <Button style={styles.buttonModal} status="basic" accessoryLeft={<Icon name='person-add' />} disabled={loading} onPress={() => signUpWithEmail()}>Register</Button>
          <Text style={styles.textError}>{error}</Text>
        </Card>
      </Modal>
      <Modal
        visible={loginModal}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => setLoginModal(false)}>
        <Card disabled={true}>
          <Layout style={styles.header}>
            <Text category='h1'>Login</Text>
            <Button style={{ width: 12}} appearance="ghost" status="basic" accessoryLeft={<Icon name='close' />} onPress={closeModal} />
          </Layout>
          <Divider style={styles.divider} />
          <Input
            placeholder='Email'
            value={email}
            onChangeText={nextValue => setEmail(nextValue)}
            style={styles.input}
          />
          <Input
            placeholder='Password'
            value={passwd}
            secureTextEntry={true}
            onChangeText={nextValue => setPasswd(nextValue)}
            style={styles.input}
          />
          <Button style={styles.buttonModal} status="basic" accessoryLeft={<Icon name='person-add' />} disabled={loading} onPress={() => signInWithEmail()}>Login</Button>
          <Text style={styles.textError}>{error}</Text>
        </Card>
      </Modal>
      <Text category='h2'>Graddy</Text>
      <Divider style={styles.divider} />
      <Layout style={styles.buttongroup}>
        <Button accessoryLeft={<Icon name='person-add' />} status="basic" style={styles.button} onPress={() => setRegisterModal(true)}>Register</Button>
        <Button accessoryRight={<Icon name='log-in' />} status="basic" style={styles.button} onPress={() => setLoginModal(true)}>Login</Button>
      </Layout>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  divider: {
    backgroundColor: "#8f9bb3",
    margin: 5
  },
  buttongroup: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    margin: 5,
  },
  buttonModal: {
    margin: 5,
  },
  input: {
    margin: 5
  },
  textError: {
    textAlign: "center"
  }
});