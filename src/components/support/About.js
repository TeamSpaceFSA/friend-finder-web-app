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
            New Friends+ began as an idea formulated by Andrea, known as Dre, in
            2022. Soon after, the social app idea was introduced to her team and
            fellow classmates, Jenny Wu, Jacob Saddler, and Harry Huang, during
            their studies as beginner software developers at Fullstack Academy
            for their final Capstone project. After voting and deliberating,
            amongst over 30 ideas, New Friends+ was chosen out of the bunch. In the
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
                "I see New Friends+ as a very useful, fun, and lucrative social
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
              <img className="creator-img" src="https://i.ibb.co/7SJmWr3/1669088474114.jpg" alt="" />
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
              <p>"New Friends+ is an app I hope people can use to connect with others with similar interests or maybe try something new."</p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="https://media-exp1.licdn.com/dms/image/C4D03AQH_UJOap4mbkw/profile-displayphoto-shrink_200_200/0/1646857767806?e=1676505600&v=beta&t=1FggEJ_LMyuUcnjkwbnoAkbhwBWOz3Wi924Lmpnk3LY" alt="" />
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
              <p>"New Friends+ is a fun and intuitive way to make new friends! Whether traveling for work, visiting family out of town, or just feeling 
                the itch to see visit new places, you'll always have a bit of free time to take advantage of. Thus, why not hop on New Friends+ and see where the events
                take you! It's only a matter of time before you meet someone new."</p>
            </div>

            <div className="creator">
              <img className="creator-img" src="https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/118464439_3884268154997995_334619796960176880_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=n5DR7hDSkjEAX-JnKhs&tn=g_ozPu3bDPsd2T16&_nc_ht=scontent-lga3-2.xx&oh=00_AfD-w_BDApPdRt1BT8uirr7wBhwacC4fIzCEMq88FGpaNQ&oe=63C061EB" alt="Harry's beautiful face" />
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
              <p>"New Friends will really help ease people's transitions into a post-pandemic society and help them reclaim their social lives."</p>
            </div>

          </div>
          <div className="space"></div>
        </div>
      ) : (
        <div className="about">
          <img
            src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/back-1-1024.png"
            alt=""
            style={{ height: "30px", width: "30px", margin: "3px" }}
            onClick={() => navigate(-1)}
          />

          <h1 className="aboutIntro">
            We find you new friends based on common interests
          </h1>

          <p className="aboutDescription">
            New Friends+ began as an idea formulated by Andrea, known as Dre, in
            2022. Soon after, the social app idea was introduced to her team and
            fellow classmates, Jenny Wu, Jacob Saddler, and Harry Huang, during
            their studies as beginner software developers at Fullstack Academy
            for their final Capstone project. After voting and deliberating,
            amongst over 30 ideas, New Friends+ was chosen out of the bunch. In the
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
                "I see New Friends+ as a very useful, fun, and lucrative social
                mobile app. Imagine commuting to or visiting a new town... It
                can be hard to make friends or simply meet people with common
                interests. This app closes that gap! As next steps, my fellow creators and I
                would like to deploy the app for public
                use!" &#x1F64F;&#127997;
              </p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}
              <img className="creator-img" src="https://i.ibb.co/7SJmWr3/1669088474114.jpg" alt="" />
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
              <p>"New Friends+ is an app I hope people can use to connect with others with similar interests or maybe try something new."</p>
            </div>

            <div className="creator">
              {/* IMAGE HERE */}

              <img className="creator-img" src="https://media-exp1.licdn.com/dms/image/C4D03AQH_UJOap4mbkw/profile-displayphoto-shrink_200_200/0/1646857767806?e=1676505600&v=beta&t=1FggEJ_LMyuUcnjkwbnoAkbhwBWOz3Wi924Lmpnk3LY" alt="" />

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
              <p>"New Friends+ is a fun and intuitive way to make new friends! Whether traveling for work, visiting family out of town, or just feeling 
                the itch to see new places, you'll always have a bit of free time to take advantage of. Thus, why not hop on New Friends+ and see where the events
                take you! It's only a matter of time before you meet someone new."</p>
            </div>

            <div className="creator">
              <img className="creator-img" src="https://scontent-lga3-2.xx.fbcdn.net/v/t1.6435-9/118464439_3884268154997995_334619796960176880_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=n5DR7hDSkjEAX-JnKhs&tn=g_ozPu3bDPsd2T16&_nc_ht=scontent-lga3-2.xx&oh=00_AfD-w_BDApPdRt1BT8uirr7wBhwacC4fIzCEMq88FGpaNQ&oe=63C061EB" alt="Harry's beautiful face" />
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
              <p>"New Friends will really help ease people's transitions into a post-pandemic society and help them reclaim their social lives."</p>
            </div>
            <div className="space"></div>
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
