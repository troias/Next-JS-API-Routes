import React from 'react'
import { extractFeedBackData, jsonToObject } from './api/feedback'

const pages = (props) => {
    const { feedback, feedbacks } = props
    console.log("feedbackProps", feedbacks)
    return (
        <div>

            {feedback.map((feedback) => (
                <>
                    <h1>Pulled from fetch</h1>
                    <ul key={feedback.id}>
                        <li>{feedback.email}</li>
                        <li>{feedback.feedback}</li>
                    </ul>
                </>))
            }
            {feedbacks.map((feedback) => (
                <>
                    <h1>Pulled from file</h1>
                    <ul key={feedback.id}>
                        <li>{feedback.email}</li>
                        <li>{feedback.feedback}</li>
                    </ul>
                </>))
            }
        </div>
    )
}

export const getStaticProps = async () => {

    const feedbackData = extractFeedBackData()
    const parsedFeedbackData = jsonToObject(feedbackData)

    console.log("feedbackData", parsedFeedbackData)
    const req = await fetch('http://localhost:3000/api/feedback');

    if (!req.ok) {
        throw new Error("fetch failed")
    }

    const res = await req.json();
    // console.log("GSP", res)
    return {
        props: {
            feedback: res,
            feedbacks: parsedFeedbackData
        }, revalidate: 2
    };
};

export default pages
