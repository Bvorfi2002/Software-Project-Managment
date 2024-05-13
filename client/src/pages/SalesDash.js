import React from 'react';
import './SalesDash.css'; // Make sure to import your CSS file

function App() {
    const navigateTo = (url) => {
        // Disable the clicked button
        // Implement your disabling logic here if needed
        // Navigate to the specified URL
        window.location.href = url;
    };

    return (
        <div className="App">
            <div className="left-panel">
                <img src={require('./EpokaFilterLogo.png')} alt="Epoka Water Filter" className="logo" />
                <hr />
                <button onClick={() => navigateTo('SalesDash.html')} className="Dashboard">
                    <img src={require('./ViewDashboardIcon.png')} className="DashboardIcon" alt="DashboardIcon" />
                    Dashboard
                </button>
                <button onClick={() => navigateTo('epokaHTML.html')} className="SalesManagement">
                    <img src={require('./SalesManagementIcon.png')} className="SalesIcon" alt="SalesIcon" />
                    SalesManagement
                </button>
                <button onClick={() => navigateTo('MeetingOverview.html')} className="MeetingOverview">
                    <img src={require('./MeetingOverviewIcon.png')} className="MeetingIcon" alt="SalesIcon" />
                    MeetingOverview
                </button>
            </div>

            <div className="ScheduleTable">
                <p style={{ position: 'relative', top: '1px', left: '135px' }}>SchedulesNumber</p>
                <br /><br />
                <hr />
            </div>

            <div className="MeetingNR">
                <p style={{ position: 'relative', top: '1px', left: '135px' }}>Meeting NR</p>
                <div className="green">
                    <div className="blue">
                        <img className="meetingimg" src={require('./meeting.png')} alt="meeting" />
                    </div>
                    <img className="scheduleimg" src={require('./Schedule.png')} alt="schedule" />
                </div>
                <br /><br />
                <hr />
            </div>

            <div>
                <p className="preferences">References</p>
            </div>

            <div className="References">
                <div className="WhiteLink">
                    <img src={require('./WhiteLinkIcon.png')} alt="WhiteLinkIcon" width="70" height="70" style={{ position: 'relative', top: '25px', left: '25px' }} />
                    
                </div>
            </div>
        </div>
    );
}

export default App;
