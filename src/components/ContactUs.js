import React from 'react';
import '../SpacedLearningPage.css'; // Import CSS for styling


const ContactUs = () => {
    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">

        <div className="spaced-learning-page">
            <h1>Spaced Learning</h1>
            {/*<p className="intro">*/}
            {/*    We’d Love to Hear from You!*/}
            {/*</p>*/}

            <section className="how-it-works">
                <h2>We Would Love to Hear from You!</h2>
                <ul>
                    <li>Have a question, suggestion, or issue to report? We are here to help and value your feedback.</li>
                </ul>
            </section>

                    <section className="how-it-works">
                <h2>How to Reach Us</h2>
                <ul>
                    <li>You can email us anytime at: team@spacedstudy.somee.com</li>
                </ul>
            </section>

                    <section className="how-it-works">
                <h2>Why Your Feedback Matters</h2>
                <ul>
                    <li>
                        Your feedback helps us improve Test-English.com and provide the best experience for all users. Do not hesitate to get in touch!
                    </li>
                </ul>
            </section>
                </div>
            </div></div>
    );
};

export default ContactUs;