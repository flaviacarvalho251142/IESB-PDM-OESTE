import { StyleSheet, Text, ScrollView, Pressable, View } from 'react-native';

function MetasList(props) {
    return (
        <View>
            <ScrollView>
                {(props.array || []).map((meta) => {
                    return (
                        <View key={meta.id} style={styles.item}>
                            <Pressable
                                android_ripple={{ color: '#a3d5e8' }}
                                onPress={() => props.onDeleteItem(meta.id)}
                                style={styles.pressable}
                            >
                                <Text style={styles.texto}>{meta.texto}</Text>
                            </Pressable>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default MetasList;

const styles = StyleSheet.create({
    item: {
        margin: 8,
        backgroundColor: 'lightblue',
        borderRadius: 6,
        overflow: 'hidden',
    },
    pressable: {
        width: '100%',
    },
    texto: {
        color: '#1c1c1c',
        fontSize: 15,
        padding: 12,
    }
});