import React, { useEffect } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Replace with your logo import
import logo from '../../assets/Logo/logo1.png';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#9CA3AF'
    },
    section: {
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 3,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
});

const PrescriptionPDF = ({ report }) => (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header with logo and website name */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
                        <Image src={logo} style={styles.logo} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>CureHub</Text>
                    </View>
                </View>

                {/* Main content */}
                <View style={styles.section}>
                    <Text style={styles.title}>Patient Prescription Report</Text>
                    {/* <Text style={styles.text}><strong>Name:</strong></Text> */}
                    <Text style={styles.text}>Name: {report.name}</Text>
                    <Text style={styles.text}>Age: {report.age}</Text>
                    <Text style={styles.text}>Sex: {report.sex}</Text>
                    <Text style={styles.text}>Contact Information: {report.address} | Phone: {report.phone}</Text>
                    <Text style={styles.text}>Medical History: {report.medicalHistory}</Text>
                    <Text style={styles.text}>Presenting Complaint: {report.presentingComplaint}</Text>
                    <Text style={styles.text}>Physical Examination Findings: {report.physicalExamFindings}</Text>
                    <Text style={styles.text}>Diagnosis: {report.diagnosis}</Text>
                    
                    <Text style={styles.title}>Prescription:</Text>
                    {report.prescriptions.map((prescription, idx) => (
                        <View key={idx} style={styles.section}>
                            <Text style={styles.text}>Medicine: {prescription.medicine}</Text>
                            <Text style={styles.text}>Dosage: {prescription.dosage}</Text>
                            <Text style={styles.text}>Frequency: {prescription.frequency}</Text>
                        </View>
                    ))}

                    <Text style={styles.text}>Instructions to Patient:</Text>
                    <Text style={styles.text}>{report.instructions}</Text>
                    <Text style={styles.text}>Follow-Up: {report.followUp}</Text>
                    <Text style={styles.text}>Additional Notes: {report.additionalNotes}</Text>
                </View>
                <hr />
                {/* Footer with contact information */}
                <View style={styles.footer}>
                    <Text>curehub.web.app</Text>
                    <Text>+880 15 16 31 18 77</Text>
                </View>
            </Page>
        </Document>
    </PDFViewer>
);

export default PrescriptionPDF;
