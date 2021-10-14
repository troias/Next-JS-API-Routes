import fs from "fs";
import path from "path";


export const buildFeedBackPath = () => {
    return  path.join(process.cwd(), "data", "feedback.json");
}

export const extractFeedBackData = () => {
    const filePath = buildFeedBackPath()
    const fileData = readFileData(filePath)
    return fileData
}

const readFileData = (filePath) => {
    return  fs.readFileSync(filePath)
}

export const jsonToObject = (fileData) => {
    return JSON.parse(fileData);
}


const handler = (req, res) => {

    if (req.method === "POST") {

        const parsedFeedbackData = JSON.parse(req.body)
        const email = parsedFeedbackData.email;
        const feedback = parsedFeedbackData.feedback;

        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            feedback: feedback,
        };
        // console.log("requestBody", req.body)
        // console.log("newFeedback", newFeedback);
        // console.log("parsedFeedbackData", parsedFeedbackData)

        const filePath = buildFeedBackPath()
        const fileData = readFileData(filePath)
        const data = jsonToObject(fileData);
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(201).json({
            message: "Sucess",
            feedback: newFeedback,
        });
    } else {
        // const feedbacks = extractFeedBackData()
        // res.json(feedbacks)
    }

    if (req.method === "GET") {
        const feedback = extractFeedBackData()
        console.log("feedback", feedback)
        res.json(feedback)
    }

    return res;
};

export default handler;
