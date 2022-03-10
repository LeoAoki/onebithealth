import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc/";
import styles from "./style";

export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [classification, setClassification] = useState(null)

    function imcCalculator() {
        return setImc((weight/(height*height)).toFixed(2))
    }

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular Novamente")

            if (imc < 18.5)
                setClassification("Abaixo do Peso")
            else if (imc >= 18.5 && imc < 25)
                setClassification("Peso Normal")
            else if (imc >= 25 && imc < 30)
                setClassification("Sobrepeso")
            else if (imc >= 30 && imc < 35)
                setClassification("Obesidade Grau I")
            else if (imc >= 35 && imc < 40)
                setClassification("Obesidade Grau II")
            else if (imc >= 40)
                setClassification("Obesidade Grau III")
            else
                setClassification("Valores inválidos")

            return 
        }
        setImc(null)
        setClassification(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                />
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 75.6"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={() => {
                        validationImc()
                    }}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc} messageClassification={classification} />
        </View>
    );
}