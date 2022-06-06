import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, Alert } from "react-native";
import { Input, Button, Layout, Text, Divider, Icon } from '@ui-kitten/components';
import { ApiError, Session } from "@supabase/supabase-js";

export function Profile({ session }: { session: Session }) {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            const user = supabase.auth.user();
            if (!user) throw new Error("No user on the session!");

            let { data, error, status } = await supabase
                .from("profiles")
                .select(`username`)
                .eq("id", user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
            }
        } catch (error) {
            setError((error as ApiError).message);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
    }: {
        username: string;
    }) {
        if (username.length == 0) {
            setError("You can't change your username to a blank one.")
        } else {
            try {
                setLoading(true);
                const user = supabase.auth.user();
                if (!user) throw new Error("No user on the session!");

                const updates = {
                    id: user.id,
                    username,
                    updated_at: new Date(),
                };

                let { error } = await supabase
                    .from("profiles")
                    .upsert(updates, { returning: "minimal" });

                if (error) {
                    throw error;
                }
            } catch (error) {
                setError((error as ApiError).message);
            } finally {
                setLoading(false);
                setError("Successfully updated user data")
            }
        }
    }

    return (
        <Layout style={styles.container}>
            <Text category='h2'>Your Profile</Text>
            <Divider style={styles.divider} />
            <Input
                placeholder='Email'
                value={session?.user?.email}
                disabled={true}
                style={styles.input}
            />
            <Input
                placeholder='Username'
                value={username}
                onChangeText={nextValue => setUsername(nextValue)}
                style={styles.input}
            />
            <Divider style={styles.divider} />
            <Layout style={styles.buttongroup}>
                <Button accessoryLeft={<Icon name='log-out' />} status="basic" appearance="ghost" style={styles.button} onPress={() => supabase.auth.signOut()}>Sign Out</Button>
                <Button accessoryRight={<Icon name='person-add' />} disabled={loading} status="basic" style={styles.button} onPress={() => updateProfile({ username })}>Update Data</Button>
            </Layout>
            <Text style={styles.textError}>{error}</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        width: 320,
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
        margin: 5
    },
    input: {
        margin: 5,
        width: 320
    },
    textError: {
        textAlign: "center"
    }
});