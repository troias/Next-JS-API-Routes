import React from 'react'
import { extractFeedBackData, jsonToObject } from './index'

const handler = (req, res) => {
    if (req.method === 'GET') {

        const feedbackId = req.query.feedbackID
        // console.log("feedbackId", feedbackId)
        const feedback = extractFeedBackData()
        const parsedFeedbackData = jsonToObject(feedback)
        const filteredFeedbackData = parsedFeedbackData.find(feedback =>
            feedback.id === feedbackId)
        console.log("filteredFeedbackData", filteredFeedbackData)
        res.status(200).json(filteredFeedbackData)
        console.log("feedbackApiId", feedbackId)
    }

    if (req.method === 'POST') {

    }

    if (req.method === 'DELETE') {

    }

}

export default handler