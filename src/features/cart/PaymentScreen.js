import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../../theme/colors"; // Using your project's color file
import { useCart } from '../api/cartApi'; // Updated to use your project's API hook if needed

export default function PaymentScreen({ navigation }) {
    const [name, setName] = useState("");
    const [method, setMethod] = useState("UPI");
    const [upiId, setUpiId] = useState("");
    const [cardNo, setCardNo] = useState("");

    const handlePlaceOrder = async () => {
        if (!name.trim()) {
            Alert.alert("Validation", "Please enter your name.");
            return;
        }

        // Simulating order placement
        try {
            // Replace this with your actual placeOrder logic
            const success = true; 

            if (success) {
                Alert.alert("Success ✨", "Your booking has been confirmed.", [
                    {
                        text: "View Orders",
                        onPress: () => navigation.navigate("Orders"),
                    },
                ]);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to process payment.");
        }
    };

    const PaymentOption = ({ type, label, icon }) => (
        <TouchableOpacity
            onPress={() => setMethod(type)}
            style={[
                styles.methodBtn,
                method === type && styles.methodBtnActive,
            ]}
        >
            <Ionicons 
                name={icon} 
                size={20} 
                color={method === type ? colors.primary : colors.textMuted} 
            />
            <Text style={[styles.methodText, method === type && styles.methodTextActive]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Customer Info</Text>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="e.g. Jane Doe"
                        placeholderTextColor={colors.textMuted}
                        style={styles.input}
                    />

                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Payment Method</Text>
                    <View style={styles.methodsGrid}>
                        <PaymentOption type="UPI" label="UPI ID" icon="qr-code-outline" />
                        <PaymentOption type="Card" label="Card" icon="card-outline" />
                        <PaymentOption type="Cash" label="Cash" icon="cash-outline" />
                        <PaymentOption type="UPI Apps" label="Apps" icon="apps-outline" />
                    </View>

                    {/* Dynamic Fields */}
                    {method === "UPI" || method === "UPI Apps" ? (
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>UPI ID</Text>
                            <TextInput
                                value={upiId}
                                onChangeText={setUpiId}
                                placeholder="username@bank"
                                placeholderTextColor={colors.textMuted}
                                style={styles.input}
                                autoCapitalize="none"
                            />
                        </View>
                    ) : null}

                    {method === "Card" ? (
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Card Number</Text>
                            <TextInput
                                value={cardNo}
                                onChangeText={setCardNo}
                                placeholder="xxxx xxxx xxxx xxxx"
                                placeholderTextColor={colors.textMuted}
                                style={styles.input}
                                keyboardType="number-pad"
                            />
                        </View>
                    ) : null}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.payBtn} onPress={handlePlaceOrder}>
                    <Text style={styles.payText}>Confirm & Pay</Text>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB' },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 20,
        paddingVertical: 15 
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
    scrollContent: { padding: 20 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 15,
    },
    sectionTitle: { fontSize: 16, fontWeight: "900", color: colors.text, marginBottom: 15 },
    label: { fontSize: 13, color: colors.textMuted, fontWeight: '600', marginLeft: 4 },
    input: {
        marginTop: 8,
        backgroundColor: "#F1F5F9",
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === "ios" ? 15 : 12,
        fontSize: 15,
        color: colors.text,
    },
    methodsGrid: { 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: 'space-between'
    },
    methodBtn: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: "#F1F5F9",
        marginBottom: 12,
        gap: 8
    },
    methodBtnActive: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '10', // 10% opacity
    },
    methodText: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
    methodTextActive: { color: colors.primary, fontWeight: "800" },
    fieldContainer: { marginTop: 15 },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 20,
    },
    payBtn: {
        backgroundColor: '#1A1D1E', // Matching your project's dark theme button
        paddingVertical: 18,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    payText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});