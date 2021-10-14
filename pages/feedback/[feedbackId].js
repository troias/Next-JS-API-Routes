import React from 'react'
import {extractFeedBackData, jsonToObject} from "../api/feedback"
import {useRouter} from "next/router"

 const FeedbackDetail = (props) => {
     const router = useRouter()
     const {feedback} = props
     console.log("FeedbackDetailProps", feedback)
    return (
        <div>
            <h3>Email {feedback.email}</h3>
            <h3>Feedback {feedback.feedback}</h3>
            <button onClick={()=> router.push("/")}>Back </button>
        </div>
    )
}

export const getStaticPaths = () => {

    const feedback = extractFeedBackData()
    const parsedFeedbackData = jsonToObject(feedback)
    const paths = parsedFeedbackData.map(x => ({ params: {feedbackId: x.id}}))
    console.log("feedbackPaths", parsedFeedbackData)
    console.log("paths", paths)
    return {
        paths: paths, fallback: false
    }
}

export const getStaticProps = async (ctx) => {

    const feedbackId = ctx.params.feedbackId

    const req = await fetch(`http://localhost:3000/api/feedback/${feedbackId}`)
    const res = await req.json()
    console.log("response", res)
    console.log("feedbackId", feedbackId)

    return {
        props: {
            feedback: res
        }
    }
}

export default FeedbackDetail
