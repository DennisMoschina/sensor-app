import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import DeviceOrientationWrapper from './model/DeviceOrientationWrapper.ts';

const App = () => {
    const [context, setContext] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [orientation, setOrientation] = useState({ alpha: null, beta: null, gamma: null });
    const deviceOrientationWrapper = new DeviceOrientationWrapper();

    const handleToggle = async () => {
        if (!isEnabled) {
            try {
                await deviceOrientationWrapper.enable(handleDeviceOrientation);
                setIsEnabled(true);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            deviceOrientationWrapper.disable();
            setIsEnabled(false);
            setOrientation({ alpha: null, beta: null, gamma: null });
        }
    };

    const handleDeviceOrientation = (event) => {
        setOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        });
    };

    return (
        <div>
            <h2>Device Orientation Event Listener</h2>
            <form>
                <label htmlFor="context">Context:</label><br />
                <input
                    type="text"
                    id="context"
                    name="context"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                /><br /><br />
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={handleToggle}
                    />
                    <span className="slider round"></span>
                </label>
                <label htmlFor="toggleSwitch">Enable Device Orientation</label>
            </form>
            {isEnabled && (
                <div>
                    <h3>Device Orientation Data</h3>
                    <p>Alpha: {orientation.alpha ? orientation.alpha.toFixed(2) : 'N/A'}</p>
                    <p>Beta: {orientation.beta ? orientation.beta.toFixed(2) : 'N/A'}</p>
                    <p>Gamma: {orientation.gamma ? orientation.gamma.toFixed(2) : 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default App;
