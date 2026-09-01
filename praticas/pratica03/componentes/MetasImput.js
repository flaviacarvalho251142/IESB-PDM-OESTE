import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagens';

function MetaInput(props) {

    const [inputMetaText, setInputMetaText] = useState('');

    function metaInputHandler(inputText) {
        setInputMetaText(inputText);
    }

    function addMetaHandler() {
        props.onAddMeta(inputMetaText);
        setInputMetaText('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={metaInputHandler}
                    value={inputMetaText}
                    style={styles.inputText}
                    placeholder={rotulo_input_meta}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={addMetaHandler}
                    title={rotulo_btn_cadastro_meta}
                />
            </View>
        </View>
    );
}

export default MetaInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    inputContainer: {
        width: '65%',
    },
    buttonContainer: {
        width: '30%',
    },
    inputText: {
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 8,
        borderRadius: 6,
        fontSize: 15,
    },
});