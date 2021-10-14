import React, { useState } from "react";
import { useRouter } from "next/router"
import { extractFeedBackData, jsonToObject } from "../api/feedback";

const pages = (props) => {

    console.log("feedbackIndexProps", props)
    const router = useRouter()

    const { feedback, feedbacks } = props;
    const [feedbackdetail, setfeedbackdetail] = useState([]);
    const [showFeedBack, setshowFeedBack] = useState(false);
    const [showFeedBack1, setshowFeedBack1] = useState(false);
    const [feedbackdetail1, setfeedbackdetail1] = useState([]);


    const fetchDetailHandler = async (feedbackid) => {
        const req = await fetch(`http://localhost:3000/api/feedback/${feedbackid}`);
        const res = await req.json();
        console.log("fetchHandler", res)
        setfeedbackdetail(res);
        setshowFeedBack(prevState => !prevState);
    };

    const fetchHandler = async (feedbackid) => {
        const req = await fetch(`http://localhost:3000/api/feedback/${feedbackid}`);
        const res = await req.json();
        console.log("fetchHandler", res)
        setfeedbackdetail1(res);
        setshowFeedBack1(prevState => !prevState);
    };
    // console.log("feedbackProps", feedbacks)
    return (
        <div>
            {feedback.map((feedback) => (
                <>
                    <h1>Pulled from fetch</h1>
                    <ul key={feedback.id}>
                        <li>{feedback.email}</li>
                        <li>{feedback.feedback}</li>
                        <button onClick={fetchDetailHandler.bind(null, feedback.id)}> details </button>
                        {showFeedBack && (
                            <ul>
                                <li> {feedbackdetail.email}</li>{" "}
                                <li>{feedbackdetail.feedback}</li>{" "}
                            </ul>
                        )}
                    </ul>
                </>
            ))}
            {feedbacks.map((feedback) => (
                <>
                    <h1>Pulled from file</h1>
                    <ul key={feedback.id}>
                        <li>{feedback.email}</li>
                        <li>{feedback.feedback}</li>
                        <button onClick={fetchHandler.bind(null, feedback.id)}> details </button>
                        {showFeedBack1 && (
                            <ul>
                                <li> {feedbackdetail1.email}</li>{" "}
                                <li>{feedbackdetail1.feedback}</li>{" "}
                            </ul>
                        )}
                    </ul>
                </>
            ))}
            <button onClick={() => router.push("/")}>Back</button>
        </div>
    );
};

export const getStaticProps = async () => {
    //fetch from file
    const feedbackData = extractFeedBackData();
    const parsedFeedbackData = jsonToObject(feedbackData);

    //fetched from abs url
    const req = await fetch("http://localhost:3000/api/feedback");

    if (!req.ok) {
        throw new Error("fetch failed");
    }

    const res = await req.json();
    // console.log("GSP", res)
    return {
        props: {
            feedback: res,
            feedbacks: parsedFeedbackData,
        },
        revalidate: 2,
    };
};

export default pages;
