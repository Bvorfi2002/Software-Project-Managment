import React from 'react';
import './styles.css'; // Import CSS file

function LoginPage() {
    return (
        <div>
            <div className="desktop">
                {/* Vector 1 in the left corner of the inner desktop */}
                <div className="vector" style={{ left: '50px', top: '65px', width: '200px', height: '200px', transform: 'rotate(-78deg)' }}></div> {/* Top Left Corner */}

                {/* Other vectors positioned around the first vector with irregular shapes */}
                <div className="vector" style={{ left: '200px', top: '500px', width: '300px', height: '300px', transform: 'rotate(-115deg)' }}></div>
                <div className="vector" style={{ left: '400px', top: '400px', width: '250px', height: '250px', transform: 'rotate(-45deg)' }}></div>
                <div className="vector" style={{ left: '700px', top: '100px', width: '350px', height: '350px', transform: 'rotate(60deg)' }}></div> {/* div behind panel */}
                <div className="vector" style={{ left: '950px', top: '500px', width: '280px', height: '280px', transform: 'rotate(120deg)' }}></div> {/* Right Corner */}
            </div>

            <div className="inner-desktop">
                <img src={process.env.PUBLIC_URL + '/EpokaFilterLogo.png'} alt="Epoka Water Filter" className="logo" />
                <p className="slogan">
                    Pure Water, Pure Life
                    <br />
                    Filtered for Your Wellness
                </p>
            </div>

            <div className="right-panel">
                <img src={process.env.PUBLIC_URL + '/FilterArt.png'} alt="Epoka Water Filter" className="logo2" />
                <h2 className="createACC">Sign in</h2>
                <div className="form-container">
                    <form action="" method="post">

                        <label htmlFor="username" className="styled-label">Username</label> <br />
                        <input type="text" id="username" name="username" className="styled-input" required /><br />
                        <br /><br />
                        <label htmlFor="password" className="styled-label">Password:</label><br />
                        <input type="password" id="password" name="password" className="styled-input" required />
                        <br /><br />
                        <br />
                        <input type="submit" value="Sign In" className="styled-button" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
