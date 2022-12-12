import React from "react";
import { auth } from "../../app/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const About = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <div className="about">
          <h1 className="aboutIntro">
            We find you new friends based on common interests
          </h1>

          <p className="aboutDescription">
            New Friends began as an idea formulated by Andrea, known as Dre, in
            2022. Soon after, the social app idea was introduced to her team and
            fellow classmates, Jenny Wu, Jacob Saddler, and Harry Huang, during
            their studies as beginner software developers at Fullstack Academy
            for their final Capstone project. After voting and deliberating,
            amongst 30+ ideas, New Friends was chosen out of the bunch. In the
            2.5 week project deadline, the team made a MVP (minimal value
            product) verson of their new social media app using both known and
            new technologies. The project was then first shared with a select
            audience as part of the students' graduation at Fullstack Academy
            where it receieved a lot of positive feedback.
          </p>

          <div className="creatorNotes">
            <h2>Comments from the creators:</h2>
            <div className="creator">
              <img
                className="creator-img"
                src="https://i.ibb.co/9gCytgY/F40-BF646-4252-4-B55-9104-C5-B69-B1-DAD3-E.jpg"
                alt=""
              />
              <div className="creatorContact">
                <h2>Andrea 'Dre' Arnold </h2>
                <a href="https://www.linkedin.com/in/arnoldandrea/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>
                "I see New Friends as a very useful, fun, and lucrative social
                mobile app. Imagine commuting to or visiting a new town... It
                can be hard to make friends or simply meet people with common
                interests. This app closes that gap! As next steps, along with
                my fellow creators (if they're interested of course, hehe), I
                would like to expand the app and have it deployed for public
                use!" &#x1F64F;&#127997;
              </p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="" alt="" />
              <div className="creatorContact">
                <h2>Jenny Wu</h2>
                <a href="https://www.linkedin.com/in/jennyzwu/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>"WRITE HERE"</p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="" alt="" />
              <div className="creatorContact">
                <h2>Jacob Saddler</h2>
                <a href="https://www.linkedin.com/in/jacob-saddler/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>"WRITE HERE"</p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="" alt="" />
              <div className="creatorContact">
                <h2>Harry Huang</h2>
                <a href="https://www.linkedin.com/in/harryzhuang/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>"WRITE HERE"</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="about">
          <img
            src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
            alt=""
            style={{ height: "25px", width: "25px", margin: "3px" }}
            onClick={() => navigate(-1)}
          />

          <h1 className="aboutIntro">
            We find you new friends based on common interests
          </h1>

          <p className="aboutDescription">
            New Friends began as an idea formulated by Andrea, known as Dre, in
            2022. Soon after, the social app idea was introduced to her team and
            fellow classmates, Jenny Wu, Jacob Saddler, and Harry Huang, during
            their studies as beginner software developers at Fullstack Academy
            for their final Capstone project. After voting and deliberating,
            amongst 30+ ideas, New Friends was chosen out of the bunch. In the
            2.5 week project deadline, the team made a MVP (minimal value
            product) verson of their new social media app using both known and
            new technologies. The project was then first shared with a select
            audience as part of the students' graduation at Fullstack Academy
            where it receieved a lot of positive feedback.
          </p>

          <div className="creatorNotes">
            <h2>Comments from the creators:</h2>
            <div className="creator">
              <img
                className="creator-img"
                src="https://i.ibb.co/9gCytgY/F40-BF646-4252-4-B55-9104-C5-B69-B1-DAD3-E.jpg"
                alt=""
              />
              <div className="creatorContact">
                <h2>Andrea 'Dre' Arnold </h2>
                <a href="https://www.linkedin.com/in/arnoldandrea/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>
                "I see New Friends as a very useful, fun, and lucrative social
                mobile app. Imagine commuting to or visiting a new town... It
                can be hard to make friends or simply meet people with common
                interests. This app closes that gap! As next steps, along with
                my fellow creators (if they're interested of course, hehe), I
                would like to expand the app and have it deployed for public
                use!" &#x1F64F;&#127997;
              </p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="" alt="" />
              <div className="creatorContact">
                <h2>Jenny Wu</h2>
                <a href="https://www.linkedin.com/in/jennyzwu/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>"WRITE HERE"</p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="" alt="" />
              <div className="creatorContact">
                <h2>Jacob Saddler</h2>
                <a href="https://www.linkedin.com/in/jacob-saddler/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>"WRITE HERE"</p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="" alt="" />
              <div className="creatorContact">
                <h2>Harry Huang</h2>
                <a href="https://www.linkedin.com/in/harryzhuang/">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-linkedin-logo-icon-2430-thumb.png"
                    style={{ height: "33px", width: "33px" }}
                    alt=""
                  />
                </a>
              </div>
              <br />
              <p>"WRITE HERE"</p>
            </div>
          </div>
          <div className="newuser-footer">
            <h5 className="newuser-about">
              <Link to="/about">About</Link>
            </h5>
            <h5>
              <Link to="/help">Help</Link>
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
