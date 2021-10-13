
import { useRef, useState } from "react";

function HomePage(props) {
  const { feedback } = props;

  console.log("homepage props", props)
  const [showFB, setShowFB] = useState(false);
  const [loading, setLoading] = useState(false)

  const emailRef = useRef();
  const feedbackRef = useRef();

  const submitFeedbackHandler = async (event) => {
    event.preventDefault();
    const currEmailVal = emailRef.current.value;
    const currFeedbackVal = feedbackRef.current.value;

    const item = {
      email: currEmailVal,
      feedback: currFeedbackVal,
    };

    const req = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(item),
    });
    const res = await req.json();
    console.log("feedbackResponse", res)
  };

  const showFeedbackHandler = async () => {
    setShowFB(prevState => !prevState);
  };

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

 
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFeedbackHandler}>
        <div>
          <label htmlFor="Email">Your email address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea type="text" id="feedback" rows="5" ref={feedbackRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={showFeedbackHandler}>Load Feedback</button>
      {showFB &&
        feedback.map((feedback) => (
          <ul key={feedback.id}>
            <li>{feedback.email}</li>
            <li>{feedback.feedback}</li>
          </ul>
        ))}
     
    </div>
  );
}

export const getStaticProps = async () => {

  const req = await fetch('http://localhost:3000/api/feedback');

  if (!req.ok) {
    throw new Error("fetch failed")
  }

  const res = await req.json();
  // console.log("GSP", res)
  return {
    props: {
      feedback: res,
    }, revalidate: 2
  };
};

export default HomePage;
