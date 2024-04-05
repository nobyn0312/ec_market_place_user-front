import { Container } from "@/components/Container/Container";
import React, { useState, useEffect } from "react";
import styles from "@/pages/account/sign_in/index.module.css";
import { Button } from "@/components/Button/Button";
import emailjs from 'emailjs-com';

const index = () => {
    const [emailData, setEmailData] = useState({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (isEmailSent || emailError) {
            const timeout = setTimeout(() => {
                setIsEmailSent(false);
                setEmailError('');
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [isEmailSent, emailError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "from_name") setName(value);
        else if (name === "from_email") setEmail(value);
        else if (name === "subject") setSubject(value);
        else if (name === "message") setMessage(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.send('service_0er7oix', 'template_hr9flrw', { from_name: name, from_email: email, subject: subject, message: message }, 'nsLNrsd5QaR6czGH7')
            .then((response) => {
                console.log('Email sent successfully:', response);
                setIsEmailSent(true);
                setEmailError('');
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                setIsEmailSent(false);
                setEmailError('Failed to send email. Please try again later.');
            })
            .finally(() => {
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            });
    };

    return (
        <>
            <Container>
                <div className={styles.container} style={{ marginBottom: "5rem" }}>
                    <form onSubmit={handleSubmit}>
                        <p className={styles.maintitle}>クレジット情報登録</p>
                        <div style={{ height: "1px", width: "120px", backgroundColor: "#d6d6d6", marginTop: "10px" }} />
                        <p className={styles.title}>メールアデレそ</p>
                        <input id="from_email" name="from_email" className={styles.textfeild} style={{ width: "100%" }} type="email" placeholder="" value={email} onChange={handleChange} />
                        <p className={styles.title}>氏名</p>
                        <input id="from_name" name="from_name" className={styles.textfeild} style={{ width: "100%" }} value={name} onChange={handleChange} />
                        <p className={styles.title}>主題</p>
                        <input id="subject" name="subject" className={styles.textfeild} style={{ width: "100%" }} value={subject} onChange={handleChange} />
                        <p className={styles.title}>質問</p>
                        <textarea rows={6} id="message" name="message" className={styles.textfeild} style={{ width: "100%" }} placeholder="" value={message} onChange={handleChange} />
                        <button className={styles.buttonOrange} style={{ marginTop: "1rem" }} type="submit">Submit</button>
                        <div style={{ height: "auto" }}>
                            {isEmailSent && <p style={{ textAlign: "center", marginTop: "1rem", color: "#00a600" }}>Email sent successfully!</p>}
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        </div>
                    </form>
                </div>
            </Container >
        </>
    );
};

export default index;