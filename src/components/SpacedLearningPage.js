import React from 'react';
import '../SpacedLearningPage.css'; // Import CSS for styling

const SpacedLearningPage = () => {
    return (
        <div className="container mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
        <div className="spaced-learning-page">
            <h1>Spaced Learning</h1>
            <p className="intro">
                Spaced learning, also known as distributed practice, is a learning method that involves repeating information over time with breaks in between. This method is based on the idea that repeating information with intervals helps to create long-term memories.
            </p>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <ul>
                    <li><strong>Break down content:</strong> Break down large amounts of information into smaller sessions.</li>
                    <li><strong>Repeat content:</strong> Repeat the information multiple times over time.</li>
                    <li><strong>Take breaks:</strong> Take breaks between study sessions to allow the brain to process the information.</li>
                    <li><strong>Review older material:</strong> Review older material before learning new information.</li>
                    <li><strong>Create summaries:</strong> Create summaries and checklists to help you remember the information.</li>
                </ul>
            </section>

                    <section className="how-it-works">
                <h2>Benefits</h2>
                <ul>
                    <li>Spaced learning can help you retain information for longer.</li>
                    <li>It can help you apply knowledge in practical situations.</li>
                    <li>It can help you feel more confident when using new information.</li>
                </ul>
            </section>

                    <section className="how-it-works">
                <h2>Examples</h2>
                <ul>
                    <li>
                        <strong>Language Learning:</strong> For example, if you're learning new words in a language, you can review the most difficult words today, then again in a couple of days, and again in a week.
                    </li>
                    <li>
                        <strong>Product Training:</strong> In product training, you can present information in small chunks over time.
                    </li>
                    <li>
                        <strong>Onboarding Training:</strong> In onboarding training, you can present information in smaller sessions to help new hires absorb it.
                    </li>
                </ul>
            </section>
                </div>  </div>  </div>
    );
};

export default SpacedLearningPage;