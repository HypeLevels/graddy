import React from 'react';
import 'react-native-url-polyfill/auto'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry,} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { NotLogged } from './components/Auth';
import { Profile } from './components/Profile';
export default () => {
  const [session, setSession] = React.useState<Session | null>(null)
  React.useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return(
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
    {session && session.user ? <Profile key={session.user.id} session={session} /> : <NotLogged />}
    </ApplicationProvider>
  </>
  )
};

