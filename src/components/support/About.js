import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png"
        alt=""
        style={{ height: "50px", width: "50px" }}
        onClick={() => navigate(-1)}
      />

      <h1>We bring you new friends based on common interests</h1>

      <p>
        New Friends began as an idea formulated by Andrea, known as Dre. In 2022,
        the social media app idea was introduced to her team and fellow
        classmates, Jenny Wu, Jacob Saddler, and Harry Huang, during their
        studies at Fullstack Academy for their final Capstone project. After
        voting and deliberating, amongst 30+ ideas, New Friends was chosen out of the bunch. In
        the 2.5 week project timeframe, the team made a MVP (minimal
        value product) verson of their new social media app using both known and new
        technologies. The project was then first shared with a select audience as
        part of the students' graduation at Fullstack Academy where it receieved a lot of positive feedback.
      </p>

      <div className="creatorNotes">
        <h1>Comments from the creators:</h1>
        <div className="creator">
          <h2>Andrea 'Dre' Arnold</h2>
          <img src="" alt="" />
          <p>
            I see New Friends as a very useful, fun, and lucrative social mobile app. 
            Imagine commuting to or visiting a new town... It can be hard to
            make friends or simply meet people with common interests. This app closes that gap! 
            As next steps, along with my fellow creators (if they're
            interested of course, hehe), I would like to expand the app and have it deployed for public use! &#x1F64F;
          </p>
        </div>

        <div className="creator">
          <h2>Jenny Wu</h2>
          <img src="" alt="" />
          <p>
            *write notes here*
          </p>
        </div>

        <div className="creator">
          <h2>Jacob Saddler</h2>
          <img src="" alt="" />
          <p>
            *write notes here*
          </p>
        </div>

        <div className="creator">
          <h2>Harry Huang</h2>
          <img src="" alt="" />
          <p>
            *write notes here*
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
